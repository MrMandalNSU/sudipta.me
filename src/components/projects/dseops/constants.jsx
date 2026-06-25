import React from "react";
import {
  Sync as SyncIcon,
  Storage as StorageIcon,
  CloudUpload as CloudUploadIcon,
  Search as SearchIcon,
  Terminal as TerminalIcon,
  Language as LanguageIcon,
  Dns as DnsIcon,
  SettingsSuggest as SettingsSuggestIcon,
  TableChart as TableChartIcon,
  Cached as CachedIcon,
  Security as SecurityIcon,
  QueryStats as QueryStatsIcon,
} from "@mui/icons-material";

export const features = [
  { icon: <SyncIcon />, title: "Daily Auto Scraping", shortTitle: "Scraping", desc: "Automated daily scripts scrape End-of-Day (EOD) market statistics from Dhaka Stock Exchange (DSE) SME boards." },
  { icon: <StorageIcon />, title: "Supabase Database", shortTitle: "Database", desc: "Structured relational tables in Supabase PostgreSQL storing detailed transaction outputs and daily indicators." },
  { icon: <CloudUploadIcon />, title: "CSV Archival Storage", shortTitle: "Archival", desc: "Direct file upload streams that package historical daily statistics into CSV reports hosted on Cloud S3 buckets." },
  { icon: <QueryStatsIcon />, title: "Ticker History Analytics", shortTitle: "Ticker History", desc: "Ticker drilldowns combine public and block history, date ranges, range analytics, period returns, and total value cards for individual instruments." },
  { icon: <TableChartIcon />, title: "Interactive Chart Inspection", shortTitle: "Chart Points", desc: "Multi-metric Recharts views let users overlap public and block series, hover exact date points, and inspect selected-date values." },
  { icon: <CachedIcon />, title: "NodeCache Read Cache", shortTitle: "NodeCache", desc: "In-process NodeCache stores JSON read responses with terminal hit/miss/set logs and flushes after successful cron scrapes." },
  { icon: <SecurityIcon />, title: "Server-Side API Proxy", shortTitle: "API Proxy", desc: "The browser talks to same-origin Next.js API routes while backend URLs and cron secrets remain server-only." },
  { icon: <TerminalIcon />, title: "Idempotent Syncs", shortTitle: "Idempotency", desc: "Engineered cascading database deletion guards and scrape-success cache flushes to prevent stale or duplicate listings." },
];

export const systemNodes = {
  client: {
    title: "Client Portal (Next.js / React)",
    shortTitle: "Frontend",
    icon: <LanguageIcon />,
    description: "Responsive Next.js React frontend using pure Vanilla CSS. Displays daily boards, ticker history pages, multi-metric charts, selected-date inspection, and CSV archives.",
    role: "Calls same-origin Next API routes instead of exposing backend origins or cron secrets to browser JavaScript.",
  },
  next_proxy: {
    title: "Next.js API Proxy Layer",
    shortTitle: "API Proxy",
    icon: <SecurityIcon />,
    description: "Server-side Next route handlers forward safe public GET requests to the backend while blocking scrape mutation routes from the public UI.",
    role: "Keeps BACKEND_API_URL server-only and centralizes browser-to-backend access behind same-origin /api routes.",
  },
  api: {
    title: "Express Backend API (Node.js)",
    shortTitle: "Backend",
    icon: <SettingsSuggestIcon />,
    description: "Node.js Express API server coordinating cached read queries, automated scrape requests, CSV format builders, and direct S3 uploads.",
    role: "Serves JSON endpoints, validates cron webhook signatures, and manages transactions with Supabase services.",
  },
  nodecache: {
    title: "NodeCache Runtime Cache",
    shortTitle: "NodeCache",
    icon: <CachedIcon />,
    description: "In-process cache layer for JSON read responses such as market data, ticker history, and CSV lists. Logs cache hit, miss, set, and flush events in the backend terminal.",
    role: "Returns hot API responses quickly, falls back to Supabase on misses, and flushes after successful cron-triggered scrapes.",
  },
  scraper: {
    title: "Web Scraper & HTML Parser",
    shortTitle: "Parser",
    icon: <TerminalIcon />,
    description: "Parser script using node-html-parser. Processes target text structures and parses HTML columns into JSON objects safely.",
    role: "Scrapes DSE SME market statistics pages and maps layout entries into rows.",
  },
  dse: {
    title: "sme.dsebd.org Site",
    shortTitle: "DSE Website",
    icon: <DnsIcon />,
    description: "The official Dhaka Stock Exchange SME statistics page. Hosts raw text columns containing today's transaction data.",
    role: "Target webpage scanned by scraper daily at market close.",
  },
  supabase_db: {
    title: "Supabase PostgreSQL Database",
    shortTitle: "Postgres",
    icon: <StorageIcon />,
    description: "Relational PostgreSQL database table structures storing transaction histories, scrip values, and file indexes.",
    role: "Persistent cache store built with ON DELETE CASCADE constraints.",
  },
  supabase_storage: {
    title: "Supabase Storage Bucket (S3)",
    shortTitle: "S3 Storage",
    icon: <CloudUploadIcon />,
    description: "AWS S3-compatible cloud storage bucket used to save daily structured financial backups.",
    role: "Serves public download URIs for compiled trading dates.",
  },
  cron: {
    title: "Daily Cron Trigger (cron-job.org)",
    shortTitle: "Cron Scheduler",
    icon: <SyncIcon />,
    description: "Automated schedule worker that pings backend routes at the end of each trading day with authorization keys.",
    role: "Starts the automated scraping pipeline.",
  },
};

