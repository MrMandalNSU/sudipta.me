import React from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Article as ArticleIcon,
  Language as LanguageIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import { contributionCards, headlineStats, paperMeta, researchChips } from "./constants";
import { GlassCard, SectionHeading, StatCard } from "./styles";

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
