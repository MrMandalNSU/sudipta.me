import React from "react";
import { Box, Chip, Typography, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GlassCard, SectionHeading } from "./styles";

const OverviewSection = ({ theme }) => {
  const stack = [
    "Node.js",
    "Strapi v5",
    "PostgreSQL",
    "Neon DB",
    "Redis",
    "Socket.io",
    "Railway",
    "ZeptoMail & SMTP",
    "OAuth (Google/Facebook)",
    "Swagger / OpenAPI",
    "Nodemailer",
    "Cron Schedulers",
  ];

  return (
    <Box id="overview" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>Overview</SectionHeading>

      <Grid container spacing={3}>
        {/* Left Info Card */}
        <Grid size={{ xs: 12, md: 8 }}>
          <GlassCard sx={{ p: 3.5, height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Header Logo & Title */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Avatar
                src="/sports_fixures_logo.webp"
                alt="Sports Fixtures Logo"
                imgProps={{ width: 50, height: 50, loading: "lazy" }}
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  p: 0.5,
                  "& img": {
                    objectFit: "contain",
                  }
                }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>
                  Senior Software Engineer
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#818CF8" }}>
                  Sports Fixtures
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" sx={{ mb: 2.5, lineHeight: 1.8, color: "text.primary" }}>
              At <strong>Sports Fixtures</strong>, Sudipta Mandal served as a Senior Software Engineer under a contract role, building and maintaining the backend infrastructure from scratch. The main task was developing a high-performance, real-time sports synchronization backend using Node.js, Strapi v5, and PostgreSQL.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0, lineHeight: 1.7 }}>
              By integrating SportsDB v1/v2 APIs with structured caching, real-time WebSockets (Socket.io), and background cron queues, Sudipta reduced API synchronization downtime by 30% and improved database retrieval speed by 40%. The system handles security flows (OTP/OAuth), real-time broadcast nodes, and extensive CMS section reordering dynamically.
            </Typography>
          </GlassCard>
        </Grid>

        {/* Right Work Setup Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <GlassCard sx={{ p: 3.5, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "primary.main", letterSpacing: "1px", mb: 1.5, textTransform: "uppercase" }}>
              Work Setup
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3.5 }}>
              <Chip label="Remote" size="small" sx={{ fontWeight: 700, backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981", borderRadius: 1.5, border: "none" }} />
              <Chip label="Contract" size="small" sx={{ fontWeight: 700, backgroundColor: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", borderRadius: 1.5, border: "none" }} />
              <Chip label="Pattaya, Thailand" size="small" sx={{ fontWeight: 700, backgroundColor: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", borderRadius: 1.5, border: "none" }} />
            </Box>

            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "primary.main", letterSpacing: "1px", mb: 1.5, textTransform: "uppercase" }}>
              Tech Stack
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {stack.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    borderRadius: 1.5,
                    backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.1)",
                    color: "primary.main",
                    border: "none",
                  }}
                />
              ))}
            </Box>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewSection;
