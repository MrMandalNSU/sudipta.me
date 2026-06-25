import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { systemNodes } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";

const userFlowSteps = [
  { key: "client", label: "User Request", sub: "Client" },
  { key: "client", label: "Next BFF Proxy", sub: "Same-Origin / CSRF" },
  { key: "api", label: "Express Router", sub: "Auth & Role Check" },
  { key: "api", label: "Cache Check", sub: "Local DB Check" },
  { key: "postgres", label: "Query Cache", sub: "Postgres / Prisma" },
  { key: "postgres", label: "PostgreSQL DB", sub: "Persistent Cache" },
  { key: "client", label: "Render Stats", sub: "Update UI Dashboard" },
];

const syncFlowSteps = [
  { key: "sync", label: "GitHub Actions", sub: "Cron Trigger (12h)" },
  { key: "sync", label: "Staggered Sync", sub: "2000ms Request Loop" },
  { key: "riot", label: "Riot API Rate Limit", sub: "Concurrency Check" },
  { key: "riot", label: "Ingest & Parse", sub: "Riot Games API" },
  { key: "postgres", label: "PostgreSQL DB", sub: "Persistent Cache" },
];

const SystemDesignSection = ({
  theme,
  activeSystemNode,
  setActiveSystemNode,
  primaryColor
}) => {
  const [activeMobileFlow, setActiveMobileFlow] = useState("request");

  useEffect(() => {
    if (activeSystemNode === "sync" || activeSystemNode === "riot") {
      setActiveMobileFlow("sync");
    } else if (
      activeSystemNode === "client" ||
      activeSystemNode === "discord" ||
      activeSystemNode === "api"
    ) {
      setActiveMobileFlow("request");
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
      <SectionHeading theme={theme} sx={{ order: 0 }}>System Design</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 700, order: 0 }}>
        An overview of ValoDash's internal scheduling and request routing framework.
        Click any node to see its role in the sync pipeline.
      </Typography>

      {/* Node Selector Chips */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mb: 3,
          p: 1.5,
          borderRadius: 2,
          backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)"}`,
          order: 1
        }}
      >
        {Object.entries(systemNodes).map(([key, val]) => {
          const isActive = activeSystemNode === key;
          return (
            <Button
              key={key}
              onClick={() => setActiveSystemNode(key)}
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.8rem",
                borderRadius: 1.5,
                px: 2,
                py: 0.6,
                backgroundColor: isActive ? theme.palette.primary.main : "transparent",
                color: isActive ? "#FFF" : "text.secondary",
                border: `1px solid ${isActive ? "transparent" : theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
                "&:hover": {
                  backgroundColor: isActive ? theme.palette.primary.main : theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
                  transform: "none",
                  boxShadow: "none",
                },
              }}
              startIcon={React.cloneElement(val.icon, { sx: { fontSize: 16 } })}
            >
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                {val.title.split(" (")[0]}
              </Box>
              <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                {val.shortTitle || val.title.split(" (")[0]}
              </Box>
            </Button>
          );
        })}
      </Box>

      {/* Node Detail Card */}
      <GlassCard sx={{ p: 3, mb: 3, order: { xs: 3, md: 2 } }}>
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
                ROLE IN WORKFLOW
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ fontStyle: "italic", fontWeight: 500, lineHeight: 1.6 }}>
                "{systemNodes[activeSystemNode].role}"
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </GlassCard>

      {/* Redesigned Flowchart-style SVG Diagram */}
      <DiagramBoard sx={{ mb: 3, order: { xs: 2, md: 3 } }}>
        {/* Desktop View SVG Flowchart */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <svg
            width="100%"
            viewBox="40 10 995 372"
            style={{ display: "block", maxWidth: "100%", height: "auto" }}
          >
            <defs>
              <marker id="arrowHead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
              </marker>
              <marker id="arrowHeadMuted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"} />
              </marker>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection Lines */}
            {[
              { from: "client", to: "client", path: "M 100 88 L 100 145", label: "request", labelX: 148, labelY: 114, labelWidth: 58 },
              { from: "client", to: "discord", path: "M 160 63 L 240 63" },
              { from: "client", to: "api", path: "M 170 172 L 300 172", label: "cookies + CSRF", labelX: 235, labelY: 154, labelWidth: 98 },
              { from: "discord", to: "api", path: "M 305 88 L 305 130 L 365 130 L 365 145", label: "OAuth callback", labelX: 365, labelY: 116, labelWidth: 92 },
              { from: "api", to: "api", path: "M 430 172 L 460 172 L 460 63 L 500 63", label: "auth OK", labelX: 468, labelY: 120, labelWidth: 58 },
              { from: "api", to: "postgres", path: "M 620 63 L 760 63", label: "cache hit", labelX: 690, labelY: 48, labelWidth: 66 },
              { from: "postgres", to: "postgres", path: "M 890 63 L 910 63 L 910 150 L 930 150", label: "Prisma read", labelX: 928, labelY: 106, vertical: true, labelWidth: 70 },
              { from: "api", to: "sync", path: "M 560 103 L 560 232 L 280 232 L 280 255" },
              { from: "sync", to: "api", path: "M 100 255 L 100 220 L 365 220 L 365 197", label: "cron webhook", labelX: 235, labelY: 207, labelWidth: 92 },
              { from: "sync", to: "riot", path: "M 340 280 L 430 280", label: "stagger 2s", labelX: 385, labelY: 265, labelWidth: 78 },
              { from: "riot", to: "riot", path: "M 550 280 L 650 280", label: "within limit", labelX: 600, labelY: 265, labelWidth: 82 },
              { from: "riot", to: "postgres", path: "M 770 280 L 910 280 L 910 188 L 930 188", label: "upsert cache", labelX: 850, labelY: 262, labelWidth: 88 },
              { from: "postgres", to: "client", path: "M 980 218 L 980 289", label: "stats payload", labelX: 980, labelY: 253, labelWidth: 88 },
            ].map((line, lIdx) => {
              const isActive = activeSystemNode === line.from || activeSystemNode === line.to;
              const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
              const strokeWidth = isActive ? 2.5 : 1.5;
              const marker = isActive ? "url(#arrowHead)" : "url(#arrowHeadMuted)";
              const dashStyle = line.from === "sync" || line.to === "sync" ? "5,3" : undefined;
              const labelWidth = line.labelWidth || 84;
              return (
                <g key={lIdx}>
                  <path
                    d={line.path}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    markerEnd={marker}
                    strokeDasharray={dashStyle}
                    style={{
                      transition: "all 0.3s ease",
                    }}
                  />
                  {line.label && (
                    <g transform={line.vertical ? `rotate(-90 ${line.labelX} ${line.labelY})` : undefined}>
                      <rect
                        x={line.labelX - (labelWidth / 2)}
                        y={line.labelY - 11}
                        width={labelWidth}
                        height={17}
                        rx={4}
                        fill={theme.palette.mode === "light" ? "rgba(255,255,255,0.76)" : "rgba(15,23,42,0.74)"}
                        stroke={theme.palette.mode === "light" ? "rgba(79,70,229,0.12)" : "rgba(129,140,248,0.16)"}
                        strokeWidth="0.8"
                      />
                      <text
                        x={line.labelX}
                        y={line.labelY}
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight="700"
                        fill={isActive ? primaryColor : theme.palette.text.secondary}
                        fontFamily="Inter, sans-serif"
                      >
                        {line.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {[
              { key: "client", type: "start", x: 40, y: 38, w: 120, h: 50, rx: 25, cx: 100, cy: 63, label: "User Request", sub: "Client" },
              { key: "discord", type: "process", x: 240, y: 38, w: 130, h: 50, rx: 8, cx: 305, cy: 63, label: "Discord Portal", sub: "OAuth2 Login" },
              { key: "api", type: "decision", d: "M 560 23 L 620 63 L 560 103 L 500 63 Z", cx: 560, cy: 63, label: "Cached?", sub: "Local DB Check" },
              { key: "postgres", type: "process", x: 760, y: 38, w: 130, h: 50, rx: 8, cx: 825, cy: 63, label: "Query Cache", sub: "Postgres / Prisma" },
              { key: "client", type: "process", x: 40, y: 145, w: 130, h: 50, rx: 8, cx: 105, cy: 170, label: "Next BFF", sub: "Cookie + CSRF" },
              { key: "api", type: "process", x: 300, y: 145, w: 130, h: 50, rx: 8, cx: 365, cy: 170, label: "Express Router", sub: "Auth & Role Check" },
              { key: "postgres", type: "cylinder", x: 930, y: 138, w: 100, h: 70, cx: 980, cy: 173, label: "PostgreSQL DB", sub: "Postgres Cache" },
              { key: "sync", type: "process", x: 40, y: 255, w: 120, h: 50, rx: 8, cx: 100, cy: 280, label: "GitHub Actions", sub: "Cron Trigger (12h)" },
              { key: "sync", type: "process", x: 220, y: 255, w: 120, h: 50, rx: 8, cx: 280, cy: 280, label: "Staggered Sync", sub: "2000ms Delay" },
              { key: "riot", type: "decision", d: "M 490 240 L 550 280 L 490 320 L 430 280 Z", cx: 490, cy: 280, label: "Rate Limit?", sub: "Riot API Limit" },
              { key: "riot", type: "process", x: 650, y: 255, w: 120, h: 50, rx: 8, cx: 710, cy: 280, label: "Ingest & Parse", sub: "Riot API" },
              { key: "client", type: "process", x: 930, y: 295, w: 100, h: 50, rx: 8, cx: 980, cy: 320, label: "Render Stats", sub: "Update UI" },
            ].map((node, nIdx) => {
              const isActive = activeSystemNode === node.key;
              const fillBg = isActive
                ? (theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.12)")
                : (theme.palette.mode === "light" ? "rgba(255,255,255,0.85)" : "rgba(17,24,39,0.8)");
              const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
              const strokeWidth = isActive ? 2.5 : 1.2;
              const glowFilter = isActive ? "url(#glow)" : undefined;

              return (
                <g key={nIdx} style={{ cursor: "pointer" }} onClick={() => setActiveSystemNode(node.key)}>
                  {node.type === "start" && (
                    <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={node.rx} fill={fillBg} stroke={strokeColor} strokeWidth={strokeWidth} filter={glowFilter} />
                  )}
                  {node.type === "process" && (
                    <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={node.rx} fill={fillBg} stroke={strokeColor} strokeWidth={strokeWidth} filter={glowFilter} />
                  )}
                  {node.type === "decision" && (
                    <path d={node.d} fill={fillBg} stroke={strokeColor} strokeWidth={strokeWidth} filter={glowFilter} />
                  )}
                  {node.type === "cylinder" && (
                    <g filter={glowFilter}>
                      {/* Cylinder Bottom body */}
                      <path
                        d={`M ${node.x} ${node.y + 12} L ${node.x} ${node.y + node.h} A ${node.w / 2} 12 0 0 0 ${node.x + node.w} ${node.y + node.h} L ${node.x + node.w} ${node.y + 12} Z`}
                        fill={fillBg}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      {/* Cylinder Top Ellipse */}
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

                  {/* Title text */}
                  <text
                    x={node.cx}
                    y={node.cy - 2}
                    textAnchor="middle"
                    fontWeight="800"
                    fill={theme.palette.text.primary}
                    fontSize="11"
                    fontFamily="Inter, sans-serif"
                  >
                    {node.label}
                  </text>
                  {/* Sub text */}
                  <text
                    x={node.cx}
                    y={node.cy + 11}
                    textAnchor="middle"
                    fill={theme.palette.text.secondary}
                    fontSize="9.5"
                    fontFamily="Inter, sans-serif"
                  >
                    {node.sub}
                  </text>
                </g>
              );
            })}

            {/* Legend */}
            <text x="40" y="375" fontSize="10.5" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
              -- Process Flow   - - Async/Cron Trigger   Click nodes to highlight execution pathways
            </text>
          </svg>
        </Box>

        {/* Mobile View Vertical Flowchart */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          {/* Mobile Flow Tab Switcher */}
          <Box
            sx={{
              display: "flex",
              borderRadius: 2,
              p: 0.5,
              mb: 3,
              backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            <Button
              fullWidth
              onClick={() => setActiveMobileFlow("request")}
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: activeMobileFlow === "request" ? 800 : 600,
                fontSize: "0.8rem",
                borderRadius: 1.5,
                py: 0.8,
                backgroundColor: activeMobileFlow === "request" ? (theme.palette.mode === "light" ? "#FFF" : "rgba(255,255,255,0.08)") : "transparent",
                color: activeMobileFlow === "request" ? "primary.main" : "text.secondary",
                boxShadow: activeMobileFlow === "request" && theme.palette.mode === "light" ? "0 2px 6px rgba(0,0,0,0.05)" : "none",
                border: "none",
                "&:hover": {
                  backgroundColor: activeMobileFlow === "request" ? (theme.palette.mode === "light" ? "#FFF" : "rgba(255,255,255,0.08)") : "rgba(0,0,0,0.02)",
                }
              }}
            >
              Request & Data Flow
            </Button>
            <Button
              fullWidth
              onClick={() => setActiveMobileFlow("sync")}
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: activeMobileFlow === "sync" ? 800 : 600,
                fontSize: "0.8rem",
                borderRadius: 1.5,
                py: 0.8,
                backgroundColor: activeMobileFlow === "sync" ? (theme.palette.mode === "light" ? "#FFF" : "rgba(255,255,255,0.08)") : "transparent",
                color: activeMobileFlow === "sync" ? "primary.main" : "text.secondary",
                boxShadow: activeMobileFlow === "sync" && theme.palette.mode === "light" ? "0 2px 6px rgba(0,0,0,0.05)" : "none",
                border: "none",
                "&:hover": {
                  backgroundColor: activeMobileFlow === "sync" ? (theme.palette.mode === "light" ? "#FFF" : "rgba(255,255,255,0.08)") : "rgba(0,0,0,0.02)",
                }
              }}
            >
              Background Sync Flow
            </Button>
          </Box>

          {/* Vertical Flow Steps */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pl: 1, pr: 1 }}>
            {(activeMobileFlow === "request" ? userFlowSteps : syncFlowSteps).map((step, idx, arr) => {
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
                    backgroundColor: isActive
                      ? (theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.1)")
                      : "transparent",
                    border: `1px solid ${isActive ? primaryColor : "transparent"}`,
                    boxShadow: isActive ? `0 4px 12px ${theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.1)"}` : "none",
                    "&:hover": {
                      backgroundColor: isActive
                        ? (theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.12)")
                        : (theme.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)"),
                      borderColor: isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"),
                    }
                  }}
                >
                  {/* Left Icon with connector line */}
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isActive
                          ? primaryColor
                          : (theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)"),
                        color: isActive ? "#FFF" : "text.secondary",
                        border: `1px solid ${isActive ? "transparent" : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)")}`,
                        transition: "all 0.2s ease",
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
                          height: 24, // gap: 3 (24px)
                          width: 2,
                          borderLeft: `2px dashed ${isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)")}`,
                          zIndex: 0,
                        }}
                      />
                    )}
                  </Box>

                  {/* Text Details */}
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
    </Box>
  );
};

export default SystemDesignSection;
