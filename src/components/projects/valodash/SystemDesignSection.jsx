import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { systemNodes } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";

const SystemDesignSection = ({
  theme,
  activeSystemNode,
  setActiveSystemNode,
  primaryColor
}) => {
  return (
    <Box id="architecture" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>System Design</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
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
              {val.title.split(" (")[0]}
            </Button>
          );
        })}
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
      <DiagramBoard sx={{ mt: 3 }}>
        <svg
          width="100%"
          viewBox="0 0 920 360"
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
            { from: "client", to: "discord", path: "M 160 65 L 200 65" },
            { from: "discord", to: "api", path: "M 320 65 L 380 65" },
            { from: "api", to: "postgres", path: "M 500 65 L 560 65" },
            { from: "postgres", to: "postgres", path: "M 690 65 L 750 115" },
            { from: "api", to: "sync", path: "M 440 100 L 440 180 L 285 180 L 285 220" },
            { from: "sync", to: "sync", path: "M 160 245 L 220 245" },
            { from: "sync", to: "riot", path: "M 350 245 L 410 245" },
            { from: "riot", to: "postgres", path: "M 540 245 L 630 245 L 630 140 L 750 140" },
            { from: "postgres", to: "client", path: "M 810 150 L 810 270" },
          ].map((line, lIdx) => {
            const isActive = activeSystemNode === line.from || activeSystemNode === line.to;
            const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
            const strokeWidth = isActive ? 2.5 : 1.5;
            const marker = isActive ? "url(#arrowHead)" : "url(#arrowHeadMuted)";
            const dashStyle = line.from === "sync" || line.to === "sync" ? "5,3" : undefined;
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
            { key: "client", type: "start", x: 40, y: 40, w: 120, h: 50, rx: 25, cx: 100, cy: 65, label: "User Request", sub: "Vite/Next.js Client" },
            { key: "discord", type: "decision", d: "M 260 25 L 320 65 L 260 105 L 200 65 Z", cx: 260, cy: 65, label: "Auth?", sub: "Discord OAuth" },
            { key: "api", type: "decision", d: "M 440 25 L 500 65 L 440 105 L 380 65 Z", cx: 440, cy: 65, label: "Cached?", sub: "Express API" },
            { key: "postgres", type: "process", x: 560, y: 40, w: 130, h: 50, rx: 8, cx: 625, cy: 65, label: "Query Cache", sub: "Postgres / Prisma" },
            { key: "postgres", type: "cylinder", x: 750, y: 80, w: 120, h: 70, cx: 810, cy: 115, label: "PostgreSQL DB", sub: "Postgres Cache" },
            { key: "client", type: "process", x: 745, y: 270, w: 130, h: 50, rx: 8, cx: 810, cy: 295, label: "Render Stats", sub: "Update UI" },
            { key: "sync", type: "process", x: 40, y: 220, w: 120, h: 50, rx: 8, cx: 100, cy: 245, label: "GitHub Actions", sub: "Cron Trigger" },
            { key: "sync", type: "process", x: 220, y: 220, w: 130, h: 50, rx: 8, cx: 285, cy: 245, label: "Staggered Sync", sub: "2000ms Loop" },
            { key: "riot", type: "process", x: 410, y: 220, w: 130, h: 50, rx: 8, cx: 475, cy: 245, label: "Ingest & Parse", sub: "Riot API" },
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
          <text x="20" y="340" fontSize="10.5" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
            ── Process Flow  ╌╌ Async/Cron Trigger  Click nodes to highlight execution pathways
          </text>
        </svg>
      </DiagramBoard>
    </Box>
  );
};

export default SystemDesignSection;
