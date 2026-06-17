import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { features } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";

// Detailed technical specifications for each engineering system/feature
const featureDetails = [
  {
    challenge: "Integrating secure, legal e-ID authentication (Swedish BankID) alongside fallback OTP channels while maintaining clean JWT-based session scopes.",
    solution: "Developed a secure authentication gateway. Swedish citizens authenticate instantly via Nordic BankID API, while international users fall back to SMS/Email OTP flows. On success, the backend signs short-lived JWT access tokens and Redis-tracked refresh tokens.",
    metrics: [
      { label: "BankID Auth Time", value: "<1.2s" },
      { label: "JWT Verification", value: "<5µs" },
      { label: "Success Rate", value: "99.8%" }
    ],
    techStack: ["Swedish BankID API", "JWT Auth", "Laravel Gateway", "Redis Session Store"]
  },
  {
    challenge: "Enforcing international compliance checking asynchronously without blocking user registration or exposing third-party API latency to the client.",
    solution: "Designed a compliance state machine wrapping the Trulioo validation API. Implemented background event listeners and state columns that track KYC validation outcomes. Built-in retry queues automatically resolve temporary timeouts.",
    metrics: [
      { label: "Trulioo Lookup", value: "~3.0s" },
      { label: "Worker Queries", value: "Realtime" },
      { label: "Verification SLA", value: "100%" }
    ],
    techStack: ["Trulioo KYC SDK", "Laravel Queues", "Redis Event Logs", "MySQL States"]
  },
  {
    challenge: "Synchronizing subscription events (renewals, cancellations, failures) from Stripe checkout webhook calls without risking duplicate database updates or out-of-order race conditions.",
    solution: "Constructed a transaction-safe webhook receiver. It validates webhook request payload signatures against Stripe secrets, parses events into a serialized job queue, and updates user subscription database records.",
    metrics: [
      { label: "Webhook Sync", value: "<200ms" },
      { label: "Signature Check", value: "<10ms" },
      { label: "Event Accuracy", value: "100%" }
    ],
    techStack: ["Stripe Webhooks API", "Signature Verification", "MySQL Transactions", "Laravel Jobs"]
  },
  {
    challenge: "Aggregating huge directories of mnemonic parameters, calendar schedules, and shareholder structures from S&P Capital IQ without hitting rate limits or causing database write lockouts.",
    solution: "Engineered a serverless chunking collector. Scheduled AWS Lambda workers split company ISIN lists into batch queries, queries Mnemonics endpoints concurrently, and staggers results through queues to write updates.",
    metrics: [
      { label: "Daily Payload", value: "200MB+" },
      { label: "Batch Slices", value: "100 ISINs" },
      { label: "Ingestion Blocks", value: "0%" }
    ],
    techStack: ["AWS Lambda", "Node.js Workers", "S&P Capital IQ APIs", "AWS EventBridge"]
  },
  {
    challenge: "Calculating Trailing Twelve Months (LTM) indexes, YoY growth rates, and margins dynamically across hundreds of companies without creating database deadlocks or page latency.",
    solution: "Built an Express-based GraphQL server calculating complex ratios. Applied DataLoader batching to collapse redundant row fetches, mapping raw SQL results into unified caches for responsive React dashboards.",
    metrics: [
      { label: "GraphQL Fetch", value: "~80ms" },
      { label: "MySQL Load Cuts", value: "75%" },
      { label: "Calculations Scale", value: "200+ SMEs" }
    ],
    techStack: ["Express.js", "GraphQL Resolvers", "DataLoader Batching", "MySQL Indexes"]
  },
  {
    challenge: "Exposing secure, stateless, contract-aware endpoints to institutional partners without introducing session overhead or security vulnerabilities.",
    solution: "Developed an API Gateway layer. It validates incoming request body hashes using HMAC-SHA256 signatures, verifies client JWT scopes, and routes authorized calls through sliding-window Redis rate-limit checks.",
    metrics: [
      { label: "HMAC Check Speed", value: "<3ms" },
      { label: "Redis Limit Check", value: "<2ms" },
      { label: "Spike Block Rate", value: "100%" }
    ],
    techStack: ["HMAC-SHA256", "Redis Rate-Limiter", "Partner Contracts", "API Middleware"]
  },
  {
    challenge: "Populating thousands of company profiles with contextually accurate hashtags and visual backdrop images without high API billing rates or slow frontend image load speeds.",
    solution: "Built a background OpenAI batch pipeline. Structured prompts extract tags via GPT-3.5 and concepts for DALL-E. Downloaded images are cropped, watermarked, and compressed to WebP using PHP Intervention Image before S3 storage.",
    metrics: [
      { label: "Image Size Cut", value: "60% (WebP)" },
      { label: "API Cost Cut", value: "35% (Saved)" },
      { label: "Batch Load", value: "25 Profiles" }
    ],
    techStack: ["OpenAI GPT & DALL-E", "Intervention Image", "AWS S3 Storage", "Metadata Sync"]
  }
];

