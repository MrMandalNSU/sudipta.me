import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";
import {
  AutoAwesome as AiIcon,
  Translate as LangIcon,
  BugReport as DebugIcon,
  CheckCircleOutline as ValidateIcon,
} from "@mui/icons-material";

const debugFlowSteps = [
  { label: "Raw Document", sub: "PDF, XLSX, EML File" },
  { label: "Text Extraction", sub: "Lines saved to text_lines/" },
  { label: "AI Mapping", sub: "Context-engineered tags" },
  { label: "Parser Process", sub: "Execute extraction rules" },
  { label: "Schema Dry-Run", sub: "Validate parsed payload" },
  { label: "Diagnostic File", sub: "Save details to debug_output/" },
];

const AgenticAiSection = ({ theme, primaryColor }) => {
  return (
    <Box id="agentic-ai" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>Agentic AI & Testing Automation</SectionHeading>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 800, lineHeight: 1.7 }}>
        Onboarding new layout variants in different languages could easily become a bottleneck. Sudipta addressed this by 
        leveraging agentic AI context engineering and custom testing workflows to validate parsing structures dynamically.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <GlassCard sx={{ p: 3, height: "100%" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <LangIcon color="primary" /> Multilingual AI Alignment
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
              Sudipta leveraged AI-assisted context engineering to map parsing tags across languages automatically. By feeding 
              raw layout structures into customized context chains, the AI mapped related tags and anchor terms:
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              For example, matching credit terms (<strong>Gutschrift</strong> in German), repair indicators 
              (<strong>Remontų aktas</strong> in Lithuanian, <strong>Werkplaatsfactuur</strong> in Dutch), or invoice triggers 
              (<strong>Facture</strong> in French) with 100% format-agnostic accuracy.
            </Typography>
          </GlassCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <GlassCard sx={{ p: 3, height: "100%" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <DebugIcon color="primary" /> Double-Folder Validation Trace
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
              To ensure parser integrity during development, Sudipta implemented a strict double-folder debugging pipeline:
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0, display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography component="li" variant="body2" color="text.secondary">
                <strong>text_lines/</strong>: Raw text line dumps extracted from the document to cross-examine index locations.
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                <strong>debug_output/</strong>: Output logs (e.g. `SpontexPdfAssistant_1_debug.txt`) recording every matching variable, location array, and cargo assignment.
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                <strong>Schema Dry-Run</strong>: Validates outputs against target JSON schemas, logging details when properties mismatch.
              </Typography>
            </Box>
          </GlassCard>
        </Grid>
      </Grid>

      {/* Debug Ingestion Flow SVG */}
      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2, display: "block", color: "text.primary" }}>
        Automated Testing & Debugging Loop
      </Typography>

      <DiagramBoard sx={{ mb: 3 }}>
        {/* Desktop View SVG */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <svg
            width="100%"
            viewBox="0 0 920 120"
            style={{ display: "block", maxWidth: "100%", height: "auto" }}
          >
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
              </marker>
            </defs>

            {/* Connection Lines */}
            {[
              "M 120 45 L 150 45",
              "M 270 45 L 300 45",
              "M 420 45 L 450 45",
              "M 570 45 L 600 45",
              "M 720 45 L 750 45",
            ].map((line, lIdx) => (
              <path
                key={lIdx}
                d={line}
                stroke={primaryColor}
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrow)"
              />
            ))}

            {/* Steps */}
            {debugFlowSteps.map((step, idx) => {
              const x = 10 + idx * 150;
              const fillBg = theme.palette.mode === "light" ? "rgba(79,70,229,0.04)" : "rgba(129,140,248,0.08)";
              const strokeColor = theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";
              return (
                <g key={idx}>
                  <rect
                    x={x}
                    y={20}
                    width="110"
                    height="50"
                    rx="8"
                    fill={fillBg}
                    stroke={strokeColor}
                    strokeWidth="1.2"
                  />
                  <text
                    x={x + 55}
                    y={40}
                    textAnchor="middle"
                    fontWeight="800"
                    fill={theme.palette.text.primary}
                    fontSize="10"
                    fontFamily="Inter, sans-serif"
                  >
                    {step.label}
                  </text>
                  <text
                    x={x + 55}
                    y={55}
                    textAnchor="middle"
                    fill={theme.palette.text.secondary}
                    fontSize="8"
                    fontFamily="Inter, sans-serif"
                  >
                    {step.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </Box>

        {/* Mobile View */}
        <Box sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", gap: 1.5 }}>
          {debugFlowSteps.map((step, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.5,
                borderRadius: 2,
                backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.04)" : "rgba(129,140,248,0.06)",
                border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "primary.main",
                  color: "#FFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                }}
              >
                {idx + 1}
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary" }}>
                  {step.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {step.sub}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </DiagramBoard>
    </Box>
  );
};

export default AgenticAiSection;
