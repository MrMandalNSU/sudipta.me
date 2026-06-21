import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { workflows } from "./constants";
import { GlassCard, SectionHeading } from "./styles";

const highlightJson = (obj) => {
  if (!obj) return null;
  const jsonString = JSON.stringify(obj, null, 2);
  const lines = jsonString.split("\n");

  return lines.map((line, index) => {
    // 1. Match key-value pairs (e.g. "key": "value" or "key": 123)
    const match = line.match(/^(\s*)"([^"]+)"(:\s*)(.*)$/);
    if (match) {
      const indent = match[1];
      const key = match[2];
      const colon = match[3];
      const value = match[4];

      let valueElement;
      if (value.startsWith('"')) {
        const isComma = value.endsWith(",");
        const cleanVal = isComma ? value.slice(0, -1) : value;
        valueElement = (
          <>
            <span style={{ color: "#34D399" }}>{cleanVal}</span>
            {isComma && <span style={{ color: "#94A3B8" }}>,</span>}
          </>
        );
      } else if (value.trim() === "{" || value.trim() === "[") {
        valueElement = <span style={{ color: "#94A3B8" }}>{value}</span>;
      } else {
        const isComma = value.endsWith(",");
        const cleanVal = isComma ? value.slice(0, -1) : value;
        valueElement = (
          <>
            <span style={{ color: "#FB7185" }}>{cleanVal}</span>
            {isComma && <span style={{ color: "#94A3B8" }}>,</span>}
          </>
        );
      }

      return (
        <div key={index}>
          {indent}
          <span style={{ color: "#60A5FA" }}>"{key}"</span>
          {colon}
          {valueElement}
        </div>
      );
    }

    // 2. Match string elements inside arrays
    const arrayStringMatch = line.match(/^(\s*)"([^"]+)"(,?)$/);
    if (arrayStringMatch) {
      const indent = arrayStringMatch[1];
      const val = arrayStringMatch[2];
      const comma = arrayStringMatch[3];
      return (
        <div key={index}>
          {indent}
          <span style={{ color: "#34D399" }}>"{val}"</span>
          {comma && <span style={{ color: "#94A3B8" }}>{comma}</span>}
        </div>
      );
    }

    return <div key={index}>{line}</div>;
  });
};

const WorkflowsSection = ({ theme, activeWorkflow, setActiveWorkflow }) => {
  const combinedTelemetry = {
    inputs: workflows[activeWorkflow]?.payload,
    outputs: workflows[activeWorkflow]?.responsePayload,
  };

  return (
    <Box id="workflows" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Project Workflows</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 700 }}>
        Key execution steps mapping initial game generation, interactive evaluation, and Wordle-style decryption sharing.
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

          {/* API Payload Schema Preview Console */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              flexDirection: "column",
              mt: 2.5,
              borderRadius: 2,
              backgroundColor: "#1e1b4b", // ColorCuddle dark indigo console background
              border: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            {/* Console Tab Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
                py: 1,
                backgroundColor: "rgba(255,255,255,0.02)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "#d8b4fe",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  fontSize: "0.68rem",
                }}
              >
                {activeWorkflow === "initialization" && "Initialization State"}
                {activeWorkflow === "evaluation" && "Evaluation State"}
                {activeWorkflow === "sharing" && "Share Logs Data"}
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }} />
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }} />
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }} />
              </Box>
            </Box>

            {/* Console Code View */}
            <Box
              sx={{
                p: 2.5,
                fontFamily: "'Fira Code', 'Courier New', Courier, monospace",
                fontSize: "0.78rem",
                lineHeight: 1.6,
                textAlign: "left",
                color: "#e9d5ff",
                overflowX: "auto",
                whiteSpace: "pre",
              }}
            >
              <code>
                {highlightJson(combinedTelemetry)}
              </code>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkflowsSection;
