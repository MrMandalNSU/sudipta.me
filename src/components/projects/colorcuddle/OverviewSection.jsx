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
        {/* ColorCuddle Project Intro Card */}
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
                  src="/project_logos/colorcuddle_logo.svg"
                  alt="Color Cuddle Logo"
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
                    href="https://colorcuddle.sudipta.xyz/"
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
                        display: "inline-block",
                        fontSize: { xs: "1.75rem", sm: "2.125rem", md: "1.75rem", lg: "2.125rem" },
                        background: "linear-gradient(90deg, #a78bfa 0%, #f472b6 50%, #fcd34d 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 0 12px rgba(139, 92, 246, 0.4)",
                      }}
                    >
                      Color Cuddle
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
                    Interactive State Deduction Game
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 3 }}>
                Color Cuddle is an immersive, high-fidelity color deduction game built with React and Next.js App Router.
                Inspired by Mastermind and Wordle, it challenges players to crack a hidden 5-color sequence layout. It features
                hybrid Drag & Drop inputs, localized log terminals, 3D card flips, and difficulty-adapted stats tracking using pure client-side states.
              </Typography>
            </Box>

            {/* Metadata Badges / Live Link */}
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2, pt: 2, borderTop: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}` }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5, fontFamily: "monospace", fontSize: "0.75rem" }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>attempts</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>5 / 120</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>modes</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>3 Difficulties</Box>
                    <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>3 Modes</Box>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>color pool</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    8 Colors
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>latency</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>0ms (local)</Typography>
                </Box>
              </Box>
              <Button
                href="https://colorcuddle.sudipta.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="small"
                startIcon={
                  <Box
                    component="img"
                    src="/project_logos/colorcuddle_logo.svg"
                    alt="Color Cuddle Icon"
                    sx={{
                      width: 16,
                      height: 16,
                      objectFit: "contain",
                      transition: "transform 0.3s ease",
                    }}
                  />
                }
                sx={{
                  height: 34,
                  fontWeight: 800,
                  fontSize: "0.78rem",
                  borderRadius: 1,
                  px: 2,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  boxShadow: "none",
                  backgroundColor: "#6d28d9",
                  color: "#ffffff",
                  border: theme.palette.mode === "light" ? "1.5px solid rgba(109, 40, 217, 0.15)" : "1.5px solid rgba(255, 255, 255, 0.15)",
                  transition: "all 0.2s ease-in-out",
                  "& .MuiButton-startIcon": {
                    marginRight: "6px",
                  },
                  "&:hover": {
                    backgroundColor: "#db2777",
                    color: "#ffffff",
                    borderColor: "#db2777",
                    boxShadow: "none",
                    "& img": {
                      transform: "scale(1.1) rotate(5deg)",
                      filter: "brightness(0) invert(1)",
                    }
                  },
                }}
              >
                Play Game
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
                  category: "Frontend Framework",
                  icon: <DnsIcon sx={{ fontSize: { xs: 11, sm: 13 } }} />,
                  items: ["Next.js 15", "React 19", "ESLint"],
                  color: "primary.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.12)" : "rgba(129,140,248,0.15)",
                },
                {
                  category: "Styling & Layout",
                  icon: <StorageIcon sx={{ fontSize: { xs: 11, sm: 13 } }} />,
                  items: ["Tailwind CSS v4", "Mui Icons"],
                  color: "secondary.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(6,182,212,0.06)" : "rgba(34,211,238,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(6,182,212,0.12)" : "rgba(34,211,238,0.15)",
                },
                {
                  category: "Interactions & Physics",
                  icon: <HubIcon sx={{ fontSize: { xs: 11, sm: 13 } }} />,
                  items: ["HTML5 DnD API", "Touch API Fallbacks", "Canvas Confetti"],
                  color: "warning.main",
                  bgColor: theme.palette.mode === "light" ? "rgba(245,158,11,0.06)" : "rgba(251,191,36,0.08)",
                  borderColor: theme.palette.mode === "light" ? "rgba(245,158,11,0.12)" : "rgba(251,191,36,0.15)",
                },
                {
                  category: "Operations & Cache",
                  icon: <BuildIcon sx={{ fontSize: { xs: 11, sm: 13 } }} />,
                  items: ["LocalStorage API", "Immutable Functional Updates"],
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
              Web-based logic puzzles demand crisp visual feedback and zero-latency drag interactions.
              Supporting HTML5 drag-and-drop on desktops works cleanly, but mobile viewports lack native support.
              Creating a hybrid interface that dynamically resolves touch fallbacks without breaking functional layout flow remained a challenge.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>
              Furthermore, enabling unlimited attempts in Hard and Insane modes could potentially introduce body scrollbars that break standard viewport limits.
              Ensuring the grid coordinates automatically scroll to keep the active row visible while preserving a fixed height dashboard was essential for user experience.
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
              Color Cuddle coordinates state updates entirely client-side using React functional state machines:
            </Typography>
            <Stack spacing={2.5}>
              {[
                { title: "Hybrid Interaction Bridge", desc: "Maps drag start event references and implements click-to-place fallbacks to guarantee 100% device compatibility." },
                { title: "Scrolling Container Anchoring", desc: "Binds custom scrollbar wrappers (.game-scrollbar) and drives automatic row center scrolls using DOM node scrollIntoView properties." },
                { title: "Local Telemetry Stream", desc: "Logs diagnostic stdout logs directly inside dedicated sandbox views, preserving browser window scroll status." },
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
