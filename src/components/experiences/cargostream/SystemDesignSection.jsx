import React, { useState } from "react";
import { Box, Button, Typography, Menu, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { systemNodes } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard, fadeInUp } from "./styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LayersIcon from "@mui/icons-material/Layers";
import ClientIcon from "@mui/icons-material/CloudUpload";
import ProcessingIcon from "@mui/icons-material/Settings";
import JsonIcon from "@mui/icons-material/DataObject";
import AppIcon from "@mui/icons-material/LocalShipping";

const renderSvgIcon = (key, x, y, size, fill) => {
  if (key === "client") {
    return (
      <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" fill={fill}>
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
      </svg>
    );
  }
  if (key === "formats") {
    return (
      <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" fill={fill}>
        <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 11.54l-9 7-9-7 1.64-1.27L12 16zm0-11.47L4.64 10.26 12 16l7.36-5.74L12 4.53z" />
      </svg>
    );
  }
  if (key === "processing") {
    return (
      <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" fill={fill}>
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
      </svg>
    );
  }
  if (key === "json") {
    return (
      <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" fill={fill}>
        <path d="M4 15c0 1.1.9 2 2 2h2c1.1 0 2 .9 2 2s-.9 2-2 2H6c-3.3 0-6-2.7-6-6V9c0-3.3 2.7-6 6-6h2c1.1 0 2 .9 2 2s-.9 2-2 2H6c-1.1 0-2 .9-2 2v6zm16-6c0-1.1-.9-2-2-2h-2c-1.1 0-2-.9-2-2s.9-2 2-2h2c3.3 0 6 2.7 6 6v6c0 3.3-2.7 6-6 6h-2c-1.1 0-2-.9-2-2s.9-2 2-2h2c1.1 0 2-.9 2-2V9z" />
      </svg>
    );
  }
  if (key === "app") {
    return (
      <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100">
        <g fill={fill}>
          <path d="M 50 10 L 35 10 A 25 25 0 0 0 35 60 L 50 60 L 50 47.5 L 35 47.5 A 12.5 12.5 0 0 1 35 22.5 L 50 22.5 Z" />
          <path d="M 50 90 L 65 90 A 25 25 0 0 0 65 40 L 50 40 L 50 52.5 L 65 52.5 A 12.5 12.5 0 0 1 65 77.5 L 50 77.5 Z" />
        </g>
      </svg>
    );
  }
  return null;
};

const macroSteps = [
  {
    key: "client",
    label: "Client",
    sub: "Web / API Ingestion",
    icon: <ClientIcon />,
    explanation: "Receives raw logistics files uploaded via customer portals, administrative dashboards, or automated webhook ingestion streams.",
    role: "Ingests raw business document streams from various ingestion vectors.",
  },
  {
    key: "formats",
    label: "Formats",
    sub: "PDF, XLSX, EML Streams",
    icon: <LayersIcon />,
    explanation: "Normalizes incoming streams, preparing unstructured PDFs, structured Excel spreadsheets, or multi-part EML emails for extraction.",
    role: "Standardizes file types and stream formats before parsing starts.",
  },
  {
    key: "processing",
    label: "Document Processing",
    sub: "Extraction & Validation",
    icon: <ProcessingIcon />,
    isCore: true,
    explanation: "Sudipta's Core Pipeline: Automates layout footprint discovery, strategy blueprint mapping, pattern-based line extraction, and strict schema validator guards.",
    role: "Orchestrates modular coordinate extraction & layout validation rules.",
  },
  {
    key: "json",
    label: "Structured JSON",
    sub: "Validated Output",
    icon: <JsonIcon />,
    explanation: "Converts raw extracted coordinates and tables into clean, validated JSON records conforming to strict database schema definitions.",
    role: "Produces clean, format-agnostic payloads for downstream integration.",
  },
  {
    key: "app",
    label: "Cargo Stream",
    sub: "Main Logistics App",
    icon: <AppIcon />,
    explanation: "Feeds the normalized JSON transactional data into the core Cargo Stream web application for scheduling, billing, and auditing.",
    role: "Main logistics application persisting transactions to database records.",
  },
];

