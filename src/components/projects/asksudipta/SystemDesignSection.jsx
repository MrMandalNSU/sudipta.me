import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { systemNodes } from "./constants";
import { DiagramBoard, GlassCard, SectionHeading } from "./styles";

const requestFlowSteps = [
  { key: "chatbot", label: "Visitor Question", sub: "React chatbot" },
  { key: "session", label: "Session State", sub: "History + UI state" },
  { key: "proxy", label: "Vercel Proxy", sub: "Same-origin API" },
  { key: "api", label: "Express API", sub: "Zod + API key" },
  { key: "retrieval", label: "Hybrid Retrieval", sub: "Vector + keyword" },
  { key: "prompt", label: "Prompt Builder", sub: "Grounded context" },
  { key: "gemini", label: "Gemini Answer", sub: "Text + sources" },
  { key: "sourceMap", label: "Source Navigation", sub: "Routes + resume" },
];

const storageFlowSteps = [
  { key: "retrieval", label: "Query Embedding", sub: "Gemini embedding" },
  { key: "supabase", label: "pgvector Match", sub: "Cosine search" },
  { key: "supabase", label: "Keyword Search", sub: "Alias fallback" },
  { key: "retrieval", label: "Merge Matches", sub: "Hybrid ranking" },
  { key: "prompt", label: "Compress Context", sub: "Prompt budget" },
];

