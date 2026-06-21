import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { systemNodes } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";

const userFlowSteps = [
  { key: "client", label: "User Input Gestures", sub: "Create Text / Modify Content" },
  { key: "localstore", label: "Session Handshake", sub: "Load / Generate unique_user_id" },
  { key: "api", label: "API Router Dispatch", sub: "Validate parameters & route path" },
  { key: "analyzer", label: "Linguistic Metrics Parsing", sub: "Run regex engine filters" },
  { key: "mongo", label: "Database Ingestion / Query", sub: "Read / Write models through Mongoose ORM" },
  { key: "client", label: "Local State Update", sub: "Reflect data changes in the dashboard UI" },
];

const SystemDesignSection = ({
  theme,
  activeSystemNode,
  setActiveSystemNode,
  primaryColor
}) => {
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
      <SectionHeading theme={theme}>System Design</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
        An overview of Text Analyzer's distributed execution stack. Click any node in the flowchart or list to inspect its role and operations.
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
                  backgroundColor: isActive ? theme.palette.primary.main : theme.palette.mode === "light" ? "rgba(99,102,241,0.06)" : "rgba(129,140,248,0.08)",
                  transform: "none",
                  boxShadow: "none",
                },
              }}
              startIcon={React.cloneElement(val.icon, { sx: { fontSize: 16 } })}
            >
              <span>{val.shortTitle}</span>
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

      {/* Svg Flowchart Diagram */}
      <DiagramBoard sx={{ mb: 3, order: { xs: 2, md: 3 } }}>
        {/* Desktop View SVG Flowchart */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <svg
            width="100%"
            viewBox="0 0 920 300"
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
              // Client <-> LocalStorage (vertically connected on the left)
              { from: "client", to: "localstore", path: "M 95 100 L 95 174" },
              { from: "localstore", to: "client", path: "M 145 180 L 145 106" },
              
              // Client <-> Backend API Router (parallel diagonal lines - NO CROSSING)
              { from: "client", to: "api", path: "M 200 75 L 334 123" },
              { from: "api", to: "client", path: "M 340 145 L 206 97" },
              
              // Backend API Router <-> Linguistic Regex Engine (parallel diagonal lines - NO CROSSING)
              { from: "api", to: "analyzer", path: "M 520 125 L 635 58" },
              { from: "analyzer", to: "api", path: "M 640 75 L 525 142" },
              
              // Backend API Router <-> MongoDB Atlas Cache (parallel diagonal lines - NO CROSSING)
              { from: "api", to: "mongo", path: "M 520 135 L 635 192" },
              { from: "mongo", to: "api", path: "M 640 215 L 525 158" },
            ].map((line, lIdx) => {
              const isActive = activeSystemNode === line.from || activeSystemNode === line.to;
              const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
              const strokeWidth = isActive ? 2.5 : 1.5;
              const marker = isActive ? "url(#arrowHead)" : "url(#arrowHeadMuted)";
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
              { key: "client", x: 40, y: 40, w: 160, h: 60, rx: 10, cx: 120, cy: 70, label: "Client Frontend", sub: "React Vite Workspace" },
              { key: "localstore", x: 40, y: 180, w: 160, h: 60, rx: 10, cx: 120, cy: 210, label: "LocalStorage Session", sub: "Browser Sandbox Cache" },
              { key: "api", x: 340, y: 110, w: 180, h: 60, rx: 10, cx: 430, cy: 140, label: "Backend API Router", sub: "Express / TypeScript Server" },
              { key: "analyzer", x: 640, y: 40, w: 185, h: 60, rx: 10, cx: 732.5, cy: 70, label: "Linguistic Regex Engine", sub: "Text Analyzer Utility" },
              { key: "mongo", x: 640, y: 180, w: 185, h: 60, rx: 10, cx: 732.5, cy: 210, label: "MongoDB Atlas Cache", sub: "Text & Analysis Docs" },
            ].map((node, nIdx) => {
              const isActive = activeSystemNode === node.key;
              const fillBg = isActive
                ? (theme.palette.mode === "light" ? "rgba(99,102,241,0.08)" : "rgba(129,140,248,0.12)")
                : (theme.palette.mode === "light" ? "rgba(255,255,255,0.85)" : "rgba(17,24,39,0.8)");
              const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
              const strokeWidth = isActive ? 2.5 : 1.2;
              const glowFilter = isActive ? "url(#glow)" : undefined;

              return (
                <g key={nIdx} style={{ cursor: "pointer" }} onClick={() => setActiveSystemNode(node.key)}>
                  <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={node.rx} fill={fillBg} stroke={strokeColor} strokeWidth={strokeWidth} filter={glowFilter} style={{ transition: "all 0.2s ease" }} />
                  {/* Title text */}
                  <text x={node.cx} y={node.cy - 2} textAnchor="middle" fontWeight="800" fill={theme.palette.text.primary} fontSize="11" fontFamily="Inter, sans-serif">
                    {node.label}
                  </text>
                  {/* Sub text */}
                  <text x={node.cx} y={node.cy + 12} textAnchor="middle" fill={theme.palette.text.secondary} fontSize="9" fontFamily="Inter, sans-serif">
                    {node.sub}
                  </text>
                </g>
              );
            })}

            {/* Label texts on connections */}
            <text x="65" y="145" textAnchor="middle" fill={theme.palette.text.secondary} fontSize="8.5" fontFamily="monospace">
              Local Session
            </text>
            <text x="270" y="55" textAnchor="middle" fill={theme.palette.text.secondary} fontSize="8.5" fontFamily="monospace">
              HTTP REST Requests
            </text>
            <text x="580" y="55" textAnchor="middle" fill={theme.palette.text.secondary} fontSize="8.5" fontFamily="monospace">
              Linguistic Services
            </text>
            <text x="580" y="250" textAnchor="middle" fill={theme.palette.text.secondary} fontSize="8.5" fontFamily="monospace">
              Mongoose Schemas
            </text>
          </svg>
        </Box>

        {/* Mobile View Vertical Flowchart */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pl: 1, pr: 1 }}>
            {userFlowSteps.map((step, idx, arr) => {
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
                      ? (theme.palette.mode === "light" ? "rgba(99,102,241,0.06)" : "rgba(129,140,248,0.1)")
                      : "transparent",
                    border: `1px solid ${isActive ? primaryColor : "transparent"}`,
                    "&:hover": {
                      backgroundColor: isActive
                        ? (theme.palette.mode === "light" ? "rgba(99,102,241,0.08)" : "rgba(129,140,248,0.12)")
                        : (theme.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)"),
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
