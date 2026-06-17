import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GlassCard, SectionHeading } from "./styles";
import { agenticAiLoops } from "./constants";
import {
  AutoAwesome as AiIcon,
} from "@mui/icons-material";

const AgenticAiSection = ({ theme }) => {
  return (
    <Box id="agentic-ai" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>Agentic AI & Context Engineering</SectionHeading>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 800, lineHeight: 1.7 }}>
        By utilizing AI-driven development methodologies, Sudipta dramatically accelerated code production and pipeline reliability.
        He structured comprehensive codebase context files, established automated validation loops, and used AI agents to bootstrap core backend features.
      </Typography>

      <Grid container spacing={3}>
        {agenticAiLoops.map((loop, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
            <GlassCard
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "@media (hover: hover)": {
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: theme.palette.primary.main,
                    boxShadow: theme.palette.mode === "light" 
                      ? "0 12px 28px rgba(79, 70, 229, 0.12)" 
                      : "0 12px 28px rgba(129, 140, 248, 0.12)",
                  }
                }
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
                    backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.1)",
                    color: "primary.main",
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
        ))}
      </Grid>
    </Box>
  );
};

export default AgenticAiSection;
