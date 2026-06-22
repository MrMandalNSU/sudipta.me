import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  Chip,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import {
  Analytics as AnalyticsIcon,
  Article as ArticleIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  FactCheck as FactCheckIcon,
  Insights as InsightsIcon,
  Language as LanguageIcon,
  LocationOn as LocationIcon,
  OpenInNew as OpenInNewIcon,
  Psychology as PsychologyIcon,
  Storage as StorageIcon,
} from "@mui/icons-material";

const OuterPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  zIndex: 0,
  isolation: "isolate",
  overflow: "hidden",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  background:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.4)"
      : "rgba(15, 23, 42, 0.4)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    padding: 0,
    borderRadius: 0,
    background: "transparent",
    boxShadow: "none",
  },
}));

const ResearchCard = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  isolation: "isolate",
  overflow: "hidden",
  borderRadius: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.62)"
      : "rgba(30, 41, 59, 0.62)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "none",
  transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.2s ease, background-color 0.2s ease",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    pointerEvents: "none",
    opacity: 0,
    boxShadow: "inset 0 0 0 1px rgba(129, 140, 248, 0.35), inset 0 0 32px rgba(79, 70, 229, 0.14)",
    transition: "opacity 0.25s ease",
  },
  "@media (hover: hover)": {
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      border: `1px solid ${theme.palette.primary.main}`,
      "&::after": {
        opacity: 1,
      },
    },
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
    borderLeft: "none",
    borderRight: "none",
  },
}));

const InstitutionLogo = styled(Avatar)(({ theme }) => ({
  width: 44,
  height: 44,
  marginRight: theme.spacing(1.5),
  "& .MuiAvatar-img": {
    objectFit: "contain",
    padding: theme.spacing(0.5),
  },
}));

const stats = [
  { value: "11,006", label: "Bangla comments" },
  { value: "3", label: "Polarity classes" },
  { value: "8", label: "Sentiment labels" },
  { value: "0.92", label: "Cohen's kappa" },
  { value: "82.60%", label: "Best accuracy" },
  { value: "4", label: "Bangla annotators" },
];

const methodology = [
  "Data collection",
  "Annotation validation",
  "Bangla text cleaning",
  "TF-IDF features",
  "ML classification",
];

const achievements = [
  "Created a privacy-conscious corpus of 11,006 Bangla Facebook comments from public posts, retaining reaction and reply metadata while excluding names and profile links. The dataset was collected from multiple public-figure groups so the research could capture noisy, real-world social-media language instead of curated textbook Bangla.",
  "Structured labels into positive, negative, and neutral polarity, then decomposed them into eight sentiment subcategories including gender-based, religious, political, personal hate, and sarcasm. This layered taxonomy made the corpus useful for both broad sentiment analysis and more specific online-harassment research.",
  "Coordinated annotation and cross-validation with native Bangla speakers, achieving a Cohen's kappa value of 0.92 for almost-perfect agreement. The validation loop helped correct ambiguous comments, reduce labeling drift, and keep the final dataset reliable enough for supervised machine-learning experiments.",
  "Analyzed demographic and reaction patterns across public-figure groups, showing a substantially higher rate of gender-based and religious hate on female sample pages. The exploratory analysis connected model-building with social insight by surfacing where hostile behavior appeared most concentrated.",
  "Benchmarked TF-IDF unigram, bigram, and trigram features across traditional ML classifiers, with Multinomial Naive Bayes reaching 82.60% accuracy. The comparison established a practical baseline for Bangla opinion mining using lightweight, reproducible methods in Google Colab.",
  "Published the work at ICCIT 2021 with a future direction toward expanding the dataset, improving coverage of noisy Bangla social-media language, and preparing reusable resources for safer online community research and moderation tooling.",
  "Documented the full workflow in LaTeX with clear experiment tables, category definitions, and result analysis so the research could be reviewed, reproduced, and extended by future Bangla NLP researchers.",
];

const technologies = [
  "Python",
  "Google Colab",
  "Bangla NLP",
  "TF-IDF",
  "Sentiment Analysis",
  "Machine Learning",
  "Data Mining",
  "LaTeX",
];

const polarityDistribution = [
  { label: "Negative", value: 47.6, color: "#ef4444" },
  { label: "Neutral", value: 35.1, color: "#64748b" },
  { label: "Positive", value: 17.3, color: "#10b981" },
];

const accuracyTrend = [
  { label: "Uni", value: 82.6 },
  { label: "Bi", value: 81.33 },
  { label: "Tri", value: 77.79 },
];

