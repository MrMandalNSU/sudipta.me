import React from "react";
import {
  Api as ApiIcon,
  Article as ArticleIcon,
  AutoAwesome as AutoAwesomeIcon,
  Bolt as BoltIcon,
  DataObject as DataObjectIcon,
  Functions as FunctionsIcon,
  Hub as HubIcon,
  Key as KeyIcon,
  ManageSearch as ManageSearchIcon,
  Memory as MemoryIcon,
  Psychology as PsychologyIcon,
  Route as RouteIcon,
  Search as SearchIcon,
  Security as SecurityIcon,
  SmartToy as SmartToyIcon,
  Speed as SpeedIcon,
  Storage as StorageIcon,
  Tune as TuneIcon,
} from "@mui/icons-material";

export const features = [
  {
    icon: <SmartToyIcon />,
    title: "Floating Chatbot Frontend",
    shortTitle: "Chat UI",
    desc: "Implements the portfolio assistant in React and MUI with open, minimized, expanded, and mobile full-height states, suggested prompts, loading bubbles, and source cards.",
  },
  {
    icon: <ArticleIcon />,
    title: "Markdown Knowledge Ingestion",
    shortTitle: "Ingestion",
    desc: "Scans portfolio markdown, normalizes text in memory, preserves heading paths, chunks content deterministically, and upserts only changed chunks.",
  },
  {
    icon: <MemoryIcon />,
    title: "Gemini Embedding Adapter",
    shortTitle: "Embeddings",
    desc: "Generates 768-dimensional embeddings through a dedicated Gemini service so provider details stay isolated from retrieval and chat orchestration.",
  },
  {
    icon: <ManageSearchIcon />,
    title: "Hybrid Retrieval Ranking",
    shortTitle: "Retrieval",
    desc: "Combines pgvector cosine similarity with keyword alias search, deduplicates overlaps, and ranks sources with vector, keyword, or hybrid match types.",
  },
  {
    icon: <PsychologyIcon />,
    title: "Grounded Prompt Builder",
    shortTitle: "Prompting",
    desc: "Builds concise prompts from retrieved context, computed facts, source metadata, and strict rules that prevent unsupported portfolio claims.",
  },
  {
    icon: <FunctionsIcon />,
    title: "Deterministic Experience Math",
    shortTitle: "Experience",
    desc: "Detects work-experience duration questions, merges typed role date ranges, and injects the computed result as authoritative context.",
  },
  {
    icon: <SpeedIcon />,
    title: "Latency-Focused Chat Path",
    shortTitle: "Latency",
    desc: "Uses a fast Gemini model, bounded output, compressed context, disabled thinking by default, and process-local response, retrieval, and embedding caches.",
  },
];

export const systemNodes = {
  chatbot: {
    title: "Portfolio Chatbot UI",
    shortTitle: "Chat UI",
    icon: <SmartToyIcon />,
    description: "Floating React and MUI assistant implemented in src/components/ChatBot.jsx. It manages closed, open, minimized, expanded, and mobile states; persists chat history in sessionStorage; renders suggested prompts; formats markdown-like assistant responses; and displays verified source cards.",
    role: "Visible demo surface for AskSudipta, including source navigation back into portfolio routes and the Resume modal.",
  },
  session: {
    title: "Browser Session State",
    shortTitle: "Session",
    icon: <MemoryIcon />,
    description: "Session-scoped frontend persistence for chat_window_state, chat_history, chat_is_expanded, and hide_chat_hint. It keeps the assistant feeling continuous during a visit without introducing account storage.",
    role: "Preserves the assistant's UI state and conversation history across route changes and refreshes in the current browser session.",
  },
  proxy: {
    title: "Vercel Chat Proxy",
    shortTitle: "Proxy",
    icon: <RouteIcon />,
    description: "Same-origin serverless endpoint that forwards chat messages to the protected RAG backend using environment-provided API credentials.",
    role: "Keeps backend credentials out of the browser while preserving a simple /api/chat client contract.",
  },
  api: {
    title: "Express Chat API",
    shortTitle: "API",
    icon: <ApiIcon />,
    description: "TypeScript Express router validates request bodies with Zod, enforces API-key authentication, logs lifecycle details, and delegates answers to the chat service.",
    role: "Security and request boundary for POST /api/chat.",
  },
  retrieval: {
    title: "Hybrid Retrieval Service",
    shortTitle: "Retrieval",
    icon: <SearchIcon />,
    description: "Embeds the normalized question, searches Supabase pgvector and keyword aliases in parallel, merges duplicate chunks, and returns the highest scoring context.",
    role: "Selects the grounded evidence used by the assistant before any generation happens.",
  },
  supabase: {
    title: "Supabase pgvector Store",
    shortTitle: "Vector DB",
    icon: <StorageIcon />,
    description: "Stores knowledge chunks, metadata, hashes, and 768-dimensional vectors in PostgreSQL with pgvector RPC functions for search and ingestion upserts.",
    role: "Runtime source of truth for answers; chat requests never read markdown files directly.",
  },
  prompt: {
    title: "Prompt Builder",
    shortTitle: "Prompt",
    icon: <DataObjectIcon />,
    description: "Compresses retrieved chunks, formats source metadata, includes computed facts when available, and adds grounding rules for concise portfolio answers.",
    role: "Turns retrieval output into a controlled Gemini prompt.",
  },
  gemini: {
    title: "Gemini Generation",
    shortTitle: "Gemini",
    icon: <AutoAwesomeIcon />,
    description: "Uses configurable Gemini generation models with retry handling for transient provider errors and fast defaults for portfolio Q&A.",
    role: "Generates the final natural-language answer from grounded context.",
  },
  sourceMap: {
    title: "Source Navigation Mapper",
    shortTitle: "Sources",
    icon: <HubIcon />,
    description: "Maps returned knowledge source files to portfolio destinations: project detail routes, experience pages, research pages, home-section anchors, or the resume modal.",
    role: "Turns RAG citations into clickable website navigation so answers are not isolated from the portfolio experience.",
  },
};