export const schemaTables = {
  daily_summaries: {
    description: "Overall SME market statistics recorded for each trading date.",
    fields: [
      { name: "date", type: "Date", isKey: "PK" },
      { name: "spublic_advanced", type: "Int" },
      { name: "spublic_declined", type: "Int" },
      { name: "spublic_unchanged", type: "Int" },
      { name: "spublic_total", type: "Int" },
      { name: "total_trades", type: "Int" },
      { name: "total_volume", type: "BigInt" },
      { name: "total_value", type: "Numeric" },
      { name: "market_cap_equity", type: "Numeric" },
      { name: "market_cap_total", type: "Numeric" },
      { name: "created_at", type: "DateTime" },
    ],
    relations: ["public_transactions", "sblock_transactions"],
  },
  public_transactions: {
    description: "Spublic board individual listing records showing open, close, and volume details.",
    fields: [
      { name: "id", type: "BigSerial", isKey: "PK" },
      { name: "date", type: "Date", isKey: "FK" },
      { name: "ticker", type: "String" },
      { name: "open", type: "Numeric" },
      { name: "high", type: "Numeric" },
      { name: "low", type: "Numeric" },
      { name: "close", type: "Numeric" },
      { name: "pct_change", type: "Numeric" },
      { name: "trades", type: "Int" },
      { name: "volume", type: "BigInt" },
      { name: "value_mn", type: "Numeric" },
      { name: "created_at", type: "DateTime" },
    ],
    relations: ["daily_summaries"],
  },
  sblock_transactions: {
    description: "Sblock board block trade listing details (Max/Min price, quantities, values).",
    fields: [
      { name: "id", type: "BigSerial", isKey: "PK" },
      { name: "date", type: "Date", isKey: "FK" },
      { name: "ticker", type: "String" },
      { name: "max_price", type: "Numeric" },
      { name: "min_price", type: "Numeric" },
      { name: "trades", type: "Int" },
      { name: "quantity", type: "BigInt" },
      { name: "value_mn", type: "Numeric" },
      { name: "created_at", type: "DateTime" },
    ],
    relations: ["daily_summaries"],
  },
  csv_files: {
    description: "Metadata mappings connecting dates to hosted CSV backups in Supabase Storage.",
    fields: [
      { name: "id", type: "BigSerial", isKey: "PK" },
      { name: "date", type: "Date", isKey: "Unique" },
      { name: "file_name", type: "String" },
      { name: "storage_path", type: "String" },
      { name: "created_at", type: "DateTime" },
    ],
    relations: [],
  },
};

