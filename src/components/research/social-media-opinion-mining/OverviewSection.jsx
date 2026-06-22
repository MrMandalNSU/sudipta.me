import React from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Article as ArticleIcon,
  Language as LanguageIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import {
  contributionCards,
  headlineStats,
  keywordCloudTerms,
  modelAccuracyTrend,
  paperMeta,
  polarityDistribution,
  researchChips,
} from "./constants";
import { GlassCard, SectionHeading, StatCard } from "./styles";

const DonutChart = ({ theme }) => {
  let offset = 0;

  return (
    <GlassCard sx={{ p: 2.5, height: "100%" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 0.5 }}>
        Polarity Distribution
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
        Labeled corpus split
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
        <Box sx={{ width: 150, height: 150, position: "relative", flexShrink: 0 }}>
          <svg viewBox="0 0 120 120" width="150" height="150" aria-label="Polarity distribution donut chart">
            <circle
              cx="60"
              cy="60"
              r="42"
              fill="none"
              stroke={theme.palette.mode === "light" ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.08)"}
              strokeWidth="16"
            />
            {polarityDistribution.map((segment) => {
              const currentOffset = offset;
              offset += segment.value;
              return (
                <circle
                  key={segment.label}
                  cx="60"
                  cy="60"
                  r="42"
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="16"
                  pathLength="100"
                  strokeDasharray={`${segment.value} ${100 - segment.value}`}
                  strokeDashoffset={-currentOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              );
            })}
          </svg>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 900, lineHeight: 1 }}>
              47.6%
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
              Negative
            </Typography>
          </Box>
        </Box>

        <Stack spacing={1.2} sx={{ flex: 1, minWidth: 150 }}>
          {polarityDistribution.map((segment) => (
            <Box key={segment.label} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: segment.color }} />
                <Typography variant="body2" sx={{ fontWeight: 800 }}>
                  {segment.label}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 800 }}>
                {segment.value}%
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </GlassCard>
  );
};

const AccuracyLineChart = ({ theme }) => {
  const min = 76;
  const max = 83;
  const width = 232;
  const height = 150;
  const points = modelAccuracyTrend.map((point, index) => {
    const x = 26 + index * 90;
    const y = 116 - ((point.value - min) / (max - min)) * 82;
    return { ...point, x, y };
  });
  const linePoints = points.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPoints = `26,126 ${linePoints} 206,126`;

  return (
    <GlassCard sx={{ p: 2.5, height: "100%" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 0.5 }}>
        MNB Accuracy Trend
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
        Accuracy across TF-IDF n-gram ranges
      </Typography>

      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="170" aria-label="Model accuracy line chart" style={{ display: "block" }}>
          <line x1="26" y1="126" x2="206" y2="126" stroke={theme.palette.mode === "light" ? "rgba(15,23,42,0.16)" : "rgba(255,255,255,0.16)"} />
          <line x1="26" y1="28" x2="26" y2="126" stroke={theme.palette.mode === "light" ? "rgba(15,23,42,0.16)" : "rgba(255,255,255,0.16)"} />
          <polygon points={areaPoints} fill={theme.palette.mode === "light" ? "rgba(79,70,229,0.1)" : "rgba(129,140,248,0.14)"} />
          <polyline points={linePoints} fill="none" stroke={theme.palette.primary.main} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((point) => (
            <g key={point.label}>
              <circle cx={point.x} cy={point.y} r="6" fill={theme.palette.primary.main} stroke={theme.palette.mode === "light" ? "#fff" : "#0f172a"} strokeWidth="3" />
              <text x={point.x} y={point.y - 13} textAnchor="middle" fontSize="10" fontWeight="800" fill={theme.palette.text.primary} fontFamily="Inter, sans-serif">
                {point.value}%
              </text>
              <text x={point.x} y="144" textAnchor="middle" fontSize="10" fontWeight="700" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
                {point.label}
              </text>
            </g>
          ))}
        </svg>
      </Box>
    </GlassCard>
  );
};

