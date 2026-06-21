import React from "react";
import { Box, Typography, Button, Stack, Chip, Collapse } from "@mui/material";
import Grid from "@mui/material/Grid";
import { AltRoute as AltRouteIcon } from "@mui/icons-material";
import { schemaTables } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";

const mobileTablesList = [
  {
    id: "daily_summaries",
    fields: [
      { n: "date", k: "PK" },
      { n: "spublic_total", k: "" },
      { n: "total_trades", k: "" },
      { n: "market_cap_equity", k: "" }
    ]
  },
  {
    id: "public_transactions",
    fields: [
      { n: "id", k: "PK" },
      { n: "date", k: "FK" },
      { n: "ticker", k: "" },
      { n: "open", k: "" },
      { n: "close", k: "" }
    ]
  },
  {
    id: "sblock_transactions",
    fields: [
      { n: "id", k: "PK" },
      { n: "date", k: "FK" },
      { n: "ticker", k: "" },
      { n: "max_price", k: "" },
      { n: "quantity", k: "" }
    ]
  },
  {
    id: "csv_files",
    fields: [
      { n: "id", k: "PK" },
      { n: "date", k: "UK" },
      { n: "file_name", k: "" },
      { n: "storage_path", k: "" }
    ]
  }
];

const PairRelationsCollapse = ({ pair, activeTable, theme, primaryColor, setActiveTable }) => {
  const [lastActiveTable, setLastActiveTable] = React.useState(null);

  // Check if activeTable is in this pair
  const activeTblInPair = pair.find((tbl) => tbl.id === activeTable);

  React.useEffect(() => {
    if (activeTblInPair) {
      setLastActiveTable(activeTblInPair.id);
    }
  }, [activeTblInPair]);

  const showCollapse = !!activeTblInPair;
  const displayTableId = activeTblInPair ? activeTblInPair.id : lastActiveTable;
  const displayTableData = displayTableId ? schemaTables[displayTableId] : null;

  return (
    <Grid size={12}>
      <Collapse in={showCollapse}>
        {displayTableData && displayTableData.relations.length > 0 && (
          <Box
            sx={{
              p: 1.5,
              mt: 1.5,
              borderRadius: 2,
              backgroundColor: theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.04)" : "rgba(129, 140, 248, 0.08)",
              border: `1px solid ${primaryColor}`,
              boxShadow: `0 4px 12px ${theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)"}`,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "1px",
                display: "block",
                mb: 1,
                fontSize: "0.72rem"
              }}
            >
              Relations for {displayTableId}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {displayTableData.relations.map((rel) => (
                <Button
                  key={rel}
                  onClick={() => setActiveTable(rel)}
                  size="small"
                  startIcon={<AltRouteIcon sx={{ fontSize: 14 }} />}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    borderRadius: 1.5,
                    px: 1.2,
                    py: 0.3,
                    border: `1px solid ${theme.palette.mode === "light" ? "rgba(79,70,229,0.15)" : "rgba(129,140,248,0.15)"}`,
                    color: "primary.main",
                    backgroundColor: theme.palette.mode === "light" ? "#fff" : "rgba(15,23,42,0.4)",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
                      transform: "none",
                      boxShadow: "none",
                    },
                  }}
                >
                  {rel}
                </Button>
              ))}
            </Stack>
          </Box>
        )}
      </Collapse>
    </Grid>
  );
};

