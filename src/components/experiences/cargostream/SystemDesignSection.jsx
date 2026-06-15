import React, { useState } from "react";
import { Box, Button, Typography, Menu, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { systemNodes } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LayersIcon from "@mui/icons-material/Layers";

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
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
        An overview of the Laravel-based ingestion and auto-discovery processing pipeline.
        Click any node to see its function in the parsing workflow.
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
