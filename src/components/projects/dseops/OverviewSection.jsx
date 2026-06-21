import React from "react";
import { Box, Typography, Button, Stack, Chip, Link } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

const shimmer = keyframes`
  0% {
    transform: skewX(-20deg) translateX(-150%);
  }
  100% {
    transform: skewX(-20deg) translateX(250%);
  }
`;
import {
  Language as LanguageIcon,
  SettingsSuggest as SettingsSuggestIcon,
  Speed as SpeedIcon,
  CheckCircleOutline as CheckCircleIcon,
  Dns as DnsIcon,
  Storage as StorageIcon,
  Hub as HubIcon,
  Build as BuildIcon,
} from "@mui/icons-material";
import { GlassCard, SectionHeading } from "./styles";

const OverviewSection = ({ theme }) => {
  return (
    <Box id="overview" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Overview</SectionHeading>

      <Grid container spacing={3}>
        {/* DSE Ops Project Intro Card */}
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
                  src="/project_logos/dsescript_logo.svg"
                  alt="DSE Ops Logo"
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
                    href="https://dse.sudipta.xyz"
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
                        letterSpacing: "3px",
                        lineHeight: 1.1,
                        mb: 0.5,
                        color: theme.palette.mode === "light" ? "#0F1923" : "#ECE8E1",
                        display: "inline-block",
                        fontSize: { xs: "1.75rem", sm: "2.125rem", md: "1.75rem", lg: "2.125rem" },
                      }}
                    >
                      DSE
                      <Box component="span" sx={{ color: "#3b82f6" }}>
                        Ops
                      </Box>
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
                    DSE SME Market Analytics
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 3 }}>
                A modern full-stack web archiving portal built to scrape, persist, and visualize Dhaka Stock Exchange (DSE) SME market data. Featuring automated daily HTML table parser webhooks, relational database transaction storage in Supabase PostgreSQL, direct S3 CSV downloads, and a fast, premium glassmorphism analytics dashboard.
              </Typography>
            </Box>

            {/* Metadata Badges / Live Link */}
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2, pt: 2, borderTop: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}` }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5, fontFamily: "monospace", fontSize: "0.75rem" }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>schedule</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>4H</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>db tables</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>4+</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>file storage</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>Supabase S3</Typography>
                </Box>
              </Box>
              <Button
                href="https://dse.sudipta.xyz"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="small"
                startIcon={
                  <Box
                    component="img"
                    src="/project_logos/dsescript_logo.svg"
                    alt="DSE Ops Icon"
                    sx={{
                      width: 16,
                      height: 16,
                      objectFit: "contain",
                      transition: "transform 0.3s ease",
                    }}
                  />
                }
                sx={{
                  ml: "auto",
                  height: 34,
                  fontWeight: 800,
                  fontSize: "0.78rem",
                  borderRadius: 1,
                  px: 2,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  boxShadow: "none",
                  backgroundColor: "#0F1923",
                  color: "#ECE8E1",
                  border: theme.palette.mode === "light" ? "1.5px solid rgba(15, 25, 35, 0.15)" : "1.5px solid rgba(255, 255, 255, 0.15)",
                  transition: "all 0.2s ease-in-out",
                  "& .MuiButton-startIcon": {
                    marginRight: "6px",
                  },
                  "&:hover": {
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    borderColor: "#3b82f6",
                    boxShadow: "none",
                    "& img": {
                      transform: "scale(1.1) rotate(5deg)",
                      filter: "brightness(0) invert(1)",
                    }
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
                  category: "Backend & Parser",
                  icon: <DnsIcon sx={{ fontSize: { xs: 11, sm: 13 } }} />,
                  items: ["Node.js", "Express.js", "node-html-parser"],
                  color: "primary.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.12)" : "rgba(129,140,248,0.15)",
                },
                {
                  category: "Database & Storage",
                  icon: <StorageIcon sx={{ fontSize: { xs: 11, sm: 13 } }} />,
                  items: ["PostgreSQL", "Supabase", "Supabase S3 Bucket"],
                  color: "secondary.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(6,182,212,0.06)" : "rgba(34,211,238,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(6,182,212,0.12)" : "rgba(34,211,238,0.15)",
                },
                {
                  category: "Frontend UI",
                  icon: <HubIcon sx={{ fontSize: { xs: 11, sm: 13 } }} />,
                  items: ["Next.js (TS, React 19)", "Lucide React", "Pure Vanilla CSS"],
                  color: "warning.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(245,158,11,0.06)" : "rgba(251,191,36,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(245,158,11,0.12)" : "rgba(251,191,36,0.15)",
                },
                {
                  category: "Infrastructure & Automation",
                  icon: <BuildIcon sx={{ fontSize: { xs: 11, sm: 13 } }} />,
                  items: ["Railway Hosting", "Vercel", "cron-job.org webhooks"],
                  color: "success.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(16,185,129,0.06)" : "rgba(52,211,153,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(16,185,129,0.12)" : "rgba(52,211,153,0.15)",
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
              The Dhaka Stock Exchange (DSE) SME board publishes daily market statistics on its website, but does not provide historical databases, REST APIs, or structured CSV downloads. Investors and financial researchers are forced to manually copy and parse raw text tables from their website on a day-to-day basis.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>
              To automate this, the system needs to scrape daily listings at market close. The scraping backend must reliably parse unstructured HTML structures, handle potential changes in column indexing, manage S3 storage streams synchronously, and provide an idempotent database layout to avoid duplicate rows during repeated runs.
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
              DSE Ops implements a fully automated market scraper and clean analytics board:
            </Typography>
            <Stack spacing={2.5}>
              {[
                { title: "Automated Scraping Webhooks", desc: "A daily cron schedule fires secure webhook triggers to boot up HTML scrapers and parser modules at market close." },
                { title: "Supabase Relational Archive", desc: "Stores daily summaries, public trade boards, and block transaction statistics in SQL, optimized with indices." },
                { title: "Direct CSV S3 uploads", desc: "Streams structured stock lists into downloadable CSV files directly on Supabase buckets for archival storage." },
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
