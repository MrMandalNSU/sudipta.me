import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { workflows } from "./constants";
import { GlassCard, SectionHeading } from "./styles";

const stringifyCompact = (obj, indentLevel = 0) => {
  const indent = "  ".repeat(indentLevel);
  if (obj === null) return "null";
  if (typeof obj === "string") return `"${obj}"`;
  if (typeof obj !== "object") return String(obj);

  if (Array.isArray(obj)) {
    const isSimple = obj.every((x) => typeof x !== "object" || x === null);
    if (isSimple) {
      return "[" + obj.map((x) => typeof x === "string" ? `"${x}"` : String(x)).join(", ") + "]";
    }
    const parts = obj.map((x) => stringifyCompact(x, indentLevel + 1));
    return "[\n" + parts.map((p) => "  ".repeat(indentLevel + 1) + p).join(",\n") + "\n" + indent + "]";
  }

  const keys = Object.keys(obj);
  if (keys.length === 0) return "{}";

  const parts = keys.map((k) => {
    const valStr = stringifyCompact(obj[k], indentLevel + 1);
    return `${indent}  "${k}": ${valStr}`;
  });

  return "{\n" + parts.join(",\n") + "\n" + indent + "}";
};

const highlightJson = (obj) => {
  if (!obj) return null;
  return stringifyCompact(obj).split("\n").map((line, index) => {
    const match = line.match(/^(\s*)"([^"]+)"(:\s*)(.*)$/);
    if (match) {
      const [, indent, key, colon, value] = match;
      const isString = value.startsWith('"');
      const isComma = value.endsWith(",");
      const cleanValue = isComma ? value.slice(0, -1) : value;
      return (
        <div key={index}>
          {indent}
          <span style={{ color: "#60A5FA" }}>"{key}"</span>
          {colon}
          <span style={{ color: isString ? "#34D399" : "#FB7185" }}>{cleanValue}</span>
          {isComma && <span style={{ color: "#94A3B8" }}>,</span>}
        </div>
      );
    }

    const arrayStringMatch = line.match(/^(\s*)"([^"]+)"(,?)$/);
    if (arrayStringMatch) {
      const [, indent, value, comma] = arrayStringMatch;
      return (
        <div key={index}>
          {indent}
          <span style={{ color: "#34D399" }}>"{value}"</span>
          {comma && <span style={{ color: "#94A3B8" }}>{comma}</span>}
        </div>
      );
    }

    return <div key={index}>{line}</div>;
  });
};

const WorkflowsSection = ({ theme, activeWorkflow, setActiveWorkflow }) => {
  const telemetry = {
    request: workflows[activeWorkflow]?.payload,
    response: workflows[activeWorkflow]?.responsePayload,
  };

  return (
    <Box id="workflows" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Project Workflows</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 720 }}>
        The three execution paths that keep AskSudipta searchable, grounded, and accurate for experience calculations.
      </Typography>

      <Grid container spacing={3}>
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
                <Box key={step.label} sx={{ display: "flex", gap: 2, position: "relative" }}>
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
                      <Box sx={{ width: 1.5, flex: 1, backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)", my: 0.5 }} />
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

        <Grid size={{ xs: 12, lg: 3 }} sx={{ order: { xs: 1, lg: 2 } }}>
          <Stack direction={{ xs: "row", lg: "column" }} spacing={1.5} sx={{ width: "100%", mb: { xs: 1.5, lg: 0 } }}>
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
                    width: "100%",
                    "& .MuiButton-startIcon": { flexShrink: 0, mr: { xs: 0.5, sm: 1 } },
                    "&:hover": {
                      backgroundColor: isActive ? theme.palette.primary.main : theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
                      transform: "none",
                      boxShadow: isActive ? "0 4px 14px rgba(79, 70, 229, 0.2)" : "none",
                    },
                  }}
                >
                  <Box component="span" sx={{ display: { xs: "inline", lg: "none" } }}>
                    {flow.shortTitle}
                  </Box>
                  <Box component="span" sx={{ display: { xs: "none", lg: "inline" } }}>
                    {flow.title.replace(" Workflow", "").replace(" Answer", "").replace(" Duration", "")}
                  </Box>
                </Button>
              );
            })}
          </Stack>

          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              flexDirection: "column",
              mt: 2.5,
              borderRadius: 2,
              backgroundColor: "#0F172A",
              border: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
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
              <Typography variant="caption" sx={{ fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1.5px", fontSize: "0.68rem" }}>
                {workflows[activeWorkflow].shortTitle} Telemetry
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }} />
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }} />
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }} />
              </Box>
            </Box>

            <Box
              sx={{
                p: 2.5,
                fontFamily: "'Fira Code', 'Courier New', Courier, monospace",
                fontSize: "0.78rem",
                lineHeight: 1.6,
                textAlign: "left",
                color: "#94A3B8",
                overflowX: "auto",
                whiteSpace: "pre",
              }}
            >
              <code>{highlightJson(telemetry)}</code>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkflowsSection;
