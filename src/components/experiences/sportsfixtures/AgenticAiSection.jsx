import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GlassCard, SectionHeading } from "./styles";
import { agenticAiLoops } from "./constants";
import {
  Terminal as TerminalIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";

// Styling for the telemetry terminal console
const TerminalWindow = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#0F172A" : "#050B14",
  color: "#38BDF8", // Cyan text color
  fontFamily: "'Fira Code', 'Courier New', Courier, monospace",
  borderRadius: "12px",
  border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)"}`,
  overflow: "hidden",
  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const TerminalHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#1E293B" : "#0F172A",
  padding: theme.spacing(1.2, 2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.05)"}`,
}));

const TerminalDot = styled(Box)(({ color }) => ({
  width: 10,
  height: 10,
  borderRadius: "50%",
  backgroundColor: color,
  marginRight: 6,
}));

const AgenticAiSection = ({ theme: propTheme }) => {
  const muiTheme = useTheme();
  const theme = propTheme || muiTheme;
  const [activeLoopId, setActiveLoopId] = useState("context");
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [typingIndex, setTypingIndex] = useState(0);

  const activeLoop = agenticAiLoops.find((l) => l.id === activeLoopId) || agenticAiLoops[0];

  // Simulated log typing effect
  useEffect(() => {
    setConsoleLogs([]);
    setTypingIndex(0);
  }, [activeLoopId]);

  useEffect(() => {
    if (typingIndex < activeLoop.telemetryLogs.length) {
      const timer = setTimeout(() => {
        setConsoleLogs((prev) => [...prev, activeLoop.telemetryLogs[typingIndex]]);
        setTypingIndex((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [typingIndex, activeLoop]);

  // Node parameters for the flowchart
  const nodeMap = {
    context: { x: 40, y: 155, title1: "Context-Primed", title2: "Repository", subtitle: "Prime Schemas" },
    normalization: { x: 260, y: 155, title1: "JSON Normalization", title2: "Data Verification", subtitle: "Verify Feed" },
    validation: { x: 480, y: 70, title1: "API Schema", title2: "Validation Loop", subtitle: "Swagger Sync" },
    testing: { x: 480, y: 240, title1: "Testing Automation", title2: "Trace Diagnostics", subtitle: "Integration Run" },
    logging: { x: 260, y: 290, title1: "AI Error Logging", title2: "Auto-Debugging", subtitle: "Self Repair" },
    devops: { x: 700, y: 155, title1: "AI-Driven DevOps", title2: "Cloud Deploy", subtitle: "Railway Deploy" },
  };

  // Color helper functions
  const isLight = theme.palette.mode === "light";
  const canvasBg = isLight ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.3)";
  const strokeColor = isLight ? "rgba(79, 70, 229, 0.15)" : "rgba(129, 140, 248, 0.15)";
  const activeStrokeColor = theme.palette.primary.main;
  const pulseColor = isLight ? "#4F46E5" : "#818CF8";

  return (
    <Box id="agentic-ai" sx={{ scrollMarginTop: 120, mb: 6 }}>
      <SectionHeading theme={theme}>Agentic AI & Context Engineering</SectionHeading>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 850, lineHeight: 1.7 }}>
        By utilizing AI-driven development loops and a context-primed setup, Sudipta accelerated production cycles. 
        Click on the flowchart nodes below to inspect each stage of the automated development lifecycle and view the real-time agent telemetry console logs.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {/* Interactive Flowchart Canvas */}
        <Grid size={{ xs: 12, lg: 8.5 }}>
          <GlassCard
            sx={{
              p: 2,
              height: "420px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, px: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "text.primary" }}>
                Interactive Agent Lifecycle Loop
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "primary.main", boxShadow: "0 0 8px currentColor" }} />
                  <Typography variant="caption" sx={{ fontSize: "0.7rem", color: "text.secondary" }}>Pulse Flow</Typography>
                </Box>
              </Box>
            </Box>

            {/* SVG Flowchart Container */}
            <Box sx={{ flex: 1, position: "relative", minHeight: "340px" }}>
              <svg
                viewBox="0 0 900 380"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: canvasBg,
                  borderRadius: "12px",
                  border: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                {/* Arrowhead Marker Definitions */}
                <defs>
                  <marker
                    id="arrow-inactive"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill={strokeColor} />
                  </marker>
                  <marker
                    id="arrow-active"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill={activeStrokeColor} />
                  </marker>
                </defs>

                {/* Connection Paths */}
                {/* 1. Context -> Normalization */}
                <path
                  id="path-context-norm"
                  d="M 200,190 L 260,190"
                  stroke={activeLoopId === "context" || activeLoopId === "normalization" ? activeStrokeColor : strokeColor}
                  strokeWidth={activeLoopId === "context" || activeLoopId === "normalization" ? 2.5 : 1.5}
                  fill="none"
                  markerEnd={`url(#${activeLoopId === "context" || activeLoopId === "normalization" ? "arrow-active" : "arrow-inactive"})`}
                />

                {/* 2. Normalization -> Validation */}
                <path
                  id="path-norm-val"
                  d="M 420,190 C 450,190 450,105 480,105"
                  stroke={activeLoopId === "normalization" || activeLoopId === "validation" ? activeStrokeColor : strokeColor}
                  strokeWidth={activeLoopId === "normalization" || activeLoopId === "validation" ? 2.5 : 1.5}
                  fill="none"
                  markerEnd={`url(#${activeLoopId === "normalization" || activeLoopId === "validation" ? "arrow-active" : "arrow-inactive"})`}
                />

                {/* 3. Normalization -> Testing */}
                <path
                  id="path-norm-test"
                  d="M 420,190 C 450,190 450,275 480,275"
                  stroke={activeLoopId === "normalization" || activeLoopId === "testing" ? activeStrokeColor : strokeColor}
                  strokeWidth={activeLoopId === "normalization" || activeLoopId === "testing" ? 2.5 : 1.5}
                  fill="none"
                  markerEnd={`url(#${activeLoopId === "normalization" || activeLoopId === "testing" ? "arrow-active" : "arrow-inactive"})`}
                />

                {/* 4. Validation -> DevOps */}
                <path
                  id="path-val-dev"
                  d="M 640,105 C 670,105 670,190 700,190"
                  stroke={activeLoopId === "validation" || activeLoopId === "devops" ? activeStrokeColor : strokeColor}
                  strokeWidth={activeLoopId === "validation" || activeLoopId === "devops" ? 2.5 : 1.5}
                  fill="none"
                  markerEnd={`url(#${activeLoopId === "validation" || activeLoopId === "devops" ? "arrow-active" : "arrow-inactive"})`}
                />

                {/* 5. Testing -> DevOps */}
                <path
                  id="path-test-dev"
                  d="M 640,275 C 670,275 670,190 700,190"
                  stroke={activeLoopId === "testing" || activeLoopId === "devops" ? activeStrokeColor : strokeColor}
                  strokeWidth={activeLoopId === "testing" || activeLoopId === "devops" ? 2.5 : 1.5}
                  fill="none"
                  markerEnd={`url(#${activeLoopId === "testing" || activeLoopId === "devops" ? "arrow-active" : "arrow-inactive"})`}
                />

                {/* 6. Testing -> Logging (Fail Loop) */}
                <path
                  id="path-test-log"
                  d="M 560,310 C 560,325 450,325 420,325"
                  stroke={activeLoopId === "testing" || activeLoopId === "logging" ? activeStrokeColor : strokeColor}
                  strokeWidth={activeLoopId === "testing" || activeLoopId === "logging" ? 2.5 : 1.5}
                  fill="none"
                  strokeDasharray="4,4"
                  markerEnd={`url(#${activeLoopId === "testing" || activeLoopId === "logging" ? "arrow-active" : "arrow-inactive"})`}
                />

                {/* 7. Logging -> Normalization (Self Repair Loop) */}
                <path
                  id="path-log-norm"
                  d="M 340,290 L 340,225"
                  stroke={activeLoopId === "logging" || activeLoopId === "normalization" ? activeStrokeColor : strokeColor}
                  strokeWidth={activeLoopId === "logging" || activeLoopId === "normalization" ? 2.5 : 1.5}
                  fill="none"
                  markerEnd={`url(#${activeLoopId === "logging" || activeLoopId === "normalization" ? "arrow-active" : "arrow-inactive"})`}
                />

                {/* Animated Pulse Packets */}
                <circle r="4" fill={pulseColor}>
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 200,190 L 260,190" />
                </circle>
                <circle r="4" fill={pulseColor}>
                  <animateMotion dur="3.5s" repeatCount="indefinite" path="M 420,190 C 450,190 450,105 480,105" />
                </circle>
                <circle r="4" fill={pulseColor}>
                  <animateMotion dur="3.5s" repeatCount="indefinite" path="M 420,190 C 450,190 450,275 480,275" />
                </circle>
                <circle r="4" fill={pulseColor}>
                  <animateMotion dur="3.5s" repeatCount="indefinite" path="M 640,275 C 670,275 670,190 700,190" />
                </circle>
                <circle r="4" fill={pulseColor}>
                  <animateMotion dur="3.5s" repeatCount="indefinite" path="M 640,105 C 670,105 670,190 700,190" />
                </circle>

                {/* Nodes rendering */}
                {agenticAiLoops.map((loop) => {
                  const node = nodeMap[loop.id];
                  if (!node) return null;
                  const isActive = activeLoopId === loop.id;

                  const cardFill = isActive
                    ? isLight ? "rgba(79, 70, 229, 0.08)" : "rgba(129, 140, 248, 0.15)"
                    : isLight ? "#FFF" : "#0F172A";

                  const cardStroke = isActive
                    ? activeStrokeColor
                    : isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)";

                  const circleFill = isActive
                    ? "rgba(99, 102, 241, 0.15)"
                    : isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)";

                  const primaryTextColor = isLight ? "#0F172A" : "#F8FAFC";
                  const secondaryTextColor = isLight ? "#64748B" : "#94A3B8";

                  return (
                    <g
                      key={loop.id}
                      onClick={() => setActiveLoopId(loop.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Node Box */}
                      <rect
                        x={node.x}
                        y={node.y}
                        width="160"
                        height="70"
                        rx="12"
                        fill={cardFill}
                        stroke={cardStroke}
                        strokeWidth={isActive ? 2 : 1}
                        style={{
                          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                          filter: isActive ? `drop-shadow(0 4px 12px ${isLight ? "rgba(79, 70, 229, 0.15)" : "rgba(129, 140, 248, 0.25)"})` : "none",
                        }}
                      />
                      {/* Icon Circle */}
                      <circle
                        cx={node.x + 24}
                        cy={node.y + 35}
                        r="14"
                        fill={circleFill}
                        style={{ transition: "all 0.25s ease" }}
                      />
                      {/* Embed Icon */}
                      <foreignObject x={node.x + 13} y={node.y + 24} width="22" height="22">
                        <Box
                          sx={{
                            color: isActive ? "primary.main" : "text.secondary",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                            transition: "all 0.25s ease",
                          }}
                        >
                          {React.cloneElement(loop.icon, { sx: { fontSize: 16 } })}
                        </Box>
                      </foreignObject>
                      {/* Node Labels */}
                      <text
                        x={node.x + 46}
                        y={node.y + 25}
                        fill={primaryTextColor}
                        fontSize="10.5px"
                        fontWeight="800"
                        fontFamily="Inter, Roboto, sans-serif"
                      >
                        {node.title1}
                      </text>
                      <text
                        x={node.x + 46}
                        y={node.y + 39}
                        fill={primaryTextColor}
                        fontSize="10.5px"
                        fontWeight="800"
                        fontFamily="Inter, Roboto, sans-serif"
                      >
                        {node.title2}
                      </text>
                      <text
                        x={node.x + 46}
                        y={node.y + 53}
                        fill={isActive ? "primary.main" : secondaryTextColor}
                        fontSize="8.5px"
                        fontWeight="700"
                        fontFamily="Inter, Roboto, sans-serif"
                        letterSpacing="0.2px"
                      >
                        {node.subtitle}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </Box>
          </GlassCard>
        </Grid>

        {/* Telemetry Log Terminal */}
        <Grid size={{ xs: 12, lg: 3.5 }}>
          <TerminalWindow>
            <TerminalHeader>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TerminalDot color="#FF5F56" />
                <TerminalDot color="#FFBD2E" />
                <TerminalDot color="#27C93F" />
                <Typography
                  variant="caption"
                  sx={{
                    ml: 1,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: isLight ? "#475569" : "#94A3B8",
                    fontFamily: "sans-serif",
                  }}
                >
                  agentic-telemetry
                </Typography>
              </Box>
              <TerminalIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }} />
            </TerminalHeader>

            <Box
              sx={{
                p: 2,
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 1.2,
                fontSize: "0.7rem",
              }}
            >
              {/* Dynamic telemetry prompt */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, borderBottom: "1px solid rgba(255,255,255,0.06)", pb: 1, mb: 0.5 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#34D399", animate: "pulse 1.5s infinite" }} />
                <Typography sx={{ fontFamily: "monospace", color: "#34D399", fontSize: "0.7rem", fontWeight: 700 }}>
                  $ query --loop={activeLoopId}
                </Typography>
              </Box>

              {consoleLogs.map((log, index) => {
                let color = "#38BDF8"; // default cyan
                if (log.includes("ERROR") || log.includes("TRACES") || log.includes("FAIL")) {
                  color = "#F87171"; // red
                } else if (log.includes("LOAD") || log.includes("PARSE") || log.includes("ENFORCE")) {
                  color = "#FBBF24"; // yellow/orange
                } else if (log.includes("SUCCESS") || log.includes("PASS") || log.includes("SERVER") || log.includes("FIXED")) {
                  color = "#34D399"; // green
                }

                return (
                  <Typography
                    key={index}
                    sx={{
                      fontFamily: "monospace",
                      color: color,
                      fontSize: "0.7rem",
                      lineHeight: 1.4,
                      wordBreak: "break-all",
                    }}
                  >
                    {log}
                  </Typography>
                );
              })}

              {/* Cursor Blinker */}
              {typingIndex < activeLoop.telemetryLogs.length ? (
                <Typography sx={{ fontFamily: "monospace", color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>
                  Analyzing data packets...
                </Typography>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
                  <Typography sx={{ fontFamily: "monospace", color: "rgba(255,255,255,0.2)", fontSize: "0.7rem" }}>
                    Console idle. Ready.
                  </Typography>
                  <Box
                    sx={{
                      width: 5,
                      height: 10,
                      backgroundColor: "rgba(255,255,255,0.5)",
                      animation: "blink 1s steps(2, start) infinite",
                      "@keyframes blink": {
                        "0%, 100%": { opacity: 1 },
                        "50%": { opacity: 0 },
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          </TerminalWindow>
        </Grid>
      </Grid>

      {/* Grid of detail cards below */}
      <Grid container spacing={3}>
        {agenticAiLoops.map((loop, idx) => {
          const isActive = activeLoopId === loop.id;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
              <GlassCard
                onClick={() => setActiveLoopId(loop.id)}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  borderWidth: isActive ? "2px" : "1px",
                  borderColor: isActive ? "primary.main" : "rgba(255,255,255,0.08)",
                  boxShadow: isActive
                    ? theme.palette.mode === "light"
                      ? "0 12px 28px rgba(79, 70, 229, 0.12)"
                      : "0 12px 28px rgba(129, 140, 248, 0.15)"
                    : "none",
                  transform: isActive ? "translateY(-4px)" : "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: theme.palette.primary.main,
                    boxShadow: theme.palette.mode === "light"
                      ? "0 12px 28px rgba(79, 70, 229, 0.12)"
                      : "0 12px 28px rgba(129, 140, 248, 0.15)",
                  },
                }}
              >
                {/* Header Icon & Title */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isActive
                        ? "primary.main"
                        : theme.palette.mode === "light"
                          ? "rgba(79,70,229,0.06)"
                          : "rgba(129,140,248,0.1)",
                      color: isActive ? "#FFF" : "primary.main",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {loop.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>
                      {loop.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 600 }}>
                      {loop.subtitle}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, flex: 1 }}>
                  {loop.desc}
                </Typography>
              </GlassCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AgenticAiSection;
