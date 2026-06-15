import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { systemNodes } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";

const userFlowSteps = [
  { key: "ingestion", label: "Document Upload", sub: "Incoming PDF, XLSX, EML" },
  { key: "scanner", label: "Class Scanner", sub: "Scan Assistants namespace" },
  { key: "parser", label: "Assistant Client", sub: "Execute processLines()" },
  { key: "layout", label: "Layout Mode", sub: "Preserve column coordinates" },
  { key: "validator", label: "Validation Guard", sub: "Verify against JSON schemas" },
];

const SystemDesignSection = ({
  theme,
  activeSystemNode,
  setActiveSystemNode,
  primaryColor
}) => {
  const [activeMobileFlow, setActiveMobileFlow] = useState("ingestion");

  return (
    <Box
      id="architecture"
      sx={{
        scrollMarginTop: 120,
        mb: 5,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <SectionHeading theme={theme}>System Design & Processing Pipeline</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
        An overview of the Laravel-based ingestion and auto-discovery processing pipeline.
        Click any node to see its function in the parsing workflow.
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

      {/* Pipeline Diagram Board */}
      <DiagramBoard sx={{ mb: 3 }}>
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
              { from: "ingestion", to: "scanner", path: "M 170 150 L 220 150" },
              { from: "scanner", to: "parser", path: "M 350 150 L 400 150" },
              { from: "parser", to: "layout", path: "M 465 175 L 465 210 L 580 210" },
              { from: "parser", to: "validator", path: "M 530 150 L 580 150" },
              { from: "layout", to: "validator", path: "M 710 210 L 750 210 L 750 175" },
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
              { key: "ingestion", type: "start", x: 40, y: 125, w: 130, h: 50, rx: 8, cx: 105, cy: 150, label: "Document Ingestion", sub: "Incoming Streams" },
              { key: "scanner", type: "process", x: 220, y: 125, w: 130, h: 50, rx: 8, cx: 285, cy: 150, label: "Dynamic Scanner", sub: "Format Discovery" },
              { key: "parser", type: "decision", d: "M 465 100 L 530 150 L 465 200 L 400 150 Z", cx: 465, cy: 150, label: "Client Parser", sub: "Matched Rules" },
              { key: "layout", type: "process", x: 580, y: 185, w: 130, h: 50, rx: 8, cx: 645, cy: 210, label: "Layout Engine", sub: "Column-Aware mode" },
              { key: "validator", type: "cylinder", x: 580, y: 110, w: 130, h: 55, cx: 645, cy: 142, label: "Schema Validator", sub: "JSON Validation Guard" },
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
                      <path
                        d={`M ${node.x} ${node.y + 10} L ${node.x} ${node.y + node.h} A ${node.w / 2} 10 0 0 0 ${node.x + node.w} ${node.y + node.h} L ${node.x + node.w} ${node.y + 10} Z`}
                        fill={fillBg}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <ellipse
                        cx={node.x + node.w / 2}
                        cy={node.y + 10}
                        rx={node.w / 2}
                        ry={10}
                        fill={isActive ? "rgba(79,70,229,0.2)" : "rgba(0,0,0,0.04)"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                    </g>
                  )}

                  {/* Title text */}
                  <text
                    x={node.cx}
                    y={node.cy - 1}
                    textAnchor="middle"
                    fontWeight="800"
                    fill={theme.palette.text.primary}
                    fontSize="10"
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
                    fontSize="8.5"
                    fontFamily="Inter, sans-serif"
                  >
                    {node.sub}
                  </text>
                </g>
              );
            })}

            <text x="20" y="280" fontSize="10" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
              ── Processing Pipeline Route   Click on nodes to view details
            </text>
          </svg>
        </Box>

        {/* Mobile View Vertical flowchart */}
        <Box sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", gap: 2.5 }}>
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
                  transition: "all 0.2s ease",
                  backgroundColor: isActive
                    ? (theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.1)")
                    : "transparent",
                  border: `1px solid ${isActive ? primaryColor : "transparent"}`,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isActive ? primaryColor : "rgba(0,0,0,0.03)",
                      color: isActive ? "#FFF" : "text.secondary",
                      zIndex: 1,
                    }}
                  >
                    {React.cloneElement(systemNodes[step.key].icon, { sx: { fontSize: 16 } })}
                  </Box>
                  {isNotLast && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 36,
                        height: 20,
                        width: 2,
                        borderLeft: `2px dashed ${isActive ? primaryColor : "rgba(0,0,0,0.12)"}`,
                        zIndex: 0,
                      }}
                    />
                  )}
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: isActive ? primaryColor : "text.primary" }}>
                    {step.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {step.sub}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </DiagramBoard>
    </Box>
  );
};

export default SystemDesignSection;
