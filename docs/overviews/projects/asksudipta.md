# AskSudipta - Conversational RAG Intelligence

AskSudipta is the full chat system that powers the portfolio assistant on Sudipta Mandal's website. The frontend is implemented directly in `src/components/ChatBot.jsx` with React and Material UI, while the backend is a TypeScript RAG service that turns curated markdown knowledge into searchable vector records, retrieves grounded context, and returns concise answers with source references.

The project is intentionally framework-light: React, Material UI, React Router, Node.js, Express, TypeScript, Supabase PostgreSQL with pgvector, Gemini embeddings and generation, Zod validation, and Vitest coverage.

---

## System Architecture

```mermaid
flowchart TD
    User([Portfolio Visitor]) --> Chatbot[React Chatbot UI]
    Chatbot --> State[sessionStorage UI State]
    Chatbot --> SourceMap[sourceMapper Route Resolver]
    Chatbot --> Proxy[Vercel /api/chat Proxy]
    Proxy -->|API key headers| Api[Express Chat API]
    Api --> Auth{Valid request?}
    Auth -->|No| Reject[401 or 400 Error]
    Auth -->|Yes| ChatService[RagChatService]
    ChatService --> Intent{Experience duration?}
    Intent -->|Yes| Calculator[Deterministic Experience Calculator]
    Intent -->|No| Retrieval[Hybrid Retrieval Service]
    Calculator --> Retrieval
    Retrieval --> Embedding[Gemini Embedding Adapter]
    Retrieval --> Keyword[Keyword Alias Search]
    Embedding --> VectorRpc[match_knowledge_chunks RPC]
    VectorRpc --> Store[(Supabase pgvector)]
    Keyword --> Store
    Store --> Retrieval
    Retrieval --> Prompt[Grounded Prompt Builder]
    Calculator --> Prompt
    Prompt --> Gemini[Gemini Generation]
    Gemini --> Api
    Api -->|answer + sources| Proxy
    Proxy --> Chatbot
    Chatbot --> Sources[Verified Source Cards]
    Sources --> SourceMap
```

Chat requests do not read markdown files directly. The runtime source of truth is the Supabase `knowledge_chunks` table populated by ingestion.

---

## RAG Flow

This is the core two-lane flow from authored knowledge to grounded answers:

```mermaid
flowchart TD
    subgraph Indexing [Knowledge Indexing]
      A[Markdown files in knowledge/] --> B[Ingestion command]
      B --> C[Heading-aware chunking]
      C --> D[Gemini embeddings]
      D --> E[PostgreSQL pgvector]
    end

    subgraph Answering [Question Answering]
      F[User question] --> G[Question embedding]
      G --> H[Vector similarity search]
      H --> I[Prompt builder]
      I --> J[Gemini generation]
      J --> K[Answer with sources]
    end

    E -.retrieved context.-> H
```

The detail page implements this as an interactive section with clickable nodes for each indexing and answering step.

---

## Frontend Chat Experience

The assistant frontend lives in `src/components/ChatBot.jsx` and is part of the AskSudipta project surface, not a separate demo shell.

```mermaid
stateDiagram-v2
    [*] --> Closed
    Closed --> Open: floating button or open-chatbot event
    Open --> Minimized: desktop minimize
    Minimized --> Open: restore
    Open --> Expanded: desktop expand
    Expanded --> Open: collapse
    Open --> Closed: close
```

Frontend responsibilities:

- Manages closed, open, minimized, expanded, and mobile full-height layouts.
- Persists `chat_window_state`, `chat_history`, `chat_is_expanded`, and `hide_chat_hint` in `sessionStorage`.
- Provides suggested questions for first-time chat sessions.
- Sends messages to the same-origin `/api/chat` proxy.
- Formats assistant responses with headings, bullets, bold text, links, and knowledge-source paths.
- Displays verified source cards with match percentages.
- Uses `sourceMapper` to route citations to project detail pages, experience pages, research pages, home-section anchors, or the resume modal.

---

## Knowledge Ingestion Flow

```mermaid
flowchart TD
    Files[knowledge/**/*.md] --> Loader[Markdown Loader]
    Loader --> Normalize[Text Normalizer]
    Normalize --> Chunker[Heading-aware Chunking]
    Chunker --> Hash[SHA-256 Content Hash]
    Hash --> Changed{Changed chunk?}
    Changed -->|No| Skip[Skip embedding]
    Changed -->|Yes| Embed[Gemini Embeddings]
    Embed --> Upsert[upsert_knowledge_chunk RPC]
    Upsert --> Table[(knowledge_chunks)]
    Chunker --> Prune[delete_stale_knowledge_chunks RPC]
    Prune --> Table
    Loader --> RemoveSources[delete_sources_not_in RPC]
    RemoveSources --> Table
```

Important ingestion decisions:

