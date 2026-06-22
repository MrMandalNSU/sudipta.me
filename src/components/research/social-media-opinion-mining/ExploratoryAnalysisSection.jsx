import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { analysisFindings } from "./constants";
import { GlassCard, SectionHeading } from "./styles";

const distribution = [
  { label: "Negative", value: 47.6, color: "#ef4444" },
  { label: "Positive", value: 17.3, color: "#10b981" },
  { label: "Neutral", value: 35.1, color: "#64748b" },
];

const genderComparison = [
  { label: "Gender-based hate", male: 0.69, female: 10.81 },
  { label: "Religious hate", male: 2.12, female: 13.33 },
  { label: "Personal hate", male: 15.94, female: 21.36 },
];

const ExploratoryAnalysisSection = ({ theme }) => {
  return (
    <Box id="analysis" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Exploratory Analysis</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 760, lineHeight: 1.75 }}>
        The EDA portion investigated the dataset beyond model accuracy, surfacing how negativity,
        harassment, and reaction behavior differ across public-figure groups.
      </Typography>

      <Grid container spacing={3}>
        {analysisFindings.map((finding) => (
          <Grid key={finding.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <GlassCard sx={{ p: 2.5, height: "100%" }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.8px" }}>
                {finding.title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "primary.main", mt: 1, mb: 0.5 }}>
                {finding.value}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 1 }}>
                {finding.label}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                {finding.desc}
              </Typography>
            </GlassCard>
          </Grid>
        ))}

        <Grid size={{ xs: 12, lg: 5 }}>
          <GlassCard sx={{ p: { xs: 2.5, sm: 3 }, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
              Overall Polarity Distribution
            </Typography>
            <Stack spacing={2}>
              {distribution.map((item) => (
                <Box key={item.label}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                    <Typography variant="body2" sx={{ fontWeight: 900 }}>{item.label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 900 }}>{item.value}%</Typography>
                  </Box>
                  <Box sx={{ height: 12, borderRadius: 99, overflow: "hidden", backgroundColor: theme.palette.mode === "light" ? "rgba(15,23,42,0.07)" : "rgba(255,255,255,0.08)" }}>
                    <Box sx={{ width: `${item.value}%`, height: "100%", borderRadius: 99, backgroundColor: item.color }} />
                  </Box>
                </Box>
              ))}
            </Stack>
          </GlassCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <GlassCard sx={{ p: { xs: 2.5, sm: 3 }, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
              Male vs Female Public-Figure Samples
            </Typography>
            <Stack spacing={2.2}>
              {genderComparison.map((item) => (
                <Box key={item.label}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 1 }}>
                    {item.label}
                  </Typography>
                  <Grid container spacing={1.5}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>Male samples</Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ flex: 1, height: 9, borderRadius: 99, backgroundColor: theme.palette.mode === "light" ? "rgba(15,23,42,0.07)" : "rgba(255,255,255,0.08)" }}>
                          <Box sx={{ width: `${Math.min(item.male * 4, 100)}%`, height: "100%", borderRadius: 99, backgroundColor: "#3b82f6" }} />
                        </Box>
                        <Typography variant="caption" sx={{ fontWeight: 900, minWidth: 48 }}>{item.male}%</Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>Female samples</Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ flex: 1, height: 9, borderRadius: 99, backgroundColor: theme.palette.mode === "light" ? "rgba(15,23,42,0.07)" : "rgba(255,255,255,0.08)" }}>
                          <Box sx={{ width: `${Math.min(item.female * 4, 100)}%`, height: "100%", borderRadius: 99, backgroundColor: "#ef4444" }} />
                        </Box>
                        <Typography variant="caption" sx={{ fontWeight: 900, minWidth: 48 }}>{item.female}%</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Stack>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExploratoryAnalysisSection;