export const workflows = {
  frontend: {
    title: "Frontend Chat UX Workflow",
    shortTitle: "Frontend",
    icon: <SmartToyIcon />,
    description: "Controls the portfolio-facing assistant experience before and after the RAG API call.",
    steps: [
      { label: "Open Assistant", text: "The user opens the floating assistant manually, from the AskSudipta CTA, or through the open-chatbot browser event." },
      { label: "Persist Session", text: "The component stores chat window state, expanded mode, hint dismissal, and chat history in sessionStorage for the current browsing session." },
      { label: "Send Message", text: "Submitted text is appended as a user message and posted to the portfolio's same-origin /api/chat proxy." },
      { label: "Render Answer", text: "Assistant text is formatted with headings, bullets, bold spans, links, and knowledge-source path links." },
      { label: "Navigate Sources", text: "Verified source cards use sourceMapper to route users to project, experience, research, section-anchor, or resume destinations." },
    ],
    payload: {
      component: "src/components/ChatBot.jsx",
      state: ["closed", "open", "minimized", "expanded"],
      storage: ["chat_window_state", "chat_history", "chat_is_expanded", "hide_chat_hint"],
    },
    responsePayload: {
      ui: "assistant bubble + verified sources",
      navigation: "source-aware route mapping",
      ctaEvent: "open-chatbot",
    },
  },
  ingestion: {
    title: "Knowledge Ingestion Workflow",
    shortTitle: "Ingest",
    icon: <ArticleIcon />,
    description: "Transforms portfolio markdown into searchable vector records.",
    steps: [
      { label: "Scan Knowledge Directory", text: "The ingestion command recursively loads markdown from the configured knowledge directory." },
      { label: "Normalize & Chunk", text: "Text is normalized in memory and split into heading-aware chunks with stable indexes and token estimates." },
      { label: "Hash Changed Content", text: "Each chunk gets a SHA-256 content hash so unchanged chunks can be skipped on later runs." },
      { label: "Embed Changed Chunks", text: "Gemini creates 768-dimensional vectors only for chunks whose content or metadata changed." },
      { label: "Upsert & Prune", text: "Supabase RPC functions upsert fresh chunks, delete stale indexes, and remove sources no longer present on disk." },
    ],
    payload: {
      command: "npm run ingest",
      input: "knowledge/**/*.md",
      chunkTargetTokens: "300-600",
      embeddingDimensions: 768,
    },
    responsePayload: {
      table: "knowledge_chunks",
      staleChunks: "deleted",
      unchangedChunks: "skipped",
    },
  },
  chat: {
    title: "Grounded Chat Answer Workflow",
    shortTitle: "Chat",
    icon: <SmartToyIcon />,
    description: "Answers visitor questions from retrieved portfolio context and returns traceable sources.",
    steps: [
      { label: "Visitor Asks", text: "The React chatbot posts a message from src/components/ChatBot.jsx to the same-origin Vercel proxy." },
      { label: "Protected Forward", text: "The proxy forwards the request to the Express backend with x-api-key and Bearer credentials." },
      { label: "Validate & Retrieve", text: "The backend validates the message, embeds the normalized query, and performs vector plus keyword retrieval." },
      { label: "Build Prompt", text: "Retrieved chunks are compressed, formatted with source metadata, and wrapped with strict grounding instructions." },
      { label: "Generate & Return", text: "Gemini generates the answer and the API returns both text and source references to the UI." },
    ],
    payload: {
      endpoint: "POST /api/chat",
      message: "Tell me about ValoDash.",
      auth: "x-api-key or Bearer token",
    },
    responsePayload: {
      answer: "Grounded answer text",
      sources: [
        {
          sourceFile: "knowledge/projects/valodash.md",
          similarity: 0.91,
        },
      ],
    },
  },
  experience: {
    title: "Experience Duration Workflow",
    shortTitle: "Duration",
    icon: <FunctionsIcon />,
    description: "Uses deterministic date math for experience questions before asking the LLM to phrase the result.",
    steps: [
      { label: "Intent Detection", text: "The chat service detects questions asking about total or professional work-experience duration." },
      { label: "Mode Selection", text: "Professional-only questions exclude voluntary student-society experience; broader software questions include all configured roles." },
      { label: "Range Merge", text: "Typed role date ranges are merged by month so overlapping roles are not double-counted." },
      { label: "Computed Context", text: "The formatted duration summary is added to the prompt as authoritative computed facts." },
      { label: "Grounded Explanation", text: "The LLM phrases the answer using retrieved context and the computed facts without recalculating dates." },
    ],
    payload: {
      question: "How many years of experience does Sudipta have?",
      mode: "software | professional",
      present: "current runtime month",
    },
    responsePayload: {
      computedFacts: "non-overlapping months",
      llmRole: "phrasing only",
    },
  },
};

