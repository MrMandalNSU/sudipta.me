import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GlassCard, SectionHeading } from "./styles";
import { strategyDocs } from "./constants";
import {
  MenuBook as BookIcon,
  AssignmentTurnedIn as SpecIcon
} from "@mui/icons-material";

const DocumentationSection = ({ theme }) => {
  return (
    <Box id="documentation" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>Knowledge Engineering & Strategy Documentation</SectionHeading>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 800, lineHeight: 1.7 }}>
        To ensure future extensibility and allow new team members to maintain the pipeline without relying on tribal knowledge, 
        Sudipta created six comprehensive parsing strategy handbooks. These documents detail exactly how to isolate fields 
        and handle layout anomalies for each document family.
      </Typography>

      <Grid container spacing={3}>
        {strategyDocs.map((doc, idx) => (
          <Grid size={{ xs: 12, sm: 6 }} key={idx}>
            <GlassCard
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "@media (hover: hover)": {
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                  }
                }
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", mb: 1.5 }}>
                <Box
                  sx={{
                    p: 1.2,
                    borderRadius: 2,
                    backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BookIcon color="primary" sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "text.primary", fontFamily: "monospace" }}>
                    {doc.file}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "primary.main", letterSpacing: "0.5px", textTransform: "uppercase", display: "block", mt: 0.5 }}>
                    Strategy Spec
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, flex: 1 }}>
                {doc.desc}
              </Typography>
            </GlassCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DocumentationSection;