const KeywordCloud = ({ theme }) => {
  const colors = ["primary.main", "secondary.main", "#10B981", "#EF4444", "#F59E0B", "text.primary"];

  return (
    <GlassCard sx={{ p: 2.5, height: "100%" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 0.5 }}>
        Research Theme Cloud
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
        Conceptual themes, not corpus-frequency output
      </Typography>

      <Box
        sx={{
          minHeight: 156,
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 1,
          p: 1,
          borderRadius: 2,
          backgroundColor: theme.palette.mode === "light" ? "rgba(15,23,42,0.03)" : "rgba(255,255,255,0.03)",
        }}
      >
        {keywordCloudTerms.map((term, index) => (
          <Box
            key={term.label}
            component="span"
            sx={{
              px: 1.1,
              py: 0.45,
              borderRadius: 1,
              fontWeight: 900,
              lineHeight: 1.2,
              fontSize: `${0.66 + term.weight * 0.18}rem`,
              color: colors[index % colors.length],
              backgroundColor: theme.palette.mode === "light" ? "rgba(255,255,255,0.64)" : "rgba(15,23,42,0.48)",
              border: `1px solid ${theme.palette.mode === "light" ? "rgba(15,23,42,0.06)" : "rgba(255,255,255,0.08)"}`,
            }}
          >
            {term.label}
          </Box>
        ))}
      </Box>
    </GlassCard>
  );
};

const OverviewSection = ({ theme }) => {
  return (
    <Box id="overview" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Overview</SectionHeading>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%" }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
              {researchChips.map((chip) => (
                <Chip
                  key={chip.label}
                  icon={React.cloneElement(chip.icon, { sx: { fontSize: 16 } })}
                  label={chip.label}
                  size="small"
                  sx={{
                    borderRadius: 1,
                    fontWeight: 700,
                    backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.12)",
                    color: "primary.main",
                  }}
                />
              ))}
            </Stack>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: 0,
                fontSize: { xs: "2rem", sm: "2.7rem", lg: "3.1rem" },
                mb: 2,
              }}
            >
              {paperMeta.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, mb: 3, maxWidth: 760 }}>
              This thesis research studies Bangla public Facebook comments to understand opinion polarity,
              social-media harassment, and hate-speech patterns in a low-resource language setting. It combines
              corpus creation, annotation quality control, exploratory demographic analysis, and traditional
              machine-learning benchmarks for Bangla opinion mining.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                href={paperMeta.ieeeLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<OpenInNewIcon />}
                sx={{ borderRadius: 1.2, fontWeight: 800, textTransform: "none" }}
              >
                View Publication
              </Button>
              <Button
                href="#methodology"
                variant="outlined"
                startIcon={<ArticleIcon />}
                sx={{ borderRadius: 1.2, fontWeight: 800, textTransform: "none" }}
              >
                Read Methodology
              </Button>
            </Stack>
          </GlassCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Grid container spacing={2}>
            {headlineStats.map((stat) => (
              <Grid key={stat.label} size={{ xs: 6 }}>
                <StatCard>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: "primary.main", lineHeight: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mt: 1 }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", lineHeight: 1.5, mt: 0.5 }}>
                    {stat.helper}
                  </Typography>
                </StatCard>
              </Grid>
            ))}
            <Grid size={{ xs: 12 }}>
              <GlassCard sx={{ p: 2.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 1.2, display: "flex", alignItems: "center", gap: 1 }}>
                  <LanguageIcon color="primary" fontSize="small" />
                  Published Research Context
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Published at {paperMeta.venue} in {paperMeta.year}, this work contributes a labeled
                  Bangla social-media corpus and a repeatable baseline for sentiment and hate-speech
                  classification.
                </Typography>
              </GlassCard>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <DonutChart theme={theme} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <AccuracyLineChart theme={theme} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <KeywordCloud theme={theme} />
        </Grid>

        {contributionCards.map((item) => (
          <Grid key={item.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <GlassCard sx={{ p: 2.5, height: "100%" }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                  color: "primary.main",
                  backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.12)",
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {item.desc}
              </Typography>
            </GlassCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OverviewSection;
