import React, { useState } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {
  CheckCircleOutline as CheckCircleIcon,
  Dns as DnsIcon,
  Hub as HubIcon,
  Psychology as PsychologyIcon,
  Route as RouteIcon,
  SmartToy as SmartToyIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";
import { GlassCard, SectionHeading } from "./styles";
import { techGroups } from "./constants";

const openAssistant = () => {
  window.dispatchEvent(new Event("open-chatbot"));
};

const shimmer = keyframes`
  0% {
    transform: skewX(-20deg) translateX(-150%);
  }
  100% {
    transform: skewX(-20deg) translateX(250%);
  }
`;

const assistantStates = {
  ready: {
    label: "Ready",
    title: "Floating Assistant",
    text: "The assistant waits in a compact launcher, then opens into a responsive chat window.",
    sample: "Ask me about Sudipta's projects.",
  },
  ask: {
    label: "Ask",
    title: "Suggested Prompt",
    text: "First-time sessions show suggested questions and keep the current conversation in sessionStorage.",
    sample: "Tell me about AskSudipta.",
  },
  answer: {
    label: "Answer",
    title: "Grounded Response",
    text: "Answers are formatted with headings, bullets, links, and source-aware portfolio references.",
    sample: "AskSudipta combines a React chatbot with a RAG backend.",
  },
  sources: {
    label: "Sources",
    title: "Verified Navigation",
    text: "Source cards map knowledge files back to detail pages, home anchors, research pages, or the resume modal.",
    sample: "knowledge/projects/asksudipta.md",
  },
};

const traceSteps = {
  ui: {
    label: "UI",
    title: "React Chat Surface",
    text: "ChatBot.jsx owns message state, loading feedback, source cards, and assistant window modes.",
    icon: <SmartToyIcon />,
  },
  proxy: {
    label: "Proxy",
    title: "Same-Origin Handoff",
    text: "The portfolio posts to /api/chat, and the Vercel proxy forwards credentials to the protected backend.",
    icon: <RouteIcon />,
  },
  rag: {
    label: "RAG",
    title: "Retrieve Before Generate",
    text: "The backend retrieves pgvector and keyword matches before building the grounded Gemini prompt.",
    icon: <PsychologyIcon />,
  },
  cite: {
    label: "Cite",
    title: "Answer With Sources",
    text: "Returned source metadata becomes clickable navigation inside the portfolio experience.",
    icon: <HubIcon />,
  },
};

const OverviewSection = ({ theme }) => {
  const [activeAssistantState, setActiveAssistantState] = useState("ready");
  const [activeTraceStep, setActiveTraceStep] = useState("rag");
  const assistantState = assistantStates[activeAssistantState];
  const traceStep = traceSteps[activeTraceStep];

  return (
    <Box id="overview" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Overview</SectionHeading>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row", md: "column", lg: "row" },
                  alignItems: { xs: "flex-start", sm: "center", md: "flex-start", lg: "center" },
                  gap: 2.5,
                  mb: 3,
                }}
              >
                <Box
                  component="img"
                  src="/project_logos/chatbot_logo.svg"
                  alt="AskSudipta logo"
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "14px",
                    p: 1.2,
                    background: theme.palette.mode === "light" ? "rgba(255,255,255,0.72)" : "rgba(30,41,59,0.42)",
                    border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                    objectFit: "contain",
                  }}
                />
                <Box
                  onClick={openAssistant}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openAssistant();
                    }
                  }}
                  sx={{
                    display: "inline-block",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "4px",
                    pl: 0.5,
                    pr: 2.5,
                    ml: -0.5,
                    mr: -2.5,
                    cursor: "pointer",
                    "&:hover .ask-shimmer": {
                      animation: `${shimmer} 0.8s ease-in-out`,
                    },
                    "&:focus-visible": {
                      outline: "2px solid #22D3EE",
                      outlineOffset: "3px",
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: 900,
                      letterSpacing: "0px",
                      lineHeight: 1.1,
                      mb: 0.5,
                      color: "text.primary",
                      display: "inline-block",
                      fontSize: { xs: "1.9rem", sm: "2.25rem", md: "1.9rem", lg: "2.25rem" },
                    }}
                  >
                    Ask
                    <Box component="span" sx={{ color: "#22D3EE" }}>
                      Sudipta
                    </Box>
                  </Typography>
                  <Box
                    className="ask-shimmer"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(34,211,238,0.55) 50%, rgba(255,255,255,0) 100%)",
                      pointerEvents: "none",
                      mixBlendMode: "screen",
                      transform: "skewX(-20deg) translateX(-150%)",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase" }}>
                    Conversational RAG Intelligence
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 3 }}>
                AskSudipta is the full chat system behind this portfolio: a React and MUI floating assistant in
                src/components/ChatBot.jsx plus a TypeScript RAG backend. The frontend handles chat state, suggested
                prompts, source cards, and route-aware citations while the backend retrieves grounded context and
                generates concise answers.
              </Typography>

              <Box
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.04)" : "rgba(129,140,248,0.08)",
                  border: `1px solid ${theme.palette.mode === "light" ? "rgba(79,70,229,0.1)" : "rgba(129,140,248,0.16)"}`,
                }}
              >
                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
                  {Object.entries(assistantStates).map(([key, state]) => {
                    const isActive = activeAssistantState === key;
                    return (
                      <Button
                        key={key}
                        onClick={() => setActiveAssistantState(key)}
                        size="small"
                        sx={{
                          minWidth: 0,
                          px: 1.2,
                          py: 0.35,
                          borderRadius: 1.2,
                          textTransform: "none",
                          fontWeight: 800,
                          fontSize: "0.72rem",
                          color: isActive ? "#FFF" : "text.secondary",
                          backgroundColor: isActive ? "primary.main" : "transparent",
                          border: `1px solid ${isActive ? "transparent" : theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)"}`,
                          "&:hover": {
                            backgroundColor: isActive ? "primary.main" : theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.1)",
                            transform: "none",
                            boxShadow: "none",
                          },
                        }}
                      >
                        {state.label}
                      </Button>
                    );
                  })}
                </Stack>
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFF",
                      background: "linear-gradient(135deg, #4F46E5, #06B6D4)",
                    }}
                  >
                    <SmartToyIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 0.4 }}>
                      {assistantState.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", lineHeight: 1.55, mb: 1 }}>
                      {assistantState.text}
                    </Typography>
                    <Box
                      sx={{
                        px: 1.4,
                        py: 0.9,
                        borderRadius: "14px 14px 14px 4px",
                        backgroundColor: theme.palette.mode === "light" ? "rgba(255,255,255,0.74)" : "rgba(15,23,42,0.5)",
                        border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)"}`,
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", overflowWrap: "anywhere" }}>
                        {assistantState.sample}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2, pt: 2, borderTop: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}` }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5, fontFamily: "monospace", fontSize: "0.75rem" }}>
                {[
                  ["vectors", "768d"],
                  ["top-k", "5"],
                  ["chat cap", "350"],
                  ["cache ttl", "5m"],
                  ["tests", "Vitest"],
                ].map(([label, value]) => (
                  <Box key={label}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>
                      {label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>{value}</Typography>
                  </Box>
                ))}
              </Box>
              <Button
                onClick={openAssistant}
                variant="contained"
                size="small"
                startIcon={<SmartToyIcon sx={{ fontSize: 18 }} />}
                sx={{
                  height: 34,
                  fontWeight: 800,
                  fontSize: "0.78rem",
                  borderRadius: 1,
                  px: 2,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  boxShadow: "none",
                }}
              >
                Try Assistant
              </Button>
            </Box>
          </GlassCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
              <DnsIcon color="primary" fontSize="small" />
              Technology Stack
            </Typography>

            <Grid container spacing={2}>
              {techGroups.map((group) => (
                <Grid key={group.category} size={{ xs: 12, sm: 6, md: 12, lg: 6 }}>
                  <Box
                    sx={{
                      p: { xs: 1.5, sm: 2 },
                      height: "100%",
                      borderRadius: 2,
                      backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.01)" : "rgba(255,255,255,0.01)",
                      border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)"}`,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 800,
                        color: group.color,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 1.5,
                        fontSize: { xs: "0.62rem", sm: "0.75rem" },
                      }}
                    >
                      {group.icon}
                      {group.category}
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={{ xs: 0.5, sm: 0.75 }}>
                      {group.items.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.72rem",
                            borderRadius: 1.2,
                            background: theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
                            color: group.color,
                            border: `1px solid ${theme.palette.mode === "light" ? "rgba(79,70,229,0.12)" : "rgba(129,140,248,0.15)"}`,
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              ))}
              <Grid size={{ xs: 12, sm: 6, md: 12, lg: 6 }}>
                <Box
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    height: "100%",
                    minHeight: 119,
                    borderRadius: 2,
                    backgroundColor: theme.palette.mode === "light" ? "rgba(6,182,212,0.04)" : "rgba(34,211,238,0.06)",
                    border: `1px solid ${theme.palette.mode === "light" ? "rgba(6,182,212,0.14)" : "rgba(34,211,238,0.16)"}`,
                  }}
                >
                  <Stack direction="row" flexWrap="wrap" gap={0.6} sx={{ mb: 1.5 }}>
                    {Object.entries(traceSteps).map(([key, step]) => {
                      const isActive = activeTraceStep === key;
                      return (
                        <Chip
                          key={key}
                          label={step.label}
                          size="small"
                          onClick={() => setActiveTraceStep(key)}
                          sx={{
                            height: 23,
                            fontWeight: 800,
                            fontSize: "0.66rem",
                            borderRadius: 1,
                            cursor: "pointer",
                            backgroundColor: isActive ? "rgba(6,182,212,0.18)" : "transparent",
                            color: isActive ? "#06b6d4" : "text.secondary",
                            border: `1px solid ${isActive ? "rgba(6,182,212,0.32)" : theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
                          }}
                        />
                      );
                    })}
                  </Stack>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 900,
                      color: "#06b6d4",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.6,
                      mb: 0.8,
                    }}
                  >
                    {React.cloneElement(traceStep.icon, { sx: { fontSize: 13 } })}
                    {traceStep.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", lineHeight: 1.55 }}>
                    {traceStep.text}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </GlassCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <SpeedIcon color="primary" fontSize="small" />
              The Challenge
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              A portfolio chatbot needs to feel native to the site while answering precise questions about projects,
              roles, research, and experience without hallucinating details. The frontend has to stay compact,
              responsive, source-aware, and persistent across the browsing session.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>
              The backend then has to balance accuracy and speed: vector retrieval, keyword fallbacks, prompt size,
              provider latency, and deterministic date calculations all need to cooperate behind the UI.
            </Typography>
          </GlassCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircleIcon color="primary" fontSize="small" />
              The Solution
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2.5 }}>
              AskSudipta separates the visitor-facing assistant from retrieval and generation:
            </Typography>
            <Stack spacing={2.5}>
              {[
                { title: "Native Chat Frontend", desc: "The floating assistant uses MUI states, sessionStorage, suggested prompts, formatted answers, and source navigation." },
                { title: "Grounded Runtime Path", desc: "The chat API retrieves context first, builds a source-rich prompt, and returns answer citations to the frontend." },
                { title: "Deterministic Facts", desc: "Experience-duration questions use typed date ranges before generation, keeping arithmetic outside the LLM." },
              ].map((item) => (
                <Stack key={item.title} direction="row" spacing={1.5} alignItems="flex-start">
                  <PsychologyIcon color="primary" sx={{ mt: 0.3, fontSize: 18 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, display: "block" }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewSection;