export const vectorNodes = {
  knowledge_chunks: {
    title: "knowledge_chunks Table",
    icon: <StorageIcon />,
    description: "Primary vector table storing source text, hash metadata, chunk position, and embeddings.",
    fields: [
      { name: "id", type: "uuid", isKey: "PK" },
      { name: "source_file", type: "text", isKey: "Unique Pair" },
      { name: "title", type: "text" },
      { name: "chunk_index", type: "integer", isKey: "Unique Pair" },
      { name: "content", type: "text" },
      { name: "content_hash", type: "text" },
      { name: "embedding", type: "vector(768)" },
      { name: "metadata", type: "jsonb" },
      { name: "created_at", type: "timestamptz" },
      { name: "updated_at", type: "timestamptz" },
    ],
    relations: ["match_knowledge_chunks", "upsert_knowledge_chunk", "keyword_search"],
  },
  match_knowledge_chunks: {
    title: "match_knowledge_chunks RPC",
    icon: <ManageSearchIcon />,
    description: "Vector-search RPC that orders chunks by cosine distance and returns similarity-scored matches.",
    fields: [
      { name: "p_query_embedding", type: "vector(768)", isKey: "Input" },
      { name: "p_match_count", type: "integer", isKey: "Input" },
      { name: "similarity", type: "1 - cosine distance" },
      { name: "ivfflat.probes", type: "100" },
    ],
    relations: ["knowledge_chunks"],
  },
  upsert_knowledge_chunk: {
    title: "upsert_knowledge_chunk RPC",
    icon: <TuneIcon />,
    description: "Ingestion RPC that inserts or updates chunks only when title, metadata, or content hash changes.",
    fields: [
      { name: "p_source_file", type: "text", isKey: "Input" },
      { name: "p_chunk_index", type: "integer", isKey: "Input" },
      { name: "p_content_hash", type: "text" },
      { name: "p_embedding", type: "vector(768)" },
      { name: "on conflict", type: "source_file + chunk_index" },
    ],
    relations: ["knowledge_chunks", "delete_stale_chunks"],
  },
  delete_stale_chunks: {
    title: "Stale Source Cleanup",
    icon: <BoltIcon />,
    description: "Maintenance RPCs delete chunk indexes past the new source length and remove documents no longer present in the knowledge directory.",
    fields: [
      { name: "delete_stale_knowledge_chunks", type: "source + min index" },
      { name: "delete_sources_not_in", type: "source file list" },
      { name: "content hashes", type: "skip unchanged chunks" },
    ],
    relations: ["knowledge_chunks"],
  },
  keyword_search: {
    title: "Keyword Alias Search",
    icon: <HubIcon />,
    description: "Supabase table search over source_file, title, and content using normalized query terms and aliases, then merged with vector results.",
    fields: [
      { name: "source_file", type: "ilike filter" },
      { name: "title", type: "ilike filter" },
      { name: "content", type: "ilike filter" },
      { name: "retrievalScore", type: "keyword score / 20" },
      { name: "matchType", type: "keyword | hybrid" },
    ],
    relations: ["knowledge_chunks", "match_knowledge_chunks"],
  },
};

export const techGroups = [
  {
    category: "Frontend",
    icon: <SmartToyIcon sx={{ fontSize: 13 }} />,
    items: ["React", "Material UI", "React Router", "sessionStorage"],
    color: "primary.main",
  },
  {
    category: "Backend",
    icon: <ApiIcon sx={{ fontSize: 13 }} />,
    items: ["Node.js", "Express", "TypeScript", "Zod"],
    color: "secondary.main",
  },
  {
    category: "RAG Core",
    icon: <PsychologyIcon sx={{ fontSize: 13 }} />,
    items: ["Gemini", "Embeddings", "Prompt Builder", "Hybrid Retrieval"],
    color: "success.main",
  },
  {
    category: "Storage",
    icon: <StorageIcon sx={{ fontSize: 13 }} />,
    items: ["Supabase", "PostgreSQL", "pgvector", "SQL RPC"],
    color: "warning.main",
  },
  {
    category: "Security & Ops",
    icon: <SecurityIcon sx={{ fontSize: 13 }} />,
    items: ["API Keys", "Vercel Proxy", "Vitest", "Latency Caches"],
    color: "error.main",
  },
];
