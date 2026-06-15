import React from "react";
import { Box, Button, Typography, Paper, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { workflows } from "./constants";
import { GlassCard, SectionHeading } from "./styles";

const WorkflowButton = styled(Button)(({ theme, active }) => ({
  justifyContent: "flex-start",
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.spacing(1.5),
  textTransform: "none",
  fontWeight: active ? 800 : 600,
  fontSize: "0.85rem",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  borderLeft: `4px solid ${active ? theme.palette.primary.main : "transparent"}`,
  backgroundColor: active
    ? theme.palette.mode === "light"
      ? "rgba(79,70,229,0.08)"
      : "rgba(129,140,248,0.1)"
    : "transparent",
  transition: "all 0.2s ease",
  textAlign: "left",
  width: "100%",
  "&:hover": {
    backgroundColor: active
      ? theme.palette.mode === "light"
        ? "rgba(79,70,229,0.08)"
        : "rgba(129,140,248,0.1)"
      : theme.palette.mode === "light"
        ? "rgba(0,0,0,0.02)"
        : "rgba(255,255,255,0.03)",
  },
}));

const WorkflowsSection = ({ theme, activeWorkflow, setActiveWorkflow }) => {
  const currentWorkflow = workflows[activeWorkflow];

  return (
    <Box id="workflows" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>Pipeline Workflows</SectionHeading>
      
      <Grid container spacing={3}>
        {/* Left Workflow Selector */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={1}>
            {Object.entries(workflows).map(([key, w]) => (
              <WorkflowButton
                key={key}
                active={activeWorkflow === key}
                onClick={() => setActiveWorkflow(key)}
                startIcon={React.cloneElement(w.icon, { sx: { fontSize: 18 } })}
              >
                {w.title.split(" & ")[0]}
              </WorkflowButton>
            ))}
          </Stack>
        </Grid>

        {/* Right Workflow Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          <GlassCard sx={{ p: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
              {React.cloneElement(currentWorkflow.icon, { color: "primary", sx: { fontSize: 20 } })}
              {currentWorkflow.title}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
              {currentWorkflow.description}
            </Typography>

            {/* Steps Timeline */}
            <Box sx={{ position: "relative", pl: 3.5, borderLeft: `2px dashed ${theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`, ml: 1.5, mb: 4 }}>
              {currentWorkflow.steps.map((step, idx) => (
                <Box key={idx} sx={{ mb: idx === currentWorkflow.steps.length - 1 ? 0 : 3.5, position: "relative" }}>
                  {/* Timeline Dot */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: -40,
                      top: 2,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.mode === "light" ? "#FFF" : "rgba(15,23,42,1)",
                      border: `2px solid ${theme.palette.primary.main}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.65rem",
                      fontWeight: 900,
                      color: "primary.main",
                      zIndex: 1,
                    }}
                  >
                    {idx + 1}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 800, mb: 0.5, color: "text.primary" }}>
                    {step.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                    {step.text}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Mock Payloads for visualization */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2.2,
                    borderRadius: 2,
                    backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.01)" : "rgba(255,255,255,0.01)",
                    border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 800, color: "primary.main", letterSpacing: "0.5px", textTransform: "uppercase", display: "block", mb: 1 }}>
                    Conceptual Ingest Specs
                  </Typography>
                  <pre
                    style={{
                      margin: 0,
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                      overflowX: "auto",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {JSON.stringify(currentWorkflow.payload, null, 2)}
                  </pre>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2.2,
                    borderRadius: 2,
                    backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.01)" : "rgba(255,255,255,0.01)",
                    border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 800, color: "primary.main", letterSpacing: "0.5px", textTransform: "uppercase", display: "block", mb: 1 }}>
                    Conceptual Output Model
                  </Typography>
                  <pre
                    style={{
                      margin: 0,
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                      overflowX: "auto",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {JSON.stringify(currentWorkflow.responsePayload, null, 2)}
                  </pre>
                </Paper>
              </Grid>
            </Grid>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkflowsSection;