- Markdown is scanned recursively from the configured `KNOWLEDGE_DIR`.
- Chunks preserve title, heading, heading path, chunk index, and token estimate metadata.
- Chunks target roughly 300-600 tokens.
- Embeddings use the configured Gemini embedding model and 768 output dimensions by default.
- Existing chunks are updated only when content hash, title, or metadata changes.

---

## Chat Answer Flow

```mermaid
sequenceDiagram
    autonumber
    actor Visitor
    participant UI as Portfolio Chatbot
    participant Proxy as Vercel Proxy
    participant API as Express API
    participant Retrieval as Hybrid Retrieval
    participant DB as Supabase pgvector
    participant Prompt as Prompt Builder
    participant LLM as Gemini

    Visitor->>UI: Ask a portfolio question
    UI->>UI: Persist message and render loading state
    UI->>Proxy: POST /api/chat
    Proxy->>API: Forward message with API key
    API->>API: Validate body with Zod
    API->>Retrieval: Retrieve grounded context
    Retrieval->>DB: Vector RPC + keyword search
    DB-->>Retrieval: Ranked chunks with metadata
    Retrieval-->>Prompt: Top source chunks
    Prompt->>LLM: Grounded prompt
    LLM-->>API: Answer text
    API-->>Proxy: Answer + source references
    Proxy-->>UI: Render formatted answer and verified sources
    UI->>UI: Map source files to portfolio routes
```

The chat response shape includes an `answer` string and `sources` array with source file, title, chunk index, and similarity.

---

## Vector Store Schema

```mermaid
erDiagram
    knowledge_chunks {
        uuid id PK
        text source_file
        text title
        integer chunk_index
        text content
        text content_hash
        vector embedding
        jsonb metadata
        timestamptz created_at
        timestamptz updated_at
    }
```

Core database behavior:

- `knowledge_chunks.source_file + chunk_index` is unique.
- `embedding` is stored as `vector(768)`.
- `match_knowledge_chunks` orders by cosine distance and returns similarity.
- `ivfflat.probes` is set to `100` inside the RPC so small corpora do not return empty nearest-list results.
- Keyword search runs against `source_file`, `title`, and `content`, then merges with vector results.

---

## Latency Strategy

```mermaid
flowchart LR
    Question[User Question] --> ResponseCache{Exact response cached?}
    ResponseCache -->|Yes| CachedAnswer[Return cached answer]
    ResponseCache -->|No| EmbeddingCache{Embedding cached?}
    EmbeddingCache -->|No| Embed[Generate embedding]
    EmbeddingCache -->|Yes| RetrievalCache
    Embed --> RetrievalCache{Retrieval cached?}
    RetrievalCache -->|Yes| Prompt[Compressed prompt]
    RetrievalCache -->|No| Search[Vector + keyword search]
    Search --> Prompt
    Prompt --> FastModel[Fast Gemini model]
    FastModel --> Answer[Bounded answer]
    Answer --> StoreCache[Store response cache]
```

Defaults favor fast portfolio Q&A:

- Fast generation model through `GEMINI_FAST_GENERATION_MODEL`.
- `CHAT_MAX_OUTPUT_TOKENS` capped at 350 by default.
- `CHAT_TEMPERATURE` set low for direct factual answers.
- `CHAT_THINKING_BUDGET=0` by default.
- `CHAT_CONTEXT_TOP_K` and `CHAT_CONTEXT_MAX_CHARS_PER_CHUNK` bound prompt size.
- Process-local caches cover embeddings, retrieval results, and exact repeated chat responses.

---

## Experience Duration Calculation

```mermaid
flowchart TD
    Question[Question] --> Intent{Duration intent?}
    Intent -->|No| NormalRetrieval[Normal retrieval]
    Intent -->|Yes| Mode{Professional only?}
    Mode -->|Yes| Professional[Exclude voluntary student-society roles]
    Mode -->|No| Software[Include software experience roles]
    Professional --> Merge[Merge overlapping month ranges]
    Software --> Merge
    Merge --> Computed[Computed facts]
    Computed --> Prompt[Prompt builder]
    NormalRetrieval --> Prompt
    Prompt --> Gemini[Gemini phrases answer]
```

The LLM phrases the final response, but it does not calculate date ranges. Typed role data and deterministic month merging produce the authoritative duration.

---

## Public API

```http
POST /api/chat
Content-Type: application/json
x-api-key: <CHAT_API_KEY>
```

```json
{
  "message": "Tell me about ValoDash."
}
```

```json
{
  "answer": "...",
  "sources": [
    {
      "sourceFile": "knowledge/projects/valodash.md",
      "title": "ValoDash",
      "chunkIndex": 0,
      "similarity": 0.91
    }
  ]
}
```

The portfolio frontend calls its same-origin Vercel proxy, and the proxy forwards the message to this protected backend with API credentials.
