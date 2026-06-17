import React from "react";
import {
  AltRoute as AltRouteIcon,
  Source as SourceIcon,
  TableRows as TableRowsIcon,
  Translate as TranslateIcon,
  Rule as RuleIcon,
  Terminal as TerminalIcon,
  Speed as SpeedIcon,
  Fingerprint as FingerprintIcon,
  CreditCard as PaymentIcon,
  CloudUpload as CloudIcon,
  Storage as DbIcon,
  Settings as ProcessingIcon,
  Psychology as AiIcon,
  Key as KeyIcon,
  Lock as LockIcon,
} from "@mui/icons-material";

export const features = [
  { icon: <FingerprintIcon />, title: "BankID & OTP Auth", shortTitle: "Auth", desc: "Dual authentication path utilizing Swedish BankID and OTP fallback loops." },
  { icon: <RuleIcon />, title: "Trulioo KYC Compliance", shortTitle: "KYC", desc: "Automated identity verification flows with retry buffers and state machine fallbacks." },
  { icon: <PaymentIcon />, title: "Stripe Subscription Gateway", shortTitle: "Stripe", desc: "Monetized payment pipelines managing tiers, failures, and cancellations via webhooks." },
  { icon: <CloudIcon />, title: "AWS Lambda Ingestion", shortTitle: "Serverless", desc: "High-throughput chunked S&P Capital IQ financial data fetching modules written in Node.js." },
  { icon: <SpeedIcon />, title: "GraphQL Performance", shortTitle: "GraphQL", desc: "Express & GraphQL servers processing 200MB+ JSON payloads to output YoY/QoQ margins." },
  { icon: <KeyIcon />, title: "HMAC Partner Gateway", shortTitle: "Partner API", desc: "Secure external API endpoints authenticated via payload-based HMAC signatures and JWTs." },
  { icon: <AiIcon />, title: "Generative AI Batching", shortTitle: "OpenAI Flow", desc: "Scheduled OpenAI GPT-3.5 and DALL-E triggers converting descriptions to hashtags and compressed media." },
];

export const systemNodes = {
  auth: {
    title: "Authentication (BankID & OTP)",
    shortTitle: "Auth",
    icon: <FingerprintIcon />,
    description: "Authenticates users via BankID integration (Nordic digital ID) or fallback SMS/email OTP, issuing JWT access & refresh tokens.",
    role: "Secures entry points and establishes initial session states.",
  },
  kyc: {
    title: "Trulioo KYC Verification",
    shortTitle: "Trulioo KYC",
    icon: <RuleIcon />,
    description: "Verifies user identity attributes against Trulioo KYC databases, handling compliance blocks and retry queues.",
    role: "Ensures compliance and unlocks premium navigation sections.",
  },
  payments: {
    title: "Stripe Subscriptions",
    shortTitle: "Stripe Billing",
    icon: <PaymentIcon />,
    description: "Manages subscription states (renewals, cancels) through Stripe Checkout and secure webhook endpoints.",
    role: "Handles recurring monetizations and updates billing states in the DB.",
  },
  sp_pipeline: {
    title: "S&P Capital IQ Ingestion",
    shortTitle: "S&P Ingestion",
    icon: <CloudIcon />,
    description: "Node.js Lambda workers fetching financial metrics (mnemonics, event calendars) chunked by company ISINs to prevent rate blocks.",
    role: "Orchestrates high-volume serverless background data aggregation.",
  },
  pinpoint_estimates: {
    title: "Pinpoint Sentiment Tracker",
    shortTitle: "Pinpoint Estimates",
    icon: <AltRouteIcon />,
    description: "Tracks quarterly estimates, user stock performance predictions, and historical accuracy scores.",
    role: "Computes user crowd-predictions against actual quarterly earnings.",
  },
  inderes_media: {
    title: "Inderes Media Pipeline",
    shortTitle: "Inderes Media",
    icon: <TableRowsIcon />,
    description: "Ingests reports, videos, and podcasts; automates transcriptions, text summaries, thumbnail extractions, and search indexing.",
    role: "Builds searchable equity research multimedia libraries.",
  },
  schema_mapping: {
    title: "Schema Mapping & Storage",
    shortTitle: "Schema Mapping",
    icon: <DbIcon />,
    description: "Deserializes incoming partner parameters, saving transactional records to MySQL (Laravel) and DynamoDB (Lambda & Node).",
    role: "Maintains relational schema integrity and high-speed retrieval caches.",
  },
  data_processing: {
    title: "Express & GraphQL Engine",
    shortTitle: "Calculations",
    icon: <ProcessingIcon />,
    description: "Calculates LTM metrics, YoY margin expansion, and QoQ ratios across hundreds of companies, serving frontend cards.",
    role: "Processes raw DB rows into digestible charts and GraphQL response packages.",
  },
  partner_api: {
    title: "HMAC Partner API Gateway",
    shortTitle: "HMAC Gateway",
    icon: <LockIcon />,
    description: "Validates payload-derived HMAC signatures and JWTs, applying contract scopes and Redis sliding-window rate limit counters.",
    role: "Exposes secure, contract-tailored data APIs to institutional partners.",
  },
  openai_generator: {
    title: "AI Enrichment Pipeline",
    shortTitle: "AI Enrichment",
    icon: <AiIcon />,
    description: "Converts text to hashtags via GPT-3.5, triggers DALL-E, compresses media via Intervention Image, and uploads to S3.",
    role: "Enriches company profiles automatically with visual assets and social tags.",
  },
};

