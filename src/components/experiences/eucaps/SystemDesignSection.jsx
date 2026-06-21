import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Menu, MenuItem, Paper, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { systemNodes } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";
import LayersIcon from "@mui/icons-material/Layers";
import CloudIcon from "@mui/icons-material/CloudUpload";
import StorageIcon from "@mui/icons-material/Storage";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const onboardingSteps = [
  { key: "auth", label: "Swedish BankID / OTP Sign-In", sub: "User Authentication & JWT issue" },
  { key: "kyc", label: "Trulioo Identity Audit", sub: "KYC checks, retry buffers, fallbacks" },
  { key: "payments", label: "Stripe Subscription Setup", sub: "Subscription tier matching & webhooks" },
  { key: "schema_mapping", label: "Persist Profile Metadata", sub: "MySQL / DynamoDB insertion" },
  { key: "data_processing", label: "Access Platform Modules", sub: "GraphQL calculations & UI dashboard" },
];

const ingestionSteps = [
  { key: "sp_pipeline", label: "S&P Data Aggregator", sub: "Chunked ISIN mnemonics on AWS Lambda" },
  { key: "pinpoint_estimates", label: "Sentiment Predictions Ingestion", sub: "Consensus forecasts & quarterly predictions" },
  { key: "inderes_media", label: "Multimedia Scanner", sub: "Video summaries, transcripts, and indexing" },
  { key: "schema_mapping", label: "Chunk Mapping Layer", sub: "JSON database records serialization" },
  { key: "data_processing", label: "YoY/QoQ Trailing Calculations", sub: "Express computing LTM indices" },
];

const integrationsSteps = [
  { key: "partner_api", label: "HMAC Partner API Handshake", sub: "API secret validation & rate checks" },
  { key: "openai_generator", label: "AI Description Processor", sub: "GPT tagger + Intervention Image compression" },
  { key: "schema_mapping", label: "Log Request History", sub: "Auditing database transaction coordinates" },
];

const microDiagramData = {
  auth: [
    { label: "Start Session", sub: "User request" },
    { label: "BankID Auth", sub: "Nordic electronic ID" },
    { label: "OTP Fallback", sub: "SMS/Email token" },
    { label: "Verify Signatures", sub: "Validation layer" },
    { label: "JWT Issuance", sub: "Access/Refresh tokens" },
    { label: "Active Client", sub: "Dashboard unlock" }
  ],
  kyc: [
    { label: "Submit ID Profile", sub: "User inputs info" },
    { label: "Trulioo API Check", sub: "External database match" },
    { label: "Status Evaluation", sub: "Pass/Fail/Review check" },
    { label: "Retry Buffers", sub: "Automated API retries" },
    { label: "User DB Flag", sub: "Persist KYC pass status" },
    { label: "Unlock navigation", sub: "Enable premium modules" }
  ],
  payments: [
    { label: "Purchase Flow", sub: "Select active tier" },
    { label: "Stripe Checkout", sub: "Redirect to Stripe page" },
    { label: "Process Gateway", sub: "Handle credit/debit" },
    { label: "Stripe Webhooks", sub: "Secure callback listener" },
    { label: "DB Subscription Sync", sub: "Active sub persistence" },
    { label: "Tier Activated", sub: "Unlock premium routes" }
  ],
  sp_pipeline: [
    { label: "ISIN Directory", sub: "European SMEs list" },
    { label: "Chunking Lists", sub: "Batches of 100 entries" },
    { label: "AWS Lambda (Node)", sub: "Serverless triggers" },
    { label: "S&P Mnemonic APIs", sub: "Query financials/calendar" },
    { label: "Queue Storage", text: "Staggered payloads queue" },
    { label: "DB Persistence", sub: "Save rows incrementally" }
  ],
  pinpoint_estimates: [
    { label: "SME Stock Feed", sub: "Active listed directory" },
    { label: "Pinpoint estimates", sub: "Pull analyst consensus" },
    { label: "Consensus Predict", sub: "Track forecasts" },
    { label: "User Predictions", sub: "Collect community sentiment" },
    { label: "Historical Comparison", sub: "Forecast vs actual report" },
    { label: "Client Charts", sub: "Render visual statistics" }
  ],
  inderes_media: [
    { label: "Media Scanner", sub: "Scrapes Inderes feed" },
    { label: "Ingest Multimedia", sub: "Videos, audio, reports" },
    { label: "Laravel Queues", sub: "Async queue processing" },
    { label: "Content Extraction", sub: "Transcribe, summarize, thumbs" },
    { label: "Search Indexing", sub: "Elasticsearch / DB index" },
    { label: "Searchable Library", sub: "Client media access" }
  ],
  schema_mapping: [
    { label: "Raw JSON Stream", sub: "Incoming partner feeds" },
    { label: "Validator Check", sub: "Filter structures" },
    { label: "MySQL (Laravel)", sub: "Store relational profiles" },
    { label: "DynamoDB (Node)", sub: "AWS serverless cache store" },
    { label: "Redis Synchronization", sub: "Active cache updates" },
    { label: "DB Cache Storage", sub: "Prepared GraphQL schemas" }
  ],
  data_processing: [
    { label: "Retrieve DB Rows", sub: "Fetch raw profiles" },
    { label: "LTM calculations", sub: "Compile trailing 12 months" },
    { label: "YoY Margin Expansion", sub: "Year-over-year formulas" },
    { label: "QoQ Ratios", sub: "Quarterly margin rates" },
    { label: "GraphQL Server", sub: "Combine schema metrics" },
    { label: "Dashboard Cards", sub: "Consume GraphQL package" }
  ],
  partner_api: [
    { label: "Partner Call", sub: "External REST request" },
    { label: "HMAC Body Check", sub: "Payload verification" },
    { label: "JWT Token Validation", sub: "Session auth verification" },
    { label: "Redis sliding limits", sub: "Check rate allowances" },
    { label: "Contract Scopes", sub: "Filter client collections" },
    { label: "JSON Output", sub: "Expose calculated endpoints" }
  ],
  openai_generator: [
    { label: "Company database", sub: "Scan profile tables" },
    { label: "GPT-3.5 Hashtags", sub: "Context-aware tagging" },
    { label: "DALL-E Prompt", sub: "Generate vector illustrations" },
    { label: "Media Compression", sub: "PHP Intervention Image (WebP)" },
    { label: "AWS S3 Upload", sub: "Store images globally" },
    { label: "Database Save", sub: "Link tags and image URI" }
  ]
};

