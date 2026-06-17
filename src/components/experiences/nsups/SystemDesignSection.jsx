import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Menu, MenuItem, Paper, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { systemNodes } from "./constants";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";
import LayersIcon from "@mui/icons-material/Layers";
import CloudIcon from "@mui/icons-material/CloudUpload";
import StorageIcon from "@mui/icons-material/Storage";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const onboardingSteps = [
  { key: "bootcamp", label: "Bootcamp Registration", sub: "User Profile Signup" },
  { key: "database", label: "Relational Persistence", sub: "Verify Handles & Write Tables" },
  { key: "aggregator", label: "Leaderboard Sorter", sub: "Active Scoring Calculations" },
];

const crawlingSteps = [
  { key: "crawler", label: "Crawler Scheduled Daemon", sub: "Proxy Pool Cron Executor" },
  { key: "database", label: "Solve Stats DB Update", sub: "Increment Deltas & Store Logs" },
  { key: "dashboard", label: "Student Solve Dashboard", sub: "Render Live Performance Grids" },
];

const microDiagramData = {
  bootcamp: [
    { label: "Submit Profile", sub: "Name / email / handles" },
    { label: "Validate Details", sub: "Ensure proper formats" },
    { label: "API Verification", sub: "Check handle on OJs" },
    { label: "Batch Assignment", sub: "Map active bootcamp id" },
    { label: "MySQL Save", sub: "Commit verify records" },
    { label: "Account Activated", sub: "Enrollment complete" }
  ],
  api: [
    { label: "Receive Route", sub: "REST HTTP client call" },
    { label: "Verify Token", sub: "Check request headers" },
    { label: "Verify Client IP", sub: "Check whitelist array" },
    { label: "Validate Input", sub: "Enforce schema filters" },
    { label: "Execute Service", sub: "Fetch DB / Sorter result" },
    { label: "Response Output", sub: "Deliver JSON payload" }
  ],
  crawler: [
    { label: "Cron Trigger", sub: "Every 6 Hours" },
    { label: "Load Handles", sub: "Fetch OJ handles queue" },
    { label: "Proxy Rotation", sub: "Avoid request blocks" },
    { label: "HTTP Request", sub: "Curl Online Judges" },
    { label: "Regex Parser", sub: "Extract solve count delta" },
    { label: "DB Update", sub: "Commit crawled count" }
  ],
  database: [
    { label: "Handle Input", sub: "REST endpoints validation" },
    { label: "Integrity Filter", sub: "Relational keys mapping" },
    { label: "Write MySQL Rows", sub: "Save verify entries" },
    { label: "Daily Deltas", sub: "Record date solves count" },
    { label: "Leaderboard Update", sub: "Refresh participant ranks" },
    { label: "Redis Sync", sub: "Warm cache memory" }
  ],
  aggregator: [
    { label: "Fetch Batch Solves", sub: "Query database log" },
    { label: "Filter Date Range", sub: "Limit active boundaries" },
    { label: "Scoring Weight", sub: "Calculate difficulty scale" },
    { label: "Deduct Penalty", sub: "Late submission adjustment" },
    { label: "Sort Rankings", sub: "Sort solved count descending" },
    { label: "Cache Leaderboard", sub: "Update Redis lookup" }
  ],
  dashboard: [
    { label: "Client Request", sub: "Dashboard page load" },
    { label: "Query Cache", sub: "Verify Redis ranks" },
    { label: "Solve History", sub: "Pull daily delta arrays" },
    { label: "Grid Serializer", sub: "Format timeline dataset" },
    { label: "REST Response", sub: "Expose JSON objects" },
    { label: "Render Heatmap", sub: "UI activity widgets" }
  ],
  codeforces: [
    { label: "CF Target API", sub: "Compile CF user handles" },
    { label: "Ping Endpoint", sub: "Establish connection state" },
    { label: "Fetch Solved List", sub: "Receive user active JSON" },
    { label: "Filter Accepted", sub: "Verify unique AC tags" },
    { label: "Diff local DB", sub: "Compute new unique solves" },
    { label: "Commit Updates", sub: "Increment user metrics" }
  ],
  vjudge: [
    { label: "VJ Profile Target", sub: "Vjudge handle tracking" },
    { label: "Guzzle Request", sub: "Initiate curl request" },
    { label: "HTML DOM scan", sub: "Process raw HTML nodes" },
    { label: "Extract Solves", sub: "Regex match solves count" },
    { label: "Compare Database", sub: "Diff with existing log" },
    { label: "Save Changes", sub: "Persist solves increment" }
  ],
  AtCoder: [
    { label: "AtCoder URL", sub: "Verify user handle link" },
    { label: "Scrape Standings", sub: "Target contest pages data" },
    { label: "Filter Username", sub: "Verify participant profile" },
    { label: "Extract Solves", sub: "Extract accepted scores" },
    { label: "Store Daily Deltas", sub: "Commit delta records row" },
    { label: "Warm Sorter Cache", sub: "Signal leaderboard compiler" }
  ],
  lightoj: [
    { label: "LightOJ endpoint", sub: "Verify LightOJ handles" },
    { label: "Fetch user XML", sub: "Call active user statistics" },
    { label: "Parse solve nodes", sub: "Parse XML solve count data" },
    { label: "Match local user", sub: "Link statistics to user" },
    { label: "Write mysql Row", sub: "Write daily solved record" },
    { label: "Warm Cache", sub: "Signal Redis ranking compiler" }
  ]
};