const SystemDesignSection = ({ theme, activeSystemNode, setActiveSystemNode, primaryColor }) => {
  const [activeMobileFlow, setActiveMobileFlow] = useState("request");

  useEffect(() => {
    if (activeSystemNode === "supabase" || activeSystemNode === "retrieval") {
      setActiveMobileFlow("storage");
    } else {
      setActiveMobileFlow("request");
    }
  }, [activeSystemNode]);

  const nodeDefs = [
    { key: "chatbot", type: "process", x: 45, y: 52, w: 160, h: 68, label: "Chatbot UI", sub: "Portfolio" },
    { key: "session", type: "process", x: 45, y: 238, w: 160, h: 68, label: "Session State", sub: "sessionStorage" },
    { key: "proxy", type: "process", x: 270, y: 52, w: 160, h: 68, label: "Vercel Proxy", sub: "/api/chat" },
    { key: "api", type: "process", x: 495, y: 52, w: 160, h: 68, label: "Express API", sub: "Auth + Zod" },
    { key: "retrieval", type: "decision", x: 720, y: 87, label: "Retrieve?", sub: "Hybrid" },
    { key: "supabase", type: "storage", x: 500, y: 236, w: 185, h: 84, label: "Supabase", sub: "pgvector" },
    { key: "prompt", type: "process", x: 870, y: 52, w: 165, h: 68, label: "Prompt", sub: "Context" },
    { key: "sourceMap", type: "process", x: 870, y: 238, w: 185, h: 68, label: "Source Mapper", sub: "route resolver" },
    { key: "gemini", type: "process", x: 1090, y: 143, w: 165, h: 68, label: "Gemini", sub: "Answer" },
  ];

  const lines = [
    { from: "chatbot", to: "proxy", path: "M 205 86 L 270 86" },
    { from: "chatbot", to: "session", path: "M 125 120 L 125 238", dashed: true },
    { from: "proxy", to: "api", path: "M 430 86 L 495 86" },
    { from: "api", to: "retrieval", path: "M 655 86 L 672 86" },
    { from: "retrieval", to: "supabase", path: "M 720 132 L 720 278 L 685 278" },
    { from: "supabase", to: "retrieval", path: "M 592 236 C 592 186, 660 166, 700 123", dashed: true },
    { from: "retrieval", to: "prompt", path: "M 768 86 L 870 86" },
    { from: "prompt", to: "gemini", path: "M 1035 86 C 1062 86, 1062 177, 1090 177" },
    { from: "gemini", to: "sourceMap", path: "M 1090 177 C 1070 177, 1070 272, 1055 272", dashed: true },
    { from: "sourceMap", to: "chatbot", path: "M 870 272 C 650 410, 125 410, 125 120", dashed: true },
  ];

  return (
    <Box id="architecture" sx={{ scrollMarginTop: 120, mb: 4, display: "flex", flexDirection: "column" }}>
      <SectionHeading theme={theme}>System Design</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 740 }}>
        AskSudipta separates the visible chatbot from the protected RAG backend. Click any node to inspect its role in
        the answer path.
      </Typography>

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
              startIcon={React.cloneElement(val.icon, { sx: { fontSize: 16 } })}
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
            >
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                {val.title.split(" (")[0]}
              </Box>
              <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                {val.shortTitle}
              </Box>
            </Button>
          );
        })}
      </Box>

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

      <DiagramBoard sx={{ order: { xs: 2, md: 3 } }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <svg width="100%" viewBox="0 0 1270 420" style={{ display: "block", maxWidth: "100%", height: "auto" }}>
            <defs>
              <marker id="asksudiptaArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
              </marker>
              <marker id="asksudiptaArrowMuted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={theme.palette.mode === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)"} />
              </marker>
              <filter id="asksudiptaGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {lines.map((line) => {
              const isActive = activeSystemNode === line.from || activeSystemNode === line.to;
              return (
                <path
                  key={`${line.from}-${line.to}-${line.path}`}
                  d={line.path}
                  stroke={isActive ? primaryColor : theme.palette.mode === "light" ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.09)"}
                  strokeWidth={isActive ? 2.6 : 1.5}
                  fill="none"
                  markerEnd={isActive ? "url(#asksudiptaArrow)" : "url(#asksudiptaArrowMuted)"}
                  strokeDasharray={line.dashed ? "6,4" : undefined}
                  style={{ transition: "all 0.25s ease" }}
                />
              );
            })}

            {nodeDefs.map((node) => {
              const isActive = activeSystemNode === node.key;
              const fillBg = isActive
                ? theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.12)"
                : theme.palette.mode === "light" ? "rgba(255,255,255,0.88)" : "rgba(17,24,39,0.82)";
              const strokeColor = isActive ? primaryColor : theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)";
              const strokeWidth = isActive ? 2.6 : 1.2;
              const centerX = node.type === "decision" ? node.x : node.x + node.w / 2;
              const centerY = node.type === "decision" ? node.y : node.y + node.h / 2;

              return (
                <g key={node.key} onClick={() => setActiveSystemNode(node.key)} style={{ cursor: "pointer" }}>
                  {node.type === "decision" ? (
                    <path
                      d={`M ${node.x} ${node.y - 44} L ${node.x + 48} ${node.y} L ${node.x} ${node.y + 44} L ${node.x - 48} ${node.y} Z`}
                      fill={fillBg}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      filter={isActive ? "url(#asksudiptaGlow)" : undefined}
                    />
                  ) : node.type === "storage" ? (
                    <g filter={isActive ? "url(#asksudiptaGlow)" : undefined}>
                      <path
                        d={`M ${node.x} ${node.y + 14} L ${node.x} ${node.y + node.h} A ${node.w / 2} 14 0 0 0 ${node.x + node.w} ${node.y + node.h} L ${node.x + node.w} ${node.y + 14} Z`}
                        fill={fillBg}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <ellipse cx={node.x + node.w / 2} cy={node.y + 14} rx={node.w / 2} ry={14} fill={isActive ? "rgba(79,70,229,0.18)" : "rgba(0,0,0,0.04)"} stroke={strokeColor} strokeWidth={strokeWidth} />
                    </g>
                  ) : (
                    <rect
                      x={node.x}
                      y={node.y}
                      width={node.w}
                      height={node.h}
                      rx={10}
                      fill={fillBg}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      filter={isActive ? "url(#asksudiptaGlow)" : undefined}
                    />
                  )}
                  <text x={centerX} y={centerY - 3} textAnchor="middle" fontWeight="800" fill={theme.palette.text.primary} fontSize="11.5" fontFamily="Inter, sans-serif">
                    {node.label}
                  </text>
                  <text x={centerX} y={centerY + 12} textAnchor="middle" fill={theme.palette.text.secondary} fontSize="9.5" fontFamily="Inter, sans-serif">
                    {node.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </Box>

        <Box sx={{ display: { xs: "block", md: "none" } }}>
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
            {[
              ["request", "Answer Flow"],
              ["storage", "Retrieval Flow"],
            ].map(([key, label]) => (
              <Button
                key={key}
                fullWidth
                onClick={() => setActiveMobileFlow(key)}
                size="small"
                sx={{
                  textTransform: "none",
                  fontWeight: activeMobileFlow === key ? 800 : 600,
                  fontSize: "0.8rem",
                  borderRadius: 1.5,
                  py: 0.8,
                  backgroundColor: activeMobileFlow === key ? theme.palette.mode === "light" ? "#FFF" : "rgba(255,255,255,0.08)" : "transparent",
                  color: activeMobileFlow === key ? "primary.main" : "text.secondary",
                  "&:hover": { transform: "none", boxShadow: "none" },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 1 }}>
            {(activeMobileFlow === "request" ? requestFlowSteps : storageFlowSteps).map((step, idx, arr) => {
              const isActive = activeSystemNode === step.key;
              return (
                <Box
                  key={`${step.key}-${idx}`}
                  onClick={() => setActiveSystemNode(step.key)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1.5,
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor: isActive ? theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.1)" : "transparent",
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
                        backgroundColor: isActive ? primaryColor : theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
                        color: isActive ? "#FFF" : "text.secondary",
                        border: `1px solid ${isActive ? "transparent" : theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
                        zIndex: 1,
                      }}
                    >
                      {React.cloneElement(systemNodes[step.key].icon, { sx: { fontSize: 18 } })}
                    </Box>
                    {idx < arr.length - 1 && (
                      <Box sx={{ position: "absolute", top: 38, height: 24, width: 2, borderLeft: `2px dashed ${isActive ? primaryColor : theme.palette.mode === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)"}` }} />
                    )}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
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
