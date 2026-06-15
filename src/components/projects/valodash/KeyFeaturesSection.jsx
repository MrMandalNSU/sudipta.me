import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { features } from "./constants";
import { GlassCard, SectionHeading } from "./styles";

const KeyFeaturesSection = ({ theme }) => {
  return (
    <Box id="features" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Key Features</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 650 }}>
        Core capabilities that power the ValoDash analytics platform.
      </Typography>

      <Grid container spacing={2.5}>
        {features.map((f, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
            <GlassCard sx={{ p: 3, height: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.8, mb: 2 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
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
                <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                  <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                    {f.title}
                  </Box>
                  <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                    {f.shortTitle || f.title}
                  </Box>
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {f.desc}
              </Typography>
            </GlassCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KeyFeaturesSection;
