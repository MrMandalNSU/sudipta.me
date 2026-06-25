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
            viewBox="0 0 1040 390"
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
              { from: "client", to: "next_proxy", path: "M 160 75 L 210 75" },
              { from: "next_proxy", to: "api", path: "M 340 75 L 390 75 L 390 150 L 410 150" },
              { from: "api", to: "nodecache", path: "M 540 150 L 590 150" },
              { from: "nodecache", to: "supabase_db", path: "M 720 150 L 835 150" },
              { from: "supabase_db", to: "nodecache", path: "M 835 185 L 755 185 L 755 175 L 720 175" },
              { from: "nodecache", to: "client", path: "M 655 125 L 655 105 L 500 105 L 500 340 L 100 340 L 100 290" },
              { from: "api", to: "scraper", path: "M 475 125 L 475 80" },
              { from: "scraper", to: "dse", path: "M 540 55 L 590 55" },
              { from: "scraper", to: "supabase_db", path: "M 540 65 L 790 65 L 790 135 L 835 135" },
              { from: "scraper", to: "supabase_storage", path: "M 475 80 L 475 285 L 835 285" },
              { from: "api", to: "supabase_storage", path: "M 475 185 L 475 305 L 835 305" },
              { from: "cron", to: "api", path: "M 160 275 L 250 275 L 250 175 L 410 175" },
              { from: "api", to: "nodecache", path: "M 455 185 L 455 225 L 655 225 L 655 185", cacheRefresh: true },
            ].map((line, lIdx) => {
              const isActive = activeSystemNode === line.from || activeSystemNode === line.to;
              const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
              const strokeWidth = isActive ? 2.5 : 1.5;
              const marker = isActive ? "url(#arrowHead)" : "url(#arrowHeadMuted)";
              const dashStyle = line.from === "cron" || line.to === "cron" || line.cacheRefresh ? "5,3" : undefined;
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
              { key: "client", type: "start", x: 40, y: 50, w: 120, h: 50, rx: 25, cx: 100, cy: 75, label: "Next.js UI", sub: "Client View" },
              { key: "next_proxy", type: "process", x: 210, y: 50, w: 130, h: 50, rx: 8, cx: 275, cy: 75, label: "Next API Proxy", sub: "Server route" },
              { key: "api", type: "process", x: 410, y: 125, w: 130, h: 60, rx: 8, cx: 475, cy: 155, label: "Express API", sub: "Private backend" },
              { key: "nodecache", type: "process", x: 590, y: 125, w: 130, h: 60, rx: 8, cx: 655, cy: 155, label: "NodeCache", sub: "Hit/Miss/Flush" },
              { key: "scraper", type: "process", x: 410, y: 30, w: 130, h: 50, rx: 8, cx: 475, cy: 55, label: "HTML Scraper", sub: "Web Parser" },
              { key: "dse", type: "process", x: 590, y: 30, w: 130, h: 50, rx: 8, cx: 655, cy: 55, label: "sme.dsebd.org", sub: "External Source" },
              { key: "supabase_db", type: "cylinder", x: 835, y: 115, w: 120, h: 80, cx: 895, cy: 155, label: "Supabase DB", sub: "PostgreSQL" },
              { key: "supabase_storage", type: "cylinder", x: 835, y: 255, w: 120, h: 80, cx: 895, cy: 295, label: "S3 Storage", sub: "CSV Files" },
              { key: "cron", type: "process", x: 40, y: 250, w: 120, h: 50, rx: 8, cx: 100, cy: 275, label: "cron-job.org", sub: "Daily trigger" },
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

            <text x="735" y="145" fontSize="9.5" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
              cache miss
            </text>
            <text x="505" y="218" fontSize="9.5" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
              scrape-success flush
            </text>

            {/* Legend */}
            <text x="20" y="370" fontSize="10.5" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
              Direct lines: query/data flow  Dashed lines: cron webhook or scrape-success cache flush  Click nodes to highlight pathways
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
