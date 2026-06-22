import React from "react";
import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { featureSizes, modelRows } from "./constants";
import { GlassCard, SectionHeading, StatCard } from "./styles";

const ModelResultsSection = ({ theme }) => {
  return (
    <Box id="results" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Model Results</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 760, lineHeight: 1.75 }}>
        The experiment used Google Colab, a 90/10 train-test split, label encoding, and TF-IDF
        feature vectors across unigram, bigram, and trigram ranges.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <GlassCard sx={{ p: { xs: 2.5, sm: 3 }, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
              Best Reported Model
            </Typography>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.12)",
                border: `1px solid ${theme.palette.mode === "light" ? "rgba(79,70,229,0.18)" : "rgba(129,140,248,0.22)"}`,
                mb: 2,
              }}
            >
              <Chip label="Multinomial Naive Bayes + Unigram TF-IDF" size="small" sx={{ borderRadius: 1, fontWeight: 800, mb: 2 }} />
              <Typography variant="h2" sx={{ fontWeight: 900, color: "primary.main", lineHeight: 1 }}>
                82.60%
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 900, mt: 1 }}>
                Accuracy
              </Typography>
            </Box>
            <Grid container spacing={1.5}>
              {[
                ["Precision", "81.74%"],
                ["Recall", "82.60%"],
                ["F1-score", "81.56%"],
                ["Split", "90/10"],
              ].map(([label, value]) => (
                <Grid key={label} size={{ xs: 6 }}>
                  <StatCard sx={{ p: 1.8 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>{value}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>{label}</Typography>
                  </StatCard>
                </Grid>
              ))}
            </Grid>
          </GlassCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <GlassCard sx={{ p: { xs: 1.5, sm: 2 }, height: "100%" }}>
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table size="small" aria-label="Model accuracy comparison">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 900 }}>Model</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 900 }}>Unigram</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 900 }}>Bigram</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 900 }}>Trigram</TableCell>
                    <TableCell sx={{ fontWeight: 900, display: { xs: "none", md: "table-cell" } }}>Note</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modelRows.map((row) => {
                    const isBest = row.model === "Multinomial NB";
                    return (
                      <TableRow key={row.model} sx={{ backgroundColor: isBest ? (theme.palette.mode === "light" ? "rgba(79,70,229,0.05)" : "rgba(129,140,248,0.08)") : "transparent" }}>
                        <TableCell sx={{ fontWeight: isBest ? 900 : 700 }}>
                          {row.model}
                          {isBest && (
                            <Chip label="Best" size="small" sx={{ ml: 1, height: 20, borderRadius: 1, fontWeight: 800, color: "#10b981", backgroundColor: "rgba(16,185,129,0.12)" }} />
                          )}
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: isBest ? 900 : 700 }}>{row.unigram}%</TableCell>
                        <TableCell align="right">{row.bigram}%</TableCell>
                        <TableCell align="right">{row.trigram}%</TableCell>
                        <TableCell sx={{ display: { xs: "none", md: "table-cell" }, color: "text.secondary" }}>{row.note}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </GlassCard>
        </Grid>

        {featureSizes.map((feature) => (
          <Grid key={feature.label} size={{ xs: 12, sm: 4 }}>
            <StatCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.8px" }}>
                {feature.label}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "primary.main", mt: 1 }}>
                {feature.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
            </StatCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ModelResultsSection;
