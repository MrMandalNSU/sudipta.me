import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GlassCard, SectionHeading } from "./styles";
import {
  QueryStats as RndIcon,
  Grid4x4 as CoordinateIcon,
  JoinInner as AnchorIcon,
  Construction as ModularIcon
} from "@mui/icons-material";

const PatternRecognitionSection = ({ theme }) => {
  const steps = [
    {
      icon: <CoordinateIcon color="primary" />,
      title: "Coordinate Spacing & Column Alignments",
      desc: "For columnar documents where text columns would normally merge, enabling pdftotext layout mode preserves raw spacing. Grid boundaries and character x-coordinate groups are evaluated to isolate fields (e.g., separating supplier info from item prices)."
    },
    {
      icon: <AnchorIcon color="primary" />,
      title: "Pattern Bounds & Text Anchor Search",
      desc: "Tabular extraction loops operate within dynamically calculated bounds. The parser locates index indicators (e.g., finding lines matching 'NETTO' or double underlines) and parses only the elements inside to prevent junk headers or footers from polluting data arrays."
    },
    {
      icon: <ModularIcon color="primary" />,
      title: "Modular Normalization Helpers",
      desc: "Parsing results are normalized using centralized utility helpers, ensuring consistent formats. Mappings like Geonames conversion convert multi-language strings (e.g., 'Vokietija' or 'Deutschland') into standard ISO codes ('DE'), while uncomma() parses commas to numeric floats."
    }
  ];

  return (
    <Box id="rnd" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>R&D: Pattern Recognition & Modular Extraction</SectionHeading>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 800, lineHeight: 1.7 }}>
        Logistics documents vary heavily in structure and layout conventions. To prevent parser failures, Sudipta focused on
        research and development of coordinate-aware mapping algorithms and modular extraction classes.
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={3.5}>
            {steps.map((step, idx) => (
              <Box key={idx} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box
                  sx={{
                    p: 1.2,
                    borderRadius: "12px",
                    backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {step.icon}
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5, color: "text.primary" }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <GlassCard sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <RndIcon color="primary" /> R&D Methodology
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
              Rather than maintaining dozens of rigid parser rules, Sudipta designed custom boundary and spacing scanners:
            </Typography>

            <List sx={{ p: 0 }}>
              {[
                "Character offset grouping to define visual columns dynamically.",
                "Search ranges to isolate target lines from multi-page PDFs.",
                "Modular regex sanitization blocks to extract weights, counts, and currency units.",
                "Safe country and value sanitization helpers avoiding duplicate checks.",
              ].map((text, idx) => (
                <ListItem key={idx} sx={{ p: 0, pb: 1.5, alignItems: "flex-start" }}>
                  <Typography variant="body2" sx={{ color: "primary.main", mr: 1, mt: 0.25 }}>
                    ✦
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.5 }}>
                    {text}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatternRecognitionSection;
