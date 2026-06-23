import React from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  CheckCircleOutline as CheckCircleIcon,
  Dns as DnsIcon,
  Psychology as PsychologyIcon,
  SmartToy as SmartToyIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";
import { GlassCard, SectionHeading } from "./styles";
import { techGroups } from "./constants";

const openAssistant = () => {
  window.dispatchEvent(new Event("open-chatbot"));
};

const OverviewSection = ({ theme }) => {
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
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: 900,
                      letterSpacing: "0px",
                      lineHeight: 1.1,
                      mb: 0.5,
                      color: "text.primary",
                      fontSize: { xs: "1.9rem", sm: "2.25rem", md: "1.9rem", lg: "2.25rem" },
                    }}
                  >
                    AskSudipta
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase" }}>
                    Portfolio RAG Assistant Backend
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 3 }}>
                AskSudipta is the retrieval-augmented generation backend behind the portfolio assistant. It turns curated
                portfolio markdown into vector-searchable knowledge, retrieves grounded context for visitor questions,
                and returns concise answers with source references that map back to the website.
              </Typography>
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
              A portfolio chatbot needs to answer precise questions about projects, roles, research, and experience without
              hallucinating details. Static markdown is easy to maintain, but it must become searchable, source-aware context
              at runtime without reading files on every chat request.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>
              The hard part is balancing accuracy and speed: vector retrieval, keyword fallbacks, prompt size, provider
              latency, and deterministic date calculations all need to cooperate inside a small production-minded backend.
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
              AskSudipta separates ingestion-time indexing from chat-time answering:
            </Typography>
            <Stack spacing={2.5}>
              {[
                { title: "Searchable Knowledge Base", desc: "Markdown is chunked with heading metadata, embedded with Gemini, and stored in Supabase pgvector." },
                { title: "Grounded Runtime Path", desc: "The chat API retrieves context first, builds a source-rich prompt, and returns answer citations to the UI." },
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