const LandingDonutChart = () => {
  let offset = 0;

  return (
    <Box
      sx={{
        p: 1.8,
        borderRadius: 1.5,
        backgroundColor: "rgba(15,23,42,0.04)",
        border: "1px solid rgba(148,163,184,0.16)",
        height: "100%",
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 1, textAlign: "left" }}>
        Polarity Split
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "minmax(140px, 1fr) 150px", lg: "minmax(150px, 1fr) 160px" },
          alignItems: "center",
          gap: { xs: 1.5, sm: 2.5 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", minWidth: 0 }}>
          <Box sx={{ width: 106, height: 106, position: "relative", flexShrink: 0 }}>
            <svg viewBox="0 0 100 100" width="106" height="106" aria-label="Research polarity split preview">
            <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="14" />
            {polarityDistribution.map((segment) => {
              const currentOffset = offset;
              offset += segment.value;
              return (
                <circle
                  key={segment.label}
                  cx="50"
                  cy="50"
                  r="34"
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="14"
                  pathLength="100"
                  strokeDasharray={`${segment.value} ${100 - segment.value}`}
                  strokeDashoffset={-currentOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              );
            })}
            </svg>
            <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <Typography variant="body2" sx={{ fontWeight: 900, lineHeight: 1 }}>47.6%</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.62rem", fontWeight: 800 }}>Neg.</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8, minWidth: 0 }}>
          {polarityDistribution.map((segment) => (
            <Box
              key={segment.label}
              sx={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                alignItems: "center",
                columnGap: 1.2,
                minWidth: 0,
                px: 1,
                py: 0.8,
                borderRadius: 1,
                backgroundColor: "rgba(129,140,248,0.08)",
                border: "1px solid rgba(129,140,248,0.12)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.65, minWidth: 0 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: segment.color, flexShrink: 0 }} />
                <Typography variant="caption" sx={{ fontWeight: 900, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {segment.label}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 900, textAlign: "right" }}>
                {segment.value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const LandingAccuracyChart = () => {
  const min = 76;
  const max = 83;
  const points = accuracyTrend.map((point, index) => {
    const x = 44 + index * 136;
    const y = 104 - ((point.value - min) / (max - min)) * 72;
    return { ...point, x, y };
  });
  const linePoints = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <Box
      sx={{
        p: 1.8,
        borderRadius: 1.5,
        backgroundColor: "rgba(15,23,42,0.04)",
        border: "1px solid rgba(148,163,184,0.16)",
        height: "100%",
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 1, textAlign: "left" }}>
        MNB Accuracy
      </Typography>
      <svg viewBox="0 0 360 136" width="100%" height="150" aria-label="MNB accuracy preview chart" style={{ display: "block" }}>
        <line x1="44" y1="112" x2="316" y2="112" stroke="rgba(148,163,184,0.22)" />
        <polyline points={linePoints} fill="none" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="4.5" fill="#818cf8" />
            <text x={point.x} y={point.y - 11} textAnchor="middle" fontSize="10" fontWeight="800" fill="currentColor" fontFamily="Inter, sans-serif">
              {point.value}%
            </text>
            <text x={point.x} y="130" textAnchor="middle" fontSize="10" fontWeight="800" fill="#94a3b8" fontFamily="Inter, sans-serif">
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </Box>
  );
};

const ActionButtons = ({ sx }) => (
  <Grid container spacing={1.5} sx={sx}>
    <Grid size={{ xs: 12, sm: 6 }}>
      <Button
        fullWidth
        component={RouterLink}
        to="/research/social-media-opinion-mining"
        variant="contained"
        startIcon={<ArticleIcon />}
        sx={{
          minHeight: 38,
          borderRadius: 1.2,
          fontWeight: 800,
          textTransform: "none",
          color: "#fff",
          backgroundColor: "primary.main",
          whiteSpace: "nowrap",
          "& .MuiButton-startIcon": { color: "inherit" },
          "&:hover": {
            color: "#fff",
            backgroundColor: "#3730A3",
            boxShadow: "0 6px 16px rgba(79, 70, 229, 0.32)",
          },
        }}
      >
        Detailed Overview
      </Button>
    </Grid>
    <Grid size={{ xs: 12, sm: 6 }}>
      <Button
        fullWidth
        href="https://ieeexplore.ieee.org/document/9689860"
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
        startIcon={<OpenInNewIcon />}
        sx={{
          minHeight: 38,
          borderRadius: 1.2,
          fontWeight: 800,
          textTransform: "none",
          backgroundColor: "rgba(255,255,255,0.03)",
          whiteSpace: "nowrap",
          "& .MuiButton-startIcon": { color: "inherit" },
          "&:hover": {
            color: "primary.main",
            backgroundColor: "rgba(79,70,229,0.08)",
            borderColor: "primary.main",
          },
        }}
      >
        View Publication
      </Button>
    </Grid>
  </Grid>
);

const Research = ({ id }) => {
  return (
    <Box
      id={id}
      sx={{
        position: "relative",
        zIndex: 0,
        isolation: "isolate",
        mt: 0,
        display: "flex",
        alignItems: "center",
        px: { xs: 0, sm: 2 },
        py: { xs: 0, sm: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 3 } }}>
        <OuterPaper elevation={3}>
          <Box sx={{ mb: { xs: 2, sm: 4 }, pt: { xs: 2, sm: 0 }, px: { xs: 2, sm: 0 }, textAlign: "center" }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800, color: "text.primary", fontSize: { xs: "1.75rem", sm: "2.125rem" } }} gutterBottom>
              Research Experience
            </Typography>
          </Box>

          <ResearchCard>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", md: "center" },
                  gap: 2.5,
                  mb: 2.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <InstitutionLogo src="/research_logo.svg" alt="North South University research logo">
                    <BusinessIcon />
                  </InstitutionLogo>
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                      Social Media Opinion Mining Based on Bangla Public Post of Facebook
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, mt: 0.7 }}>
                      <Link href="https://www.northsouth.edu/" target="_blank" rel="noopener noreferrer" underline="hover" sx={{ color: "text.secondary" }}>
                        <Typography variant="subtitle2" component="p" sx={{ fontWeight: 600 }}>
                          North South University - Research
                        </Typography>
                      </Link>
                      <Chip
                        icon={<ArticleIcon fontSize="small" />}
                        label="ICCIT 2021"
                        size="small"
                        sx={{ borderRadius: 1, fontWeight: 700, backgroundColor: "rgba(79,70,229,0.1)", color: "primary.main" }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, alignItems: { xs: "flex-start", md: "flex-end" }, textAlign: { xs: "left", md: "right" } }}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <CalendarIcon sx={{ fontSize: 14 }} /> 2021
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <LocationIcon sx={{ fontSize: 14 }} /> Dhaka, Bangladesh
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2.5, borderColor: "rgba(255,255,255,0.1)" }} />

              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, lg: 7 }}>
                  <ActionButtons sx={{ display: { xs: "flex", lg: "none" }, mb: 2.2 }} />

                  <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.75, mb: 2, textAlign: "left" }}>
                    <strong>Focus:</strong> A published thesis research project on Bangla Facebook opinion mining,
                    hate-speech patterns, annotation quality, and classic ML baselines for low-resource social-media text.
                    The work connects dataset construction with social analysis, showing how annotated Bangla comments
                    can support safer moderation tools, demographic insight, and reproducible NLP experimentation.
                  </Typography>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2.5 }}>
                    {methodology.map((step, index) => (
                      <Chip
                        key={step}
                        icon={
                          index === 0 ? <StorageIcon fontSize="small" /> :
                          index === 1 ? <FactCheckIcon fontSize="small" /> :
                          index === 2 ? <LanguageIcon fontSize="small" /> :
                          index === 3 ? <AnalyticsIcon fontSize="small" /> :
                          <PsychologyIcon fontSize="small" />
                        }
                        label={step}
                        size="small"
                        sx={{
                          borderRadius: 1,
                          fontWeight: 700,
                          backgroundColor: "rgba(16, 185, 129, 0.1)",
                          color: "#10b981",
                          border: "1px solid rgba(16, 185, 129, 0.24)",
                        }}
                      />
                    ))}
                  </Box>

                  <Stack spacing={1.2} sx={{ alignItems: "stretch", textAlign: "left" }}>
                    {achievements.map((achievement) => (
                      <Box key={achievement} sx={{ display: "flex", gap: 1.1, alignItems: "flex-start", textAlign: "left" }}>
                        <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 17, mt: 0.25, flexShrink: 0 }} />
                        <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.65 }}>
                          {achievement}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, lg: 5 }}>
                  <ActionButtons sx={{ display: { xs: "none", lg: "flex" }, mb: 2.5 }} />

                  <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
                    {stats.map((stat) => (
                      <Grid key={stat.label} size={{ xs: 6, sm: 4, lg: 6 }}>
                        <Box
                          sx={{
                            p: 1.7,
                            height: "100%",
                            borderRadius: 1.5,
                            backgroundColor: "rgba(79,70,229,0.08)",
                            border: "1px solid rgba(129,140,248,0.18)",
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: 900, color: "primary.main", lineHeight: 1 }}>
                            {stat.value}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, fontWeight: 800 }}>
                            {stat.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 1.5,
                      backgroundColor: "rgba(15,23,42,0.04)",
                      border: "1px solid rgba(148,163,184,0.16)",
                      mb: 2.5,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 900, display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <InsightsIcon color="primary" fontSize="small" />
                      Contribution Summary
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                      This work combines dataset construction, annotation validation, demographic exploratory
                      analysis, and traditional ML benchmarking to support safer Bangla social-media analysis.
                    </Typography>
                  </Box>

                  <Grid container spacing={1.5}>
                    <Grid size={{ xs: 12 }}>
                      <LandingDonutChart />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <LandingAccuracyChart />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 2.5 }}>
                {technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      borderRadius: 1,
                      backgroundColor: "rgba(79, 70, 229, 0.1)",
                      color: "primary.main",
                      border: "none",
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </ResearchCard>
        </OuterPaper>
      </Container>
    </Box>
  );
};

export default Research;