const MicroDiagram = ({ activeNode, theme, primaryColor }) => {
  const steps = microDiagramData[activeNode] || microDiagramData.auth;

  return (
    <svg
      width="100%"
      viewBox="0 0 920 130"
      style={{ display: "block", maxWidth: "100%", height: "auto" }}
    >
      <defs>
        <marker id="microArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
        </marker>
        <marker id="microArrowMuted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"} />
        </marker>
      </defs>

      {/* Connection Lines */}
      {steps.map((_, idx) => {
        if (idx === steps.length - 1) return null;
        const x1 = 15 + idx * 150 + 120;
        const y1 = 65;
        const x2 = 15 + (idx + 1) * 150;
        return (
          <path
            key={idx}
            d={`M ${x1} ${y1} H ${x2}`}
            stroke={primaryColor}
            strokeWidth={2}
            fill="none"
            markerEnd="url(#microArrow)"
            style={{ transition: "all 0.3s ease" }}
          />
        );
      })}

      {/* Nodes */}
      {steps.map((step, idx) => {
        const x = 15 + idx * 150;
        const y = 40;
        const w = 120;
        const h = 50;
        const cx = x + 60;
        const cy = y + 25;

        const fillBg = theme.palette.mode === "light"
          ? "rgba(79,70,229,0.05)"
          : "rgba(129,140,248,0.1)";
        const strokeColor = primaryColor;
        const strokeWidth = 1.8;

        return (
          <g key={idx}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx={6}
              fill={fillBg}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              style={{ transition: "all 0.3s ease" }}
            />
            <text x={cx} y={cy - 2} textAnchor="middle" fontWeight="800" fill={theme.palette.text.primary} fontSize="9" fontFamily="Inter, sans-serif">
              {step.label}
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill={theme.palette.text.secondary} fontSize="7.5" fontFamily="Inter, sans-serif">
              {step.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const SystemDesignSection = ({
  theme,
  activeSystemNode,
  setActiveSystemNode,
  primaryColor
}) => {
  const [activeMobileFlow, setActiveMobileFlow] = useState("onboarding");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (nodeKey) => {
    setActiveSystemNode(nodeKey);
    handleClose();
  };

  useEffect(() => {
    if (
      activeSystemNode === "sp_pipeline" ||
      activeSystemNode === "pinpoint_estimates" ||
      activeSystemNode === "inderes_media"
    ) {
      setActiveMobileFlow("ingestion");
    } else if (
      activeSystemNode === "partner_api" ||
      activeSystemNode === "openai_generator"
    ) {
      setActiveMobileFlow("integrations");
    } else {
      setActiveMobileFlow("onboarding");
    }
  }, [activeSystemNode]);

  return (
    <Box
      id="architecture"
      sx={{
        scrollMarginTop: 120,
        mb: 4,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <SectionHeading theme={theme}>System Design & Architecture</SectionHeading>

      {/* ── PART 1: Macro System Design ── */}
      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, letterSpacing: "0.5px", color: "text.primary", display: "flex", alignItems: "center", gap: 1 }}>
        <LayersIcon sx={{ fontSize: 18, color: "primary.main" }} />
        Macro System Design
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
        An overview of the serverless, database, and client layers powering the Eucaps platform.
        Click any node below to highlight its path in the macro design.
      </Typography>

      <DiagramBoard sx={{ mb: 2 }}>
        {/* Macro Flowchart (Desktop View) */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <svg
            width="100%"
            viewBox="0 0 920 260"
            style={{ display: "block", maxWidth: "100%", height: "auto" }}
          >
            <defs>
              <marker id="macroArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
              </marker>
              <marker id="macroArrowMuted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"} />
              </marker>
              <filter id="macroGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection Lines */}
            {[
              { from: "auth", to: "kyc", path: "M 155 65 H 220" },
              { from: "kyc", to: "payments", path: "M 335 65 H 390" },
              { from: "payments", to: "schema_mapping", path: "M 505 65 H 560" },
              { from: "schema_mapping", to: "data_processing", path: "M 675 65 H 740" },

              { from: "sp_pipeline", to: "schema_mapping", path: "M 95 180 V 135 H 620 V 90" },
              { from: "pinpoint_estimates", to: "schema_mapping", path: "M 280 180 V 135 H 620 V 90" },
              { from: "inderes_media", to: "schema_mapping", path: "M 450 180 V 135 H 620 V 90" },
              { from: "partner_api", to: "schema_mapping", path: "M 620 180 V 90" },
              { from: "openai_generator", to: "schema_mapping", path: "M 800 180 V 135 H 620 V 90" }
            ].map((line, lIdx) => {
              const isActive = activeSystemNode === line.from || activeSystemNode === line.to;
              const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
              const strokeWidth = isActive ? 2.5 : 1.5;
              const marker = isActive ? "url(#macroArrow)" : "url(#macroArrowMuted)";
              return (
                <path
                  key={lIdx}
                  d={line.path}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  fill="none"
                  markerEnd={marker}
                  style={{ transition: "all 0.3s ease" }}
                />
              );
            })}

            {/* Nodes */}
            {[
              { key: "auth", type: "process", x: 35, y: 40, w: 120, h: 50, rx: 8, cx: 95, cy: 65, label: "Authentication", sub: "BankID / OTP" },
              { key: "kyc", type: "process", x: 220, y: 40, w: 115, h: 50, rx: 8, cx: 277.5, cy: 65, label: "Trulioo KYC", sub: "Compliance Audits" },
              { key: "payments", type: "process", x: 390, y: 40, w: 115, h: 50, rx: 8, cx: 447.5, cy: 65, label: "Stripe Billing", sub: "Subscriptions" },
              { key: "schema_mapping", type: "cylinder", x: 560, y: 25, w: 115, h: 65, cx: 617.5, cy: 62, label: "MySQL / DynamoDB", sub: "Persisted Schema" },
              { key: "data_processing", type: "process", x: 740, y: 40, w: 120, h: 50, rx: 8, cx: 800, cy: 65, label: "GraphQL Server", sub: "LTM YoY/QoQ Calculations" },

              { key: "sp_pipeline", type: "process", x: 35, y: 180, w: 120, h: 50, rx: 8, cx: 95, cy: 205, label: "S&P data ingestion", sub: "AWS Lambda Node" },
              { key: "pinpoint_estimates", type: "process", x: 220, y: 180, w: 120, h: 50, rx: 8, cx: 280, cy: 205, label: "Pinpoint estimates", sub: "Crowd Predictions" },
              { key: "inderes_media", type: "process", x: 390, y: 180, w: 120, h: 50, rx: 8, cx: 450, cy: 205, label: "Inderes Media", sub: "Transcripts & Index" },
              { key: "partner_api", type: "process", x: 560, y: 180, w: 120, h: 50, rx: 8, cx: 620, cy: 205, label: "Partner API", sub: "HMAC Authenticated" },
              { key: "openai_generator", type: "process", x: 740, y: 180, w: 120, h: 50, rx: 8, cx: 800, cy: 205, label: "AI profile enrich", sub: "GPT-3.5 + DALL-E" }
            ].map((node, nIdx) => {
              const isActive = activeSystemNode === node.key;
              const fillBg = isActive
                ? (theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.12)")
                : (theme.palette.mode === "light" ? "rgba(255,255,255,0.85)" : "rgba(17,24,39,0.8)");
              const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
              const strokeWidth = isActive ? 2.5 : 1.2;
              const glowFilter = isActive ? "url(#macroGlow)" : undefined;

              return (
                <g key={nIdx} style={{ cursor: "pointer" }} onClick={() => setActiveSystemNode(node.key)}>
                  {node.type === "process" && (
                    <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={node.rx} fill={fillBg} stroke={strokeColor} strokeWidth={strokeWidth} filter={glowFilter} />
                  )}
                  {node.type === "cylinder" && (
                    <g filter={glowFilter}>
                      <path
                        d={`M ${node.x} ${node.y + 12} L ${node.x} ${node.y + node.h} A ${node.w / 2} 12 0 0 0 ${node.x + node.w} ${node.y + node.h} L ${node.x + node.w} ${node.y + 12} Z`}
                        fill={fillBg}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <ellipse
                        cx={node.x + node.w / 2}
                        cy={node.y + 12}
                        rx={node.w / 2}
                        ry={12}
                        fill={isActive ? (theme.palette.mode === "light" ? "rgba(79,70,229,0.2)" : "rgba(129,140,248,0.3)") : (theme.palette.mode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)")}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                    </g>
                  )}
                  <text x={node.cx} y={node.cy - 2} textAnchor="middle" fontWeight="800" fill={theme.palette.text.primary} fontSize="10" fontFamily="Inter, sans-serif">
                    {node.label}
                  </text>
                  <text x={node.cx} y={node.cy + 11} textAnchor="middle" fill={theme.palette.text.secondary} fontSize="8.5" fontFamily="Inter, sans-serif">
                    {node.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </Box>

        {/* Mobile View Macro */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Box
            sx={{
              display: "flex",
              borderRadius: 2,
              p: 0.5,
              mb: 3,
              gap: 0.5,
              backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
              flexWrap: "wrap",
            }}
          >
            {[
              { key: "onboarding", label: "User Onboarding" },
              { key: "ingestion", label: "Ingestion Feeds" },
              { key: "integrations", label: "Integrations & APIs" }
            ].map((flow) => {
              const isActive = activeMobileFlow === flow.key;
              return (
                <Button
                  key={flow.key}
                  fullWidth
                  onClick={() => setActiveMobileFlow(flow.key)}
                  size="small"
                  sx={{
                    flex: 1,
                    minWidth: "100px",
                    textTransform: "none",
                    fontWeight: isActive ? 800 : 600,
                    fontSize: "0.75rem",
                    borderRadius: 1.5,
                    py: 0.8,
                    backgroundColor: isActive ? (theme.palette.mode === "light" ? "#FFF" : "rgba(255,255,255,0.08)") : "transparent",
                    color: isActive ? "primary.main" : "text.secondary",
                  }}
                >
                  {flow.label}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pl: 1, pr: 1 }}>
            {(activeMobileFlow === "onboarding"
              ? onboardingSteps
              : activeMobileFlow === "ingestion"
                ? ingestionSteps
                : integrationsSteps
            ).map((step, idx, arr) => {
              const isActive = activeSystemNode === step.key;
              const isNotLast = idx < arr.length - 1;
              return (
                <Box
                  key={idx}
                  onClick={() => setActiveSystemNode(step.key)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1.5,
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    backgroundColor: isActive ? (theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.1)") : "transparent",
                    border: `1px solid ${isActive ? primaryColor : "transparent"}`,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)"),
                        color: isActive ? "#FFF" : "text.secondary",
                        border: `1px solid ${isActive ? "transparent" : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)")}`,
                        zIndex: 1,
                      }}
                    >
                      {React.cloneElement(systemNodes[step.key].icon, { sx: { fontSize: 18 } })}
                    </Box>
                    {isNotLast && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 38,
                          height: 24,
                          width: 2,
                          borderLeft: `2px dashed ${isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)")}`,
                          zIndex: 0,
                        }}
                      />
                    )}
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: isActive ? primaryColor : "text.primary" }}>
                      {step.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.2 }}>
                      {step.sub}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </DiagramBoard>

      <Divider sx={{ opacity: 0.08, my: 2.5 }} />

      {/* ── PART 2: Micro System Design (Node Detail) ── */}
      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, letterSpacing: "0.5px", color: "text.primary", display: "flex", alignItems: "center", gap: 1 }}>
        <CloudIcon sx={{ fontSize: 18, color: "primary.main" }} />
        Micro Design Representation
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
        Detailed flowchart pipeline representing the selected node: <strong>{systemNodes[activeSystemNode].title.split(" (")[0]}</strong>.
      </Typography>

      {/* Selector Dropdown to switch micro views */}
      <Box sx={{ mb: 3 }}>
        <Button
          id="node-select-button"
          aria-controls={open ? 'node-select-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="outlined"
          disableElevation
          onClick={handleClick}
          endIcon={<ArrowDropDownIcon />}
          startIcon={React.cloneElement(systemNodes[activeSystemNode].icon, { sx: { fontSize: 18 } })}
          sx={{
            textTransform: "none",
            fontWeight: 800,
            fontSize: "0.85rem",
            borderRadius: 2,
            px: 2.5,
            py: 1,
            borderColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)",
            color: "text.primary",
            backgroundColor: theme.palette.mode === "light" ? "rgba(255,255,255,0.8)" : "rgba(30,41,59,0.8)",
            backdropFilter: "blur(8px)",
            "&:hover": {
              borderColor: primaryColor,
              backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.04)" : "rgba(129,140,248,0.06)",
            }
          }}
        >
          Selected Micro Design: {systemNodes[activeSystemNode].title.split(" (")[0]}
        </Button>
        <Menu
          id="node-select-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock
          MenuListProps={{
            'aria-labelledby': 'node-select-button',
          }}
          PaperProps={{
            sx: {
              borderRadius: 2,
              mt: 1,
              minWidth: 260,
              boxShadow: theme.palette.mode === "light"
                ? "0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.08)"
                : "0 10px 25px -5px rgba(0,0,0,0.5), 0 8px 10px -6px rgba(0,0,0,0.5)",
              backgroundColor: theme.palette.mode === "light" ? "rgba(255,255,255,0.95)" : "rgba(15,23,42,0.95)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
            }
          }}
        >
          {Object.entries(systemNodes).map(([key, val]) => {
            const isSelected = activeSystemNode === key;
            return (
              <MenuItem
                key={key}
                selected={isSelected}
                onClick={() => handleSelect(key)}
                sx={{
                  py: 1.2,
                  px: 2,
                  fontSize: "0.8rem",
                  fontWeight: isSelected ? 800 : 500,
                  color: isSelected ? "primary.main" : "text.secondary",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  borderRadius: 1.5,
                  mx: 0.5,
                  my: 0.2,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.16)",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.12)" : "rgba(129,140,248,0.2)",
                    }
                  },
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
                  }
                }}
              >
                {React.cloneElement(val.icon, { sx: { fontSize: 16 } })}
                {val.title.split(" (")[0]}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>

      {/* Node Detail Card */}
      <GlassCard sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
              {React.cloneElement(systemNodes[activeSystemNode].icon, { color: "primary", sx: { fontSize: 20 } })}
              {systemNodes[activeSystemNode].title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {systemNodes[activeSystemNode].description}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ borderLeft: `3px solid ${theme.palette.primary.main}`, pl: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "primary.main", letterSpacing: "1px", display: "block", mb: 0.5 }}>
                PIPELINE ROLE
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ fontStyle: "italic", fontWeight: 500, lineHeight: 1.6 }}>
                "{systemNodes[activeSystemNode].role}"
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </GlassCard>

      {/* Dynamic Micro SVG Board */}
      <DiagramBoard sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ overflowX: "auto", width: "100%", "&::-webkit-scrollbar": { height: 6 } }}>
          <Box sx={{ minWidth: 900 }}>
            <MicroDiagram activeNode={activeSystemNode} theme={theme} primaryColor={primaryColor} />
          </Box>
        </Box>
      </DiagramBoard>
    </Box>
  );
};

export default SystemDesignSection;
