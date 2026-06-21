import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { features } from "./constants";
import { GlassCard, SectionHeading } from "./styles";

const KeyFeaturesSection = ({ theme }) => {
  return (
    <Box id="features" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Key Features</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 700 }}>
        Key developer workspaces and lexical intelligence capabilities integrated within Text Analyzer.
      </Typography>

      <Grid container spacing={3}>
        {features.map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <GlassCard
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  backgroundColor: theme.palette.mode === "light" ? "rgba(99,102,241,0.06)" : "rgba(129,140,248,0.1)",
                  color: "primary.main",
                  mb: 2.5,
                  "& svg": {
                    fontSize: 22,
                  }
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {item.desc}
              </Typography>
            </GlassCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KeyFeaturesSection;
