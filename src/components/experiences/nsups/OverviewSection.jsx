import React from "react";
import { Box, Chip, Typography, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GlassCard, SectionHeading } from "./styles";

const OverviewSection = ({ theme }) => {
  const stack = [
    "Web Crawling",
    "HTML parsing",
    "API Integrations",
    "Laravel",
    "PHP",
    "MySQL",
    "RESTful APIs",
    "Data Validation",
    "Relational DB Design",
    "Cron Schedulers",
    "Bootstrap"
  ];

  return (
    <Box id="overview" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>Overview</SectionHeading>

      <Grid container spacing={3}>
        {/* Left Information Card containing title, logo, and description */}
        <Grid size={{ xs: 12, md: 8 }}>
          <GlassCard sx={{ p: 3.5, height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Header with Logo & Title */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Avatar
                src="/nsups_logo.webp"
                alt="NSUPS Logo"
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
                  Junior Software Engineer
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#4F46E5" }}>
                  NSUPS (North South University Programming Society)
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" sx={{ mb: 2.5, lineHeight: 1.8, color: "text.primary" }}>
              At <strong>NSUPS</strong>, Sudipta Mandal served as Junior Software Engineer (Volunteer), developing backend services for the NSUPS Bootcamp participant management system.
              He implemented the core relational database schema and built secure REST APIs to manage student profiles, batches, and activities.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0, lineHeight: 1.7 }}>
              A major highlight of Sudipta's contributions was engineering an automated crawler system that connected directly to multiple online judges (Codeforces, Vjudge, AtCoder, LightOJ) to pull users' solved submission counts.
              By aggregating user activity histories dynamically, the system generated rank lists and analytics diagrams based on solved submission counts, driving engagement and performance tracking for hundreds of active bootcamp participants.
            </Typography>
          </GlassCard>
        </Grid>

        {/* Right Info Card containing work setup and stack */}
        <Grid size={{ xs: 12, md: 4 }}>
          <GlassCard sx={{ p: 3.5, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "primary.main", letterSpacing: "1px", mb: 1.5, textTransform: "uppercase" }}>
              Work Setup
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3.5 }}>
              <Chip label="On-Site / Hybrid" size="small" sx={{ fontWeight: 700, backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981", borderRadius: 1.5, border: "none" }} />
              <Chip label="Volunteer" size="small" sx={{ fontWeight: 700, backgroundColor: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", borderRadius: 1.5, border: "none" }} />
              <Chip label="Dhaka, Bangladesh" size="small" sx={{ fontWeight: 700, backgroundColor: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", borderRadius: 1.5, border: "none" }} />
            </Box>

            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "primary.main", letterSpacing: "1px", mb: 1.5, textTransform: "uppercase" }}>
              Product Stack
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