// Inline SVG diagram renderer for the left-side preview
const FeatureDiagram = ({ index, theme, primaryColor }) => {
  const isLight = theme.palette.mode === "light";
  const textColor = theme.palette.text.primary;
  const mutedColor = theme.palette.text.secondary;
  const boxBg = isLight ? "rgba(79, 70, 229, 0.05)" : "rgba(129, 140, 248, 0.1)";
  const strokeColor = primaryColor;

  switch (index) {
    case 0: // BankID & OTP Auth
      return (
        <svg viewBox="0 0 500 160" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
            </marker>
          </defs>
          
          <rect x="15" y="50" width="100" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="65" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Client UI</text>
          <text x="65" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">User Device</text>
          
          <rect x="195" y="10" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="250" y="40" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">BankID Relay</text>
          <text x="250" y="55" textAnchor="middle" fill={mutedColor} fontSize="8.5" fontFamily="Inter, sans-serif">Swedish E-ID</text>

          <rect x="195" y="90" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="250" y="120" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">OTP Handler</text>
          <text x="250" y="135" textAnchor="middle" fill={mutedColor} fontSize="8.5" fontFamily="Inter, sans-serif">SMS/Email Token</text>

          <rect x="385" y="50" width="100" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="435" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Auth Server</text>
          <text x="435" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">Validate & JWT</text>

          {/* Paths */}
          <path d="M 115 55 Q 150 25 195 30" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <path d="M 115 105 Q 150 135 195 130" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <path d="M 305 35 Q 345 40 385 60" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <path d="M 305 125 Q 345 120 385 100" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <path d="M 385 80 H 125" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="4,4" fill="none" markerEnd="url(#arrow)" />
          <text x="250" y="76" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8" fontFamily="monospace">Verify & Session Issued</text>
        </svg>
      );
    case 1: // Trulioo KYC Compliance
      return (
        <svg viewBox="0 0 500 160" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
            </marker>
          </defs>
          
          <rect x="15" y="50" width="100" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="65" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Signup Form</text>
          <text x="65" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">Submit Profile</text>
          
          <rect x="195" y="50" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="250" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">KYC Manager</text>
          <text x="250" y="95" textAnchor="middle" fill={mutedColor} fontSize="8.5" fontFamily="Inter, sans-serif">State Machine Buffer</text>

          <rect x="385" y="50" width="100" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="435" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Trulioo API</text>
          <text x="435" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">Verification Check</text>

          {/* Paths */}
          <path d="M 115 80 H 195" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          
          <path d="M 305 70 H 385" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <path d="M 385 90 H 315" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow)" />
          
          {/* Retry loop */}
          <path d="M 270 50 Q 250 10 230 50" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="250" y="25" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="7.5" fontFamily="monospace">Retry Loop (3x)</text>

          {/* Approval path */}
          <path d="M 250 110 C 250 145, 65 145, 65 120" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="4,4" fill="none" markerEnd="url(#arrow)" />
          <text x="160" y="135" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8" fontFamily="monospace">Unlock Account</text>
        </svg>
      );
    case 2: // Stripe Subscription Gateway
      return (
        <svg viewBox="0 0 500 160" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
            </marker>
          </defs>

          <rect x="15" y="50" width="100" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="65" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Stripe Webhook</text>
          <text x="65" y="95" textAnchor="middle" fill={mutedColor} fontSize="8.5" fontFamily="Inter, sans-serif">Events Dispatch</text>

          <rect x="195" y="50" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="250" y="75" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Signature Validation</text>
          <text x="250" y="95" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8.5" fontFamily="monospace">HMAC Signature</text>

          <rect x="385" y="50" width="100" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="435" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Database Sync</text>
          <text x="435" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">Active Tier Update</text>

          {/* Paths */}
          <path d="M 115 80 H 195" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="155" y="70" textAnchor="middle" fill={mutedColor} fontSize="8" fontFamily="monospace">Payload</text>
          
          <path d="M 305 80 H 385" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="345" y="70" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8" fontFamily="monospace">Valid</text>
        </svg>
      );
    case 3: // AWS Ingestion Pipeline (S&P Capital IQ)
      return (
        <svg viewBox="0 0 500 160" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
            </marker>
          </defs>

          <rect x="15" y="50" width="90" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="60" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Node Cron</text>
          <text x="60" y="95" textAnchor="middle" fill={mutedColor} fontSize="8.5" fontFamily="Inter, sans-serif">Job Scheduler</text>

          <rect x="180" y="15" width="120" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="240" y="45" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">AWS Lambda (Node)</text>
          <text x="240" y="60" textAnchor="middle" fill={mutedColor} fontSize="8.5" fontFamily="Inter, sans-serif">Chunk ISINs (100)</text>

          <rect x="180" y="90" width="120" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="240" y="120" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">S&P Mnemonics</text>
          <text x="240" y="135" textAnchor="middle" fill={mutedColor} fontSize="8.5" fontFamily="Inter, sans-serif">Finance / Calendar APIs</text>

          <rect x="385" y="50" width="100" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="435" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Eucaps Cache</text>
          <text x="435" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">MySQL Database</text>

          {/* Paths */}
          <path d="M 105 80 Q 140 45 180 45" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          
          <path d="M 240 75 V 90" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <path d="M 250 90 V 75" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="3,3" fill="none" markerEnd="url(#arrow)" />

          <path d="M 300 45 Q 345 45 385 70" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <path d="M 300 120 Q 345 120 385 90" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
        </svg>
      );
    case 4: // GraphQL Calculations Engine
      return (
        <svg viewBox="0 0 500 160" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
            </marker>
          </defs>

          <rect x="15" y="50" width="100" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="65" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">MySQL Store</text>
          <text x="65" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">Raw Ingested Rows</text>

          <rect x="195" y="50" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="250" y="75" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Aggregate Engine</text>
          <text x="250" y="95" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8" fontFamily="monospace">LTM / YoY / QoQ</text>

          <rect x="385" y="50" width="100" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="435" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">GraphQL API</text>
          <text x="435" y="95" textAnchor="middle" fill={mutedColor} fontSize="8.5" fontFamily="Inter, sans-serif">DataLoader Caches</text>

          {/* Paths */}
          <path d="M 115 80 H 195" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          
          <path d="M 305 80 H 385" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
        </svg>
      );
    case 5: // HMAC Partner Gateway
      return (
        <svg viewBox="0 0 500 160" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
            </marker>
          </defs>

          <rect x="15" y="50" width="100" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="65" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Partner API Request</text>
          <text x="65" y="95" textAnchor="middle" fill={mutedColor} fontSize="8.5" fontFamily="Inter, sans-serif">Shared Keys Payload</text>

          <rect x="190" y="50" width="120" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="250" y="75" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">HMAC Filter Middleware</text>
          <text x="250" y="95" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8.5" fontFamily="monospace">SHA-256 Signature</text>

          <rect x="385" y="50" width="100" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="435" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Redis Limiter</text>
          <text x="435" y="95" textAnchor="middle" fill={mutedColor} fontSize="8.5" fontFamily="Inter, sans-serif">Sliding-Window Audit</text>

          {/* Paths */}
          <path d="M 115 80 H 190" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          
          <path d="M 310 80 H 385" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
        </svg>
      );
    case 6: // OpenAI Content Generation & Compression
      return (
        <svg viewBox="0 0 500 160" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
            </marker>
          </defs>

          <rect x="15" y="50" width="90" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="60" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">OpenAI Job</text>
          <text x="60" y="95" textAnchor="middle" fill={mutedColor} fontSize="8.5" fontFamily="Inter, sans-serif">GPT Hashtags / DALL-E</text>

          <rect x="175" y="50" width="130" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="240" y="75" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="10.5" fontFamily="Inter, sans-serif">Intervention Image</text>
          <text x="240" y="95" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8.5" fontFamily="monospace">Crop & WebP Format</text>

          <rect x="385" y="50" width="100" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="435" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">AWS S3</text>
          <text x="435" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">Watermarked WebP</text>

          {/* Paths */}
          <path d="M 105 80 H 175" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="140" y="70" textAnchor="middle" fill={mutedColor} fontSize="8" fontFamily="monospace">Raw Image</text>
          
          <path d="M 305 80 H 385" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="345" y="70" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8" fontFamily="monospace">S3 Push</text>
        </svg>
      );
    default:
      return null;
  }
};

