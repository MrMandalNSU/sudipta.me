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
  FactCheck as FactCheckIcon,
  Insights as InsightsIcon,
  Language as LanguageIcon,
  LocationOn as LocationIcon,
  OpenInNew as OpenInNewIcon,
  Psychology as PsychologyIcon,
  Storage as StorageIcon,
} from "@mui/icons-material";

const OuterPaper = styled(Paper)(({ theme }) => ({
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
  borderRadius: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.62)"
      : "rgba(30, 41, 59, 0.62)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
  "@media (hover: hover)": {
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 24px rgba(79, 70, 229, 0.16)",
      border: `1px solid ${theme.palette.primary.main}`,
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
];

const methodology = [
  "Data collection",
  "Annotation validation",
  "Bangla text cleaning",
  "TF-IDF features",
  "ML classification",
];

const achievements = [
  "Created a privacy-conscious corpus of 11,006 Bangla Facebook comments from public posts, retaining reaction and reply metadata while excluding names and profile links.",
  "Structured labels into positive, negative, and neutral polarity, then decomposed them into eight sentiment subcategories including gender-based, religious, political, personal hate, and sarcasm.",
  "Coordinated annotation and cross-validation with native Bangla speakers, achieving a Cohen's kappa value of 0.92 for almost-perfect agreement.",
  "Analyzed demographic and reaction patterns across public-figure groups, showing a substantially higher rate of gender-based and religious hate on female sample pages.",
  "Benchmarked TF-IDF unigram, bigram, and trigram features across traditional ML classifiers, with Multinomial Naive Bayes reaching 82.60% accuracy.",
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

const Research = ({ id }) => {
  return (
    <Box
      id={id}
      sx={{
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
                  <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.75, mb: 2 }}>
                    <strong>Focus:</strong> A published thesis research project on Bangla Facebook opinion mining,
                    hate-speech patterns, annotation quality, and classic ML baselines for low-resource social-media text.
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

                  <Stack spacing={1.2}>
                    {achievements.map((achievement) => (
                      <Box key={achievement} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                        <Typography variant="body2" sx={{ color: "primary.main", mt: 0.15 }}>
                          -
                        </Typography>
                        <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.65 }}>
                          {achievement}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, lg: 5 }}>
                  <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
                    {stats.map((stat) => (
                      <Grid key={stat.label} size={{ xs: 6, sm: stat.value === "82.60%" ? 4 : 6, lg: 6 }}>
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

                  <Stack direction={{ xs: "column", sm: "row", lg: "column", xl: "row" }} spacing={1.2}>
                    <Button
                      component={RouterLink}
                      to="/research/social-media-opinion-mining"
                      variant="contained"
                      startIcon={<ArticleIcon />}
                      sx={{ borderRadius: 1.2, fontWeight: 800, textTransform: "none" }}
                    >
                      Detailed Overview
                    </Button>
                    <Button
                      href="https://ieeexplore.ieee.org/document/9689860"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      startIcon={<OpenInNewIcon />}
                      sx={{ borderRadius: 1.2, fontWeight: 800, textTransform: "none" }}
                    >
                      View Publication
                    </Button>
                  </Stack>
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
