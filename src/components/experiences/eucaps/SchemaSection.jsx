import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";
import SchemaIcon from "@mui/icons-material/Schema";

const schemasData = {
  "S&P Financials": {
    description: "Database configurations mapping institutional S&P mnemonic financial details, ratios, shareholder percentages, and calendar dates.",
    tables: [
      { title: "Exchange Metadata", fields: ["exchange_code (PK)", "exchange_name", "country_iso", "timezone_offset"], x: 30, y: 10, w: 180 },
      { title: "SME Identifiers", fields: ["isin (PK)", "ticker", "company_name", "exchange_code (FK)"], x: 30, y: 160, w: 180 },
      { title: "Financial Mnemonics", fields: ["isin (FK)", "total_revenue", "gross_profit", "ebitda", "net_income", "cash_from_ops"], x: 250, y: 10, w: 180 },
      { title: "Event Calendar", fields: ["isin (FK)", "earnings_report_date", "agm_date", "ex_dividend_date"], x: 250, y: 195, w: 180 },
      { title: "LTM & YoY Metrics", fields: ["isin (FK)", "ltm_revenue", "yoy_revenue_growth", "yoy_margin_expansion", "qoq_margin_prog"], x: 470, y: 10, w: 180 },
      { title: "Shareholder Structure", fields: ["isin (FK)", "holder_name", "shares_held", "ownership_pct", "report_date"], x: 470, y: 175, w: 180 },
      { title: "Company Ratios", fields: ["isin (FK)", "pe_ratio", "ev_ebitda", "net_profit_margin", "debt_equity_ratio"], x: 690, y: 10, w: 180 }
    ],
    connections: [
      { path: "M 120 132 V 160" }, // Exchange Metadata -> SME Identifiers
      { path: "M 210 205 H 230 V 70 H 250" }, // SME Identifiers -> Financial Mnemonics
      { path: "M 210 205 H 230 V 230 H 250" }, // SME Identifiers -> Event Calendar
      { path: "M 210 205 H 230 V 175 H 450 V 235 H 470" }, // SME Identifiers -> Shareholder Structure (routed through horizontal gap)
      { path: "M 430 70 H 470" }, // Financial Mnemonics -> LTM & YoY
      { path: "M 650 70 H 690" }, // LTM & YoY -> Company Ratios
      { path: "M 650 235 H 670 V 70 H 690" } // Shareholder Structure -> Company Ratios
    ]
  },
  "Pinpoint Estimates": {
    description: "Database tables storing crowd forecasts, consensus eps metrics, prediction logs, stock history, and accuracy rankings.",
    tables: [
      { title: "Prediction Audits", fields: ["audit_id (PK)", "isin (FK)", "user_hash_ip", "vote_timestamp", "quarter_ref"], x: 30, y: 10, w: 180 },
      { title: "Estimate Metadata", fields: ["isin (PK)", "estimate_quarter", "consensus_eps", "consensus_revenue"], x: 30, y: 180, w: 180 },
      { title: "Crowd Expectations", fields: ["isin (FK)", "user_prediction_eps", "user_prediction_revenue", "user_prediction_count"], x: 250, y: 10, w: 180 },
      { title: "Analyst Targets", fields: ["isin (FK)", "target_price", "consensus_rating (BUY/HOLD/SELL)", "broker_count"], x: 250, y: 180, w: 180 },
      { title: "Historical Performance", fields: ["isin (FK)", "actual_reported_eps", "actual_reported_revenue", "accuracy_score"], x: 470, y: 10, w: 180 },
      { title: "Accuracy Rank", fields: ["rank_id (PK)", "user_hash_ip", "total_votes_cast", "average_deviation_pct"], x: 470, y: 180, w: 180 },
      { title: "Stock Price History", fields: ["isin (FK)", "price_date", "close_price", "open_price", "daily_volume"], x: 690, y: 10, w: 180 }
    ],
    connections: [
      { path: "M 120 150 V 180" }, // Prediction Audits -> Estimate Metadata
      { path: "M 210 225 H 230 V 70 H 250" }, // Estimate Metadata -> Crowd Expectations
      { path: "M 210 225 H 250" }, // Estimate Metadata -> Analyst Targets
      { path: "M 430 70 H 470" }, // Crowd Expectations -> Historical Performance
      { path: "M 430 225 H 450 V 70 H 470" }, // Analyst Targets -> Historical Performance
      { path: "M 560 132 V 180" }, // Historical Performance -> Accuracy Rank
      { path: "M 650 70 H 690" } // Historical Performance -> Stock Price History
    ]
  },
  "Inderes Media": {
    description: "Search indices indexing Nordic listed company video presentations, reports, transcripts, summaries, speaker maps, and transcribing jobs.",
    tables: [
      { title: "AI Transcribing Jobs", fields: ["job_id (PK)", "media_id (FK)", "whisper_model_version", "job_status", "completed_at"], x: 30, y: 10, w: 180 },
      { title: "Media Info", fields: ["media_id (PK)", "company_id", "title", "media_type"], x: 30, y: 180, w: 180 },
      { title: "Transcription & Summary", fields: ["media_id (FK)", "transcript_raw_text", "summary_paragraphs", "ai_keywords"], x: 250, y: 10, w: 180 },
      { title: "Assets", fields: ["media_id (FK)", "thumbnail_url_s3", "media_source_url", "is_indexed"], x: 250, y: 180, w: 180 },
      { title: "Search Index", fields: ["index_id (PK)", "media_id (FK)", "tokenized_lexeme", "term_frequency_score"], x: 470, y: 10, w: 180 },
      { title: "Media Feedback", fields: ["feedback_id (PK)", "media_id (FK)", "total_views", "average_watch_time", "like_count"], x: 470, y: 180, w: 180 },
      { title: "Speaker Mapping", fields: ["speaker_id (PK)", "media_id (FK)", "speaker_name", "speaker_role", "time_stamp_segment"], x: 690, y: 10, w: 180 }
    ],
    connections: [
      { path: "M 120 150 V 180" }, // AI Transcribing Jobs -> Media Info
      { path: "M 210 225 H 230 V 70 H 250" }, // Media Info -> Transcription & Summary
      { path: "M 210 225 H 250" }, // Media Info -> Assets
      { path: "M 430 70 H 470" }, // Transcription & Summary -> Search Index
      { path: "M 210 225 H 230 V 165 H 450 V 240 H 470" }, // Media Info -> Media Feedback (routed to avoid Assets card)
      { path: "M 430 225 H 470" }, // Assets -> Media Feedback
      { path: "M 430 70 H 450 V 165 H 670 V 70 H 690" } // Transcription & Summary -> Speaker Mapping (routed to avoid Search Index card)
    ]
  },
  "Partner API Auth": {
    description: "Credential details mapping client HMAC secrets, JWT scopes, sliding rate Redis limits, contract billing details, token rotations, and log whitelist IP coordinates.",
    tables: [
      { title: "Authorized IP Whitelist", fields: ["ip_id (PK)", "partner_id (FK)", "ip_address", "description_label"], x: 30, y: 10, w: 190 },
      { title: "Credential Verification", fields: ["partner_id (PK)", "hmac_secret_key", "jwt_signing_key", "allowed_ip_whitelist"], x: 30, y: 180, w: 190 },
      { title: "Permission Scopes", fields: ["partner_id (FK)", "has_sp_access", "has_pinpoint_access", "has_inderes_access"], x: 260, y: 10, w: 180 },
      { title: "Sliding Rate Limits", fields: ["partner_id (FK)", "requests_last_hour", "hourly_cap", "daily_cap", "window_expiry"], x: 260, y: 180, w: 180 },
      { title: "Usage Log", fields: ["timestamp (ISO)", "api_endpoint", "request_bytes", "response_time_ms", "rate_limit_hits_today"], x: 480, y: 10, w: 180 },
      { title: "Contract Billing Details", fields: ["contract_id (PK)", "partner_id (FK)", "billing_tier_name", "price_per_thousand_reqs"], x: 480, y: 180, w: 190 },
      { title: "Token Rotation Logs", fields: ["rotation_id (PK)", "partner_id (FK)", "rotated_token_hash", "rotated_at", "status_state"], x: 690, y: 10, w: 190 }
    ],
    connections: [
      { path: "M 125 132 V 180" }, // Whitelist -> Credential
      { path: "M 220 225 H 240 V 70 H 260" }, // Credential -> Scopes
      { path: "M 220 225 H 260" }, // Credential -> Limits
      { path: "M 220 225 H 240 V 155 H 460 V 80 H 480" }, // Credential -> Log (routed to avoid Scopes card)
      { path: "M 440 70 H 480" }, // Scopes -> Log
      { path: "M 440 235 H 480" }, // Limits -> Billing Details
      { path: "M 220 225 H 240 V 155 H 675 V 70 H 690" } // Credential -> Token Rotation Logs (routed to avoid Limits and Billing cards)
    ]
  },
  "Generative AI Batching": {
    description: "Database configurations managing generative AI profiles pipelines, prompt versions, hashtag classifications, image processing queues, and S3 assets.",
    tables: [
      { title: "AI Batch Run", fields: ["batch_id (PK)", "started_at", "finished_at", "status_code", "records_processed_count"], x: 30, y: 10, w: 180 },
      { title: "Company Profiles Ingested", fields: ["isin (FK)", "batch_id (FK)", "company_name", "ingestion_status"], x: 30, y: 180, w: 180 },
      { title: "Curated Prompt Configuration", fields: ["prompt_id (PK)", "version_tag", "system_prompt_text", "temperature_setting", "is_active"], x: 250, y: 10, w: 195 },
      { title: "DALL-E Image Jobs", fields: ["job_id (PK)", "isin (FK)", "prompt_id (FK)", "dalle_prompt_text", "raw_url_dalle", "job_status"], x: 250, y: 180, w: 195 },
      { title: "GPT Hashtag Metadata", fields: ["hashtag_id (PK)", "isin (FK)", "batch_id (FK)", "generated_tag_text", "confidence_score"], x: 470, y: 10, w: 180 },
      { title: "Image Compression Settings", fields: ["setting_id (PK)", "target_width", "target_height", "compression_quality", "watermark_path"], x: 470, y: 180, w: 190 },
      { title: "S3 Upload Metadata", fields: ["upload_id (PK)", "isin (FK)", "s3_bucket_name", "s3_key_path", "asset_url_link", "file_size_bytes"], x: 690, y: 10, w: 180 }
    ],
    connections: [
      { path: "M 120 150 V 180" }, // AI Batch Run -> Profiles Ingested
      { path: "M 210 240 H 250" }, // Profiles Ingested -> DALL-E Image Jobs
      { path: "M 347 150 V 180" }, // Prompt Config -> DALL-E Image Jobs
      { path: "M 210 240 H 230 V 165 H 455 V 80 H 470" }, // Profiles Ingested -> GPT Hashtag (routed to avoid Prompt card)
      { path: "M 445 250 H 470" }, // DALL-E Image Jobs -> Compression Settings
      { path: "M 445 250 H 460 V 165 H 670 V 80 H 690" }, // DALL-E Image Jobs -> S3 Metadata (routed to avoid Hashtag card)
      { path: "M 660 250 H 675 V 110 H 690" } // Compression Settings -> S3 Metadata (routed to avoid other paths)
    ]
  }
};

