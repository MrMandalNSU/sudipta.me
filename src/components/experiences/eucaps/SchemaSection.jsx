import React from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";
import { Schema as SchemaIcon } from "@mui/icons-material";

const schemasData = {
  "S&P Financials": {
    description: "Database configurations mapping institutional S&P mnemonic financial details, histories, and calendar dates.",
    tables: [
      { title: "SME Identifiers", fields: ["isin (PK)", "ticker", "company_name", "exchange_code"], x: 30, y: 75, w: 180 },
      { title: "Financial Mnemonics", fields: ["isin (FK)", "total_revenue", "gross_profit", "ebitda", "net_income", "cash_from_ops"], x: 310, y: 20, w: 190 },
      { title: "LTM & YoY Metrics", fields: ["isin (FK)", "ltm_revenue", "yoy_revenue_growth", "yoy_margin_expansion", "qoq_margin_prog"], x: 590, y: 40, w: 190 },
      { title: "Event Calendar", fields: ["isin (FK)", "earnings_report_date", "agm_date", "ex_dividend_date"], x: 310, y: 190, w: 190 }
    ],
    connections: [
      { path: "M 210 120 H 260 V 90 H 310" },
      { path: "M 210 120 H 260 V 230 H 310" },
      { path: "M 500 90 H 590" },
      { path: "M 500 230 H 545 V 120 H 590" }
    ]
  },
  "Pinpoint Estimates": {
    description: "Database tables storing crowd forecasts, consensus eps metrics, and historical forecast performance mappings.",
    tables: [
      { title: "Estimate Metadata", fields: ["isin (PK)", "estimate_quarter", "consensus_eps", "consensus_revenue"], x: 40, y: 70, w: 180 },
      { title: "Crowd Expectations", fields: ["isin (FK)", "user_prediction_eps", "user_prediction_revenue", "user_prediction_count"], x: 320, y: 25, w: 195 },
      { title: "Historical Performance", fields: ["isin (FK)", "actual_reported_eps", "actual_reported_revenue", "accuracy_score"], x: 600, y: 70, w: 190 }
    ],
    connections: [
      { path: "M 220 125 H 270 V 80 H 320" },
      { path: "M 220 125 H 600" },
      { path: "M 515 80 H 555 V 125 H 600" }
    ]
  },
  "Inderes Media": {
    description: "Search indices indexing Nordic listed company video presentations, reports, and podcasts.",
    tables: [
      { title: "Media Info", fields: ["media_id (PK)", "company_id", "title", "media_type"], x: 40, y: 70, w: 180 },
      { title: "Transcription & Summary", fields: ["media_id (FK)", "transcript_raw_text", "summary_paragraphs", "ai_keywords"], x: 310, y: 25, w: 210 },
      { title: "Assets", fields: ["media_id (FK)", "thumbnail_url_s3", "media_source_url", "is_indexed"], x: 600, y: 70, w: 190 }
    ],
    connections: [
      { path: "M 220 125 H 265 V 80 H 310" },
      { path: "M 220 125 H 600" },
      { path: "M 520 80 H 560 V 125 H 600" }
    ]
  },
  "Partner API Auth": {
    description: "Credential details mapping client HMAC secrets, JWT scopes, and external log analytics history.",
    tables: [
      { title: "Credential Verification", fields: ["partner_id (PK)", "hmac_secret_key", "jwt_signing_key", "allowed_ip_whitelist"], x: 30, y: 70, w: 200 },
      { title: "Permission Scopes", fields: ["partner_id (FK)", "has_sp_access", "has_pinpoint_access", "has_inderes_access"], x: 320, y: 25, w: 190 },
      { title: "Usage Log", fields: ["log_id (PK)", "partner_id (FK)", "api_endpoint", "request_bytes", "rate_limit_hits"], x: 590, y: 60, w: 190 }
    ],
    connections: [
      { path: "M 230 125 H 275 V 80 H 320" },
      { path: "M 230 125 H 590" },
      { path: "M 510 80 H 550 V 125 H 590" }
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
      {/* Card shadow rectangle */}
      <rect
        x={tbl.x + 2}
        y={tbl.y + 2}
        width={tbl.w}
        height={nodeHeight}
        rx={8}
        fill="rgba(0,0,0,0.15)"
        style={{ filter: "blur(2px)" }}
      />
      {/* Main card */}
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
      {/* Banner */}
      <path
        d={`M ${tbl.x} ${tbl.y + 8} A 8 8 0 0 1 ${tbl.x + 8} ${tbl.y} L ${tbl.x + tbl.w - 8} ${tbl.y} A 8 8 0 0 1 ${tbl.x + tbl.w} ${tbl.y + 8} L ${tbl.x + tbl.w} ${tbl.y + headerHeight} L ${tbl.x} ${tbl.y + headerHeight} Z`}
        fill={headerBg}
      />
      {/* Title */}
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

      {/* Fields */}
      {tbl.fields.map((field, idx) => {
        const fieldY = tbl.y + headerHeight + 16 + idx * 18;
        const isPk = field.includes("(PK)");
        const isFk = field.includes("(FK)");
        
        return (
          <g key={idx}>
            {/* Field label */}
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
                viewBox="0 0 920 330"
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
