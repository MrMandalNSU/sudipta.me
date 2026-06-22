import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { methodologySteps } from "./constants";
import { DiagramBoard, GlassCard, SectionHeading } from "./styles";

const MethodologySection = ({ theme }) => {
  return (
    <Box id="methodology" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Methodology</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 760, lineHeight: 1.75 }}>
        The research pipeline moves from public-comment collection to annotation, Bangla-specific
        cleaning, TF-IDF feature engineering, and supervised classification.
      </Typography>

      <DiagramBoard sx={{ mb: 3 }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <svg width="100%" viewBox="0 0 980 260" style={{ display: "block", maxWidth: "100%", height: "auto" }}>
            <defs>
              <marker id="researchArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={theme.palette.primary.main} />
              </marker>
            </defs>
            {methodologySteps.slice(0, -1).map((_, index) => (
              <path
                key={index}
                d={`M ${145 + index * 160} 118 L ${190 + index * 160} 118`}
                stroke={theme.palette.primary.main}
                strokeWidth="2.2"
                fill="none"
                markerEnd="url(#researchArrow)"
                opacity="0.7"
              />
            ))}
            {methodologySteps.map((step, index) => {
              const x = 20 + index * 160;
              return (
                <g key={step.label}>
                  <rect
                    x={x}
                    y="62"
                    width="126"
                    height="112"
                    rx="12"
                    fill={theme.palette.mode === "light" ? "rgba(255,255,255,0.86)" : "rgba(15,23,42,0.82)"}
                    stroke={theme.palette.mode === "light" ? "rgba(79,70,229,0.18)" : "rgba(129,140,248,0.22)"}
                  />
                  <text
                    x={x + 63}
                    y="105"
                    textAnchor="middle"
                    fontWeight="800"
                    fill={theme.palette.text.primary}
                    fontSize="11"
                    fontFamily="Inter, sans-serif"
                  >
                    {step.label}
                  </text>
                  <text
                    x={x + 63}
                    y="126"
                    textAnchor="middle"
                    fill={theme.palette.text.secondary}
                    fontSize="9.5"
                    fontFamily="Inter, sans-serif"
                  >
                    {index === 0 && "Public posts"}
                    {index === 1 && "3 + 8 labels"}
                    {index === 2 && "Kappa 0.92"}
                    {index === 3 && "BNLP / BLTK"}
                    {index === 4 && "TF-IDF"}
                    {index === 5 && "90 / 10 split"}
                  </text>
                </g>
              );
            })}
          </svg>
        </Box>

        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Stack spacing={2}>
            {methodologySteps.map((step, index) => (
              <Box key={step.label} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "primary.main",
                    color: "#fff",
                    fontSize: "0.78rem",
                    fontWeight: 900,
                  }}
                >
                  {index + 1}
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                    {step.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {step.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </DiagramBoard>

      <Grid container spacing={2}>
        {methodologySteps.map((step, index) => (
          <Grid key={step.label} size={{ xs: 12, sm: 6, lg: 4 }}>
            <GlassCard sx={{ p: 2.5, height: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "primary.main",
                    backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.12)",
                  }}
                >
                  {step.icon}
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                  {index + 1}. {step.label}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {step.text}
              </Typography>
            </GlassCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MethodologySection;
