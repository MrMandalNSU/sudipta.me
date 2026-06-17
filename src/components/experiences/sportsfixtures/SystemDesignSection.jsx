import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Menu, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { systemNodes } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";

const requestFlowSteps = [
  { key: "client", label: "Send Request", sub: "User Action" },
  { key: "api", label: "Strapi Router", sub: "Koa Middlewares" },
  { key: "cache", label: "Query Cache", sub: "Redis / node-cache" },
  { key: "postgres", label: "PostgreSQL DB", sub: "Persistent Queries" },
  { key: "client", label: "Render Dashboard", sub: "Update UI Stats" },
];

const syncFlowSteps = [
  { key: "crons", label: "Cron Scheduler", sub: "Background Worker" },
  { key: "sportsdb", label: "SportsDB API Client", sub: "Staggered Fetcher" },
  { key: "postgres", label: "Update database", sub: "Neon Postgres Write" },
  { key: "websocket", label: "Broadcast Updates", sub: "Socket.io Broadcast" },
  { key: "client", label: "Live score flash", sub: "Active Socket update" },
];

const SystemDesignSection = ({
  theme,
  activeSystemNode,
  setActiveSystemNode,
  primaryColor
}) => {
  const [activeMobileFlow, setActiveMobileFlow] = useState("request");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (nodeKey) => {
    setActiveSystemNode(nodeKey);
    handleClose();
  };

  useEffect(() => {
    if (activeSystemNode === "crons" || activeSystemNode === "sportsdb" || activeSystemNode === "websocket") {
      setActiveMobileFlow("sync");
    } else if (
      activeSystemNode === "client" ||
      activeSystemNode === "api" ||
      activeSystemNode === "cache"
    ) {
      setActiveMobileFlow("request");
    }
  }, [activeSystemNode]);

  return (
    <Box
      id="architecture"
      sx={{
        scrollMarginTop: 120,
        mb: 4,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <SectionHeading theme={theme}>System Design</SectionHeading>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
        An overview of Sportsfixtures' synchronized and distributed request framework. 
        Click any node to see its role in the request lifecycle.
      </Typography>

      {/* Node Selector Dropdown */}
      <Box sx={{ mb: 3 }}>
        <Button
          id="node-select-button"
          aria-controls={open ? 'node-select-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="outlined"
          disableElevation
          onClick={handleClick}
          endIcon={<ArrowDropDownIcon />}
          startIcon={React.cloneElement(systemNodes[activeSystemNode].icon, { sx: { fontSize: 18 } })}
          sx={{
            textTransform: "none",
            fontWeight: 800,
            fontSize: "0.85rem",
            borderRadius: 2,
            px: 2.5,
            py: 1,
            borderColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)",
            color: "text.primary",
            backgroundColor: theme.palette.mode === "light" ? "rgba(255,255,255,0.8)" : "rgba(30,41,59,0.8)",
            backdropFilter: "blur(8px)",
            "&:hover": {
              borderColor: primaryColor,
              backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.04)" : "rgba(129,140,248,0.06)",
            }
          }}
        >
          Active Node: {systemNodes[activeSystemNode].title.split(" (")[0]}
        </Button>
        <Menu
          id="node-select-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'node-select-button',
          }}
          PaperProps={{
            sx: {
              borderRadius: 2,
              mt: 1,
              minWidth: 260,
              boxShadow: theme.palette.mode === "light"
                ? "0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.08)"
                : "0 10px 25px -5px rgba(0,0,0,0.5), 0 8px 10px -6px rgba(0,0,0,0.5)",
              backgroundColor: theme.palette.mode === "light" ? "rgba(255,255,255,0.95)" : "rgba(15,23,42,0.95)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
            }
          }}
        >
          {Object.entries(systemNodes).map(([key, val]) => {
            const isSelected = activeSystemNode === key;
            return (
              <MenuItem
                key={key}
                selected={isSelected}
                onClick={() => handleSelect(key)}
                sx={{
                  py: 1.2,
                  px: 2,
                  fontSize: "0.8rem",
                  fontWeight: isSelected ? 800 : 500,
                  color: isSelected ? "primary.main" : "text.secondary",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  borderRadius: 1.5,
                  mx: 0.5,
                  my: 0.2,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.16)",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.12)" : "rgba(129,140,248,0.2)",
                    }
                  },
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
                  }
                }}
              >
                {React.cloneElement(val.icon, { sx: { fontSize: 16 } })}
                {val.title.split(" (")[0]}
              </MenuItem>
            );
          })}
        </Menu>
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
                ROLE IN WORKFLOW
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ fontStyle: "italic", fontWeight: 500, lineHeight: 1.6 }}>
                "{systemNodes[activeSystemNode].role}"
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </GlassCard>

      {/* Flowchart Diagram */}
      <DiagramBoard sx={{ mb: 3 }}>
        {/* Desktop View SVG Flowchart */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <svg
            width="100%"
            viewBox="0 0 920 380"
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
              { from: "client", to: "api", path: "M 160 65 L 220 65" },
              { from: "api", to: "cache", path: "M 350 65 L 390 65" },
              { from: "cache", to: "postgres", path: "M 520 65 L 580 65" },
              { from: "crons", to: "sportsdb", path: "M 710 265 L 760 265" },
              { from: "sportsdb", to: "postgres", path: "M 820 240 L 820 180 L 645 180 L 645 90" },
              { from: "crons", to: "websocket", path: "M 580 265 L 100 265 L 100 180" },
              { from: "websocket", to: "client", path: "M 100 130 L 100 90" },
              { from: "api", to: "websocket", path: "M 285 90 L 285 155 L 160 155" },
            ].map((line, lIdx) => {
              const isActive = activeSystemNode === line.from || activeSystemNode === line.to;
              const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
              const strokeWidth = isActive ? 2.5 : 1.5;
              const marker = isActive ? "url(#arrowHead)" : "url(#arrowHeadMuted)";
              const dashStyle = line.from === "crons" || line.to === "crons" ? "5,3" : undefined;
              return (
                <path
                  key={lIdx}
                  d={line.path}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  fill="none"
                  markerEnd={marker}
                  strokeDasharray={dashStyle}
                  style={{
                    transition: "all 0.3s ease",
                  }}
                />
              );
            })}

            {/* Nodes */}
            {[
              { key: "client", type: "start", x: 40, y: 40, w: 120, h: 50, rx: 25, cx: 100, cy: 65, label: "Client Portal", sub: "React Dashboard" },
              { key: "api", type: "process", x: 220, y: 40, w: 130, h: 50, rx: 8, cx: 285, cy: 65, label: "Strapi Router", sub: "Route Middleware" },
              { key: "cache", type: "decision", d: "M 456 25 L 520 65 L 456 105 L 392 65 Z", cx: 456, cy: 65, label: "Cached?", sub: "Redis check" },
              { key: "postgres", type: "cylinder", x: 580, y: 20, w: 130, h: 70, cx: 645, cy: 55, label: "Neon Postgres DB", sub: "Relational database" },
              
              { key: "websocket", type: "process", x: 40, y: 130, w: 120, h: 50, rx: 8, cx: 100, cy: 155, label: "WebSocket Server", sub: "Socket.io Broadcaster" },
              { key: "crons", type: "process", x: 580, y: 240, w: 130, h: 50, rx: 8, cx: 645, cy: 265, label: "Cron Schedulers", sub: "Sync Background Jobs" },
              { key: "sportsdb", type: "process", x: 760, y: 240, w: 120, h: 50, rx: 8, cx: 820, cy: 265, label: "SportsDB Service", sub: "Staggered API Client" },
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
                  {node.type === "start" && (
                    <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={node.rx} fill={fillBg} stroke={strokeColor} strokeWidth={strokeWidth} filter={glowFilter} />
                  )}
                  {node.type === "process" && (
                    <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={node.rx} fill={fillBg} stroke={strokeColor} strokeWidth={strokeWidth} filter={glowFilter} />
                  )}
                  {node.type === "decision" && (
                    <path d={node.d} fill={fillBg} stroke={strokeColor} strokeWidth={strokeWidth} filter={glowFilter} />
                  )}
                  {node.type === "cylinder" && (
                    <g filter={glowFilter}>
                      <path
                        d={`M ${node.x} ${node.y + 12} L ${node.x} ${node.y + node.h} A ${node.w / 2} 12 0 0 0 ${node.x + node.w} ${node.y + node.h} L ${node.x + node.w} ${node.y + 12} Z`}
                        fill={fillBg}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <ellipse
                        cx={node.x + node.w / 2}
                        cy={node.y + 12}
                        rx={node.w / 2}
                        ry={12}
                        fill={isActive ? (theme.palette.mode === "light" ? "rgba(79,70,229,0.2)" : "rgba(129,140,248,0.3)") : (theme.palette.mode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)")}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                    </g>
                  )}

                  {/* Text */}
                  <text x={node.cx} y={node.cy - 2} textAnchor="middle" fontWeight="800" fill={theme.palette.text.primary} fontSize="11" fontFamily="Inter, sans-serif">
                    {node.label}
                  </text>
                  <text x={node.cx} y={node.cy + 11} textAnchor="middle" fill={theme.palette.text.secondary} fontSize="9.5" fontFamily="Inter, sans-serif">
                    {node.sub}
                  </text>
                </g>
              );
            })}

            <text x="20" y="360" fontSize="10.5" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
              ── Request Flow  ╌╌ Cron Schedule  Click nodes to highlight execution pathways
            </text>
          </svg>
        </Box>

        {/* Mobile View Vertical Flowchart */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Box
            sx={{
              display: "flex",
              borderRadius: 2,
              p: 0.5,
              mb: 3,
              backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            <Button
              fullWidth
              onClick={() => setActiveMobileFlow("request")}
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: activeMobileFlow === "request" ? 800 : 600,
                fontSize: "0.8rem",
                borderRadius: 1.5,
                py: 0.8,
                backgroundColor: activeMobileFlow === "request" ? (theme.palette.mode === "light" ? "#FFF" : "rgba(255,255,255,0.08)") : "transparent",
                color: activeMobileFlow === "request" ? "primary.main" : "text.secondary",
              }}
            >
              Request & Caching Flow
            </Button>
            <Button
              fullWidth
              onClick={() => setActiveMobileFlow("sync")}
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: activeMobileFlow === "sync" ? 800 : 600,
                fontSize: "0.8rem",
                borderRadius: 1.5,
                py: 0.8,
                backgroundColor: activeMobileFlow === "sync" ? (theme.palette.mode === "light" ? "#FFF" : "rgba(255,255,255,0.08)") : "transparent",
                color: activeMobileFlow === "sync" ? "primary.main" : "text.secondary",
              }}
            >
              Background Score Sync
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pl: 1, pr: 1 }}>
            {(activeMobileFlow === "request" ? requestFlowSteps : syncFlowSteps).map((step, idx, arr) => {
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
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    backgroundColor: isActive ? (theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.1)") : "transparent",
                    border: `1px solid ${isActive ? primaryColor : "transparent"}`,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)"),
                        color: isActive ? "#FFF" : "text.secondary",
                        border: `1px solid ${isActive ? "transparent" : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)")}`,
                        zIndex: 1,
                      }}
                    >
                      {React.cloneElement(systemNodes[step.key].icon, { sx: { fontSize: 18 } })}
                    </Box>
                    {isNotLast && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 38,
                          height: 24,
                          width: 2,
                          borderLeft: `2px dashed ${isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)")}`,
                          zIndex: 0,
                        }}
                      />
                    )}
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: isActive ? primaryColor : "text.primary" }}>
                      {step.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.2 }}>
                      {step.sub}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </DiagramBoard>
    </Box>
  );
};

export default SystemDesignSection;
