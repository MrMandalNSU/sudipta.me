import React from "react";
import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Language as LanguageIcon,
  SettingsSuggest as SettingsSuggestIcon,
  Speed as SpeedIcon,
  CheckCircleOutline as CheckCircleIcon,
} from "@mui/icons-material";
import { GlassCard, SectionHeading } from "./styles";

const OverviewSection = ({ theme }) => {
  return (
    <Box id="overview" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Overview</SectionHeading>

      <Grid container spacing={3}>
        {/* Valodash Project Intro Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 3 }}>
                <Box
                  component="img"
                  src="/project_logos/valodash_logo.svg"
                  alt="ValoDash Logo"
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "14px",
                    p: 1.2,
                    background: theme.palette.mode === "light" ? "rgba(255,255,255,0.7)" : "rgba(30,41,59,0.4)",
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
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "3px",
                      lineHeight: 1.1,
                      mb: 0.5,
                      color: theme.palette.mode === "light" ? "#0F1923" : "#ECE8E1",
                    }}
                  >
                    Valo
                    <Box component="span" sx={{ color: "#ff4655" }}>
                      Dash
                    </Box>
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                    Valorant Match Analytics
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 3 }}>
                A high-performance browser dashboard and scheduler framework built to aggregate custom match histories,
                track leaderboard standings, and monitor competitive player progression. Designed as an analytics suite
                for custom Valorant lobbies, it bypass-caches third-party APIs to deliver near-zero latency telemetry
                under tight token rate limits.
              </Typography>
            </Box>

            {/* Metadata Badges / Live Link */}
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2, pt: 2, borderTop: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}` }}>
              <Stack direction="row" spacing={2} sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>stagger</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>2000ms</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>sync rate</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>12 Hours</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>db models</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>10+ Tables</Typography>
                </Box>
              </Stack>
              <Button
                href="https://valodash.sudipta.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="small"
                startIcon={<LanguageIcon sx={{ fontSize: 16 }} />}
                sx={{
                  height: 34,
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  borderRadius: 1.5,
                  px: 2,
                  boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)",
                  background: "linear-gradient(135deg, #4F46E5, #06B6D4)",
                  "&:hover": { background: "linear-gradient(135deg, #4338CA, #0891B2)" },
                }}
              >
                Launch App
              </Button>
            </Box>
          </GlassCard>
        </Grid>

        {/* Tech Stack Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
              <SettingsSuggestIcon color="primary" fontSize="small" />
              Technology Stack
            </Typography>

            <Grid container spacing={2}>
              {[
                {
                  category: "Backend & Core",
                  items: ["Node.js", "TypeScript", "Express.js"],
                  color: "primary.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.12)" : "rgba(129,140,248,0.15)",
                },
                {
                  category: "Database & ORM",
                  items: ["PostgreSQL", "Prisma ORM"],
                  color: "secondary.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(6,182,212,0.06)" : "rgba(34,211,238,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(6,182,212,0.12)" : "rgba(34,211,238,0.15)",
                },
                {
                  category: "Integrations",
                  items: ["Riot Games API", "Discord OAuth"],
                  color: "warning.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(245,158,11,0.06)" : "rgba(251,191,36,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(245,158,11,0.12)" : "rgba(251,191,36,0.15)",
                },
                {
                  category: "Operations & Dev",
                  items: ["Cron Jobs", "GitHub Actions", "Zod Validation"],
                  color: "success.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(16,185,129,0.06)" : "rgba(52,211,153,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(16,185,129,0.12)" : "rgba(52,211,153,0.15)",
                }
              ].map((group, gIdx) => (
                <Grid key={gIdx} size={{ xs: 12, sm: 6 }}>
                  <Box sx={{
                    p: 2,
                    height: "100%",
                    borderRadius: 2,
                    backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.01)" : "rgba(255,255,255,0.01)",
                    border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)"}`,
                  }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: group.color, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", mb: 1.5 }}>
                      {group.category}
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={0.75}>
                      {group.items.map((tech, tIdx) => (
                        <Chip
                          key={tIdx}
                          label={tech}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.72rem",
                            borderRadius: 1.2,
                            background: group.bgColor,
                            color: group.color,
                            border: `1px solid ${group.borderColor}`,
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

        {/* The Challenge Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <SpeedIcon color="primary" fontSize="small" />
              The Challenge
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              Valorant custom matchmaking is highly competitive, yet players lack
              cohesive analysis tools to evaluate roster lineups, compute player
              trends, or view history aggregated dynamically under custom team
              structures. While official game histories exist, tracking comparative
              statistics across teammates requires manual logging and spreadsheets.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>
              From an engineering perspective, building this dashboard required
              resolving strict third-party API rate limitations. Directly querying
              stats for ten players on every page render would exhaust token limits
              and trigger API lockouts. Keeping cache synchronization secure and
              fast remained a primary bottleneck.
            </Typography>
          </GlassCard>
        </Grid>

        {/* The Solution Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircleIcon color="primary" fontSize="small" />
              The Solution
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2.5 }}>
              ValoDash resolves these issues with a scheduled asynchronous cache architecture:
            </Typography>
            <Stack spacing={2.5}>
              {[
                { title: "Asynchronous Cron Sync", desc: "Background workers pull match logs hourly from Riot Games API, processing telemetry without impacting frontend view times." },
                { title: "PostgreSQL Cache Layer", desc: "A secure schema caches player standings, overall KDA, maps won, and rank fluctuations for sub-second queries." },
                { title: "Discord Auth Binding", desc: "Users sign in with Discord and securely claim their Valorant profiles, linking stats instantly." },
              ].map((item, i) => (
                <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                  <CheckCircleIcon color="primary" sx={{ mt: 0.3, fontSize: 18 }} />
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
