import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { features } from "./constants";
import { GlassCard, SectionHeading } from "./styles";

const KeyFeaturesSection = ({ theme }) => {
  return (
    <Box id="features" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>Key Features & Engineering Systems</SectionHeading>
      
      <Grid container spacing={3}>
        {features.map((feature, idx) => (
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
                  {feature.icon}
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "text.primary" }}>
                  {feature.title}
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, flex: 1 }}>
                {feature.desc}
              </Typography>
            </GlassCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KeyFeaturesSection;
