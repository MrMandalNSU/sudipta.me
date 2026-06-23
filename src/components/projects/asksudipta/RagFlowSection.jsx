import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ragFlowColumns, ragFlowNodes } from "./constants";
import { DiagramBoard, GlassCard, SectionHeading } from "./styles";

const FlowLane = ({ title, nodeKeys, activeNode, setActiveNode, theme, primaryColor }) => (
  <Stack spacing={0} sx={{ alignItems: "center" }}>
    <Typography
      variant="caption"
      sx={{
        mb: 2,
        fontWeight: 900,
        color: "text.secondary",
        letterSpacing: "1px",
        textTransform: "uppercase",
      }}
    >
      {title}
    </Typography>

    {nodeKeys.map((nodeKey, index) => {
      const node = ragFlowNodes[nodeKey];
      const isActive = activeNode === nodeKey;

      return (
        <React.Fragment key={nodeKey}>
          <Button
            onClick={() => setActiveNode(nodeKey)}
            sx={{
              width: "100%",
              minHeight: { xs: 66, sm: 72 },
              px: { xs: 1.5, sm: 2 },
              py: 1.4,
              borderRadius: 1.5,
              textTransform: "none",
              display: "flex",
              justifyContent: "flex-start",
              gap: 1.4,
              color: isActive ? "#FFF" : "text.primary",
              backgroundColor: isActive
                ? theme.palette.primary.main
                : theme.palette.mode === "light"
                  ? "rgba(255,255,255,0.78)"
                  : "rgba(15,23,42,0.72)",
              border: `1.5px solid ${isActive ? "transparent" : primaryColor}`,
              boxShadow: isActive
                ? theme.palette.mode === "light"
                  ? "0 10px 24px rgba(79,70,229,0.16)"
                  : "0 10px 24px rgba(129,140,248,0.18)"
                : "none",
              "&:hover": {
                backgroundColor: isActive
                  ? theme.palette.primary.main
                  : theme.palette.mode === "light"
                    ? "rgba(79,70,229,0.06)"
                    : "rgba(129,140,248,0.1)",
                transform: "none",
                boxShadow: "none",
              },
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 1.2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: isActive ? "#FFF" : "primary.main",
                backgroundColor: isActive ? "rgba(255,255,255,0.16)" : theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.12)",
              }}
            >
              {React.cloneElement(node.icon, { sx: { fontSize: 18 } })}
            </Box>
            <Box sx={{ minWidth: 0, textAlign: "left" }}>
              <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                  {node.title}
                </Box>
                <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                  {node.shortTitle}
                </Box>
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 0.35,
                  color: isActive ? "rgba(255,255,255,0.76)" : "text.secondary",
                  lineHeight: 1.25,
                }}
              >
                {node.lane === "ingestion" ? "Index-time step" : "Answer-time step"}
              </Typography>
            </Box>
          </Button>

          {index < nodeKeys.length - 1 && (
            <Box
              sx={{
                height: { xs: 24, sm: 30 },
                width: 2,
                backgroundColor: isActive ? primaryColor : theme.palette.mode === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.16)",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: -4,
                  bottom: -1,
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: `7px solid ${isActive ? primaryColor : theme.palette.mode === "light" ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.22)"}`,
                },
              }}
            />
          )}
        </React.Fragment>
      );
    })}
  </Stack>
);

const RagFlowSection = ({ theme, activeRagNode, setActiveRagNode, primaryColor }) => {
  const activeNode = ragFlowNodes[activeRagNode];

  return (
    <Box id="rag-flow" sx={{ scrollMarginTop: 120, mb: 4 }}>
      <SectionHeading theme={theme}>RAG Flow</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 760 }}>
        The core lifecycle from the repo README, made interactive: the left lane indexes portfolio knowledge, and the
        right lane answers visitor questions from that indexed context.
      </Typography>

      <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DiagramBoard sx={{ height: "100%" }}>
            <Grid container spacing={{ xs: 3, md: 7 }} sx={{ justifyContent: "center" }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FlowLane
                  title="Knowledge Indexing"
                  nodeKeys={ragFlowColumns.ingestion}
                  activeNode={activeRagNode}
                  setActiveNode={setActiveRagNode}
                  theme={theme}
                  primaryColor={primaryColor}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FlowLane
                  title="Question Answering"
                  nodeKeys={ragFlowColumns.chat}
                  activeNode={activeRagNode}
                  setActiveNode={setActiveRagNode}
                  theme={theme}
                  primaryColor={primaryColor}
                />
              </Grid>
            </Grid>
          </DiagramBoard>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <GlassCard sx={{ p: { xs: 3, sm: 3.5 }, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 900, color: "primary.main", letterSpacing: "1px", textTransform: "uppercase" }}>
                {activeNode.lane === "ingestion" ? "Knowledge Indexing" : "Question Answering"}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1, mb: 1.5, fontWeight: 900, display: "flex", alignItems: "center", gap: 1 }}>
                {React.cloneElement(activeNode.icon, { color: "primary", sx: { fontSize: 22 } })}
                {activeNode.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {activeNode.description}
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ mt: 2.5, lineHeight: 1.75, fontWeight: 500 }}>
                {activeNode.detail}
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.05)" : "rgba(129,140,248,0.08)",
                border: `1px solid ${theme.palette.mode === "light" ? "rgba(79,70,229,0.12)" : "rgba(129,140,248,0.18)"}`,
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.8px", mb: 0.5 }}>
                Runtime boundary
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.55, display: "block" }}>
                Indexing writes to pgvector. Answering reads from pgvector and returns citations to the React assistant.
              </Typography>
            </Box>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RagFlowSection;