const userFlowSteps = [
  { key: "ingestion", label: "Document Ingestion", sub: "Incoming PDF, XLSX, EML Streams" },
  { key: "validator", label: "Dynamic Validator", sub: "Analyze layout format markers" },
  { key: "orders_blueprint", label: "Orders Blueprint", sub: "Map load/unload destinations" },
  { key: "credit_note_blueprint", label: "Credit Note Blueprint", sub: "Check refund & vat structures" },
  { key: "service_invoice_blueprint", label: "Service Invoice Blueprint", sub: "Verify chassis & VIN indices" },
  { key: "invoice_blueprint", label: "Invoice Blueprint", sub: "Aggregate invoice VAT totals" },
  { key: "mail_body_blueprint", label: "Mail Body Blueprint", sub: "Clean email section dividers" },
  { key: "parser", label: "Client Parser", sub: "Translate & sanitize lines" },
  { key: "json_schemas", label: "JSON Schemas", sub: "Validate target structures" },
  { key: "formatted_json", label: "Formatted JSON", sub: "Serialize final data structures" },
  { key: "csv_output", label: "CSV Output", sub: "UTF-8 accounting compatibility" },
];

const SystemDesignSection = ({
  theme,
  activeSystemNode,
  setActiveSystemNode,
  primaryColor
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMobileFlow, setActiveMobileFlow] = useState("orders_blueprint");
  const [activeMacroNode, setActiveMacroNode] = useState("processing");
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleSelectBlueprint = (key) => {
    setActiveSystemNode(key);
    handleCloseMenu();
  };

  const blueprintKeys = [
    "orders_blueprint",
    "credit_note_blueprint",
    "service_invoice_blueprint",
    "invoice_blueprint",
    "mail_body_blueprint",
  ];
  const isBlueprintActive = blueprintKeys.includes(activeSystemNode);

  const getButtonStyles = (key) => {
    const isActive = activeSystemNode === key;
    return {
      textTransform: "none",
      fontWeight: 700,
      fontSize: "0.8rem",
      borderRadius: 1.5,
      px: 2,
      py: 0.6,
      backgroundColor: isActive ? theme.palette.primary.main : "transparent",
      color: isActive ? "#FFF" : "text.secondary",
      border: `1px solid ${isActive ? "transparent" : theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
      "&:hover": {
        backgroundColor: isActive ? theme.palette.primary.main : theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
        transform: "none",
        boxShadow: "none",
      },
    };
  };

  return (
    <Box
      id="architecture"
      sx={{
        scrollMarginTop: 120,
        mb: 5,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <SectionHeading theme={theme}>System Design & Processing Pipeline</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 700 }}>
        An overview of the Laravel-based ingestion and auto-discovery processing pipeline.
      </Typography>

      {/* Subtitle 1: Macro System Architecture & Data Flow */}
      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: "0.5px", color: "text.primary", display: "flex", alignItems: "center", gap: 1 }}>
        <LayersIcon sx={{ fontSize: 18, color: "primary.main" }} />
        Macro System Architecture & Data Flow
      </Typography>

      {/* Macro Node Detail Box (Popup on top of diagram box) */}
      <GlassCard sx={{ p: 3, mb: 3, animation: `${fadeInUp} 0.3s ease-out` }}>
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  color: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {activeMacroNode === "client" && <ClientIcon sx={{ fontSize: 20 }} />}
                {activeMacroNode === "formats" && <LayersIcon sx={{ fontSize: 20 }} />}
                {activeMacroNode === "processing" && <ProcessingIcon sx={{ fontSize: 20 }} />}
                {activeMacroNode === "json" && <JsonIcon sx={{ fontSize: 20 }} />}
                {activeMacroNode === "app" && renderSvgIcon("app", 0, 0, 20, theme.palette.primary.main)}
              </Box>
              {macroSteps.find((s) => s.key === activeMacroNode)?.label}
              {activeMacroNode === "processing" && (
                <Box component="span" sx={{ ml: 1.5, fontWeight: 700, fontSize: "0.78rem", color: "primary.main", verticalAlign: "middle" }}>
                  (Sudipta's Core Responsibility)
                </Box>
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {macroSteps.find((s) => s.key === activeMacroNode)?.explanation}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ borderLeft: `3px solid ${theme.palette.primary.main}`, pl: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "primary.main", letterSpacing: "1px", display: "block", mb: 0.5 }}>
                PIPELINE ROLE
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ fontStyle: "italic", fontWeight: 500, lineHeight: 1.6 }}>
                "{macroSteps.find((s) => s.key === activeMacroNode)?.role}"
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </GlassCard>

      {/* Macro Diagram Board */}
      <DiagramBoard sx={{ mb: 5 }}>
        {/* Desktop View SVG Flowchart (5 nodes) */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <svg
            width="100%"
            viewBox="0 0 920 120"
            style={{ display: "block", maxWidth: "100%", height: "auto" }}
          >
            <defs>
              <marker id="macroArrowActive" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
              </marker>
              <marker id="macroArrowMuted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={theme.palette.mode === "light" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)"} />
              </marker>
            </defs>

            {/* Connection Lines */}
            {[
              { path: "M 155 60 H 185", from: "client", to: "formats" },
              { path: "M 335 60 H 365", from: "formats", to: "processing" },
              { path: "M 555 60 H 585", from: "processing", to: "json" },
              { path: "M 735 60 H 765", from: "json", to: "app" }
            ].map((line, lIdx) => {
              const isActive = activeMacroNode === line.from || activeMacroNode === line.to;
              const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)");
              const strokeWidth = isActive ? 2.5 : 1.5;
              const marker = isActive ? "url(#macroArrowActive)" : "url(#macroArrowMuted)";
              return (
                <path
                  key={lIdx}
                  d={line.path}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  fill="none"
                  markerEnd={marker}
                  style={{ transition: "all 0.3s ease" }}
                />
              );
            })}

            {/* Nodes */}
            {[
              { x: 15, y: 36, w: 140, h: 48, label: "Client", sub: "Web / API Ingestion", key: "client" },
              { x: 185, y: 36, w: 150, h: 48, label: "Formats", sub: "PDF, XLSX, EML Streams", key: "formats" },
              { x: 365, y: 32, w: 190, h: 56, label: "Document Processing", sub: "Extraction & Validation", key: "processing" },
              { x: 585, y: 36, w: 150, h: 48, label: "Structured JSON", sub: "Validated Output", key: "json" },
              { x: 765, y: 36, w: 140, h: 48, label: "Cargo Stream", sub: "Main Logistics App", key: "app" }
            ].map((node, nIdx) => {
              const isSelected = activeMacroNode === node.key;
              const fillBg = isSelected
                ? (theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.08)" : "rgba(129, 140, 248, 0.12)")
                : (theme.palette.mode === "light" ? "rgba(255,255,255,0.75)" : "rgba(30, 41, 59, 0.7)");
              const strokeColor = isSelected
                ? primaryColor
                : (theme.palette.mode === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)");
              const strokeWidth = isSelected ? 2 : 1.2;

              const isProc = node.key === "processing";
              const txtX = isProc ? node.x + 42 : node.x + 38;
              const titleY = isProc ? node.y + 24 : node.y + 20;
              const subY = isProc ? node.y + 39 : node.y + 33;
              const logoSize = isProc ? 26 : 24;
              const logoX = isProc ? node.x + 10 : node.x + 8;
              const logoY = isProc ? node.y + 15 : node.y + 12;

              return (
                <g
                  key={nIdx}
                  onClick={() => setActiveMacroNode(node.key)}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.w}
                    height={node.h}
                    rx={6}
                    fill={fillBg}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    style={{ transition: "all 0.3s ease" }}
                  />

                  {/* Render Logo inside Node */}
                  {renderSvgIcon(
                    node.key,
                    logoX,
                    logoY,
                    logoSize,
                    isSelected ? primaryColor : theme.palette.text.secondary
                  )}

                  {/* Title text */}
                  <text
                    x={txtX}
                    y={titleY}
                    fontWeight="800"
                    fill={isSelected ? primaryColor : theme.palette.text.primary}
                    fontSize="9.5"
                    fontFamily="Inter, sans-serif"
                    textAnchor="start"
                  >
                    {node.label}
                  </text>
                  {/* Sub text */}
                  <text
                    x={txtX}
                    y={subY}
                    fill={theme.palette.text.secondary}
                    fontSize="8.2"
                    fontFamily="Inter, sans-serif"
                    textAnchor="start"
                  >
                    {node.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </Box>

        {/* Mobile View Vertical flowchart for macro steps */}
        <Box sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", gap: 2 }}>
          {macroSteps.map((step, idx) => {
            const isSelected = activeMacroNode === step.key;
            return (
              <React.Fragment key={idx}>
                <Box
                  onClick={() => setActiveMacroNode(step.key)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backgroundColor: isSelected
                      ? (theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.06)" : "rgba(129, 140, 248, 0.1)")
                      : (theme.palette.mode === "light" ? "rgba(255,255,255,0.5)" : "rgba(30,41,59,0.5)"),
                    border: `1px solid ${
                      isSelected
                        ? primaryColor
                        : (theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)")
                    }`,
                    boxShadow: isSelected
                      ? (theme.palette.mode === "light" ? "0 4px 12px rgba(79, 70, 229, 0.1)" : "0 4px 12px rgba(129, 140, 248, 0.15)")
                      : "none",
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isSelected
                        ? (theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.08)" : "rgba(129, 140, 248, 0.12)")
                        : "rgba(0,0,0,0.03)",
                      color: isSelected ? "primary.main" : "text.secondary",
                    }}
                  >
                    {step.key === "app" ? (
                      <svg width="24" height="24" viewBox="0 0 100 100">
                        <g fill={isSelected ? primaryColor : theme.palette.text.secondary}>
                          <path d="M 50 10 L 35 10 A 25 25 0 0 0 35 60 L 50 60 L 50 47.5 L 35 47.5 A 12.5 12.5 0 0 1 35 22.5 L 50 22.5 Z" />
                          <path d="M 50 90 L 65 90 A 25 25 0 0 0 65 40 L 50 40 L 50 52.5 L 65 52.5 A 12.5 12.5 0 0 1 65 77.5 L 50 77.5 Z" />
                        </g>
                      </svg>
                    ) : (
                      step.icon
                    )}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: isSelected ? "primary.main" : "text.primary" }}>
                      {step.label}
                      {step.key === "processing" && (
                        <Box component="span" sx={{ ml: 1, fontWeight: 700, fontSize: "0.72rem", color: "primary.main" }}>
                          (Core Responsibility)
                        </Box>
                      )}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {step.sub}
                    </Typography>
                  </Box>
                </Box>
                {idx < macroSteps.length - 1 && (
                  <Box sx={{ display: "flex", justifyContent: "center", my: -0.5 }}>
                    <Typography sx={{ color: isSelected ? primaryColor : "text.disabled", fontWeight: 900, fontSize: "1.2rem" }}>
                      ↓
                    </Typography>
                  </Box>
                )}
              </React.Fragment>
            );
          })}
        </Box>
      </DiagramBoard>

      {/* Subtitle 2: Micro Processing Pipeline Details */}
      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, letterSpacing: "0.5px", color: "text.primary", display: "flex", alignItems: "center", gap: 1 }}>
        <LayersIcon sx={{ fontSize: 18, color: "primary.main" }} />
        Micro Processing Pipeline Details
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
        Click any node in the detailed diagram below to see its specific role, configuration strategies, and extraction patterns.
      </Typography>

      {/* Node Selector Chips */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mb: 3,
          p: 1.5,
          borderRadius: 2,
          backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)"}`,
        }}
      >
        {/* Document Intake */}
        <Button
          onClick={() => setActiveSystemNode("ingestion")}
          size="small"
          sx={getButtonStyles("ingestion")}
          startIcon={React.cloneElement(systemNodes.ingestion.icon, { sx: { fontSize: 16 } })}
        >
          {systemNodes.ingestion.shortTitle}
        </Button>

        {/* Dynamic Validator */}
        <Button
          onClick={() => setActiveSystemNode("validator")}
          size="small"
          sx={getButtonStyles("validator")}
          startIcon={React.cloneElement(systemNodes.validator.icon, { sx: { fontSize: 16 } })}
        >
          {systemNodes.validator.shortTitle}
        </Button>

        {/* Blueprints Dropdown Button */}
        <Button
          onClick={handleOpenMenu}
          size="small"
          endIcon={<ArrowDropDownIcon sx={{ fontSize: 16 }} />}
          startIcon={React.cloneElement(
            isBlueprintActive ? systemNodes[activeSystemNode].icon : <LayersIcon />,
            { sx: { fontSize: 16 } }
          )}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.8rem",
            borderRadius: 1.5,
            px: 2,
            py: 0.6,
            backgroundColor: isBlueprintActive ? theme.palette.primary.main : "transparent",
            color: isBlueprintActive ? "#FFF" : "text.secondary",
            border: `1px solid ${isBlueprintActive ? "transparent" : theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
            "&:hover": {
              backgroundColor: isBlueprintActive ? theme.palette.primary.main : theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
              transform: "none",
              boxShadow: "none",
            },
          }}
        >
          {isBlueprintActive ? systemNodes[activeSystemNode].shortTitle : "Blueprints"}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          PaperProps={{
            sx: {
              borderRadius: 1.5,
              mt: 0.5,
              border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
              boxShadow: theme.palette.mode === "light" ? "0 4px 12px rgba(0,0,0,0.05)" : "0 4px 12px rgba(0,0,0,0.35)",
            }
          }}
        >
          {blueprintKeys.map((key) => {
            const val = systemNodes[key];
            const isNodeActive = activeSystemNode === key;
            return (
              <MenuItem
                key={key}
                onClick={() => handleSelectBlueprint(key)}
                selected={isNodeActive}
                sx={{
                  fontWeight: 700,
                  fontSize: "0.825rem",
                  py: 1,
                  px: 2,
                  color: isNodeActive ? "primary.main" : "text.secondary",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                {React.cloneElement(val.icon, { sx: { fontSize: 16 } })}
                {val.shortTitle}
              </MenuItem>
            );
          })}
        </Menu>

        {/* Client Assistant Parser */}
        <Button
          onClick={() => setActiveSystemNode("parser")}
          size="small"
          sx={getButtonStyles("parser")}
          startIcon={React.cloneElement(systemNodes.parser.icon, { sx: { fontSize: 16 } })}
        >
          {systemNodes.parser.shortTitle}
        </Button>

        {/* JSON Schemas */}
        <Button
          onClick={() => setActiveSystemNode("json_schemas")}
          size="small"
          sx={getButtonStyles("json_schemas")}
          startIcon={React.cloneElement(systemNodes.json_schemas.icon, { sx: { fontSize: 16 } })}
        >
          {systemNodes.json_schemas.shortTitle}
        </Button>

        {/* Formatted JSON Output */}
        <Button
          onClick={() => setActiveSystemNode("formatted_json")}
          size="small"
          sx={getButtonStyles("formatted_json")}
          startIcon={React.cloneElement(systemNodes.formatted_json.icon, { sx: { fontSize: 16 } })}
        >
          {systemNodes.formatted_json.shortTitle}
        </Button>

        {/* CSV Output File */}
        <Button
          onClick={() => setActiveSystemNode("csv_output")}
          size="small"
          sx={getButtonStyles("csv_output")}
          startIcon={React.cloneElement(systemNodes.csv_output.icon, { sx: { fontSize: 16 } })}
        >
          {systemNodes.csv_output.shortTitle}
        </Button>
      </Box>

      {/* Node Detail Card */}
      <GlassCard sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
              {React.cloneElement(systemNodes[activeSystemNode].icon, { color: "primary", sx: { fontSize: 20 } })}
              {systemNodes[activeSystemNode].title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {systemNodes[activeSystemNode].description}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ borderLeft: `3px solid ${theme.palette.primary.main}`, pl: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "primary.main", letterSpacing: "1px", display: "block", mb: 0.5 }}>
                PIPELINE ROLE
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ fontStyle: "italic", fontWeight: 500, lineHeight: 1.6 }}>
                "{systemNodes[activeSystemNode].role}"
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </GlassCard>

      {/* Pipeline Diagram Board */}
      <DiagramBoard sx={{ mb: 3 }}>
        {/* Desktop View SVG Flowchart */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <svg
            width="100%"
            viewBox="0 0 920 270"
            style={{ display: "block", maxWidth: "100%", height: "auto" }}
          >
            <defs>
              <marker id="arrowHead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
              </marker>
              <marker id="arrowHeadMuted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"} />
              </marker>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection Lines */}
            {[
              { from: "ingestion", to: "validator", path: "M 130 131 H 155" },
              { from: "validator", to: "orders_blueprint", path: "M 270 131 C 285 131, 285 47, 300 47" },
              { from: "validator", to: "credit_note_blueprint", path: "M 270 131 C 285 131, 285 89, 300 89" },
              { from: "validator", to: "service_invoice_blueprint", path: "M 270 131 H 300" },
              { from: "validator", to: "invoice_blueprint", path: "M 270 131 C 285 131, 285 173, 300 173" },
              { from: "validator", to: "mail_body_blueprint", path: "M 270 131 C 285 131, 285 215, 300 215" },
              
              { from: "orders_blueprint", to: "parser", path: "M 415 47 C 430 47, 430 131, 445 131" },
              { from: "credit_note_blueprint", to: "parser", path: "M 415 89 C 430 89, 430 131, 445 131" },
              { from: "service_invoice_blueprint", to: "parser", path: "M 415 131 H 445" },
              { from: "invoice_blueprint", to: "parser", path: "M 415 173 C 430 173, 430 131, 445 131" },
              { from: "mail_body_blueprint", to: "parser", path: "M 415 215 C 430 215, 430 131, 445 131" },
              
              { from: "parser", to: "json_schemas", path: "M 560 131 H 590" },
              
              { from: "json_schemas", to: "formatted_json", path: "M 705 131 C 720 131, 720 101, 740 101" },
              { from: "json_schemas", to: "csv_output", path: "M 705 131 C 720 131, 720 161, 740 161" },
            ].map((line, lIdx) => {
              const isActive = activeSystemNode === line.from || activeSystemNode === line.to;
              const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
              const strokeWidth = isActive ? 2.5 : 1.5;
              const marker = isActive ? "url(#arrowHead)" : "url(#arrowHeadMuted)";
              return (
                <path
                  key={lIdx}
                  d={line.path}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  fill="none"
                  markerEnd={marker}
                  style={{ transition: "all 0.3s ease" }}
                />
              );
            })}

            {/* Nodes */}
            {[
              { key: "ingestion", type: "process", x: 15, y: 111, w: 115, h: 40, rx: 6, cx: 72.5, cy: 131, label: "Document Ingestion", sub: "Incoming Streams" },
              { key: "validator", type: "process", x: 155, y: 111, w: 115, h: 40, rx: 6, cx: 212.5, cy: 131, label: "Dynamic Validator", sub: "Format Discovery" },
              
              { key: "orders_blueprint", type: "process", x: 300, y: 31, w: 115, h: 32, rx: 6, cx: 357.5, cy: 47, label: "Orders Blueprint", sub: "Transport Details" },
              { key: "credit_note_blueprint", type: "process", x: 300, y: 73, w: 115, h: 32, rx: 6, cx: 357.5, cy: 89, label: "Credit Blueprint", sub: "Refund Metadata" },
              { key: "service_invoice_blueprint", type: "process", x: 300, y: 115, w: 115, h: 32, rx: 6, cx: 357.5, cy: 131, label: "Service Blueprint", sub: "Repairs & Plates" },
              { key: "invoice_blueprint", type: "process", x: 300, y: 157, w: 115, h: 32, rx: 6, cx: 357.5, cy: 173, label: "Invoice Blueprint", sub: "Standard Invoices" },
              { key: "mail_body_blueprint", type: "process", x: 300, y: 199, w: 115, h: 32, rx: 6, cx: 357.5, cy: 215, label: "Mail Blueprint", sub: "Email Ingestion" },
              
              { key: "parser", type: "process", x: 445, y: 111, w: 115, h: 40, rx: 6, cx: 502.5, cy: 131, label: "Client Parser", sub: "Matched Rules" },
              { key: "json_schemas", type: "cylinder", x: 590, y: 101, w: 115, h: 45, cx: 647.5, cy: 128, label: "JSON Schemas", sub: "Enforcement specs" },
              
              { key: "formatted_json", type: "process", x: 740, y: 71, w: 115, h: 40, rx: 6, cx: 797.5, cy: 91, label: "Formatted JSON", sub: "Internal Models" },
              { key: "csv_output", type: "process", x: 740, y: 151, w: 115, h: 40, rx: 6, cx: 797.5, cy: 171, label: "CSV Output", sub: "UTF-8 BOM Tabular" },
            ].map((node, nIdx) => {
              const isActive = activeSystemNode === node.key;
              const fillBg = isActive
                ? (theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.12)")
                : (theme.palette.mode === "light" ? "rgba(255,255,255,0.85)" : "rgba(17,24,39,0.8)");
              const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
              const strokeWidth = isActive ? 2.5 : 1.2;
              const glowFilter = isActive ? "url(#glow)" : undefined;

              return (
                <g key={nIdx} style={{ cursor: "pointer" }} onClick={() => setActiveSystemNode(node.key)}>
                  {node.type === "process" && (
                    <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={node.rx} fill={fillBg} stroke={strokeColor} strokeWidth={strokeWidth} filter={glowFilter} />
                  )}
                  {node.type === "cylinder" && (
                    <g filter={glowFilter}>
                      <path
                        d={`M ${node.x} ${node.y + 10} L ${node.x} ${node.y + node.h} A ${node.w / 2} 10 0 0 0 ${node.x + node.w} ${node.y + node.h} L ${node.x + node.w} ${node.y + 10} Z`}
                        fill={fillBg}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <ellipse
                        cx={node.x + node.w / 2}
                        cy={node.y + 10}
                        rx={node.w / 2}
                        ry={10}
                        fill={isActive ? "rgba(79,70,229,0.2)" : "rgba(0,0,0,0.04)"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                    </g>
                  )}

                  {/* Title text */}
                  <text
                    x={node.cx}
                    y={node.cy - 1}
                    textAnchor="middle"
                    fontWeight="800"
                    fill={theme.palette.text.primary}
                    fontSize="10"
                    fontFamily="Inter, sans-serif"
                  >
                    {node.label}
                  </text>
                  {/* Sub text */}
                  <text
                    x={node.cx}
                    y={node.cy + 11}
                    textAnchor="middle"
                    fill={theme.palette.text.secondary}
                    fontSize="8.5"
                    fontFamily="Inter, sans-serif"
                  >
                    {node.sub}
                  </text>
                </g>
              );
            })}

            <text x="20" y="255" fontSize="10" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
              ── Processing Pipeline Route   Click on nodes to view details
            </text>
          </svg>
        </Box>

        {/* Mobile View Vertical flowchart */}
        <Box sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", gap: 2.5 }}>
          {userFlowSteps.map((step, idx, arr) => {
            const isActive = activeSystemNode === step.key;
            const isNotLast = idx < arr.length - 1;
            return (
              <Box
                key={idx}
                onClick={() => setActiveSystemNode(step.key)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  backgroundColor: isActive
                    ? (theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.1)")
                    : "transparent",
                  border: `1px solid ${isActive ? primaryColor : "transparent"}`,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isActive ? primaryColor : "rgba(0,0,0,0.03)",
                      color: isActive ? "#FFF" : "text.secondary",
                      zIndex: 1,
                    }}
                  >
                    {React.cloneElement(systemNodes[step.key].icon, { sx: { fontSize: 16 } })}
                  </Box>
                  {isNotLast && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 36,
                        height: 20,
                        width: 2,
                        borderLeft: `2px dashed ${isActive ? primaryColor : "rgba(0,0,0,0.12)"}`,
                        zIndex: 0,
                      }}
                    />
                  )}
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: isActive ? primaryColor : "text.primary" }}>
                    {step.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {step.sub}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </DiagramBoard>
    </Box>
  );
};

export default SystemDesignSection;
