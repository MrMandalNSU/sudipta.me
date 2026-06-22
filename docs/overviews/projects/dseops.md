# DSE Ops — Architectural System Design

DSE Ops is a high-performance market archiving and visual analytics platform built to scrape, index, and query daily market telemetry and block transactions from the Dhaka Stock Exchange (DSE) SME board.

This document outlines the **architectural blueprint, data flows, core workflows, and relational database schema** of the DSE Ops application.

---

## 🏛️ System Architecture & Workflow

DSE Ops uses a decoupled, full-stack monorepo system containing a scraping Node.js/Express service, a relational Supabase PostgreSQL database, a Supabase Storage bucket, and a modern Next.js client interface.

### 1. High-Level Process Workflow

This flowchart outlines the coordinate data pathways between external sources, automated triggers, server compute layers, database storage, and client views:

```mermaid
flowchart TD
    %% Define Nodes
    subgraph ClientSpace [Next.js Client Space]
        User([User]) -->|1. Request Stock Data| Client[Next.js React Client]
        Client -->|1a. Download CSV files| S3Link[Direct Storage URI]
    end

    subgraph BackendGateway [Express.js Scraper API]
        Client -->|2. Query Summaries & Transctions| Router[Express API Router]
        Router -->|2a. JSON Responses| Client
        
        CronWebhook([Daily Cron Webhook]) -->|3. Trigger Scraping POST| Router
        Router -->|3a. Execute Scraper| Scraper[Web Scraper & HTML Parser]
    end

    subgraph TargetSource [External Stock Webpage]
        Scraper -->|4. GET Request| DSESite[sme.dsebd.org]
        DSESite -->|Return Raw HTML Table| Scraper
    end

    subgraph StorageCompute [Supabase Cloud Infrastructure]
        Router -->|5. Insert Daily Records| DB[(PostgreSQL Database)]
        Router -->|6. Upload CSV Stream| Storage[(Supabase S3 Bucket)]
        Storage -->|Return file paths| DB
        S3Link -.->|Fetch stream| Storage
    end

    %% Node Styling
    classDef client fill:#3b82f6,stroke:#ece8e1,stroke-width:2px,color:#fff;
    classDef server fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#ece8e1;
    classDef db fill:#10b981,stroke:#1e293b,stroke-width:2px,color:#fff;
    classDef ext fill:#7c3aed,stroke:#ece8e1,stroke-width:2px,color:#fff;
    
    class Client,S3Link client;
    class Router,Scraper server;
    class DB,Storage db;
    class DSESite,CronWebhook ext;
```

---

### 2. Component Roles

1. **Client Portal (Next.js / TypeScript)**:
   - Built with Next.js App Router, with structural layouts styled using pure custom CSS Modules.
   - Provides users with interactive date filters and calendar tools to lookup daily stock transactions.
   - Renders performance metrics, sector summaries, public listings, and block transaction spreadsheets, featuring multi-column sorting (by ticker, open, close, volume, value, change %) for analytical indexing.
   - Streams historical stock archives directly through public Supabase Storage URIs.

2. **Express.js API Server (Node.js)**:
   - Houses endpoints for fetching transaction archives, lists of downloadable CSV reports, and daily market dashboards.
   - Securely listens for daily End-of-Day scraping triggers, validating authorization secrets using headers.
   - Orchestrates automated data pipelines: scraping, parsing, writing to the database, converting to CSV, and uploading to storage.

3. **Scraper & Parser Engine (`parser.js`)**:
   - Fetches target HTML dynamically from `sme.dsebd.org/sme_market-statistics.php`.
   - Utilizes `node-html-parser` to navigate raw DOM trees and extract pre-formatted text segments.
   - Employs regex-driven parsers and state machines to isolate:
     - Today's date and summary statistics (Total Trades, Volume, Value, Market Cap).
     - Public Transactions Table (Open, High, Low, Close, percentage adjustments, trades, volume).
     - Block Transactions Table (Max Price, Min Price, trades, quantity, Value in Millions).

4. **Supabase PostgreSQL & S3 Storage**:
   - Houses the relational tables caching transactions and summaries, structured to delete older records first (cascading deletes) before re-inserting to ensure idempotency.
   - Acts as the primary store for raw daily backups, generating and serving direct CSV downloads.

---

## 🔄 Core Workflows