export const workflows = {
  sp_pipeline: {
    title: "S&P Financial Ingestion Pipeline",
    shortTitle: "S&P Sync",
    icon: <CloudIcon />,
    description: "Schedules periodic chunked fetching of large financial datasets from S&P Capital IQ.",
    steps: [
      { label: "ISIN List Load", text: "Retrieves active ISIN listings of European SME companies from the MySQL database." },
      { label: "Chunked AWS Request", text: "Triggers Node.js AWS Lambdas in chunks to query S&P Mnemonics (financials, shareholders, event calendars)." },
      { label: "Queue Storage", text: "Queue workers process Lambda responses, mapping raw parameters to uniform schema mappings." },
      { label: "GraphQL Compilation", text: "The Express/GraphQL server aggregates records to compute LTM figures, YoY margin increments, and QoQ percentages." }
    ],
    payload: {
      isinCount: 2450,
      chunkSize: 100,
      lambdaTriggers: "Node Cron (Weekly)"
    },
    responsePayload: {
      recordsIngested: 49000,
      dbSyncStatus: "SUCCESS",
      graphqlCacheRefreshed: true
    }
  },
  partner_gateway: {
    title: "Partner API Gateway Authentication",
    shortTitle: "API Gate",
    icon: <LockIcon />,
    description: "Enforces signature checks, token validity, and rate constraints for external partner integrations.",
    steps: [
      { label: "HMAC Checking", text: "Laravel validation layer verifies HTTP request body hashes against the partner's shared secret key." },
      { label: "JWT Token Validation", text: "Validates access/refresh JWT tokens inside authorization headers to guarantee active sessions." },
      { label: "Contract Authorization", text: "Filters accessible datasets based on client contract constraints (e.g. basic vs. premium collection data permissions)." },
      { label: "Sliding-Window Limits", text: "Increments Redis counters to enforce partner rate limits, returning 429 if the request threshold is exceeded." }
    ],
    payload: {
      authType: "HMAC + JWT",
      rateLimitWindow: "60s",
      maxRequests: 500
    },
    responsePayload: {
      authorizedScope: ["financials_sme", "predictions_pinpoint"],
      redisRateLimitRemaining: 499,
      status: "AUTHORIZED"
    }
  },
  openai_batch: {
    title: "AI Profile Enrichment Batch",
    shortTitle: "AI Enrichment",
    icon: <AiIcon />,
    description: "Periodically curates tag recommendations and creates optimized, compressed company banner backdrops.",
    steps: [
      { label: "Prompt Formatting", text: "Collects new company profiles, composing structured prompts matching their business categories." },
      { label: "GPT-3.5 Tagging", text: "Queries OpenAI GPT-3.5 to output aligned social hashtags and detailed DALL-E image concepts." },
      { label: "DALL-E Generation", text: "Calls DALL-E model APIs, downloading raw high-definition illustrations based on GPT prompts." },
      { label: "Intervention Compression", text: "Applies Intervention Image in PHP to crop, compress (to WebP), and watermark the media before S3 uploads." }
    ],
    payload: {
      batchSize: 25,
      targetFormat: "webp",
      compressionQuality: 80
    },
    responsePayload: {
      imagesUploadedS3: 25,
      hashtagsSavedToDb: 108,
      status: "BATCH_COMPLETED"
    }
  }
};

