import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { workflows } from "./constants";
import { GlassCard, SectionHeading } from "./styles";

const WorkflowsSection = ({ theme, activeWorkflow, setActiveWorkflow }) => {
  return (
    <Box id="workflows" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Project Workflows</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 700 }}>
        Key execution pipelines that coordinate authentication, player registrations, and scheduled telemetry updates.
      </Typography>

      <Grid container spacing={3}>
        {/* Workflow Detail Panel */}
        <Grid size={{ xs: 12, lg: 9 }} sx={{ order: { xs: 2, lg: 1 } }}>
          <GlassCard sx={{ p: 3.5, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
              {React.cloneElement(workflows[activeWorkflow].icon, { color: "primary", sx: { fontSize: 22 } })}
              {workflows[activeWorkflow].title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontStyle: "italic" }}>
              {workflows[activeWorkflow].description}
            </Typography>

            <Stack spacing={2.5} sx={{ position: "relative" }}>
              {workflows[activeWorkflow].steps.map((step, index) => (
                <Box key={index} sx={{ display: "flex", gap: 2, position: "relative" }}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.15)",
                        color: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        border: `1px solid ${theme.palette.mode === "light" ? "rgba(79,70,229,0.15)" : "rgba(129,140,248,0.25)"}`,
                      }}
                    >
                      {index + 1}
                    </Box>
                    {index < workflows[activeWorkflow].steps.length - 1 && (
                      <Box
                        sx={{
                          width: 1.5,
                          flex: 1,
                          backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
                          my: 0.5,
                        }}
                      />
                    )}
                  </Box>
                  <Box sx={{ pb: index < workflows[activeWorkflow].steps.length - 1 ? 2 : 0 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5, color: "text.primary" }}>
                      {step.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: "0.85rem" }}>
                      {step.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </GlassCard>
        </Grid>

        {/* Workflow Selector */}
        <Grid size={{ xs: 12, lg: 3 }} sx={{ order: { xs: 1, lg: 2 } }}>
          <Stack
            direction={{ xs: "row", lg: "column" }}
            spacing={1.5}
            sx={{
              width: "100%",
              mb: { xs: 1.5, lg: 0 }
            }}
          >
            {Object.entries(workflows).map(([key, flow]) => {
              const isActive = activeWorkflow === key;
              return (
                <Button
                  key={key}
                  onClick={() => setActiveWorkflow(key)}
                  variant={isActive ? "contained" : "outlined"}
                  startIcon={React.cloneElement(flow.icon, { sx: { fontSize: 18 } })}
                  sx={{
                    flex: { xs: "1 1 0px", lg: "initial" },
                    justifyContent: { xs: "center", lg: "flex-start" },
                    textTransform: "none",
                    fontWeight: 700,
                    py: { xs: 1.2, lg: 1.5 },
                    px: { xs: 1, lg: 2.5 },
                    borderRadius: 2,
                    boxShadow: isActive ? "0 4px 14px rgba(79, 70, 229, 0.2)" : "none",
                    backgroundColor: isActive ? theme.palette.primary.main : "transparent",
                    borderColor: isActive ? "transparent" : theme.palette.mode === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)",
                    color: isActive ? "#FFF" : "text.secondary",
                    fontSize: { xs: "0.75rem", sm: "0.85rem", lg: "0.875rem" },
                    whiteSpace: "nowrap",
                    minWidth: 0,
                    "&:hover": {
                      backgroundColor: isActive ? theme.palette.primary.main : theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
                      borderColor: isActive ? "transparent" : theme.palette.primary.main,
                      transform: "none",
                      boxShadow: isActive ? "0 4px 14px rgba(79, 70, 229, 0.2)" : "none",
                    },
                  }}
                >
                  <Box component="span" sx={{ display: { xs: "inline", lg: "none" } }}>
                    {flow.shortTitle}
                  </Box>
                  <Box component="span" sx={{ display: { xs: "none", lg: "inline" } }}>
                    {flow.title.split(" Flow")[0].split(" Engine")[0]}
                  </Box>
                </Button>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkflowsSection;