const KeyFeaturesSection = ({ theme }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeFeature = features[activeIdx];
  const activeDetails = featureDetails[activeIdx];
  const primaryColor = theme.palette.mode === "light" ? "#4F46E5" : "#818CF8";
  const isLight = theme.palette.mode === "light";

  return (
    <Box id="features" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>Key Features & Engineering Systems</SectionHeading>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 800, lineHeight: 1.7 }}>
        Explore the primary engineering modules and features powering Eucaps. Click any system card on the right to review its system challenge, production metrics, tech stacks, and flow paths.
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column: Details Box (60% width on md and up) */}
        <Grid size={{ xs: 12, md: 7, lg: 7.5 }}>
          <GlassCard
            key={activeIdx} // Forces re-mount to trigger the CSS keyframes animation
            sx={{
              p: { xs: 3, sm: 4 },
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 3.5,
              animation: "fadeInUpDetails 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              "@keyframes fadeInUpDetails": {
                "0%": { opacity: 0, transform: "translateY(12px)" },
                "100%": { opacity: 1, transform: "translateY(0)" }
              }
            }}
          >
            {/* Header info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isLight ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.12)",
                  color: "primary.main",
                  boxShadow: isLight ? "0 4px 12px rgba(79,70,229,0.1)" : "0 4px 12px rgba(129,140,248,0.15)",
                }}
              >
                {activeFeature.icon}
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 900, color: "text.primary", lineHeight: 1.2 }}>
                  {activeFeature.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  System Breakdown & Specifications
                </Typography>
              </Box>
            </Box>

            {/* Challenge & Solution Texts */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 850, color: "error.main", display: "flex", alignItems: "center", gap: 1, mb: 0.8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: theme.palette.error.main, display: "inline-block" }}></span>
                  Engineering Challenge
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {activeDetails.challenge}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 850, color: "primary.main", display: "flex", alignItems: "center", gap: 1, mb: 0.8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: primaryColor, display: "inline-block" }}></span>
                  Production Solution
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {activeDetails.solution}
                </Typography>
              </Box>
            </Box>

            {/* Tech Stack Badges */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", letterSpacing: "0.5px", textTransform: "uppercase", display: "block", mb: 1.5 }}>
                Technologies Utilized
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {activeDetails.techStack.map((tech, tIdx) => (
                  <Box
                    key={tIdx}
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      px: 2,
                      py: 0.6,
                      borderRadius: "6px",
                      backgroundColor: isLight ? "rgba(0, 0, 0, 0.03)" : "rgba(255, 255, 255, 0.04)",
                      border: `1px solid ${isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.06)"}`,
                      color: "text.secondary"
                    }}
                  >
                    {tech}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Metrics cards grid */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", letterSpacing: "0.5px", textTransform: "uppercase", display: "block", mb: 1.5 }}>
                Performance Metrics
              </Typography>
              <Grid container spacing={2}>
                {activeDetails.metrics.map((metric, mIdx) => (
                  <Grid size={{ xs: 4 }} key={mIdx}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: "10px",
                        textAlign: "center",
                        backgroundColor: isLight ? "rgba(0, 0, 0, 0.01)" : "rgba(255, 255, 255, 0.02)",
                        border: `1px solid ${isLight ? "rgba(0, 0, 0, 0.03)" : "rgba(255, 255, 255, 0.03)"}`,
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 900, color: "primary.main", lineHeight: 1.1 }}>
                        {metric.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, fontSize: "0.7rem" }}>
                        {metric.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Flow Visualizer Box */}
            <Box sx={{ mt: "auto", pt: 1.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", letterSpacing: "0.5px", textTransform: "uppercase", display: "block", mb: 1.5 }}>
                System Flow Diagram
              </Typography>
              <DiagramBoard sx={{ p: 2, minHeight: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box sx={{ width: "100%", maxWidth: 500 }}>
                  <FeatureDiagram index={activeIdx} theme={theme} primaryColor={primaryColor} />
                </Box>
              </DiagramBoard>
            </Box>
          </GlassCard>
        </Grid>

        {/* Right Column: Cards selector (40% width on md and up) */}
        <Grid size={{ xs: 12, md: 5, lg: 4.5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
            {features.map((feature, idx) => {
              const isActive = activeIdx === idx;
              return (
                <GlassCard
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  sx={{
                    p: 2.2,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderColor: isActive ? "primary.main" : isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)",
                    borderWidth: isActive ? 2 : 1,
                    backgroundColor: isActive 
                      ? (isLight ? "rgba(79,70,229,0.04)" : "rgba(129,140,248,0.06)")
                      : (isLight ? "rgba(255,255,255,0.55)" : "rgba(30, 41, 59, 0.5)"),
                    boxShadow: isActive 
                      ? (isLight ? "0 4px 16px rgba(79,70,229,0.08)" : "0 4px 16px rgba(129,140,248,0.08)")
                      : "none",
                    transform: isActive ? "translateX(-4px)" : "none",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "@media (hover: hover)": {
                      "&:hover": {
                        transform: isActive ? "translateX(-4px)" : "translateY(-2px)",
                        borderColor: isActive ? "primary.main" : isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)",
                      }
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isActive
                        ? (isLight ? "rgba(79,70,229,0.1)" : "rgba(129,140,248,0.2)")
                        : (isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)"),
                      color: isActive ? "primary.main" : "text.secondary",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: isActive ? 900 : 750,
                        color: isActive ? "primary.main" : "text.primary",
                        fontSize: "0.85rem",
                        lineHeight: 1.2,
                        mb: 0.3
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem", display: "block" }}>
                      {feature.shortTitle} • Review specs
                    </Typography>
                  </Box>
                </GlassCard>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default KeyFeaturesSection;