const renderTableCardInSvg = (tbl, theme, primaryColor) => {
  const headerHeight = 32;
  const isLight = theme.palette.mode === "light";
  const cardBg = isLight ? "rgba(255, 255, 255, 0.95)" : "rgba(30, 41, 59, 0.9)";
  const headerBg = isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)";

  const nodeHeight = headerHeight + 8 + tbl.fields.length * 18 + 10;

  return (
    <g key={tbl.title}>
      {/* Card shadow */}
      <rect
        x={tbl.x + 2}
        y={tbl.y + 2}
        width={tbl.w}
        height={nodeHeight}
        rx={8}
        fill="rgba(0,0,0,0.15)"
        style={{ filter: "blur(2px)" }}
      />
      {/* Card border */}
      <rect
        x={tbl.x}
        y={tbl.y}
        width={tbl.w}
        height={nodeHeight}
        rx={8}
        fill={cardBg}
        stroke={primaryColor}
        strokeWidth={1.5}
      />
      {/* Header */}
      <path
        d={`M ${tbl.x} ${tbl.y + 8} A 8 8 0 0 1 ${tbl.x + 8} ${tbl.y} L ${tbl.x + tbl.w - 8} ${tbl.y} A 8 8 0 0 1 ${tbl.x + tbl.w} ${tbl.y + 8} L ${tbl.x + tbl.w} ${tbl.y + headerHeight} L ${tbl.x} ${tbl.y + headerHeight} Z`}
        fill={headerBg}
      />
      <text
        x={tbl.x + 12}
        y={tbl.y + 20}
        fill={theme.palette.text.primary}
        fontWeight="800"
        fontSize="10"
        fontFamily="Inter, sans-serif"
      >
        {tbl.title}
      </text>

      {/* Fields list */}
      {tbl.fields.map((field, idx) => {
        const fieldY = tbl.y + headerHeight + 16 + idx * 18;
        const isPk = field.includes("(PK)");
        const isFk = field.includes("(FK)");

        return (
          <g key={idx}>
            <text
              x={tbl.x + 12}
              y={fieldY}
              fill={isPk ? "#10b981" : isFk ? "#ef4444" : theme.palette.text.secondary}
              fontWeight={isPk || isFk ? "800" : "500"}
              fontSize="8.5"
              fontFamily="monospace"
            >
              {field}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const SchemaSection = ({ theme, activeTable, setActiveTable }) => {
  const currentSchema = schemasData[activeTable] || schemasData["S&P Financials"];
  const primaryColor = theme.palette.mode === "light" ? "#4F46E5" : "#818CF8";

  return (
    <Box id="database" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>Schema Mapping & Data Integrity</SectionHeading>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 800, lineHeight: 1.7 }}>
        All ingested endpoints are mapped to strict schemas validating coordinates, financials, or authentication scopes.
        Below are interactive Entity-Relationship (ER) diagrams illustrating Eucaps' table scopes.
      </Typography>

      {/* Document Tab Switcher */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          borderRadius: 2,
          p: 0.5,
          mb: 3.5,
          gap: { xs: 0.5, sm: 0 },
          backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}`,
          width: { xs: "100%", sm: "fit-content" },
        }}
      >
        {Object.keys(schemasData).map((key) => {
          const isActive = activeTable === key;
          return (
            <Button
              key={key}
              onClick={() => setActiveTable(key)}
              size="small"
              sx={{
                flex: { xs: "1 1 auto", sm: "initial" },
                textTransform: "none",
                fontWeight: isActive ? 800 : 600,
                fontSize: "0.8rem",
                borderRadius: 1.5,
                px: 2.5,
                py: 0.8,
                backgroundColor: isActive ? theme.palette.primary.main : "transparent",
                color: isActive ? "#FFF" : "text.secondary",
                "&:hover": {
                  backgroundColor: isActive ? theme.palette.primary.main : theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
                  transform: "none",
                  boxShadow: "none",
                },
              }}
            >
              {key}
            </Button>
          );
        })}
      </Box>

      {/* ER Diagram Container */}
      <GlassCard sx={{ p: 3.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <SchemaIcon color="primary" sx={{ fontSize: 20 }} />
          {activeTable} ER Diagram Mappings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {currentSchema.description}
        </Typography>

        <DiagramBoard>
          <Box sx={{ overflowX: "auto", width: "100%", "&::-webkit-scrollbar": { height: 6 } }}>
            <Box sx={{ minWidth: 900 }}>
              <svg
                width="100%"
                viewBox="0 0 920 340"
                style={{ display: "block", maxWidth: "100%", height: "auto" }}
              >
                <defs>
                  <marker id="erDot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6">
                    <circle cx="5" cy="5" r="3" fill={primaryColor} />
                  </marker>
                </defs>

                {/* Connection lines representing relationships */}
                {currentSchema.connections.map((conn, idx) => (
                  <path
                    key={idx}
                    d={conn.path}
                    stroke={primaryColor}
                    strokeWidth={1.5}
                    fill="none"
                    markerEnd="url(#erDot)"
                    strokeDasharray="4,4"
                  />
                ))}

                {/* Draw the entity blocks/tables */}
                {currentSchema.tables.map((tbl) => renderTableCardInSvg(tbl, theme, primaryColor))}
              </svg>
            </Box>
          </Box>
        </DiagramBoard>
      </GlassCard>
    </Box>
  );
};

export default SchemaSection;