export const workflows = {
  scrape: {
    title: "Daily Scraping Pipeline",
    shortTitle: "Scraping",
    icon: <SyncIcon />,
    description: "Cron-job triggered scraper fetching daily statistics from DSE SME boards, writing durable data, and refreshing runtime cache state.",
    steps: [
      { label: "Cron Ping", text: "cron-job.org fires a daily POST webhook call to backend endpoint with secret header authentication." },
      { label: "HTML Fetch", text: "Scraper script fetches the live stats HTML markup page from sme.dsebd.org." },
      { label: "Parse text data", text: "Utilizes node-html-parser to crawl lines, identifying dates, summaries, listings, and block trade details." },
      { label: "Clean Records", text: "Runs cascading deletions on Supabase PostgreSQL for the date (ON DELETE CASCADE) to guarantee idempotency." },
      { label: "Insert Records", type: "SQL", text: "Inserts cleaned summary records and batch saves public/block transaction data rows." },
      { label: "Flush Runtime Cache", text: "After DB and CSV writes succeed, the backend flushes NodeCache so the next read repopulates fresh market data." },
    ],
    payload: {
      action: "scrape_cron_trigger",
      x_cron_secret: "<server_only_secret>",
      dateRange: "TODAY",
    },
    responsePayload: {
      status: "SUCCESS",
      date: "2026-06-20",
      recordsScraped: {
        summary: 1,
        publicTransactions: 14,
        blockTransactions: 4,
      },
      cache: "FLUSHED",
    },
  },
  download: {
    title: "CSV Archival Generation Flow",
    shortTitle: "CSV Archival",
    icon: <CloudUploadIcon />,
    description: "Direct streams creating and uploading structured CSV report files to Supabase S3.",
    steps: [
      { label: "Compile JSON", text: "The backend server formats parsed database entries into raw structured stock data objects." },
      { label: "CSV Compile", text: "Builds a flat text stream containing standard tickers, open/close values, trades, volume, and values in millions." },
      { label: "S3 direct upload", text: "Pipes the text stream using the AWS S3 client SDK to upload the file to Supabase Bucket 'dse-ops/date.csv'." },
      { label: "Meta registration", text: "Stores the resulting storage URI and file metadata into the csv_files schema table for lookup references." },
    ],
    payload: {
      action: "generate_csv_report",
      date: "2026-06-20",
      bucketName: "dse-ops",
    },
    responsePayload: {
      status: "UPLOADED",
      fileName: "2026-06-20-sme-data.csv",
      path: "dse-ops/2026-06-20-sme-data.csv",
      downloadUri: "https://dse.sudipta.xyz/storage/v1/object/public/dse-ops/2026-06-20-sme-data.csv",
    },
  },
  query: {
    title: "Secure Query & Analytics Flow",
    shortTitle: "Client Query",
    icon: <SearchIcon />,
    description: "Same-origin frontend queries pulling dashboard, ticker-history, and CSV list data through the Next proxy and NodeCache-backed backend.",
    steps: [
      { label: "Select Date", text: "User chooses a target trading date via calendar widgets on the Next.js frontend." },
      { label: "Same-Origin Request", text: "Browser sends GET /api/market-data, /api/tickers/:ticker/history, or /api/csv-list to the Next.js proxy." },
      { label: "Server Proxy", text: "Next route handlers forward safe GET requests to the private backend URL without exposing backend env vars." },
      { label: "Cache Lookup", text: "Express checks NodeCache and logs hit or miss. Cache hits return immediately." },
      { label: "SQL Fallback", text: "On cache miss, Express queries Supabase PostgreSQL, formats the response, and sets the cache key." },
      { label: "Analytics Render", text: "The UI renders cards, sortable tables, ticker history charts, selected-date metrics, and CSV downloads." },
    ],
    payload: {
      clientAction: "fetch_daily_stats",
      route: "/api/tickers/ACHIASF/history",
    },
    responsePayload: {
      status: "SUCCESS",
      cache: "HIT_OR_SET",
      dataExists: true,
      data: {
        summary: { date: "2026-06-20", total_trades: 423, total_volume: 890123 },
        publicTransactionsCount: 14,
        blockTransactionsCount: 4,
      },
    },
  },
};

export const snapshotsList = [
  { type: "desktop", src: "/screenshots/projects/desops/do (2).webp", title: "SME Analytics Dashboard" },
  { type: "desktop", src: "/screenshots/projects/desops/do (1).webp", title: "CSV Export & Historical Data Portal" },
  { type: "desktop", src: "/screenshots/projects/desops/do (3).webp", title: "Ticker History Analytics" },
  { type: "desktop", src: "/screenshots/projects/desops/do (4).webp", title: "Multi-Metric Chart Inspection" },
];
