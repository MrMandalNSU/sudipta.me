import React from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { vectorNodes } from "./constants";
import { DiagramBoard, GlassCard, SectionHeading } from "./styles";

const getKeyBadgeColors = (isKey) => {
  if (!isKey) return { bg: "transparent", text: "transparent" };
  if (isKey.includes("PK")) return { bg: "rgba(16, 185, 129, 0.15)", text: "#10b981" };
  if (isKey.includes("Input")) return { bg: "rgba(59, 130, 246, 0.15)", text: "#3b82f6" };
  return { bg: "rgba(245, 158, 11, 0.15)", text: "#f59e0b" };
};

const mobileNodes = Object.keys(vectorNodes);

const VectorStoreSection = ({ theme, activeVectorNode, setActiveVectorNode, primaryColor }) => {
  const activeData = vectorNodes[activeVectorNode];
  const diagramNodes = [
    { id: "upsert_knowledge_chunk", x: 45, y: 55, w: 190, h: 92, label: "Upsert RPC", sub: "changed chunks" },
    { id: "delete_stale_chunks", x: 45, y: 255, w: 190, h: 92, label: "Cleanup RPCs", sub: "stale sources" },
    { id: "knowledge_chunks", x: 345, y: 120, w: 250, h: 170, label: "knowledge_chunks", sub: "content + vector(768)" },
    { id: "match_knowledge_chunks", x: 715, y: 55, w: 205, h: 92, label: "Vector Match RPC", sub: "cosine similarity" },
    { id: "keyword_search", x: 715, y: 255, w: 205, h: 92, label: "Keyword Search", sub: "alias scoring" },
  ];
  const relations = [
    { from: "upsert_knowledge_chunk", to: "knowledge_chunks", path: "M 235 101 L 345 170" },
    { from: "delete_stale_chunks", to: "knowledge_chunks", path: "M 235 301 L 345 240" },
    { from: "knowledge_chunks", to: "match_knowledge_chunks", path: "M 595 170 L 715 101" },
    { from: "knowledge_chunks", to: "keyword_search", path: "M 595 240 L 715 301" },
    { from: "match_knowledge_chunks", to: "keyword_search", path: "M 820 147 L 820 255", dashed: true },
  ];

  return (
    <Box id="database" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>Vector Store</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 720 }}>
        AskSudipta stores searchable portfolio knowledge in a compact pgvector schema. Click a table, RPC, or search path
        to inspect its fields and relations.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ order: { xs: 1, md: 2 }, mb: { xs: 4, md: 0 } }}>
          <GlassCard sx={{ p: { xs: 2.5, sm: 3.5 }, minHeight: { xs: "auto", md: 250 } }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, color: "primary.main", display: "flex", alignItems: "center", gap: 1 }}>
                {React.cloneElement(activeData.icon, { sx: { fontSize: 20 } })}
                {activeData.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {activeData.description}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", letterSpacing: "1px", display: "block", mb: 1.5 }}>
                Fields & Runtime Values
              </Typography>
              <Grid container spacing={1.5}>
                {activeData.fields.map((field) => (
                  <Grid key={`${activeVectorNode}-${field.name}`} size={{ xs: 12, sm: 6, lg: 4 }}>
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
                        minHeight: 46,
                      }}
                    >
                      <Stack direction="row" alignItems="center" sx={{ minWidth: 0, flexWrap: "wrap", gap: 0.75 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "monospace", fontSize: "0.8rem", overflowWrap: "anywhere" }}>
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
                      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace", fontSize: "0.72rem", flexShrink: 0, ml: 1 }}>
                        {field.type}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {activeData.relations.length > 0 && (
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", letterSpacing: "1px", display: "block", mb: 1 }}>
                  Connected Nodes
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {activeData.relations.map((rel) => (
                    <Button
                      key={rel}
                      onClick={() => setActiveVectorNode(rel)}
                      size="small"
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
                      {vectorNodes[rel]?.title || rel}
                    </Button>
                  ))}
                </Stack>
              </Box>
            )}
          </GlassCard>
        </Box>

        <Box sx={{ order: { xs: 2, md: 1 }, mb: { xs: 0, md: 4 } }}>
          <DiagramBoard>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <svg width="100%" viewBox="0 0 960 400" style={{ display: "block", maxWidth: "100%", height: "auto" }}>
                <defs>
                  <marker id="vectorDot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6">
                    <circle cx="5" cy="5" r="3" fill={primaryColor} />
                  </marker>
                  <filter id="vectorGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {relations.map((rel) => {
                  const isRelated = activeVectorNode === rel.from || activeVectorNode === rel.to;
                  return (
                    <path
                      key={`${rel.from}-${rel.to}`}
                      d={rel.path}
                      stroke={isRelated ? primaryColor : theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"}
                      strokeWidth={isRelated ? 2.6 : 1.5}
                      fill="none"
                      markerEnd={isRelated ? "url(#vectorDot)" : undefined}
                      strokeDasharray={rel.dashed ? "6,4" : undefined}
                      style={{ transition: "all 0.25s ease" }}
                    />
                  );
                })}

                {diagramNodes.map((node) => {
                  const isActive = activeVectorNode === node.id;
                  const fillBg = isActive
                    ? theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.12)"
                    : theme.palette.mode === "light" ? "rgba(255,255,255,0.88)" : "rgba(17,24,39,0.82)";
                  const strokeColor = isActive ? primaryColor : theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)";

                  return (
                    <g key={node.id} onClick={() => setActiveVectorNode(node.id)} style={{ cursor: "pointer" }}>
                      <rect
                        x={node.x}
                        y={node.y}
                        width={node.w}
                        height={node.h}
                        rx={12}
                        fill={fillBg}
                        stroke={strokeColor}
                        strokeWidth={isActive ? 2.6 : 1.2}
                        filter={isActive ? "url(#vectorGlow)" : undefined}
                      />
                      <text x={node.x + node.w / 2} y={node.y + 39} textAnchor="middle" fontWeight="800" fill={theme.palette.text.primary} fontSize="13" fontFamily="Inter, sans-serif">
                        {node.label}
                      </text>
                      <text x={node.x + node.w / 2} y={node.y + 58} textAnchor="middle" fill={theme.palette.text.secondary} fontSize="10.5" fontFamily="Inter, sans-serif">
                        {node.sub}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </Box>

            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <Grid container spacing={1.5}>
                {mobileNodes.map((nodeKey) => {
                  const isActive = activeVectorNode === nodeKey;
                  const node = vectorNodes[nodeKey];
                  return (
                    <Grid key={nodeKey} size={{ xs: 12, sm: 6 }}>
                      <Box
                        onClick={() => setActiveVectorNode(nodeKey)}
                        sx={{
                          borderRadius: 2,
                          p: 1.5,
                          cursor: "pointer",
                          backgroundColor: isActive ? theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.1)" : theme.palette.mode === "light" ? "rgba(255,255,255,0.6)" : "rgba(30,41,59,0.4)",
                          border: `1px solid ${isActive ? primaryColor : theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
                          display: "flex",
                          alignItems: "center",
                          gap: 1.2,
                          minHeight: 68,
                        }}
                      >
                        <Box sx={{ color: isActive ? "primary.main" : "text.secondary", flexShrink: 0 }}>
                          {React.cloneElement(node.icon, { sx: { fontSize: 22 } })}
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                            {node.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.4 }}>
                            {node.fields.length} fields
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
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

export default VectorStoreSection;