### 1. Daily End-of-Day Scraping Loop (Cron Triggered)
```mermaid
sequenceDiagram
    autonumber
    participant Cron as cron-job.org
    participant Server as Express Scraper API
    participant DSE as sme.dsebd.org
    participant DB as Supabase PostgreSQL
    
    Cron->>Server: HTTP POST /api/scrape (with secret header)
    Note over Server: Authorize cron signature
    Server->>DSE: Fetch Market Statistics Page (HTTP GET)
    DSE-->>Server: Return Raw HTML markup
    Note over Server: Run parser.js state machine
    Server->>DB: Delete existing records for target date (ON DELETE CASCADE)
    Server->>DB: Batch insert Daily Summary and Transactions (Public & Block)
    DB-->>Server: Ingest Success Callback
```

### 2. CSV Archival & Upload Pipeline
```mermaid
sequenceDiagram
    autonumber
    participant Server as Express Backend
    participant DB as Supabase Database
    participant S3 as Supabase S3 bucket
    
    Note over Server: Format parsed records as CSV strings
    Server->>S3: Upload CSV stream to bucket: dse-ops/date.csv
    S3-->>Server: Return storage path metadata
    Server->>DB: Upsert record in csv_files table
    DB-->>Server: Storage URI saved
```

### 3. Client Query & Analytics Pipeline
```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Client as Next.js Dashboard
    participant Server as Express API
    participant DB as Supabase PostgreSQL
    
    User->>Client: Select calendar date
    Client->>Server: GET /api/market-data?date=YYYY-MM-DD
    Server->>DB: Query daily_summaries, public_transactions & block_transactions
    DB-->>Server: Return SQL rows
    Server-->>Client: Respond with unified data payload (JSON)
    Client->>Client: Render dynamic cards & spreadsheets
```

---

## 🗄️ Database Design

The schema is hosted on Supabase PostgreSQL and handles raw transaction data structures with cascading deletes to maintain data purity.

### 1. High-Level Relational Structure

```text
       +--------------------+
       |   daily_summaries  |
       +---------+----------+
                 | 1
                 |
                 | 1..N (Cascading Deletes)
                 v
       +---------+----------+
       | public_transactions|
       +--------------------+
       
                 | 1
                 |
                 | 1..N (Cascading Deletes)
                 v
       +---------+----------+
       | sblock_transactions|
       +--------------------+

       +--------------------+
       |      csv_files     | (Independent files ledger)
       +--------------------+
```

---

### 2. Entity-Relationship Schema Map

```mermaid
erDiagram
    daily_summaries {
        Date date PK
        Int spublic_advanced
        Int spublic_declined
        Int spublic_unchanged
        Int spublic_total
        Int total_trades
        BigInt total_volume
        Numeric total_value
        Numeric market_cap_equity
        Numeric market_cap_total
        DateTime created_at
    }
    
    public_transactions {
        BigSerial id PK
        Date date FK "References daily_summaries"
        String ticker
        Numeric open
        Numeric high
        Numeric low
        Numeric close
        Numeric pct_change
        Int trades
        BigInt volume
        Numeric value_mn
        DateTime created_at
    }

    sblock_transactions {
        BigSerial id PK
        Date date FK "References daily_summaries"
        String ticker
        Numeric max_price
        Numeric min_price
        Int trades
        BigInt quantity
        Numeric value_mn
        DateTime created_at
    }

    csv_files {
        BigSerial id PK
        Date date UK
        String file_name
        String storage_path
        DateTime created_at
    }

    daily_summaries ||--o{ public_transactions : "has public transactions (CASCADE)"
    daily_summaries ||--o{ sblock_transactions : "has block transactions (CASCADE)"
```

---

### 3. Relationship & Integrity Constraints

| Relation | Foreign Key | Cardinality | Cascading Rule | Description |
| :--- | :--- | :--- | :--- | :--- |
| **daily_summaries → public_transactions** | `public_transactions.date` | `1 : N` | `ON DELETE CASCADE` | Deleting a summary for a specific date clears all associated public transaction logs instantly. |
| **daily_summaries → sblock_transactions** | `sblock_transactions.date` | `1 : N` | `ON DELETE CASCADE` | Deleting a summary for a specific date clears all block transaction records instantly. |
| **csv_files** | None | `1 : 0..1` | N/A | Tracks generated file names and Supabase storage paths mapped per unique trading date. |
