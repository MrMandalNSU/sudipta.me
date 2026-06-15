import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GlassCard, SectionHeading } from "./styles";
import { conceptualSchemas } from "./constants";
import {
  Schema as SchemaIcon,
  Storage as BlockIcon,
} from "@mui/icons-material";

const SchemaSection = ({ theme, activeTable, setActiveTable }) => {
  const currentSchema = conceptualSchemas[activeTable];

  return (
    <Box id="database" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>Schema Mapping & Data Integrity</SectionHeading>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 800, lineHeight: 1.7 }}>
        All parsed arrays are validated against unified target schemas to guarantee format-agnostic compatibility. 
        Below are visual block diagrams illustrating the conceptual structure of the pipeline's core schema specs.
      </Typography>

      {/* Document Tab Switcher */}
      <Box
        sx={{
          display: "flex",
          borderRadius: 2,
          p: 0.5,
          mb: 3.5,
          backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}`,
          width: "fit-content",
        }}
      >
        {Object.keys(conceptualSchemas).map((key) => {
          const isActive = activeTable === key;
          return (
            <Button
              key={key}
              onClick={() => setActiveTable(key)}
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: isActive ? 800 : 600,
                fontSize: "0.8rem",
                borderRadius: 1.5,
                px: 2.5,
                py: 0.8,
                backgroundColor: isActive ? theme.palette.primary.main : "transparent",
                color: isActive ? "#FFF" : "text.secondary",
                "&:hover": {
                  backgroundColor: isActive ? theme.palette.primary.main : theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
                  transform: "none",
                  boxShadow: "none",
                },
              }}
            >
              {key}
            </Button>
          );
        })}
      </Box>

      {/* Grid of Blocks */}
      <GlassCard sx={{ p: 3.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <SchemaIcon color="primary" sx={{ fontSize: 20 }} />
          {activeTable} Schema Structure
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {currentSchema.description}
        </Typography>

        <Grid container spacing={3}>
          {currentSchema.sections.map((sec, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2.2,
                  height: "100%",
                  borderRadius: 2.5,
                  backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.01)" : "rgba(255,255,255,0.01)",
                  border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                  }
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 800, mb: 1.5, display: "flex", alignItems: "center", gap: 1, color: "text.primary" }}>
                  <BlockIcon color="primary" sx={{ fontSize: 16 }} />
                  {sec.name}
                </Typography>
                
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {sec.fields.map((field, fIdx) => (
                    <Box
                      key={fIdx}
                      sx={{
                        p: 1,
                        borderRadius: 1.5,
                        backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)"}`,
                      }}
                    >
                      <Typography variant="caption" sx={{ fontFamily: "monospace", color: "text.primary", fontWeight: 700 }}>
                        {field}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </GlassCard>
    </Box>
  );
};

export default SchemaSection;
