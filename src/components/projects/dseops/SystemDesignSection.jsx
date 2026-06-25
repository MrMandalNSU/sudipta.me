import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { systemNodes } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";

const userFlowSteps = [
  { key: "client", label: "User Request", sub: "Client Page" },
  { key: "next_proxy", label: "Next API Proxy", sub: "Same-origin /api" },
  { key: "api", label: "Express API", sub: "Private Backend" },
  { key: "nodecache", label: "NodeCache", sub: "Hit / Miss / Set" },
  { key: "supabase_db", label: "DB Fallback", sub: "Supabase PostgreSQL" },
  { key: "client", label: "Render View", sub: "Charts & CSV URIs" },
];

const syncFlowSteps = [
  { key: "cron", label: "Cron Trigger", sub: "Daily EOD Webhook" },
  { key: "api", label: "Authorize Cron", sub: "Validate Secret Key" },
  { key: "scraper", label: "HTML Scraper", sub: "Parse Stock Lists" },
  { key: "supabase_db", label: "SQL Archive", sub: "Cascading Refresh" },
  { key: "supabase_storage", label: "S3 Archival", sub: "Direct CSV Upload" },
  { key: "nodecache", label: "Cache Flush", sub: "Refresh Next Read" },
];

const SystemDesignSection = ({
  theme,
  activeSystemNode,
  setActiveSystemNode,
  primaryColor
}) => {
  const [activeMobileFlow, setActiveMobileFlow] = useState("request");

  useEffect(() => {
    if (
      activeSystemNode === "cron" ||
      activeSystemNode === "scraper" ||
      activeSystemNode === "dse"
    ) {
      setActiveMobileFlow("sync");
    } else if (
      activeSystemNode === "client" ||
      activeSystemNode === "next_proxy" ||
      activeSystemNode === "api" ||
      activeSystemNode === "supabase_storage"
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
        An architectural view of DSE Ops' automated EOD parsing and client-serving workflows.
        Click any node to see its role in the pipeline.
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
            viewBox="0 0 1080 360"
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

            <text x="35" y="38" fontSize="11" fontWeight="800" fill={primaryColor} fontFamily="Inter, sans-serif">
              Read request path
            </text>
            <text x="35" y="213" fontSize="11" fontWeight="800" fill={primaryColor} fontFamily="Inter, sans-serif">
              Daily scrape and refresh path
            </text>

            {/* Connection Lines */}
            {[
              { from: "client", to: "next_proxy", path: "M 155 92 L 205 92" },
              { from: "next_proxy", to: "api", path: "M 345 92 L 385 92" },
              { from: "api", to: "nodecache", path: "M 525 92 L 565 92" },
              { from: "nodecache", to: "client", path: "M 635 65 L 635 48 L 95 48 L 95 65", cacheHit: true },
              { from: "nodecache", to: "supabase_db", path: "M 705 84 L 890 84", cacheMiss: true },
              { from: "supabase_db", to: "nodecache", path: "M 890 122 L 795 122 L 795 126 L 705 126" },
              { from: "api", to: "supabase_storage", path: "M 455 119 L 455 188 L 960 188 L 960 230" },
              { from: "cron", to: "api", path: "M 155 272 L 265 272 L 265 145 L 455 145 L 455 119" },
              { from: "api", to: "scraper", path: "M 455 119 L 455 245" },
              { from: "scraper", to: "dse", path: "M 525 275 L 565 275" },
              { from: "scraper", to: "supabase_db", path: "M 525 240 L 760 240 L 760 108 L 890 108" },
              { from: "scraper", to: "supabase_storage", path: "M 525 306 L 760 306 L 760 278 L 890 278" },
              { from: "api", to: "nodecache", path: "M 525 108 L 545 108 L 545 178 L 635 178 L 635 125", cacheRefresh: true },
            ].map((line, lIdx) => {
              const isActive = activeSystemNode === line.from || activeSystemNode === line.to;
              const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
              const strokeWidth = isActive ? 2.5 : 1.5;
              const marker = isActive ? "url(#arrowHead)" : "url(#arrowHeadMuted)";
              const dashStyle = line.from === "cron" || line.to === "cron" || line.cacheRefresh || line.cacheHit ? "5,3" : undefined;
              return (
                <path
                  key={lIdx}
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
              );
            })}

            {/* Nodes */}
            {[
              { key: "client", type: "start", x: 35, y: 65, w: 120, h: 54, rx: 27, cx: 95, cy: 92, label: "Next.js UI", sub: "Client View" },
              { key: "next_proxy", type: "process", x: 205, y: 65, w: 140, h: 54, rx: 8, cx: 275, cy: 92, label: "Next API Proxy", sub: "Same-origin" },
              { key: "api", type: "process", x: 385, y: 65, w: 140, h: 54, rx: 8, cx: 455, cy: 92, label: "Express API", sub: "Private backend" },
              { key: "nodecache", type: "process", x: 565, y: 65, w: 140, h: 60, rx: 8, cx: 635, cy: 95, label: "NodeCache", sub: "Hit/Miss/Flush" },
              { key: "supabase_db", type: "cylinder", x: 890, y: 45, w: 140, h: 94, cx: 960, cy: 92, label: "Supabase DB", sub: "PostgreSQL" },
              { key: "cron", type: "process", x: 35, y: 245, w: 120, h: 54, rx: 8, cx: 95, cy: 272, label: "cron-job.org", sub: "Daily trigger" },
              { key: "scraper", type: "process", x: 385, y: 245, w: 140, h: 60, rx: 8, cx: 455, cy: 275, label: "HTML Scraper", sub: "Web Parser" },
              { key: "dse", type: "process", x: 565, y: 245, w: 140, h: 60, rx: 8, cx: 635, cy: 275, label: "sme.dsebd.org", sub: "External Source" },
              { key: "supabase_storage", type: "cylinder", x: 890, y: 230, w: 140, h: 94, cx: 960, cy: 277, label: "S3 Storage", sub: "CSV Files" },
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

            <text x="560" y="40" fontSize="9.5" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
              cache hit response
            </text>
            <text x="750" y="76" fontSize="9.5" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
              cache miss
            </text>
            <text x="580" y="170" fontSize="9.5" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
              scrape-success flush
            </text>
            <text x="612" y="236" fontSize="9.5" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
              parse source
            </text>
            <text x="682" y="231" fontSize="9.5" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
              save rows
            </text>
            <text x="686" y="326" fontSize="9.5" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
              save CSV
            </text>

            {/* Legend */}
            <text x="20" y="342" fontSize="10.5" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
              Top lane: browser reads through proxy, API, and cache. Bottom lane: cron scrape writes DB/S3, then flushes NodeCache.
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
                    boxShadow: isActive ? `0 4px 12px ${theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.1)"}` : "none",
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
                          height: 24,
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
