import React, { useState } from "react";
import { Box, Typography, Button, Paper, Chip, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";
import {
  Search as SearchIcon,
  Cached as CacheIcon,
  Storage as DbIcon,
  Calculate as MathIcon,
  Timeline as FlowIcon,
  BarChart as AnalyticsIcon
} from "@mui/icons-material";

const stepsInfo = {
  normalization: {
    title: "1. URL Normalization & Keyword Mapping",
    desc: "Decodes URI components and replaces hyphens with spaces (e.g., 'american-football' -> 'american football'). It also aligns aliases dynamically, mapping search terms like 'football' to 'Soccer' to match the canonical database structure.",
    code: `const normalizeParam = (param) => {
  if (!param) return param;
  const decoded = decodeURIComponent(param);
  return decoded.replace(/-/g, ' ');
};
// Map "football" -> "Soccer" for sport searches
if (sport === "football") sport = "Soccer";`
  },
  cache: {
    title: "2. Tiered Cache Verification",
    desc: "Intercepts incoming requests by compiling a unique hash key of all active query parameters. Checks localized node-cache (high-speed lookup) and Redis (database queries). Cache hits return in <5ms, skipping database queries.",
    code: `const cacheKey = cacheService.generateKey("events", ctx.query);
if (cacheService.has(cacheKey)) {
  return ctx.body = cacheService.get(cacheKey);
}`
  },
  query: {
    title: "3. Dynamic PostgreSQL Query Builder",
    desc: "Translates parameters into optimized SQL constraints. Team parameters query home and away teams concurrently using OR conditions. Date boundaries query range limits ($gte and $lte) if a date range is provided.",
    code: `const filters = {};
if (idTeam) {
  filters.$or = [{ idHomeTeam: idTeam }, { idAwayTeam: idTeam }];
}
if (dateFrom || dateTo) {
  filters.dateEvent = {
    ...(dateFrom && { $gte: dateFrom }),
    ...(dateTo && { $lte: dateTo })
  };
}`
  },
  scoring: {
    title: "4. Relevance Ranking & Match Prioritization",
    desc: "Postgres matches are sorted by a team matching quality algorithm. Exact matches score 100, prefix matches score 75, word boundary matches score 50, and partial matches score 25. Exact matches (e.g. Barcelona) appear before partials (e.g. Barcelona B).",
    code: `const calculateRelevance = (event, search) => {
  const home = event.strHomeTeam.toLowerCase();
  const away = event.strAwayTeam.toLowerCase();
  const q = search.toLowerCase();
  
  if (home === q || away === q) return 100; // Exact
  if (home.startsWith(q) || away.startsWith(q)) return 75; // Prefix
  if (new RegExp(\`\\\\b\${q}\\\\b\`).test(home)) return 50; // Word Boundary
  return home.includes(q) || away.includes(q) ? 25 : 0; // Partial
};`
  },
  tracking: {
    title: "5. Non-Blocking Async Search Tracking",
    desc: "On cache misses, query logs (including user IDs, user-agents, IP addresses, and result counts) are passed asynchronously to the Search Tracking & Trending analytics engine. This fire-and-forget task runs in the background to prevent blocking response times.",
    code: `// Fire-and-forget tracking log execution
this.trackSearchQuery(searchData, results.length, ctx)
  .catch(err => strapi.log.error(err));`
  }
};

const sandboxQueries = ["Arsenal", "Madrid", "United"];
const sandboxTeams = [
  { name: "Arsenal FC", type: "Starts With (Prefix)", expectedScore: 75 },
  { name: "FC Arsenal Tula", type: "Word Boundary Match", expectedScore: 50 },
  { name: "Arsenal", type: "Exact Match", expectedScore: 100 },
  { name: "Chelsea FC", type: "No Match", expectedScore: 0 },
  { name: "RedStarArsenal", type: "Partial Inclusion", expectedScore: 25 },
  { name: "Real Madrid", type: "Word Boundary Match", expectedScore: 50 },
  { name: "Madrid Atletico", type: "Starts With (Prefix)", expectedScore: 75 },
  { name: "Real Madrid B", type: "Word Boundary Match", expectedScore: 50 },
  { name: "Manchester United", type: "Word Boundary Match", expectedScore: 50 },
  { name: "United City", type: "Starts With (Prefix)", expectedScore: 75 },
];

const SearchFilterSection = ({ theme }) => {
  const [activeStep, setActiveStep] = useState("normalization");
  const [sandboxQuery, setSandboxQuery] = useState("Arsenal");
  
  const primaryColor = theme.palette.mode === "light" ? "#4F46E5" : "#818CF8";
  const stepData = stepsInfo[activeStep];

  // Calculate scores dynamically for sandbox teams
  const calculateSandboxScore = (teamName, query) => {
    const q = query.toLowerCase().trim();
    const team = teamName.toLowerCase().trim();
    if (!q) return 0;
    if (team === q) return 100;
    if (team.startsWith(q)) return 75;
    try {
      const regex = new RegExp(`\\b${q}\\b`, 'i');
      if (regex.test(team)) return 50;
    } catch(e) {}
    if (team.includes(q)) return 25;
    return 0;
  };

  const scoredTeams = sandboxTeams
    .map(t => ({
      ...t,
      score: calculateSandboxScore(t.name, sandboxQuery)
    }))
    .filter(t => t.score > 0 || t.name === "Chelsea FC") // Filter out irrelevant ones for clean sandbox feel
    .sort((a, b) => b.score - a.score);

  return (
    <Box id="search-engine" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>Event Ingestion & Advanced Filtering</SectionHeading>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 800, lineHeight: 1.7 }}>
        Sudipta engineered a custom search and filtering pipeline for the core `event` endpoint.
        It features automated URI normalization, a tiered cache checker, and a search query matching score algorithm.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Left Side: Steps Visual Flow */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <DiagramBoard>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2.5, color: "text.primary" }}>
              Query Processing & Execution Pipeline
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { id: "normalization", icon: <FlowIcon />, label: "1. Normalization", desc: "Hyphen replacement, decode URI, 'football' -> 'Soccer'" },
                { id: "cache", icon: <CacheIcon />, label: "2. Tiered Caching", desc: "node-cache / Redis key check (Hit -> returns in <5ms)" },
                { id: "query", icon: <DbIcon />, label: "3. SQL Query Builder", desc: "Builds OR fields, date boundaries, status constraints" },
                { id: "scoring", icon: <MathIcon />, label: "4. Relevance Scoring", desc: "Prioritizes exact team matches (100 | 75 | 50 | 25)" },
                { id: "tracking", icon: <AnalyticsIcon />, label: "5. Search Tracker", desc: "Logs search parameters asynchronously for analytics" }
              ].map((step) => {
                const isActive = activeStep === step.id;
                return (
                  <Paper
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    variant="outlined"
                    sx={{
                      p: 2,
                      cursor: "pointer",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      backgroundColor: isActive
                        ? (theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.04)" : "rgba(129, 140, 248, 0.08)")
                        : "transparent",
                      borderColor: isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"),
                      borderWidth: isActive ? "2px" : "1px",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: primaryColor,
                        transform: "translateX(4px)"
                      }
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.2,
                        borderRadius: 1.5,
                        backgroundColor: isActive
                          ? primaryColor
                          : (theme.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.04)"),
                        color: isActive ? "#FFF" : "text.secondary",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "text.primary" }}>
                        {step.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {step.desc}
                      </Typography>
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          </DiagramBoard>
        </Grid>

        {/* Right Side: Step Explanation Code Details */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <GlassCard sx={{ p: 3.5, height: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, color: "primary.main" }}>
                {stepData.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 3 }}>
                {stepData.desc}
              </Typography>
            </Box>

            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", letterSpacing: "1px", display: "block", mb: 1 }}>
              Implementation Logic
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "rgba(15,23,42,0.6)",
                borderColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
                flexGrow: 1,
                fontFamily: "monospace",
                fontSize: "0.75rem",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                color: theme.palette.mode === "light" ? "#1E293B" : "#E2E8F0"
              }}
            >
              {stepData.code}
            </Paper>
          </GlassCard>
        </Grid>
      </Grid>

      {/* Interactive Relevance Sandbox Widget */}
      <GlassCard sx={{ p: 3.5 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5, display: "flex", alignItems: "center", gap: 1, color: "text.primary" }}>
            <SearchIcon color="primary" sx={{ fontSize: 20 }} />
            Search Relevance Score Sandbox
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Test how the relevance algorithm scores match quality. Select a query query below to see how candidate team names are scored and sorted.
          </Typography>
        </Box>

        {/* Query Selector Buttons */}
        <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
          {sandboxQueries.map((query) => (
            <Button
              key={query}
              onClick={() => setSandboxQuery(query)}
              variant={sandboxQuery === query ? "contained" : "outlined"}
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 1.5,
                px: 2.5
              }}
            >
              Search "{query}"
            </Button>
          ))}
        </Box>

        {/* Results List */}
        <Grid container spacing={2}>
          {scoredTeams.map((team, idx) => (
            <Grid key={idx} size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${team.score === 100 ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)")}`,
                  backgroundColor: theme.palette.mode === "light"
                    ? (team.score === 100 ? "rgba(79,70,229,0.02)" : "rgba(0,0,0,0.01)")
                    : (team.score === 100 ? "rgba(129,140,248,0.04)" : "rgba(255,255,255,0.01)"),
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary" }}>
                    {team.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {team.type}
                  </Typography>
                </Box>

                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Chip
                    label={`Score: ${team.score}`}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      borderRadius: 1,
                      backgroundColor: team.score >= 75
                        ? "rgba(16, 185, 129, 0.15)"
                        : team.score >= 25
                          ? "rgba(245, 158, 11, 0.15)"
                          : "rgba(239, 68, 68, 0.15)",
                      color: team.score >= 75
                        ? "#10b981"
                        : team.score >= 25
                          ? "#f59e0b"
                          : "#ef4444",
                    }}
                  />
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </GlassCard>
    </Box>
  );
};

export default SearchFilterSection;
