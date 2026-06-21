import React from "react";
import {
  Sync as SyncIcon,
  Storage as StorageIcon,
  CloudUpload as CloudUploadIcon,
  Search as SearchIcon,
  Terminal as TerminalIcon,
  Language as LanguageIcon,
  Dns as DnsIcon,
  Build as BuildIcon,
  SettingsSuggest as SettingsSuggestIcon,
  TrendingUp as TrendingUpIcon,
  TableChart as TableChartIcon,
} from "@mui/icons-material";

export const features = [
  { icon: <SyncIcon />, title: "Daily Auto Scraping", shortTitle: "Scraping", desc: "Automated daily scripts scrape End-of-Day (EOD) market statistics from Dhaka Stock Exchange (DSE) SME boards." },
  { icon: <StorageIcon />, title: "Supabase Database", shortTitle: "Database", desc: "Structured relational tables in Supabase PostgreSQL storing detailed transaction outputs and daily indicators." },
  { icon: <CloudUploadIcon />, title: "CSV Archival Storage", shortTitle: "Archival", desc: "Direct file upload streams that package historical daily statistics into CSV reports hosted on Cloud S3 buckets." },
  { icon: <SearchIcon />, title: "Interactive Ticker Tables", shortTitle: "Ticker Sorting", desc: "Interactive date calendars, ticker search filters, and multi-column sorting (by price, volume, change %, trades) to query records." },
  { icon: <TerminalIcon />, title: "Idempotent Syncs", shortTitle: "Idempotency", desc: "Engineered cascading database deletion guards to prevent duplicate listings on repeated scrapes." },
  { icon: <LanguageIcon />, title: "Premium Visual Portal", shortTitle: "Portal", desc: "Modern Next.js interface styled with custom CSS variables, glassmorphic layout assets, and HSL palettes." },
];

export const systemNodes = {
  client: {
    title: "Client Portal (Next.js / React)",
    shortTitle: "Frontend",
    icon: <LanguageIcon />,
    description: "Responsive Next.js React frontend utilizing pure Vanilla CSS. Displays daily market boards, sector performances, block trades, and calendars to filter, sort, and query records.",
    role: "Fetches structured summaries and downloads CSV spreadsheets through public storage endpoints.",
  },
  api: {
    title: "Express Backend API (Node.js)",
    shortTitle: "Backend",
    icon: <SettingsSuggestIcon />,
    description: "Node.js Express API server coordinating client queries, automated scrape requests, CSV format builders, and direct S3 uploads.",
    role: "Validates incoming webhook signatures and manages transactions with Supabase services.",
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
    description: "Cron-job triggered scraper fetching daily statistics from DSE SME boards.",
    steps: [
      { label: "Cron Ping", text: "cron-job.org fires a daily POST webhook call to backend endpoint with secret header authentication." },
      { label: "HTML Fetch", text: "Scraper script fetches the live stats HTML markup page from sme.dsebd.org." },
      { label: "Parse text data", text: "Utilizes node-html-parser to crawl lines, identifying dates, summaries, listings, and block trade details." },
      { label: "Clean Records", text: "Runs cascading deletions on Supabase PostgreSQL for the date (ON DELETE CASCADE) to guarantee idempotency." },
      { label: "Insert Records", type: "SQL", text: "Inserts cleaned summary records and batch saves public/block transaction data rows." },
    ],
    payload: {
      action: "scrape_cron_trigger",
      x_cron_secret: "dse_sme_secure_secret_token",
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
    title: "Frontend Query & Search Flow",
    shortTitle: "Client Query",
    icon: <SearchIcon />,
    description: "Responsive queries pulling historical stocks or fetching downloadable report listings.",
    steps: [
      { label: "Select Date", text: "User chooses a target trading date via calendar widgets on the Next.js frontend." },
      { label: "GET Request", text: "Sends an API lookup call request: GET /api/market-data?date=YYYY-MM-DD." },
      { label: "SQL Fetch", text: "Express API queries PostgreSQL database tables for summaries and transactions matching the date." },
      { label: "Dashboard Render", text: "Next.js renders dynamic card statistics, populates public/block spreadsheets with interactive column-sorting filters, and displays CSV downloads." },
    ],
    payload: {
      clientAction: "fetch_daily_stats",
      queryDate: "2026-06-20",
    },
    responsePayload: {
      status: "SUCCESS",
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
  { type: "desktop", src: "/screenshots/projects/desops/do (2).png", title: "SME Analytics Dashboard" },
  { type: "desktop", src: "/screenshots/projects/desops/do (1).png", title: "CSV Export & Historical Data Portal" },
];
