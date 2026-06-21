import React from "react";
import { Box, Typography, Button, Stack, Chip, Collapse } from "@mui/material";
import Grid from "@mui/material/Grid";
import { AltRoute as AltRouteIcon } from "@mui/icons-material";
import { schemaTables } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";

const mobileTablesList = [
  { id: "userId", fields: [{ n: "value", k: "" }, { n: "source", k: "" }] },
  { id: "texts", fields: [{ n: "items", k: "" }, { n: "loading", k: "" }, { n: "error", k: "" }] },
  { id: "analysisResults", fields: [{ n: "words", k: "" }, { n: "characters", k: "" }, { n: "sentences", k: "" }, { n: "paragraphs", k: "" }, { n: "longestWords", k: "" }] },
  { id: "localStorage", fields: [{ n: "unique_user_id", k: "Key" }, { n: "app_theme", k: "Key" }] },
  { id: "currentTab", fields: [{ n: "activeTab", k: "" }, { n: "urlHash", k: "" }] },
  { id: "themeMode", fields: [{ n: "mode", k: "" }] },
  { id: "Text", fields: [{ n: "_id", k: "PK" }, { n: "userId", k: "" }, { n: "text", k: "" }, { n: "analysisId", k: "FK" }, { n: "createdAt", k: "" }, { n: "updatedAt", k: "" }] },
  { id: "Analysis", fields: [{ n: "_id", k: "PK" }, { n: "textId", k: "FK" }, { n: "wordCount", k: "" }, { n: "charCount", k: "" }, { n: "sentenceCount", k: "" }, { n: "paragraphCount", k: "" }, { n: "longestWords", k: "" }, { n: "createdAt", k: "" }, { n: "updatedAt", k: "" }] },
];

const getKeyBadgeColors = (isKey) => {
  if (!isKey) return { bg: "transparent", text: "transparent" };
  if (isKey.includes("PK")) {
    return { bg: "rgba(16, 185, 129, 0.15)", text: "#10b981" };
  }
  if (isKey.includes("FK")) {
    return { bg: "rgba(239, 68, 68, 0.15)", text: "#ef4444" };
  }
  return { bg: "rgba(245, 158, 11, 0.15)", text: "#f59e0b" }; // Key
};

const getNodeTitle = (id) => {
  if (id === "localStorage") return "localStorage (Browser Storage)";
  if (id === "Text" || id === "Analysis") return `${id} Database Collection`;
  return `${id} React State`;
};