export const conceptualSchemas = {
  "S&P Financials": {
    description: "High-level database and GraphQL schema representation of parsed S&P financial lists.",
    sections: [
      { name: "SME Identifiers", fields: ["isin (Primary Key)", "ticker", "company_name", "exchange_code"] },
      { name: "Financial Mnemonics", fields: ["total_revenue", "gross_profit", "ebitda", "net_income", "cash_from_operations"] },
      { name: "LTM & YoY Metrics", fields: ["ltm_revenue", "yoy_revenue_growth", "yoy_margin_expansion", "qoq_margin_progression"] },
      { name: "Event Calendar", fields: ["earnings_report_date (YYYY-MM-DD)", "agm_date", "ex_dividend_date"] },
      { name: "Shareholder Structure", fields: ["isin (Foreign Key)", "holder_name", "shares_held", "ownership_pct", "report_date"] },
      { name: "Company Ratios", fields: ["isin (Foreign Key)", "pe_ratio", "ev_ebitda", "net_profit_margin", "debt_equity_ratio"] },
      { name: "Exchange Metadata", fields: ["exchange_code (Primary Key)", "exchange_name", "country_iso", "timezone_offset"] }
    ]
  },
  "Pinpoint Estimates": {
    description: "Database schema organizing user-sourced estimates vs institutional metrics.",
    sections: [
      { name: "Estimate Metadata", fields: ["isin", "estimate_quarter (Q1-Q4)", "analyst_consensus_eps", "analyst_consensus_revenue"] },
      { name: "Crowd Expectations", fields: ["user_prediction_eps", "user_prediction_revenue", "user_prediction_count"] },
      { name: "Historical Performance", fields: ["actual_reported_eps", "actual_reported_revenue", "accuracy_score (0-100)"] },
      { name: "Analyst Targets", fields: ["isin (Foreign Key)", "target_price", "consensus_rating (BUY/HOLD/SELL)", "broker_count"] },
      { name: "Prediction Audits", fields: ["audit_id (Primary Key)", "isin (Foreign Key)", "user_hash_ip", "vote_timestamp", "quarter_ref"] },
      { name: "Accuracy Rank", fields: ["rank_id (Primary Key)", "user_hash_ip", "total_votes_cast", "average_deviation_pct"] },
      { name: "Stock Price History", fields: ["isin (Foreign Key)", "price_date", "close_price", "open_price", "daily_volume"] }
    ]
  },
  "Inderes Media": {
    description: "Indices mapping multimedia files and processing states.",
    sections: [
      { name: "Media Info", fields: ["media_id (UUID)", "company_id", "title", "media_type (VIDEO/PODCAST/REPORT)"] },
      { name: "Transcription & Summary", fields: ["transcript_raw_text", "summary_paragraphs", "ai_generated_keywords"] },
      { name: "Assets", fields: ["thumbnail_url_s3", "media_source_url", "is_indexed_for_search"] },
      { name: "AI Transcribing Jobs", fields: ["job_id (Primary Key)", "media_id (Foreign Key)", "whisper_model_version", "job_status", "completed_at"] },
      { name: "Search Index", fields: ["index_id (Primary Key)", "media_id (Foreign Key)", "tokenized_lexeme", "term_frequency_score"] },
      { name: "Media Feedback", fields: ["feedback_id (Primary Key)", "media_id (Foreign Key)", "total_views", "average_watch_time", "like_count"] },
      { name: "Speaker Mapping", fields: ["speaker_id (Primary Key)", "media_id (Foreign Key)", "speaker_name", "speaker_role", "time_stamp_segment"] }
    ]
  },
  "Partner API Auth": {
    description: "Secured structures verifying external partner contract requests.",
    sections: [
      { name: "Credential Verification", fields: ["partner_id", "hmac_secret_key", "jwt_signing_key", "allowed_ip_whitelist"] },
      { name: "Permission Scopes", fields: ["has_sp_access (boolean)", "has_pinpoint_access (boolean)", "has_inderes_access (boolean)"] },
      { name: "Usage Log", fields: ["timestamp (ISO)", "api_endpoint", "request_bytes", "response_time_ms", "rate_limit_hits_today"] },
      { name: "Sliding Rate Limits", fields: ["partner_id (Foreign Key)", "requests_last_hour", "hourly_cap", "daily_cap", "window_expiry"] },
      { name: "Contract Billing Details", fields: ["contract_id (Primary Key)", "partner_id (Foreign Key)", "billing_tier_name", "price_per_thousand_reqs"] },
      { name: "Authorized IP Whitelist", fields: ["ip_id (Primary Key)", "partner_id (Foreign Key)", "ip_address", "description_label"] },
      { name: "Token Rotation Logs", fields: ["rotation_id (Primary Key)", "partner_id (Foreign Key)", "rotated_token_hash", "rotated_at", "status_state"] }
    ]
  },
  "Generative AI Batching": {
    description: "Database configurations managing generative AI profiles pipelines, prompt versions, hashtag classifications, image processing queues, and S3 assets.",
    sections: [
      { name: "AI Batch Run", fields: ["batch_id (Primary Key)", "started_at", "finished_at", "status_code", "records_processed_count"] },
      { name: "Company Profiles Ingested", fields: ["isin (Foreign Key)", "batch_id (Foreign Key)", "company_name", "ingestion_status"] },
      { name: "Curated Prompt Configuration", fields: ["prompt_id (Primary Key)", "version_tag", "system_prompt_text", "temperature_setting", "is_active"] },
      { name: "GPT Hashtag Metadata", fields: ["hashtag_id (Primary Key)", "isin (Foreign Key)", "batch_id (Foreign Key)", "generated_tag_text", "confidence_score"] },
      { name: "DALL-E Image Jobs", fields: ["job_id (Primary Key)", "isin (Foreign Key)", "prompt_id (Foreign Key)", "dalle_prompt_text", "raw_url_dalle", "job_status"] },
      { name: "Image Compression Settings", fields: ["setting_id (Primary Key)", "target_width", "target_height", "compression_quality", "watermark_path"] },
      { name: "S3 Upload Metadata", fields: ["upload_id (Primary Key)", "isin (Foreign Key)", "s3_bucket_name", "s3_key_path", "asset_url_link", "file_size_bytes"] }
    ]
  }
};
