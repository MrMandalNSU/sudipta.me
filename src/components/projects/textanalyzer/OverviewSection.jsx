import React from "react";
import { Box, Typography, Button, Stack, Chip, Link } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {
  SettingsSuggest as SettingsSuggestIcon,
  Speed as SpeedIcon,
  CheckCircleOutline as CheckCircleIcon,
  Dns as DnsIcon,
  Storage as StorageIcon,
  Hub as HubIcon,
  Build as BuildIcon,
  Launch as LaunchIcon,
} from "@mui/icons-material";
import { GlassCard, SectionHeading } from "./styles";

const shimmer = keyframes`
  0% { transform: skewX(-20deg) translateX(-150%); }
  100% { transform: skewX(-20deg) translateX(250%); }
`;

const OverviewSection = ({ theme }) => {
  return (
    <Box id="overview" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Overview</SectionHeading>

      <Grid container spacing={3}>
        {/* Text Analyzer Project Intro Card */}
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
                  src="/project_logos/textanalyzer_logo.svg"
                  alt="Text Analyzer Logo"
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
                  <Link
                    href="https://text-analyzer-sudipta.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                    sx={{
                      display: "inline-block",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "4px",
                      pl: 0.5,
                      pr: 2.5,
                      ml: -0.5,
                      mr: -2.5,
                      "&:hover .shimmer-shine": {
                        animation: `${shimmer} 0.8s ease-in-out`,
                      },
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        lineHeight: 1.1,
                        mb: 0.5,
                        display: "inline-block",
                        fontSize: { xs: "1.75rem", sm: "2.125rem", md: "1.75rem", lg: "2.125rem" },
                        background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #f43f5e 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 0 12px rgba(99, 102, 241, 0.4)",
                      }}
                    >
                      Text Analyzer
                    </Typography>
                    <Box
                      className="shimmer-shine"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 100%)",
                        pointerEvents: "none",
                        mixBlendMode: "overlay",
                        transform: "skewX(-20deg) translateX(-150%)",
                      }}
                    />
                  </Link>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                    Lexical Intelligence & Utility Suite
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 3 }}>
                Text Analyzer is an online platform that parses, cleans, and analyzes text content with real-time reports.
                Integrating modular React states with an Express API and MongoDB Atlas, it implements on-demand regex analytics caching, text case conversion workshops, and a collapsible JSON syntax explorer.
              </Typography>
            </Box>

            {/* Metadata / Stats */}
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2, pt: 2, borderTop: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}` }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5, fontFamily: "monospace", fontSize: "0.75rem" }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>Adoption</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>10+ Active Users</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>Scope</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>CRUD / Caching</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>Latency</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>&lt; 50ms</Typography>
                </Box>
              </Box>
              <Button
                href="https://text-analyzer-sudipta.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="small"
                startIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
                sx={{
                  height: 34,
                  fontWeight: 800,
                  fontSize: "0.78rem",
                  borderRadius: 1,
                  px: 2,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  boxShadow: "none",
                  backgroundColor: "#6366f1",
                  color: "#ffffff",
                  border: theme.palette.mode === "light" ? "1.5px solid rgba(99, 102, 241, 0.15)" : "1.5px solid rgba(255, 255, 255, 0.15)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#f43f5e",
                    color: "#ffffff",
                    borderColor: "#f43f5e",
                    boxShadow: "none",
                  },
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
                  category: "Frontend UI",
                  icon: <DnsIcon sx={{ fontSize: 13 }} />,
                  items: ["React 18", "Vite", "Material UI", "CSS Modules"],
                  color: "primary.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(99,102,241,0.06)" : "rgba(129,140,248,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(99,102,241,0.12)" : "rgba(129,140,248,0.15)",
                },
                {
                  category: "Backend Engine",
                  icon: <StorageIcon sx={{ fontSize: 13 }} />,
                  items: ["Node.js", "Express.js", "TypeScript"],
                  color: "secondary.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(6,182,212,0.06)" : "rgba(34,211,238,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(6,182,212,0.12)" : "rgba(34,211,238,0.15)",
                },
                {
                  category: "Database & Cache",
                  icon: <HubIcon sx={{ fontSize: 13 }} />,
                  items: ["MongoDB Atlas", "Mongoose ORM", "On-demand Cache"],
                  color: "success.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(16,185,129,0.06)" : "rgba(52,211,153,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(16,185,129,0.12)" : "rgba(52,211,153,0.15)",
                },
                {
                  category: "Testing & DevOps",
                  icon: <BuildIcon sx={{ fontSize: 13 }} />,
                  items: ["TDD", "Jest", "Vercel", "Render"],
                  color: "warning.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(245,158,11,0.06)" : "rgba(251,191,36,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(245,158,11,0.12)" : "rgba(251,191,36,0.15)",
                }
              ].map((group, gIdx) => (
                <Grid key={gIdx} size={{ xs: 12, sm: 6, md: 12, lg: 6 }}>
                  <Box sx={{
                    p: { xs: 1.5, sm: 2 },
                    height: "100%",
                    borderRadius: 2,
                    backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.01)" : "rgba(255,255,255,0.01)",
                    border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)"}`,
                  }}>
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
                        fontSize: { xs: "0.62rem", sm: "0.75rem" }
                      }}
                    >
                      {group.icon}
                      {group.category}
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={{ xs: 0.5, sm: 0.75 }}>
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
              Lexical analysis scripts running raw regular expression filters across long text values can cause UI freeze frame lags if evaluated on every keystroke. 
              Implementing a cloud-based relational metric store resolves this, but introduces a database loading overhead.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>
              Furthermore, creating a user login gate strictly to keep text card folders private and isolated would add registration friction, driving away immediate developers who just want to format and count paragraphs quickly.
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
              Text Analyzer combines dynamic local session tracking with lazy cache validation:
            </Typography>
            <Stack spacing={2.5}>
              {[
                { title: "Anonymous UUID Session Sandbox", desc: "Generates adjective-noun browser fingerprints persisted in LocalStorage to separate user cards on database levels with zero registration barriers." },
                { title: "On-Demand Metric Calculation", desc: "Calculates character, paragraph, and longest-word counters asynchronously only when requested, caching results inside dedicated Analysis logs." },
                { title: "Mongoose Cache Invalidation Engine", desc: "Invalidates stale analysis references by setting analysisId = null when a text card is edited, ensuring data integrity." },
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