const DatabaseSection = ({ theme, activeTable, setActiveTable }) => {
  const primaryColor = theme.palette.mode === "light" ? "#3b82f6" : "#60a5fa";
  const activeTableData = schemaTables[activeTable];

  // Chunk mobile tables list into rows of 2 to avoid shifting layout on tap
  const chunks = [];
  for (let i = 0; i < mobileTablesList.length; i += 2) {
    chunks.push(mobileTablesList.slice(i, i + 2));
  }

  return (
    <Box id="database" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Database Schema</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 700 }}>
        A graphical, interactive entity-relationship layout of DSE Ops table indexes in PostgreSQL.
        Click any table card to view its fields, types, and primary-foreign key relationships.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {/* Table Detail Panel */}
        <Box sx={{ order: { xs: 1, md: 2 }, mb: { xs: 4, md: 0 } }}>
          <GlassCard sx={{ p: { xs: 2.5, sm: 3.5 }, minHeight: { xs: "auto", md: 320 } }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, color: "primary.main" }}>
                {activeTable} Table
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                {activeTableData.description}
              </Typography>
            </Box>

            {/* Fields */}
            <Box sx={{ mb: 3, display: { xs: "none", md: "block" } }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", letterSpacing: "1px", display: "block", mb: 1.5 }}>
                Fields & Types
              </Typography>
              <Grid container spacing={1.5}>
                {activeTableData.fields.map((field) => (
                  <Grid key={field.name} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        border: `1px solid ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)"}`,
                        backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.01)" : "rgba(255, 255, 255, 0.01)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Stack direction="row" alignItems="center" sx={{ minWidth: 0, flexWrap: "wrap", gap: 0.75 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "monospace", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                          {field.name}
                        </Typography>
                        {field.isKey && (
                          <Chip
                            label={field.isKey}
                            size="small"
                            sx={{
                              height: 16,
                              fontSize: "0.55rem",
                              fontWeight: 800,
                              borderRadius: 0.75,
                              flexShrink: 0,
                              backgroundColor: field.isKey.includes("PK")
                                ? "rgba(16, 185, 129, 0.15)"
                                : field.isKey === "Unique"
                                  ? "rgba(245, 158, 11, 0.15)"
                                  : "rgba(239, 68, 68, 0.15)",
                              color: field.isKey.includes("PK")
                                ? "#10b981"
                                : field.isKey === "Unique"
                                  ? "#f59e0b"
                                  : "#ef4444",
                            }}
                          />
                        )}
                      </Stack>
                      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace", fontSize: "0.75rem", flexShrink: 0, ml: 1 }}>
                        {field.type}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </GlassCard>
        </Box>

        {/* ER Diagram Board */}
        <Box sx={{ order: { xs: 2, md: 1 }, mb: { xs: 0, md: 4 } }}>
          <DiagramBoard>
            {/* Desktop View SVG ER Diagram */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <svg
                width="100%"
                viewBox="0 0 960 400"
                style={{ display: "block", maxWidth: "100%", height: "auto" }}
              >
                <defs>
                  <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6">
                    <circle cx="5" cy="5" r="3" fill={primaryColor} />
                  </marker>
                  <filter id="glow-db">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Relations / Connector Lines */}
                {[
                  { from: "daily_summaries", to: "public_transactions", path: "M 320 120 C 400 120, 400 90, 480 90" },
                  { from: "daily_summaries", to: "sblock_transactions", path: "M 320 160 C 400 160, 400 270, 480 270" },
                  { from: "daily_summaries", to: "csv_files", path: "M 210 250 L 210 275" },
                ].map((rel, idx) => {
                  const isRelated = activeTable === rel.from || activeTable === rel.to;
                  const strokeColor = isRelated ? primaryColor : (theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)");
                  const strokeWidth = isRelated ? 2.5 : 1.5;
                  const marker = isRelated ? "url(#dot)" : undefined;
                  const dash = rel.from === "daily_summaries" && rel.to === "csv_files" ? "5,3" : undefined;
                  return (
                    <path
                      key={idx}
                      d={rel.path}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      fill="none"
                      markerEnd={marker}
                      strokeDasharray={dash}
                      style={{
                        transition: "all 0.3s ease",
                      }}
                    />
                  );
                })}

                {/* Table Cards */}
                {[
                  {
                    id: "daily_summaries", x: 100, y: 70, w: 220, h: 180,
                    fields: [{ n: "date", k: "PK" }, { n: "spublic_total", k: "" }, { n: "total_trades", k: "" }, { n: "market_cap_equity", k: "" }, { n: "created_at", k: "" }]
                  },
                  {
                    id: "csv_files", x: 100, y: 275, w: 220, h: 110,
                    fields: [{ n: "id", k: "PK" }, { n: "date", k: "Unique" }, { n: "storage_path", k: "" }]
                  },
                  {
                    id: "public_transactions", x: 480, y: 30, w: 220, h: 150,
                    fields: [{ n: "id", k: "PK" }, { n: "date", k: "FK" }, { n: "ticker", k: "" }, { n: "open", k: "" }, { n: "close", k: "" }]
                  },
                  {
                    id: "sblock_transactions", x: 480, y: 210, w: 220, h: 150,
                    fields: [{ n: "id", k: "PK" }, { n: "date", k: "FK" }, { n: "ticker", k: "" }, { n: "max_price", k: "" }, { n: "quantity", k: "" }]
                  },
                ].map((tbl) => {
                  const isActive = activeTable === tbl.id;
                  const cardBg = isActive
                    ? (theme.palette.mode === "light" ? "rgba(59, 130, 246, 0.08)" : "rgba(96, 165, 250, 0.12)")
                    : (theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(30, 41, 59, 0.85)");
                  const cardStroke = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)");
                  const cardStrokeWidth = isActive ? 2.5 : 1.2;
                  const glowFilter = isActive ? "url(#glow-db)" : undefined;

                  return (
                    <g key={tbl.id} onClick={() => setActiveTable(tbl.id)} style={{ cursor: "pointer" }}>
                      {/* Table Rectangle */}
                      <rect
                        x={tbl.x}
                        y={tbl.y}
                        width={tbl.w}
                        height={tbl.h}
                        rx={10}
                        fill={cardBg}
                        stroke={cardStroke}
                        strokeWidth={cardStrokeWidth}
                        filter={glowFilter}
                        style={{ transition: "all 0.2s ease" }}
                      />

                      {/* Table Header Banner */}
                      <path
                        d={`M ${tbl.x} ${tbl.y + 10} A 10 10 0 0 1 ${tbl.x + 10} ${tbl.y} L ${tbl.x + tbl.w - 10} ${tbl.y} A 10 10 0 0 1 ${tbl.x + tbl.w} ${tbl.y + 10} L ${tbl.x + tbl.w} ${tbl.y + 32} L ${tbl.x} ${tbl.y + 32} Z`}
                        fill={isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)")}
                        style={{ transition: "all 0.2s ease" }}
                      />

                      {/* Table Name Title */}
                      <text
                        x={tbl.x + 12}
                        y={tbl.y + 21}
                        fill={isActive ? "#FFF" : theme.palette.text.primary}
                        fontWeight="800"
                        fontSize="12.5"
                        fontFamily="Inter, sans-serif"
                      >
                        {tbl.id}
                      </text>

                      {/* Fields List inside the card */}
                      {tbl.fields.map((fld, fIdx) => (
                        <g key={fIdx}>
                          {/* Field Name */}
                          <text
                            x={tbl.x + 12}
                            y={tbl.y + 52 + (fIdx * 18)}
                            fill={theme.palette.text.secondary}
                            fontSize="11"
                            fontFamily="monospace"
                            fontWeight={fld.k ? 600 : 400}
                          >
                            {fld.n}
                          </text>

                          {/* Key Badge */}
                          {fld.k && (
                            <g>
                              <rect
                                x={tbl.x + tbl.w - 45}
                                y={tbl.y + 42 + (fIdx * 18)}
                                width={33}
                                height={13}
                                rx={3}
                                fill={fld.k.includes("PK") ? "rgba(16, 185, 129, 0.15)" : fld.k.includes("UK") || fld.k.includes("Unique") ? "rgba(245, 158, 11, 0.15)" : "rgba(239, 68, 68, 0.15)"}
                              />
                              <text
                                x={tbl.x + tbl.w - 28}
                                y={tbl.y + 51 + (fIdx * 18)}
                                textAnchor="middle"
                                fill={fld.k.includes("PK") ? "#10b981" : fld.k.includes("UK") || fld.k.includes("Unique") ? "#f59e0b" : "#ef4444"}
                                fontSize="8"
                                fontWeight="800"
                                fontFamily="Inter, sans-serif"
                              >
                                {fld.k.substring(0, 3)}
                              </text>
                            </g>
                          )}
                        </g>
                      ))}
                    </g>
                  );
                })}
              </svg>
            </Box>

            {/* Mobile View 2-Column Grid of Table Schemas */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <Grid container spacing={1.5}>
                {chunks.map((pair, pIdx) => {
                  return (
                    <React.Fragment key={pIdx}>
                      {pair.map((tbl) => {
                        const isActive = activeTable === tbl.id;
                        const cardBg = isActive
                          ? (theme.palette.mode === "light" ? "rgba(59, 130, 246, 0.04)" : "rgba(96, 165, 250, 0.08)")
                          : (theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.6)" : "rgba(30, 41, 59, 0.4)");
                        const cardStroke = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)");
                        const cardStrokeWidth = isActive ? "2px" : "1px";

                        return (
                          <Grid key={tbl.id} size={{ xs: 6 }}>
                            <Box
                              onClick={() => setActiveTable(tbl.id)}
                              sx={{
                                borderRadius: 2,
                                overflow: "hidden",
                                backgroundColor: cardBg,
                                border: `${cardStrokeWidth} solid ${cardStroke}`,
                                boxShadow: isActive ? `0 4px 12px ${theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)"}` : "none",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                "&:hover": {
                                  borderColor: primaryColor,
                                  backgroundColor: isActive
                                    ? cardBg
                                    : (theme.palette.mode === "light" ? "rgba(59, 130, 246, 0.02)" : "rgba(96, 165, 250, 0.04)"),
                                }
                              }}
                            >
                              {/* Table Name Title Header */}
                              <Box
                                sx={{
                                  px: 1.2,
                                  py: 0.6,
                                  backgroundColor: isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.03)" : "rgba(255, 255, 255, 0.03)"),
                                  borderBottom: `1px solid ${isActive ? "transparent" : (theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.06)")}`,
                                  transition: "all 0.2s ease",
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontWeight: 800,
                                    fontSize: "0.72rem",
                                    color: isActive ? "#FFF" : "text.primary",
                                    display: "block",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                  }}
                                >
                                  {tbl.id}
                                </Typography>
                              </Box>

                              {/* Fields List */}
                              <Box sx={{ p: 1, display: "flex", flexDirection: "column", gap: 0.5, flexGrow: 1 }}>
                                {tbl.fields.map((fld, fIdx) => (
                                  <Box key={fIdx} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 16 }}>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        fontFamily: "monospace",
                                        fontSize: "0.65rem",
                                        fontWeight: fld.k ? 700 : 400,
                                        color: "text.secondary",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        mr: 0.5
                                      }}
                                    >
                                      {fld.n}
                                    </Typography>
                                    {fld.k && (
                                      <Box
                                        sx={{
                                          px: 0.5,
                                          py: 0.1,
                                          borderRadius: 0.5,
                                          backgroundColor: fld.k.includes("PK")
                                            ? "rgba(16, 185, 129, 0.1)"
                                            : fld.k.includes("FK")
                                              ? "rgba(239, 68, 68, 0.1)"
                                              : "rgba(245, 158, 11, 0.1)",
                                          color: fld.k.includes("PK")
                                            ? "#10b981"
                                            : fld.k.includes("FK")
                                              ? "#ef4444"
                                              : "#f59e0b",
                                          fontSize: "0.55rem",
                                          fontWeight: 800,
                                          fontFamily: "monospace",
                                          lineHeight: 1,
                                        }}
                                      >
                                        {fld.k.substring(0, 3)}
                                      </Box>
                                    )}
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                          </Grid>
                        );
                      })}

                      {/* Relations section for the active table in this pair */}
                      <PairRelationsCollapse
                        pair={pair}
                        activeTable={activeTable}
                        theme={theme}
                        primaryColor={primaryColor}
                        setActiveTable={setActiveTable}
                      />
                    </React.Fragment>
                  );
                })}
              </Grid>
            </Box>
          </DiagramBoard>
        </Box>
      </Box>
    </Box>
  );
};

export default DatabaseSection;
