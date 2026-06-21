import React from "react";
import { Box, Typography, Button, Stack, Chip, Collapse } from "@mui/material";
import Grid from "@mui/material/Grid";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import { stateSchemas } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";

const mobileStatesList = [
  {
    id: "selectedColors",
    fields: [
      { n: "id", k: "Key" },
      { n: "name", k: "" },
      { n: "hex", k: "" },
      { n: "bgClass", k: "" }
    ]
  },
  {
    id: "targetSequence",
    fields: [
      { n: "sequence[index]", k: "Secret" }
    ]
  },
  {
    id: "grid",
    fields: [
      { n: "grid[row][slot]", k: "Matrix" }
    ]
  },
  {
    id: "feedbackGrid",
    fields: [
      { n: "feedbackGrid[row][slot]", k: "Clue Map" }
    ]
  },
  {
    id: "flippedGrid",
    fields: [
      { n: "flipped[row][slot]", k: "Anim" }
    ]
  },
  {
    id: "history",
    fields: [
      { n: "history[index]", k: "Logs" }
    ]
  },
  {
    id: "gameStatus",
    fields: [
      { n: "status", k: "State" },
      { n: "isRevealing", k: "" }
    ]
  },
  {
    id: "localStorage",
    fields: [
      { n: "easy.played", k: "Stats" },
      { n: "easy.wins", k: "" },
      { n: "hard.played", k: "" },
      { n: "insane.played", k: "" }
    ]
  }
];

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
  const displayTableData = displayTableId ? stateSchemas[displayTableId] : null;

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
              Related States for {displayTableId}
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

