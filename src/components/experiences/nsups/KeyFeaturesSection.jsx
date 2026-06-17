import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { features } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";

// Detailed technical specifications for each engineering system/feature
const featureDetails = [
  {
    challenge: "Administering profile creation and batch schedules for over 500 bootcampers manually via spreadsheets, leading to errors and duplicates.",
    solution: "Developed a secure REST API participant backend. It validates user data, checks handle formats, assigns batch parameters, and exposes clean student CRUD endpoints.",
    metrics: [
      { label: "Verify Time", value: "<100ms" },
      { label: "Success Rate", value: "100%" },
      { label: "Scale Managed", value: "500+ Users" }
    ],
    techStack: ["Laravel REST API", "Eloquent ORM", "Request Validation", "MySQL Schemas"]
  },
  {
    challenge: "Fetching solve counts from multiple online judges with distinct API responses, anti-scraping rate blocks, and high network latencies.",
    solution: "Engineered a scheduled scraping daemon. It queries Codeforces REST endpoints and parses HTML targets for Vjudge, AtCoder, and LightOJ, rotating proxy nodes.",
    metrics: [
      { label: "Parse Speed", value: "~250ms" },
      { label: "Judges Crawled", value: "4 Platforms" },
      { label: "Ingestion Scale", value: "50k+ Solves" }
    ],
    techStack: ["Web Scraping", "Proxy Rotation", "Cron Daemons", "PHP Guzzle HTTP"]
  },
  {
    challenge: "Compiling live scoreboard rankings dynamically based on problem weights and penalty indexes across thousands of rows without database locks.",
    solution: "Built a Live Leaderboard Sorter calculating scores within batch boundaries. Caches rankings in Redis sorted sets, preventing redundant SQL database aggregations.",
    metrics: [
      { label: "Sort Rank Time", value: "<15ms" },
      { label: "Redis Cache Hit", value: "98.5%" },
      { label: "Rank Updates", value: "Realtime" }
    ],
    techStack: ["Redis Sorted Sets", "Live Score Compilers", "SQL Aggregations", "Cache Warming"]
  },
  {
    challenge: "Visualizing student participation metrics and historic activity histories dynamically without generating slow database index checks.",
    solution: "Developed a daily solve delta engine mapping submission counts into contribution arrays, generating GitHub-style analytics grids directly in the dashboard.",
    metrics: [
      { label: "Delta Fetch Time", value: "<10ms" },
      { label: "Streak Log", value: "100+ Days" },
      { label: "JSON Output Size", value: "<5KB" }
    ],
    techStack: ["Activity Deltas", "MySQL Indexing", "Contribution API", "Dashboard Portal"]
  },
  {
    challenge: "Securing administrative endpoints, batch configurations, and user credentials from unauthorized student modification.",
    // Corrected the typo in 'privileges'
    solution: "Auth Gate middleware verifying API keys, user roles, and whitelists to manage batches safely.",
    metrics: [
      { label: "Gate Verification", value: "<1ms" },
      { label: "Gate Security", value: "100%" },
      { label: "Access Checked", value: "Realtime" }
    ],
    // Corrected the typo in 'Middlewares'
    techStack: ["API Tokens Checking", "Role Authentication", "Admin Middlewares", "Auth Gate Checks"]
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
    case 0: // Bootcamp Management
      return (
        <svg viewBox="0 0 500 160" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
            </marker>
          </defs>

          <rect x="20" y="50" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="75" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Student UI</text>
          <text x="75" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">Register Handles</text>

          <rect x="185" y="50" width="130" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="250" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Laravel API</text>
          <text x="250" y="95" textAnchor="middle" fill={mutedColor} fontSize="8.5" fontFamily="Inter, sans-serif">Request Validation</text>

          <rect x="370" y="50" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="425" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">MySQL DB</text>
          <text x="425" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">Persist Profile</text>

          {/* Paths */}
          <path d="M 130 80 H 185" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="157.5" y="70" textAnchor="middle" fill={mutedColor} fontSize="8" fontFamily="monospace">Payload</text>

          <path d="M 315 80 H 370" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="342.5" y="70" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8" fontFamily="monospace">Valid</text>
        </svg>
      );
    case 1: // Automated OJ Crawler
      return (
        <svg viewBox="0 0 500 160" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
            </marker>
          </defs>

          <rect x="20" y="50" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="75" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Scraper Daemon</text>
          <text x="75" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">Scheduled Cron</text>

          <rect x="180" y="50" width="140" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="250" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Proxy Rotation</text>
          <text x="250" y="95" textAnchor="middle" fill={mutedColor} fontSize="8.5" fontFamily="Inter, sans-serif">IP Pool Manager</text>

          <rect x="370" y="50" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="425" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Online Judges</text>
          <text x="425" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">CF / Vjudge Scraped</text>

          {/* Paths */}
          <path d="M 130 80 H 180" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="155" y="70" textAnchor="middle" fill={mutedColor} fontSize="8" fontFamily="monospace">Query Queue</text>

          <path d="M 320 80 H 370" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="345" y="70" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8" fontFamily="monospace">Fetch API</text>
        </svg>
      );
    case 2: // Leaderboard Aggregator
      return (
        <svg viewBox="0 0 500 160" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
            </marker>
          </defs>

          <rect x="20" y="50" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="75" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Submissions Log</text>
          <text x="75" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">MySQL Solved</text>

          <rect x="180" y="50" width="140" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="250" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Live Sorter</text>
          <text x="250" y="95" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8.5" fontFamily="monospace">Rank Compiler</text>

          <rect x="370" y="50" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="425" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Redis Store</text>
          <text x="425" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">Sorted Sets Cache</text>

          {/* Paths */}
          <path d="M 130 80 H 180" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="155" y="70" textAnchor="middle" fill={mutedColor} fontSize="8" fontFamily="monospace">Raw Solves</text>

          <path d="M 320 80 H 370" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="345" y="70" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8" fontFamily="monospace">Warm Cache</text>
        </svg>
      );
    case 3: // Solve Stats Dashboard
      return (
        <svg viewBox="0 0 500 160" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
            </marker>
          </defs>

          <rect x="20" y="50" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="75" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Daily Solves Stats</text>
          <text x="75" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">Index Table</text>

          <rect x="180" y="50" width="140" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="250" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Grid Serializer</text>
          <text x="250" y="95" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8.5" fontFamily="monospace">Contribution Matrix</text>

          <rect x="370" y="50" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="425" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Client UI</text>
          <text x="425" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">Activity Heatmap</text>

          {/* Paths */}
          <path d="M 130 80 H 180" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="155" y="70" textAnchor="middle" fill={mutedColor} fontSize="8" fontFamily="monospace">Solved delta</text>

          <path d="M 320 80 H 370" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="345" y="70" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8" fontFamily="monospace">JSON output</text>
        </svg>
      );
    case 4: // Session Gate Middleware
      return (
        <svg viewBox="0 0 500 160" width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
            </marker>
          </defs>

          <rect x="20" y="50" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="75" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Admin Board</text>
          <text x="75" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">Config Panels</text>

          <rect x="180" y="50" width="140" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="250" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Session Gate</text>
          <text x="250" y="95" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8.5" fontFamily="monospace">Auth Middleware</text>

          <rect x="370" y="50" width="110" height="60" rx="8" fill={boxBg} stroke={strokeColor} strokeWidth="1.5" />
          <text x="425" y="80" textAnchor="middle" fill={textColor} fontWeight="800" fontSize="11" fontFamily="Inter, sans-serif">Database Configuration</text>
          <text x="425" y="95" textAnchor="middle" fill={mutedColor} fontSize="9" fontFamily="Inter, sans-serif">Write Batches</text>

          {/* Paths */}
          <path d="M 130 80 H 180" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="155" y="70" textAnchor="middle" fill={mutedColor} fontSize="8" fontFamily="monospace">REST Call</text>

          <path d="M 320 80 H 370" stroke={primaryColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <text x="345" y="70" textAnchor="middle" fill={primaryColor} fontWeight="800" fontSize="8" fontFamily="monospace">Access OK</text>
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
        Explore the primary engineering modules and features powering NSUPS Bootcamp. Click any system card on the right to review its system challenge, production metrics, tech stacks, and flow paths.
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
