import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { annotationCategories, datasetFacts } from "./constants";
import { GlassCard, SectionHeading } from "./styles";

const categoryColors = {
  Positive: "#10b981",
  Negative: "#ef4444",
  Neutral: "#64748b",
};

const DatasetAnnotationSection = ({ theme }) => {
  return (
    <Box id="dataset" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Dataset & Annotation</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 760, lineHeight: 1.75 }}>
        The dataset was designed to capture noisy, public Bangla social-media language while protecting
        personal identity. Labels were built in two layers: coarse polarity and finer sentiment categories.
      </Typography>

      <Grid container spacing={3}>
        {datasetFacts.map((fact) => (
          <Grid key={fact.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <GlassCard sx={{ p: 2.5, height: "100%" }}>
              <Box sx={{ color: "primary.main", mb: 1.5 }}>{fact.icon}</Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 0.75 }}>
                {fact.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                {fact.desc}
              </Typography>
            </GlassCard>
          </Grid>
        ))}

        <Grid size={{ xs: 12, lg: 7 }}>
          <GlassCard sx={{ p: { xs: 2.5, sm: 3 }, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
              Sentiment Subcategories
            </Typography>
            <Stack spacing={1.5}>
              {annotationCategories.map((row) => {
                const color = categoryColors[row.category];
                return (
                  <Box key={row.label}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 0.7 }}>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        {row.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                        {row.count.toLocaleString()} comments - {row.percent}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        height: 8,
                        borderRadius: 99,
                        backgroundColor: theme.palette.mode === "light" ? "rgba(15,23,42,0.07)" : "rgba(255,255,255,0.08)",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: row.percent,
                          height: "100%",
                          borderRadius: 99,
                          backgroundColor: color,
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </GlassCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <GlassCard sx={{ p: { xs: 2.5, sm: 3 }, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
              Annotation Quality
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 3 }}>
              Four native Bangla speakers annotated the comments, then cross-validated each other's
              labels to correct polarity and subcategory mismatches. Cohen's kappa was used to quantify
              agreement across annotators.
            </Typography>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                backgroundColor: theme.palette.mode === "light" ? "rgba(16,185,129,0.08)" : "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.24)",
              }}
            >
              <Typography variant="h2" sx={{ fontWeight: 900, color: "#10b981", lineHeight: 1 }}>
                0.92
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 900, mt: 1 }}>
                Cohen's kappa
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Almost-perfect agreement
              </Typography>
            </Box>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DatasetAnnotationSection;
