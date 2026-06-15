import React, { useState } from "react";
import { Box, Typography, Collapse } from "@mui/material";
import Grid from "@mui/material/Grid";
import { features } from "./constants";
import { GlassCard, SectionHeading } from "./styles";

const KeyFeaturesSection = ({ theme }) => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  return (
    <Box id="features" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Key Features</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 650 }}>
        Core capabilities that power the ValoDash analytics platform.
        <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}> Tap any card to view its description.</Box>
      </Typography>

      <Grid container spacing={2}>
        {features.map((f, i) => {
          const isExpanded = expandedFeature === i;
          return (
            <Grid key={i} size={{ xs: 6, sm: 6, lg: 4 }}>
              <GlassCard
                onClick={() => setExpandedFeature(prev => prev === i ? null : i)}
                sx={{
                  p: { xs: 2, sm: 3 },
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  borderColor: isExpanded ? "primary.main" : undefined,
                  boxShadow: isExpanded ? `0 4px 12px ${theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)"}` : "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.8 } }}>
                  <Box
                    sx={{
                      width: { xs: 32, sm: 38 },
                      height: { xs: 32, sm: 38 },
                      borderRadius: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.1)",
                      color: "primary.main",
                      flexShrink: 0,
                    }}
                  >
                    {f.icon}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: { xs: "0.8rem", sm: "0.95rem" }, lineHeight: 1.2 }}>
                    <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                      {f.title}
                    </Box>
                    <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                      {f.shortTitle || f.title}
                    </Box>
                  </Typography>
                </Box>

                {/* Desktop/Tablet Description (Always Visible) */}
                <Box sx={{ display: { xs: "none", sm: "block" }, mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {f.desc}
                  </Typography>
                </Box>

                {/* Mobile Description (Collapsible) */}
                <Box sx={{ display: { xs: "block", sm: "none" } }}>
                  <Collapse in={isExpanded}>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: "0.75rem", mt: 1.5 }}>
                      {f.desc}
                    </Typography>
                  </Collapse>
                </Box>
              </GlassCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default KeyFeaturesSection;