const MicroDiagram = ({ activeNode, theme, primaryColor }) => {
  const steps = microDiagramData[activeNode] || microDiagramData.bootcamp;

  return (
    <svg
      width="100%"
      viewBox="0 0 920 130"
      style={{ display: "block", maxWidth: "100%", height: "auto" }}
    >
      <defs>
        <marker id="microArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
        </marker>
      </defs>

      {/* Connection Lines */}
      {steps.map((_, idx) => {
        if (idx === steps.length - 1) return null;
        const x1 = 15 + idx * 150 + 120;
        const y1 = 65;
        const x2 = 15 + (idx + 1) * 150;
        const y2 = 65;
        return (
          <path
            key={idx}
            d={`M ${x1} ${y1} H ${x2}`}
            stroke={primaryColor}
            strokeWidth={2}
            fill="none"
            markerEnd="url(#microArrow)"
            style={{ transition: "all 0.3s ease" }}
          />
        );
      })}

      {/* Nodes */}
      {steps.map((step, idx) => {
        const x = 15 + idx * 150;
        const y = 40;
        const w = 120;
        const h = 50;
        const cx = x + 60;
        const cy = y + 25;

        const fillBg = theme.palette.mode === "light"
          ? "rgba(79,70,229,0.05)"
          : "rgba(129,140,248,0.1)";
        const strokeColor = primaryColor;
        const strokeWidth = 1.8;

        return (
          <g key={idx}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx={6}
              fill={fillBg}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              style={{ transition: "all 0.3s ease" }}
            />
            <text x={cx} y={cy - 2} textAnchor="middle" fontWeight="800" fill={theme.palette.text.primary} fontSize="9" fontFamily="Inter, sans-serif">
              {step.label}
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill={theme.palette.text.secondary} fontSize="7.5" fontFamily="Inter, sans-serif">
              {step.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const SystemDesignSection = ({
  theme,
  activeSystemNode,
  setActiveSystemNode,
  primaryColor
}) => {
  const [activeMobileFlow, setActiveMobileFlow] = useState("onboarding");
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
    if (activeSystemNode === "crawler" || activeSystemNode === "dashboard") {
      setActiveMobileFlow("crawling");
    } else {
      setActiveMobileFlow("onboarding");
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
      <SectionHeading theme={theme}>System Design & Architecture</SectionHeading>

      {/* ── PART 1: Macro System Design ── */}
      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, letterSpacing: "0.5px", color: "text.primary", display: "flex", alignItems: "center", gap: 1 }}>
        <LayersIcon sx={{ fontSize: 18, color: "primary.main" }} />
        Macro System Design
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
        An overview of the serverless scraping backend, database schema, and student portals powering the bootcamp tracker.
        Click any node below to highlight its path in the macro design.
      </Typography>

      <DiagramBoard sx={{ mb: 2 }}>
        {/* Macro Flowchart (Desktop View) */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <svg
            width="100%"
            viewBox="0 0 920 240"
            style={{ display: "block", maxWidth: "100%", height: "auto" }}
          >
            <defs>
              <marker id="macroArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
              </marker>
              <marker id="macroArrowMuted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"} />
              </marker>
              <filter id="macroGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection Lines */}
            {[
              { from: "bootcamp", to: "api", path: "M 155 65 H 220" },
              { from: "api", to: "database", path: "M 340 65 H 405" },
              { from: "database", to: "aggregator", path: "M 515 65 H 590" },
              { from: "aggregator", to: "dashboard", path: "M 710 65 H 775" },

              { from: "crawler", to: "api", path: "M 280 170 V 90" },
              { from: "crawler", to: "database", path: "M 280 170 V 125 H 460 V 90" },
              { from: "crawler", to: "codeforces", path: "M 340 195 H 405" },
              { from: "crawler", to: "vjudge", path: "M 340 195 H 530" },
              { from: "crawler", to: "AtCoder", path: "M 340 195 H 655" },
              { from: "crawler", to: "lightoj", path: "M 340 195 H 780" }
            ].map((line, lIdx) => {
              const isActive = activeSystemNode === line.from || activeSystemNode === line.to;
              const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
              const strokeWidth = isActive ? 2.5 : 1.5;
              const marker = isActive ? "url(#macroArrow)" : "url(#macroArrowMuted)";
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
              { key: "bootcamp", type: "process", x: 35, y: 40, w: 120, h: 50, rx: 8, cx: 95, cy: 65, label: "Bootcamp UI", sub: "Participant CRUD" },
              { key: "api", type: "process", x: 220, y: 40, w: 120, h: 50, rx: 8, cx: 280, cy: 65, label: "Laravel Backend", sub: "REST endpoints" },
              { key: "database", type: "cylinder", x: 405, y: 25, w: 110, h: 65, cx: 460, cy: 62, label: "Relational DB", sub: "MySQL Storage" },
              { key: "aggregator", type: "process", x: 590, y: 40, w: 120, h: 50, rx: 8, cx: 650, cy: 65, label: "Leaderboard Engine", sub: "Rank Compiler" },
              { key: "dashboard", type: "process", x: 775, y: 40, w: 110, h: 50, rx: 8, cx: 830, cy: 65, label: "Dashboard Portal", sub: "Solve Analytics" },

              { key: "crawler", type: "process", x: 220, y: 170, w: 120, h: 50, rx: 8, cx: 280, cy: 195, label: "Scraper Daemon", sub: "Curl Scheduled Cron" },
              { key: "codeforces", type: "process", x: 405, y: 170, w: 100, h: 50, rx: 8, cx: 455, cy: 195, label: "Codeforces OJ", sub: "User Solves API" },
              { key: "vjudge", type: "process", x: 530, y: 170, w: 100, h: 50, rx: 8, cx: 580, cy: 195, label: "Vjudge Scraper", sub: "HTML Scraping" },
              { key: "AtCoder", type: "process", x: 655, y: 170, w: 100, h: 50, rx: 8, cx: 705, cy: 195, label: "AtCoder Scraper", sub: "Web Parser" },
              { key: "lightoj", type: "process", x: 780, y: 170, w: 100, h: 50, rx: 8, cx: 830, cy: 195, label: "LightOJ Scraper", sub: "User API Parser" }
            ].map((node, nIdx) => {
              const isActive = activeSystemNode === node.key;
              const fillBg = isActive
                ? (theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.12)")
                : (theme.palette.mode === "light" ? "rgba(255,255,255,0.85)" : "rgba(17,24,39,0.8)");
              const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
              const strokeWidth = isActive ? 2.5 : 1.2;
              const glowFilter = isActive ? "url(#macroGlow)" : undefined;

              return (
                <g key={nIdx} style={{ cursor: "pointer" }} onClick={() => setActiveSystemNode(node.key)}>
                  {node.type === "process" && (
                    <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={node.rx} fill={fillBg} stroke={strokeColor} strokeWidth={strokeWidth} filter={glowFilter} />
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
                  <text x={node.cx} y={node.cy - 2} textAnchor="middle" fontWeight="800" fill={theme.palette.text.primary} fontSize="10" fontFamily="Inter, sans-serif">
                    {node.label}
                  </text>
                  <text x={node.cx} y={node.cy + 11} textAnchor="middle" fill={theme.palette.text.secondary} fontSize="8.5" fontFamily="Inter, sans-serif">
                    {node.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </Box>

        {/* Mobile View Macro */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Box
            sx={{
              display: "flex",
              borderRadius: 2,
              p: 0.5,
              mb: 3,
              gap: 0.5,
              backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
              flexWrap: "wrap",
            }}
          >
            {[
              { key: "onboarding", label: "User Onboarding" },
              { key: "crawling", label: "Crawler Ingestion" }
            ].map((flow) => {
              const isActive = activeMobileFlow === flow.key;
              return (
                <Button
                  key={flow.key}
                  fullWidth
                  onClick={() => setActiveMobileFlow(flow.key)}
                  size="small"
                  sx={{
                    flex: 1,
                    minWidth: "120px",
                    textTransform: "none",
                    fontWeight: isActive ? 800 : 600,
                    fontSize: "0.75rem",
                    borderRadius: 1.5,
                    py: 0.8,
                    backgroundColor: isActive ? (theme.palette.mode === "light" ? "#FFF" : "rgba(255,255,255,0.08)") : "transparent",
                    color: isActive ? "primary.main" : "text.secondary",
                  }}
                >
                  {flow.label}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pl: 1, pr: 1 }}>
            {(activeMobileFlow === "onboarding" ? onboardingSteps : crawlingSteps).map((step, idx, arr) => {
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
                        borderRadius: "55%",
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

      <Divider sx={{ opacity: 0.08, my: 2.5 }} />

      {/* ── PART 2: Micro System Design (Node Detail) ── */}
      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, letterSpacing: "0.5px", color: "text.primary", display: "flex", alignItems: "center", gap: 1 }}>
        <CloudIcon sx={{ fontSize: 18, color: "primary.main" }} />
        Micro Design Representation
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
        Detailed flowchart pipeline representing the selected node: <strong>{systemNodes[activeSystemNode].title.split(" (")[0]}</strong>.
      </Typography>

      {/* Selector Dropdown to switch micro views */}
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
          Selected Micro Design: {systemNodes[activeSystemNode].title.split(" (")[0]}
        </Button>
        <Menu
          id="node-select-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock
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
                PIPELINE ROLE
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ fontStyle: "italic", fontWeight: 500, lineHeight: 1.6 }}>
                "{systemNodes[activeSystemNode].role}"
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </GlassCard>

      {/* Dynamic Micro SVG Board */}
      <DiagramBoard sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ overflowX: "auto", width: "100%", "&::-webkit-scrollbar": { height: 6 } }}>
          <Box sx={{ minWidth: 900 }}>
            <MicroDiagram activeNode={activeSystemNode} theme={theme} primaryColor={primaryColor} />
          </Box>
        </Box>
      </DiagramBoard>
    </Box>
  );
};

export default SystemDesignSection;
