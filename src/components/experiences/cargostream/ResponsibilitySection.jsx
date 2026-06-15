import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GlassCard, SectionHeading } from "./styles";
import {
  Speed as PerformanceIcon,
  SettingsSuggest as ConfigIcon,
  Share as IntegrationIcon,
  RecordVoiceOver as CollabIcon,
} from "@mui/icons-material";

const ResponsibilitySection = ({ theme }) => {
  const contributions = [
    {
      icon: <ConfigIcon sx={{ fontSize: 24, color: "primary.main" }} />,
      title: "Pipeline Architecture",
      desc: "Designed and implemented a format-agnostic parser structure in Laravel to handle diverse logistics document types, including PDFs (standard and layout-aware), multi-block EML mail bodies, and structured XLSX spreadsheets."
    },
    {
      icon: <PerformanceIcon sx={{ fontSize: 24, color: "primary.main" }} />,
      title: "Throughput Optimization",
      desc: "Tackled complex document normalization challenges for highly inconsistent and unstructured logistics PDFs. Engineered dynamic fallback functions to capture varied layouts and created robust format-handling rules to dynamically parse multilingual documents received from the same vendor."
    },
    {
      icon: <IntegrationIcon sx={{ fontSize: 24, color: "primary.main" }} />,
      title: "Data Normalization & DRY Code",
      desc: "Engineered modular sanitization functions and localization helpers to dynamically parse values and extract text lines across multilingual formats from the same vendor, maintaining clean, reusable parsing routines."
    },
    {
      icon: <CollabIcon sx={{ fontSize: 24, color: "primary.main" }} />,
      title: "Collaboration & Communications",
      desc: "Collaborated closely with the CTO and team members to define target schema boundaries (such as Order and Service Invoice blueprints), ensuring formatting standardizations and strict data integrity guards across all partner integrations."
    }
  ];

  return (
    <Box id="responsibility" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>Responsibility & Contribution</SectionHeading>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 800, lineHeight: 1.7 }}>
        At Cargo Stream, Sudipta took ownership of the pipeline's architectural robustness. 
        Here is a breakdown of his direct engineering responsibilities, collaborations, and systems achievements.
      </Typography>

      <Grid container spacing={3}>
        {contributions.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index}>
            <GlassCard sx={{ height: "100%", p: 3 }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, color: "text.primary" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            </GlassCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResponsibilitySection;