const PairRelationsCollapse = ({ pair, activeTable, theme, primaryColor, setActiveTable }) => {
  const [lastActiveTable, setLastActiveTable] = React.useState(null);
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
              backgroundColor: theme.palette.mode === "light" ? "rgba(99, 102, 241, 0.04)" : "rgba(129, 140, 248, 0.08)",
              border: `1px solid ${primaryColor}`,
              boxShadow: `0 4px 12px ${theme.palette.mode === "light" ? "rgba(99,102,241,0.06)" : "rgba(129,140,248,0.08)"}`,
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
                    border: `1px solid ${theme.palette.mode === "light" ? "rgba(99,102,241,0.15)" : "rgba(129,140,248,0.15)"}`,
                    color: "primary.main",
                    backgroundColor: theme.palette.mode === "light" ? "#fff" : "rgba(15,23,42,0.4)",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === "light" ? "rgba(99,102,241,0.06)" : "rgba(129,140,248,0.08)",
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
  const primaryColor = theme.palette.mode === "light" ? "#6366f1" : "#818cf8";
  const activeTableData = schemaTables[activeTable];

  // Chunk mobile tables list into rows of 2
  const chunks = [];
  for (let i = 0; i < mobileTablesList.length; i += 2) {
    chunks.push(mobileTablesList.slice(i, i + 2));
  }

  const tableNodes = [
    { id: "userId", x: 40, y: 30, w: 220, h: 100 },
    { id: "texts", x: 40, y: 165, w: 220, h: 110 },
    { id: "analysisResults", x: 40, y: 305, w: 220, h: 145 },
    { id: "localStorage", x: 360, y: 30, w: 220, h: 100 },
    { id: "currentTab", x: 360, y: 165, w: 220, h: 100 },
    { id: "themeMode", x: 360, y: 305, w: 220, h: 80 },
    { id: "Text", x: 680, y: 30, w: 240, h: 165 },
    { id: "Analysis", x: 680, y: 225, w: 240, h: 225 },
  ].map((node) => ({
    ...node,
    fields: schemaTables[node.id].fields,
  }));

  const relations = [
    { from: "userId", to: "localStorage", path: "M 260 80 L 360 80" },
    { from: "userId", to: "Text", path: "M 150 30 C 150 5, 800 5, 800 30" },
    { from: "texts", to: "Text", path: "M 260 220 C 310 220, 310 147.5, 360 147.5 L 580 147.5 C 630 147.5, 630 112.5, 680 112.5" },
    { from: "analysisResults", to: "Analysis", path: "M 260 377.5 C 310 377.5, 310 285, 360 285 L 580 285 C 630 285, 630 337.5, 680 337.5" },
    { from: "texts", to: "analysisResults", path: "M 150 275 L 150 305" },
    { from: "localStorage", to: "themeMode", path: "M 580 80 C 620 80, 620 345, 580 345" },
    { from: "Text", to: "Analysis", path: "M 800 195 L 800 225" },
  ];

  return (
    <Box id="database" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>State & Database Schema</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 700 }}>
        An interactive blueprint of Text Analyzer's React states, browser local storage, and database collections. Click any card to highlight its reactive relations and details.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {/* Table Detail Panel */}
        <Box sx={{ order: { xs: 1, md: 2 }, mb: { xs: 4, md: 0 } }}>
          <GlassCard sx={{ p: { xs: 2.5, sm: 3.5 }, minHeight: { xs: "auto", md: 260 } }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, color: "primary.main" }}>
                {getNodeTitle(activeTable)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                {activeTableData.description}
              </Typography>
            </Box>

            {/* Fields */}
            <Box sx={{ mb: 3, display: { xs: "none", md: "block" } }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", letterSpacing: "1px", display: "block", mb: 1.5 }}>
                Keys & Value Types
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
                              backgroundColor: getKeyBadgeColors(field.isKey).bg,
                              color: getKeyBadgeColors(field.isKey).text,
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

        {/* ER / Dependency Diagram Board */}
        <Box sx={{ order: { xs: 2, md: 1 }, mb: { xs: 0, md: 4 } }}>
          <DiagramBoard>
            {/* Desktop View SVG ER Diagram */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <svg
                width="100%"
                viewBox="0 0 960 480"
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

                {/* Relations Connector Lines */}
                {relations.map((rel, idx) => {
                  const isRelated = activeTable === rel.from || activeTable === rel.to;
                  const strokeColor = isRelated ? primaryColor : (theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)");
                  const strokeWidth = isRelated ? 2.5 : 1.5;
                  const marker = isRelated ? "url(#dot)" : undefined;
                  return (
                    <path
                      key={idx}
                      d={rel.path}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      fill="none"
                      markerEnd={marker}
                      style={{ transition: "all 0.3s ease" }}
                    />
                  );
                })}

                {/* Table/State Cards */}
                {tableNodes.map((tbl) => {
                  const isActive = activeTable === tbl.id;
                  const cardBg = isActive
                    ? (theme.palette.mode === "light" ? "rgba(99, 102, 241, 0.08)" : "rgba(129, 140, 248, 0.12)")
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
                        {tbl.id === "localStorage" ? "localStorage" : (tbl.id === "Text" || tbl.id === "Analysis" ? tbl.id : `${tbl.id} state`)}
                      </text>

                      {/* Fields List */}
                      {tbl.fields.map((fld, fIdx) => (
                        <g key={fIdx}>
                          <text
                            x={tbl.x + 12}
                            y={tbl.y + 52 + (fIdx * 18)}
                            fill={theme.palette.text.secondary}
                            fontSize="11"
                            fontFamily="monospace"
                            fontWeight={fld.isKey ? 600 : 400}
                          >
                            {fld.name}
                          </text>

                          {fld.isKey && (
                            <g>
                              <rect
                                x={tbl.x + tbl.w - 55}
                                y={tbl.y + 42 + (fIdx * 18)}
                                width={43}
                                height={13}
                                rx={3}
                                fill={getKeyBadgeColors(fld.isKey).bg}
                              />
                              <text
                                x={tbl.x + tbl.w - 33}
                                y={tbl.y + 51 + (fIdx * 18)}
                                textAnchor="middle"
                                fill={getKeyBadgeColors(fld.isKey).text}
                                fontSize="8"
                                fontWeight="800"
                                fontFamily="Inter, sans-serif"
                              >
                                {fld.isKey}
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

            {/* Mobile View */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <Grid container spacing={1.5}>
                {chunks.map((pair, pIdx) => (
                  <React.Fragment key={pIdx}>
                    {pair.map((tbl) => {
                      const isActive = activeTable === tbl.id;
                      const cardBg = isActive
                        ? (theme.palette.mode === "light" ? "rgba(99, 102, 241, 0.04)" : "rgba(129, 140, 248, 0.08)")
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
                              boxShadow: isActive ? `0 4px 12px ${theme.palette.mode === "light" ? "rgba(99,102,241,0.06)" : "rgba(129,140,248,0.08)"}` : "none",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              "&:hover": {
                                borderColor: primaryColor,
                                backgroundColor: isActive
                                  ? cardBg
                                  : (theme.palette.mode === "light" ? "rgba(99, 102, 241, 0.02)" : "rgba(129, 140, 248, 0.04)"),
                              }
                            }}
                          >
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
                                        backgroundColor: getKeyBadgeColors(fld.k).bg,
                                        color: getKeyBadgeColors(fld.k).text,
                                        fontSize: "0.55rem",
                                        fontWeight: 800,
                                        fontFamily: "monospace",
                                        lineHeight: 1,
                                      }}
                                    >
                                      {fld.k}
                                    </Box>
                                  )}
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        </Grid>
                      );
                    })}

                    <PairRelationsCollapse
                      pair={pair}
                      activeTable={activeTable}
                      theme={theme}
                      primaryColor={primaryColor}
                      setActiveTable={setActiveTable}
                    />
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </DiagramBoard>
        </Box>
      </Box>
    </Box>
  );
};

export default DatabaseSection;