const StateStorageSection = ({ theme, activeTable, setActiveTable }) => {
  const primaryColor = theme.palette.mode === "light" ? "#4F46E5" : "#818CF8";
  const secondaryColor = theme.palette.mode === "light" ? "#06B6D4" : "#22D3EE";

  const chunks = [];
  for (let i = 0; i < mobileStatesList.length; i += 2) {
    chunks.push(mobileStatesList.slice(i, i + 2));
  }

  return (
    <Box id="database" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>State & Local Storage</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 700 }}>
        An interactive blueprint of Color Cuddle's React active states and local storage caching schemas.
        Click any block to highlight its reactive connections.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {/* State Dependency Diagram Board */}
        <Box sx={{ mb: { xs: 0, md: 4 } }}>
          <DiagramBoard>
            {/* Desktop View SVG Dependency Diagram */}
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
                  <marker id="dotCyan" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6">
                    <circle cx="5" cy="5" r="3" fill={secondaryColor} />
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
                  { from: "selectedColors", to: "grid", path: "M 240 100 L 340 100" },
                  { from: "selectedColors", to: "targetSequence", path: "M 140 170 L 140 200" },
                  { from: "targetSequence", to: "feedbackGrid", path: "M 240 250 L 340 245" },
                  { from: "grid", to: "feedbackGrid", path: "M 440 150 L 440 190" },
                  { from: "feedbackGrid", to: "history", path: "M 440 300 L 440 330" },
                  { from: "grid", to: "localStorage", path: "M 540 100 L 680 100" },
                  { from: "feedbackGrid", to: "localStorage", path: "M 540 245 C 600 245, 620 130, 680 130" },
                  { from: "feedbackGrid", to: "flippedGrid", path: "M 540 245 L 680 255" },
                  { from: "feedbackGrid", to: "gameStatus", path: "M 540 245 C 600 245, 620 395, 680 395" },
                  { from: "gameStatus", to: "localStorage", path: "M 900 395 C 930 395, 930 105, 900 105" },
                ].map((rel, idx) => {
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
                      style={{
                        transition: "all 0.3s ease",
                      }}
                    />
                  );
                })}

                {/* State Cards */}
                {[
                  {
                    id: "selectedColors", x: 40, y: 30, w: 200, h: 140,
                    fields: [{ n: "id", k: "Key" }, { n: "name", k: "" }, { n: "hex", k: "" }, { n: "bgClass", k: "" }]
                  },
                  {
                    id: "targetSequence", x: 40, y: 200, w: 200, h: 100,
                    fields: [{ n: "sequence", k: "Secret" }]
                  },
                  {
                    id: "grid", x: 340, y: 30, w: 200, h: 120,
                    fields: [{ n: "rowCount", k: "Dim" }, { n: "columnCount", k: "" }, { n: "slots", k: "" }]
                  },
                  {
                    id: "feedbackGrid", x: 340, y: 190, w: 200, h: 110,
                    fields: [{ n: "green", k: "Clues" }, { n: "yellow", k: "" }, { n: "red", k: "" }]
                  },
                  {
                    id: "history", x: 340, y: 330, w: 200, h: 130,
                    fields: [{ n: "logs", k: "stdout" }, { n: "maxSize", k: "" }, { n: "scroll", k: "" }]
                  },
                  {
                    id: "localStorage", x: 680, y: 30, w: 220, h: 150,
                    fields: [{ n: "easy", k: "Stats" }, { n: "hard", k: "" }, { n: "insane", k: "" }, { n: "streaks", k: "" }]
                  },
                  {
                    id: "flippedGrid", x: 680, y: 200, w: 220, h: 110,
                    fields: [{ n: "flipped", k: "Anim" }]
                  },
                  {
                    id: "gameStatus", x: 680, y: 340, w: 220, h: 110,
                    fields: [{ n: "status", k: "State" }, { n: "isRevealing", k: "" }]
                  },
                ].map((tbl) => {
                  const isActive = activeTable === tbl.id;
                  const cardBg = isActive
                    ? (theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.08)" : "rgba(129, 140, 248, 0.12)")
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

                      {/* Card Header Banner */}
                      <path
                        d={`M ${tbl.x} ${tbl.y + 10} A 10 10 0 0 1 ${tbl.x + 10} ${tbl.y} L ${tbl.x + tbl.w - 10} ${tbl.y} A 10 10 0 0 1 ${tbl.x + tbl.w} ${tbl.y + 10} L ${tbl.x + tbl.w} ${tbl.y + 32} L ${tbl.x} ${tbl.y + 32} Z`}
                        fill={isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)")}
                        style={{ transition: "all 0.2s ease" }}
                      />

                      {/* Card Name Title */}
                      <text
                        x={tbl.x + 12}
                        y={tbl.y + 21}
                        fill={isActive ? "#FFF" : theme.palette.text.primary}
                        fontWeight="800"
                        fontSize="12.5"
                        fontFamily="Inter, sans-serif"
                      >
                        {tbl.id === "localStorage" ? "localStorage" : `${tbl.id} state`}
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
                                x={tbl.x + tbl.w - 55}
                                y={tbl.y + 42 + (fIdx * 18)}
                                width={43}
                                height={13}
                                rx={3}
                                fill={fld.k.includes("PK") || fld.k.includes("Key") ? "rgba(16, 185, 129, 0.15)" : fld.k.includes("Matrix") || fld.k.includes("Stats") ? "rgba(245, 158, 11, 0.15)" : "rgba(239, 68, 68, 0.15)"}
                              />
                              <text
                                x={tbl.x + tbl.w - 33}
                                y={tbl.y + 51 + (fIdx * 18)}
                                textAnchor="middle"
                                fill={fld.k.includes("PK") || fld.k.includes("Key") ? "#10b981" : fld.k.includes("Matrix") || fld.k.includes("Stats") ? "#f59e0b" : "#ef4444"}
                                fontSize="8"
                                fontWeight="800"
                                fontFamily="Inter, sans-serif"
                              >
                                {fld.k}
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
                          ? (theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.04)" : "rgba(129, 140, 248, 0.08)")
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
                                    : (theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.02)" : "rgba(129, 140, 248, 0.04)"),
                                }
                              }}
                            >
                              {/* State Name Title Header */}
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
                                          backgroundColor: fld.k.includes("PK") || fld.k.includes("Key")
                                            ? "rgba(16, 185, 129, 0.1)"
                                            : fld.k.includes("Matrix") || fld.k.includes("Stats")
                                              ? "rgba(245, 158, 11, 0.1)"
                                              : "rgba(239, 68, 68, 0.1)",
                                          color: fld.k.includes("PK") || fld.k.includes("Key")
                                            ? "#10b981"
                                            : fld.k.includes("Matrix") || fld.k.includes("Stats")
                                              ? "#f59e0b"
                                              : "#ef4444",
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

                      {/* Relations section */}
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

export default StateStorageSection;
