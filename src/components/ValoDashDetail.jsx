import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  Button,
  Grid,
  Divider,
  Paper,
  Dialog,
  IconButton,
} from "@mui/material";
import { styled, useTheme, keyframes } from "@mui/material/styles";
import {

  Language as LanguageIcon,
  Storage as StorageIcon,
  Timeline as TimelineIcon,
  Sync as SyncIcon,
  SportsEsports as SportsEsportsIcon,
  SettingsSuggest as SettingsSuggestIcon,
  Security as SecurityIcon,
  CheckCircleOutline as CheckCircleIcon,
  AltRoute as AltRouteIcon,
  Leaderboard as LeaderboardIcon,
  Analytics as AnalyticsIcon,
  History as HistoryIcon,
  TrendingUp as TrendingUpIcon,
  Api as ApiIcon,
  EmojiEvents as EmojiEventsIcon,
  Speed as SpeedIcon,
  DataObject as DataObjectIcon,
  Hub as HubIcon,
  Schedule as ScheduleIcon,
  Close as CloseIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";


/* ──────────────────────────────────────────────
   Animations
   ────────────────────────────────────────────── */

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1; }
`;

const dashFlow = keyframes`
  to { stroke-dashoffset: -20; }
`;

/* ──────────────────────────────────────────────
   Styled Components
   ────────────────────────────────────────────── */

const GlassCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.55)"
      : "rgba(30, 41, 59, 0.5)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: `1px solid ${theme.palette.mode === "light"
    ? "rgba(0, 0, 0, 0.06)"
    : "rgba(255, 255, 255, 0.08)"
    }`,
  boxShadow:
    theme.palette.mode === "light"
      ? "0 4px 24px rgba(0, 0, 0, 0.06)"
      : "0 4px 24px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "@media (hover: hover)": {
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow:
        theme.palette.mode === "light"
          ? "0 12px 32px rgba(79, 70, 229, 0.15)"
          : "0 12px 32px rgba(129, 140, 248, 0.15)",
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StatCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.5)"
      : "rgba(30, 41, 59, 0.4)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: `1px solid ${theme.palette.mode === "light"
    ? "rgba(79, 70, 229, 0.1)"
    : "rgba(129, 140, 248, 0.1)"
    }`,
  textAlign: "center",
  transition: "all 0.3s ease",
  "@media (hover: hover)": {
    "&:hover": {
      transform: "translateY(-2px)",
      borderColor: theme.palette.primary.main,
    },
  },
}));

const TocLink = styled(Button)(({ theme, active }) => ({
  justifyContent: "flex-start",
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1),
  textTransform: "none",
  fontWeight: active ? 700 : 500,
  fontSize: "0.875rem",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  borderLeft: `3px solid ${active ? theme.palette.primary.main : "transparent"
    }`,
  backgroundColor: active
    ? theme.palette.mode === "light"
      ? "rgba(79, 70, 229, 0.08)"
      : "rgba(129, 140, 248, 0.1)"
    : "transparent",
  transition: "all 0.2s ease",
  minWidth: "unset",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(79, 70, 229, 0.05)"
        : "rgba(129, 140, 248, 0.06)",
    transform: "none",
    boxShadow: "none",
  },
}));

const MobileTocChip = styled(Chip)(({ theme, active }) => ({
  fontWeight: active ? 700 : 500,
  cursor: "pointer",
  backgroundColor: active
    ? theme.palette.primary.main
    : theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.6)"
      : "rgba(30, 41, 59, 0.6)",
  color: active ? "#FFF" : theme.palette.text.secondary,
  border: `1px solid ${active
    ? "transparent"
    : theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.08)"
      : "rgba(255, 255, 255, 0.08)"
    }`,
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: active
      ? theme.palette.primary.main
      : theme.palette.mode === "light"
        ? "rgba(79, 70, 229, 0.08)"
        : "rgba(129, 140, 248, 0.1)",
  },
}));

const SidebarItem = styled(Button)(({ theme, active }) => ({
  justifyContent: "flex-start",
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.spacing(1),
  textTransform: "none",
  fontWeight: active ? 700 : 500,
  fontSize: "0.85rem",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active
    ? theme.palette.mode === "light"
      ? "rgba(79, 70, 229, 0.06)"
      : "rgba(129, 140, 248, 0.08)"
    : "transparent",
  borderLeft: `3px solid ${active ? theme.palette.primary.main : "transparent"
    }`,
  transition: "all 0.15s ease",
  minWidth: "unset",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(79, 70, 229, 0.04)"
        : "rgba(129, 140, 248, 0.05)",
    transform: "none",
    boxShadow: "none",
  },
}));

const MethodBadge = styled(Box)(({ method }) => {
  const colors = {
    GET: { bg: "rgba(16, 185, 129, 0.15)", color: "#10b981" },
    POST: { bg: "rgba(59, 130, 246, 0.15)", color: "#3b82f6" },
    PUT: { bg: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" },
    DELETE: { bg: "rgba(239, 68, 68, 0.15)", color: "#ef4444" },
  };
  const c = colors[method] || colors.GET;
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 10px",
    borderRadius: 6,
    fontSize: "0.7rem",
    fontWeight: 800,
    fontFamily: "monospace",
    letterSpacing: "0.5px",
    backgroundColor: c.bg,
    color: c.color,
    minWidth: 52,
  };
});

const DiagramBoard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  background:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.35)"
      : "rgba(15, 23, 42, 0.25)",
  backgroundImage:
    theme.palette.mode === "light"
      ? "radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px)"
      : "radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
  border: `1px solid ${theme.palette.mode === "light"
    ? "rgba(0, 0, 0, 0.06)"
    : "rgba(255, 255, 255, 0.06)"
    }`,
  padding: theme.spacing(3),
  boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.04)",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    overflowX: "auto",
  },
}));

/* ──────────────────────────────────────────────
   Section Heading Helper
   ────────────────────────────────────────────── */
const SectionHeading = ({ children, theme }) => (
  <Box sx={{ borderLeft: `4px solid ${theme.palette.primary.main}`, pl: 2.5, mb: 3 }}>
    <Typography variant="h4" sx={{ fontWeight: 900, fontSize: { xs: "1.6rem", sm: "2rem" } }}>
      {children}
    </Typography>
  </Box>
);

// useCountUp hook deleted since animated counters were removed

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */
const ValoDashDetail = () => {
  const theme = useTheme();

  // ToC sections config
  const tocSections = [
    { id: "overview", label: "Overview" },
    { id: "architecture", label: "System Design" },
    { id: "workflows", label: "Project Workflows" },
    { id: "database", label: "Database Schema" },
    { id: "features", label: "Key Features" },
    { id: "snapshots", label: "Snapshots" },
  ];

  const [activeSection, setActiveSection] = useState("overview");
  const [activeSystemNode, setActiveSystemNode] = useState("api");
  const [activeTable, setActiveTable] = useState("User");
  const [activeWorkflow, setActiveWorkflow] = useState("auth");

  // Lightbox and Snapshots Config
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const snapshotsList = [
    { type: "desktop", src: "/screenshots/projects/valodash/1.webp", title: "Landing Page" },
    { type: "desktop", src: "/screenshots/projects/valodash/2.webp", title: "Customizable Dashboard" },
    { type: "desktop", src: "/screenshots/projects/valodash/3.webp", title: "Historical Data Visualization" },
    { type: "desktop", src: "/screenshots/projects/valodash/4.webp", title: "Profile Customization" },
    { type: "mobile", src: "/screenshots/projects/valodash/5.webp", title: "Mobile Home" },
    { type: "mobile", src: "/screenshots/projects/valodash/6.webp", title: "Dashboard" },
    { type: "mobile", src: "/screenshots/projects/valodash/7.webp", title: "Profile" },
    { type: "mobile", src: "/screenshots/projects/valodash/8.webp", title: "Settings" },
    { type: "mobile", src: "/screenshots/projects/valodash/9.webp", title: "Featured" },
  ];



  /* ── Scrollspy ── */
  useEffect(() => {
    const ids = tocSections.map((s) => s.id);
    const intersectingSections = new Set();

    const cb = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingSections.add(entry.target.id);
        } else {
          intersectingSections.delete(entry.target.id);
        }
      });

      const active = tocSections.find((s) => intersectingSections.has(s.id));
      if (active) {
        setActiveSection(active.id);
      }
    };

    const observer = new IntersectionObserver(cb, {
      root: null,
      rootMargin: "-110px 0px -30% 0px",
      threshold: 0,
    });
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, []);

  /* ── Data ── */


  const features = [
    { icon: <LeaderboardIcon />, title: "Team Leaderboards", desc: "Dynamic roster rankings computed from aggregated player performance across custom team structures." },
    { icon: <AnalyticsIcon />, title: "Player Analytics", desc: "Per-player KDA, headshot %, win rate, and agent-specific performance breakdowns with trend lines." },
    { icon: <HistoryIcon />, title: "Match History", desc: "Detailed round-by-round match breakdowns with map data, score timelines, and agent selections." },
    { icon: <TrendingUpIcon />, title: "Rank Tracking", desc: "Historical MMR progression charts showing rank fluctuations across competitive seasons." },
    { icon: <SecurityIcon />, title: "Discord Login", desc: "OAuth2-based authentication flow linking Discord profiles directly to Valorant game tags." },
    { icon: <SyncIcon />, title: "Auto Sync", desc: "Scheduled cron workers pull match data hourly from Riot APIs without impacting frontend responsiveness." },
  ];

  const systemNodes = {
    client: {
      title: "Client Frontend (React / Next.js)",
      icon: <TimelineIcon />,
      description: "Responsive browser dashboard built with React and custom Vanilla CSS. Renders Valorant profiles, historical match analytics, dynamic leaderboards, and custom player stats tracking.",
      role: "Sends HTTP REST requests to the Backend, handles Discord login callbacks, and visualizes analytical insights.",
    },
    api: {
      title: "Backend API (Express.js / TypeScript)",
      icon: <SettingsSuggestIcon />,
      description: "Express.js server structured in TypeScript. Validates request payloads with Zod schemas, manages authorization via JSON Web Tokens, and processes logging telemetry via Winston.",
      role: "Core application router coordinating Postgres client requests, scheduled background triggers, and user authentication mapping.",
    },
    postgres: {
      title: "PostgreSQL Database",
      icon: <StorageIcon />,
      description: "Relational database caching historical telemetry, user session metadata, Valorant player stats snapshots, and sync execution logs.",
      role: "Persistent store structured with relational constraint checks, mapped and queried via Prisma ORM.",
    },
    discord: {
      title: "Discord OAuth Integration",
      icon: <SecurityIcon />,
      description: "Integrates Discord OAuth for secure profile creation. Associates the logged-in Discord profile directly with their Valorant game tags.",
      role: "Resolves Discord avatar and account email, returning authorized secure user tokens.",
    },
    riot: {
      title: "Riot Games API",
      icon: <SportsEsportsIcon />,
      description: "External Valorant API queried to look up in-game account identifiers (PUUID), rank MMR standings, game versions, maps, and detailed round stats.",
      role: "Source of real-time game telemetry, fetched in batches to minimize latency and manage rate limits.",
    },
    sync: {
      title: "Sync Service (Scheduled Cron Jobs)",
      icon: <SyncIcon />,
      description: "Automated background process running on Node schedules. Cycles through tracked players, retrieves new matches, and upserts player statistics.",
      role: "Performs scheduled automated updates via GitHub Actions trigger webhooks to maintain database sync without throttling the client-facing APIs.",
    },
  };

  const schemaTables = {
    User: {
      description: "Core credentials and user profile info registered via Discord OAuth.",
      fields: [
        { name: "id", type: "String (UUID)", isKey: "PK" },
        { name: "email", type: "String", isKey: "Unique" },
        { name: "passwordHash", type: "String?" },
        { name: "name", type: "String" },
        { name: "role", type: "UserRole (Enum)" },
        { name: "discordId", type: "String?", isKey: "Unique" },
        { name: "discordTag", type: "String?" },
        { name: "avatar", type: "String?" },
        { name: "playerId", type: "String?", isKey: "FK" },
      ],
      relations: ["Player", "Team", "ManualSyncLog"],
    },
    Team: {
      description: "Custom groups defined by users to perform team-wide stats aggregation.",
      fields: [
        { name: "id", type: "String (UUID)", isKey: "PK" },
        { name: "name", type: "String" },
        { name: "slogan", type: "String?" },
        { name: "creatorId", type: "String", isKey: "FK" },
        { name: "isFeatured", type: "Boolean" },
      ],
      relations: ["User", "TeamPlayer", "PinnedTeam"],
    },
    Player: {
      description: "Valorant account details representing tracked profiles.",
      fields: [
        { name: "id", type: "String (UUID)", isKey: "PK" },
        { name: "puuid", type: "String", isKey: "Unique" },
        { name: "name", type: "String" },
        { name: "tag", type: "String" },
        { name: "region", type: "String" },
        { name: "accountLevel", type: "Int" },
        { name: "card", type: "String" },
        { name: "title", type: "String" },
      ],
      relations: ["TeamPlayer", "PlayerMatchStats", "RankHistory", "User"],
    },
    TeamPlayer: {
      description: "Junction table mapping players to teams with join timestamps.",
      fields: [
        { name: "teamId", type: "String", isKey: "PK/FK" },
        { name: "playerId", type: "String", isKey: "PK/FK" },
        { name: "joinedAt", type: "DateTime" },
        { name: "previousRank", type: "Int?" },
      ],
      relations: ["Team", "Player"],
    },
    Match: {
      description: "Official Valorant game match records collected from APIs.",
      fields: [
        { name: "id", type: "String (UUID)", isKey: "PK" },
        { name: "matchId", type: "String", isKey: "Unique" },
        { name: "mapId", type: "String" },
        { name: "mapName", type: "String" },
        { name: "gameVersion", type: "String" },
        { name: "gameLengthInMs", type: "Int" },
        { name: "startedAt", type: "DateTime" },
        { name: "region", type: "String" },
        { name: "cluster", type: "String" },
        { name: "mode", type: "String" },
        { name: "teamRedWon", type: "Boolean" },
        { name: "teamBlueWon", type: "Boolean" },
        { name: "teamRedScore", type: "Int" },
        { name: "teamBlueScore", type: "Int" },
      ],
      relations: ["PlayerMatchStats"],
    },
    PlayerMatchStats: {
      description: "Detailed performance statistics recorded for a specific player during a match.",
      fields: [
        { name: "id", type: "String (UUID)", isKey: "PK" },
        { name: "playerId", type: "String", isKey: "FK" },
        { name: "matchId", type: "String", isKey: "FK" },
        { name: "teamColor", type: "String" },
        { name: "agentId", type: "String" },
        { name: "agentName", type: "String" },
        { name: "score", type: "Int" },
        { name: "kills", type: "Int" },
        { name: "deaths", type: "Int" },
        { name: "assists", type: "Int" },
        { name: "headshots", type: "Int" },
        { name: "bodyshots", type: "Int" },
        { name: "legshots", type: "Int" },
        { name: "damageDealt", type: "Int" },
        { name: "damageReceived", type: "Int" },
        { name: "tierId", type: "Int" },
        { name: "tierName", type: "String" },
        { name: "accountLevel", type: "Int" },
      ],
      relations: ["Player", "Match"],
    },
    RankHistory: {
      description: "Historical rank MMR ratings tracked over time.",
      fields: [
        { name: "id", type: "String (UUID)", isKey: "PK" },
        { name: "playerId", type: "String", isKey: "FK" },
        { name: "tierId", type: "Int" },
        { name: "tierName", type: "String" },
        { name: "recordedAt", type: "DateTime" },
      ],
      relations: ["Player"],
    },
    ManualSyncLog: {
      description: "Logs manual cache sync requests triggered by users.",
      fields: [
        { name: "id", type: "String (UUID)", isKey: "PK" },
        { name: "userId", type: "String", isKey: "FK" },
        { name: "createdAt", type: "DateTime" },
      ],
      relations: ["User"],
    },
    SyncMetadata: {
      description: "General execution log recording automated cron schedule statuses.",
      fields: [
        { name: "id", type: "String (UUID)", isKey: "PK" },
        { name: "key", type: "String", isKey: "Unique" },
        { name: "lastSyncedAt", type: "DateTime" },
        { name: "nextSyncAt", type: "DateTime" },
      ],
      relations: [],
    },
  };

  const workflows = {
    auth: {
      title: "User Authentication Flow",
      icon: <SecurityIcon />,
      description: "Secures client sessions and maps Discord users to game metrics.",
      steps: [
        { label: "OAuth Redirect", text: "The user clicks 'Sign in with Discord' on the client, redirecting them to Discord's official OAuth authorization page." },
        { label: "Callback Exchange", text: "Upon user consent, Discord redirects back to the frontend SPA callback with an authorization code. The client sends this code to the backend server." },
        { label: "Token Handshake", text: "The backend exchanges the auth code with Discord APIs for an access token to retrieve the user's username, avatar, and unique Discord ID." },
        { label: "Session Issue", text: "The backend maps the Discord ID to a local User model in PostgreSQL. It then generates a secure JWT token containing the user profile." },
        { label: "Context Storage", text: "The frontend SPA stores the JWT token in LocalStorage and updates the global AuthContext, granting access to private team management panels." }
      ]
    },
    enrollment: {
      title: "Player Enrollment Workflow",
      icon: <SportsEsportsIcon />,
      description: "Registers and isolates competitive player identities across rosters.",
      steps: [
        { label: "IGN & Tagline Entry", text: "A user submits a Valorant account query formatted as 'IGN#TAG' within the Team Management console." },
        { label: "Riot Handshake", text: "The server queries the Riot Games API to fetch player account metadata, extracting their unique PUUID, region, title, card UUID, and account level." },
        { label: "Roster Bounds Check", text: "The server checks database constraints: enforces a maximum roster size of 10 players, and limits standard users to a maximum of 2 teams." },
        { label: "Relational Mapping", text: "If the player PUUID is new globally, a Player entry is created. A TeamPlayer junction record is created mapping the player to the team." },
        { label: "Async Queue", text: "The server initiates an asynchronous match synchronization job in the background and returns a 201 Success code to the client immediately." }
      ]
    },
    sync: {
      title: "Match Sync Engine",
      icon: <SyncIcon />,
      description: "Ingests real-time game logs while operating safely within third-party rate limits.",
      steps: [
        { label: "Cron Trigger", text: "A GitHub Actions runner executes a Cron job every 12 hours, sending a POST request containing a SHARED_SECRET header to our webhook sync route." },
        { label: "Staggered Query", text: "The server loops through all registered players globally, executing requests staggered with a 2000ms delay to avoid Riot Games API rate limit lockouts." },
        { label: "Match Parse", text: "For each player, the server pulls recent competitive games. It verifies if the match is new; if so, it calculates game length, map details, and team scores." },
        { label: "Stats Ingestion", text: "The server iterates through match participants, identifies PUUIDs present in our database, computes combat metrics (K/D, ACS, headshot %), and records PlayerMatchStats." },
        { label: "Rank Tracking", text: "The player's competitive tier is checked against their last record; any rank updates (promotions/demotions) are written to the RankHistory timeline." }
      ]
    }
  };

  const activeTableData = schemaTables[activeTable];
  const primaryColor = theme.palette.mode === "light" ? "#4F46E5" : "#818CF8";
  const secondaryColor = theme.palette.mode === "light" ? "#06B6D4" : "#22D3EE";

  /* ════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════ */
  return (
    <Box
      sx={{
        pt: { xs: 10, sm: 12 },
        pb: 0,
        minHeight: "100vh",
        textAlign: "left",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 5 } }}>



        {/* ── Mobile ToC ── */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            position: "sticky",
            top: 70,
            zIndex: 10,
            overflowX: "auto",
            gap: 1,
            pb: 1.5,
            mb: 3,
            px: 0.5,
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {tocSections.map((s) => (
            <MobileTocChip
              key={s.id}
              label={s.label}
              active={activeSection === s.id ? 1 : 0}
              onClick={() => scrollTo(s.id)}
              size="small"
            />
          ))}
        </Box>

        {/* ── Two-Column Layout: Sidebar + Content ── */}
        <Box sx={{ display: "flex", gap: { md: 5, lg: 6 } }}>

          {/* Left ToC Sidebar */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              width: 200,
              minWidth: 200,
              position: "sticky",
              top: 120,
              alignSelf: "flex-start",
              height: "fit-content",
              gap: 0.5,
              pt: 1.2,
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontWeight: 800, color: "text.secondary", letterSpacing: "1.5px", textTransform: "uppercase", pl: 2, mb: 1 }}
            >
              Contents
            </Typography>
            {tocSections.map((s) => (
              <TocLink key={s.id} active={activeSection === s.id ? 1 : 0} onClick={() => scrollTo(s.id)}>
                {s.label}
              </TocLink>
            ))}
          </Box>

          {/* Right Content */}
          <Box sx={{ flex: 1, minWidth: 0, pt: 4 }}>

            {/* ════ Section 1: Overview ════ */}
            <Box id="overview" sx={{ scrollMarginTop: 120, mb: 4 }}>
              <SectionHeading theme={theme}>Overview</SectionHeading>

              <Grid container spacing={3}>
                {/* Valodash Project Intro Card */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 3 }}>
                        <Box
                          component="img"
                          src="/project_logos/valodash_logo.svg"
                          alt="ValoDash Logo"
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: "14px",
                            p: 1.2,
                            background: theme.palette.mode === "light" ? "rgba(255,255,255,0.7)" : "rgba(30,41,59,0.4)",
                            border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
                            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                            objectFit: "contain",
                          }}
                        />
                        <Box>
                          <Typography
                            variant="h4"
                            sx={{
                              fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              letterSpacing: "3px",
                              lineHeight: 1.1,
                              mb: 0.5,
                              color: theme.palette.mode === "light" ? "#0F1923" : "#ECE8E1",
                            }}
                          >
                            Valo
                            <Box component="span" sx={{ color: "#ff4655" }}>
                              Dash
                            </Box>
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                            Valorant Match Analytics
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 3 }}>
                        A high-performance browser dashboard and scheduler framework built to aggregate custom match histories,
                        track leaderboard standings, and monitor competitive player progression. Designed as an analytics suite
                        for custom Valorant lobbies, it bypass-caches third-party APIs to deliver near-zero latency telemetry
                        under tight token rate limits.
                      </Typography>
                    </Box>

                    {/* Metadata Badges / Live Link */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2, pt: 2, borderTop: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}` }}>
                      <Stack direction="row" spacing={2} sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>stagger</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800 }}>2000ms</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>sync rate</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800 }}>12 Hours</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>db models</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800 }}>8 Tables</Typography>
                        </Box>
                      </Stack>
                      <Button
                        href="https://valo-dash.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        size="small"
                        startIcon={<LanguageIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          height: 34,
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          borderRadius: 1.5,
                          px: 2,
                          boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)",
                          background: "linear-gradient(135deg, #4F46E5, #06B6D4)",
                          "&:hover": { background: "linear-gradient(135deg, #4338CA, #0891B2)" },
                        }}
                      >
                        Launch App
                      </Button>
                    </Box>
                  </GlassCard>
                </Grid>

                {/* Tech Stack Card */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%" }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                      <SettingsSuggestIcon color="primary" fontSize="small" />
                      Technology Stack
                    </Typography>

                    <Grid container spacing={2}>
                      {[
                        {
                          category: "Backend & Core",
                          items: ["Node.js", "TypeScript", "Express.js"],
                          color: "primary.main",
                          bgColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
                          borderColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.12)" : "rgba(129,140,248,0.15)",
                        },
                        {
                          category: "Database & ORM",
                          items: ["PostgreSQL", "Prisma ORM"],
                          color: "secondary.main",
                          bgColor: theme.palette.mode === "light" ? "rgba(6,182,212,0.06)" : "rgba(34,211,238,0.08)",
                          borderColor: theme.palette.mode === "light" ? "rgba(6,182,212,0.12)" : "rgba(34,211,238,0.15)",
                        },
                        {
                          category: "Integrations",
                          items: ["Riot Games API", "Discord OAuth"],
                          color: "warning.main",
                          bgColor: theme.palette.mode === "light" ? "rgba(245,158,11,0.06)" : "rgba(251,191,36,0.08)",
                          borderColor: theme.palette.mode === "light" ? "rgba(245,158,11,0.12)" : "rgba(251,191,36,0.15)",
                        },
                        {
                          category: "Operations & Dev",
                          items: ["Cron Jobs", "GitHub Actions", "Zod Validation"],
                          color: "success.main",
                          bgColor: theme.palette.mode === "light" ? "rgba(16,185,129,0.06)" : "rgba(52,211,153,0.08)",
                          borderColor: theme.palette.mode === "light" ? "rgba(16,185,129,0.12)" : "rgba(52,211,153,0.15)",
                        }
                      ].map((group, gIdx) => (
                        <Grid key={gIdx} size={{ xs: 12, sm: 6 }}>
                          <Box sx={{
                            p: 2,
                            height: "100%",
                            borderRadius: 2,
                            backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.01)" : "rgba(255,255,255,0.01)",
                            border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)"}`,
                          }}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: group.color, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", mb: 1.5 }}>
                              {group.category}
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={0.75}>
                              {group.items.map((tech, tIdx) => (
                                <Chip
                                  key={tIdx}
                                  label={tech}
                                  size="small"
                                  sx={{
                                    fontWeight: 700,
                                    fontSize: "0.72rem",
                                    borderRadius: 1.2,
                                    background: group.bgColor,
                                    color: group.color,
                                    border: `1px solid ${group.borderColor}`,
                                  }}
                                />
                              ))}
                            </Stack>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </GlassCard>
                </Grid>

                {/* The Challenge Card */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%" }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                      <SpeedIcon color="primary" fontSize="small" />
                      The Challenge
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      Valorant custom matchmaking is highly competitive, yet players lack
                      cohesive analysis tools to evaluate roster lineups, compute player
                      trends, or view history aggregated dynamically under custom team
                      structures. While official game histories exist, tracking comparative
                      statistics across teammates requires manual logging and spreadsheets.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>
                      From an engineering perspective, building this dashboard required
                      resolving strict third-party API rate limitations. Directly querying
                      stats for ten players on every page render would exhaust token limits
                      and trigger API lockouts. Keeping cache synchronization secure and
                      fast remained a primary bottleneck.
                    </Typography>
                  </GlassCard>
                </Grid>

                {/* The Solution Card */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%" }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckCircleIcon color="primary" fontSize="small" />
                      The Solution
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2.5 }}>
                      ValoDash resolves these issues with a scheduled asynchronous cache architecture:
                    </Typography>
                    <Stack spacing={2.5}>
                      {[
                        { title: "Asynchronous Cron Sync", desc: "Background workers pull match logs hourly from Riot Games API, processing telemetry without impacting frontend view times." },
                        { title: "PostgreSQL Cache Layer", desc: "A secure schema caches player standings, overall KDA, maps won, and rank fluctuations for sub-second queries." },
                        { title: "Discord Auth Binding", desc: "Users sign in with Discord and securely claim their Valorant profiles, linking stats instantly." },
                      ].map((item, i) => (
                        <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                          <CheckCircleIcon color="primary" sx={{ mt: 0.3, fontSize: 18 }} />
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, display: "block" }}>
                              {item.desc}
                            </Typography>
                          </Box>
                        </Stack>
                      ))}
                    </Stack>
                  </GlassCard>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            {/* ════ Section 3: System Design ════ */}
            <Box id="architecture" sx={{ scrollMarginTop: 120, mb: 4 }}>
              <SectionHeading theme={theme}>System Design</SectionHeading>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
                An overview of ValoDash's internal scheduling and request routing framework.
                Click any node to see its role in the sync pipeline.
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
                {Object.entries(systemNodes).map(([key, val]) => {
                  const isActive = activeSystemNode === key;
                  return (
                    <Button
                      key={key}
                      onClick={() => setActiveSystemNode(key)}
                      size="small"
                      sx={{
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
                      }}
                      startIcon={React.cloneElement(val.icon, { sx: { fontSize: 16 } })}
                    >
                      {val.title.split(" (")[0]}
                    </Button>
                  );
                })}
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
              {/* Redesigned Flowchart-style SVG Diagram */}
              <DiagramBoard sx={{ mt: 3 }}>
                <svg
                  width="100%"
                  viewBox="0 0 920 360"
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
                    { from: "client", to: "discord", path: "M 160 65 L 200 65" },
                    { from: "discord", to: "api", path: "M 320 65 L 380 65" },
                    { from: "api", to: "postgres", path: "M 500 65 L 560 65" },
                    { from: "postgres", to: "postgres", path: "M 690 65 L 750 115" },
                    { from: "api", to: "sync", path: "M 440 100 L 440 180 L 285 180 L 285 220" },
                    { from: "sync", to: "sync", path: "M 160 245 L 220 245" },
                    { from: "sync", to: "riot", path: "M 350 245 L 410 245" },
                    { from: "riot", to: "postgres", path: "M 540 245 L 630 245 L 630 140 L 750 140" },
                    { from: "postgres", to: "client", path: "M 810 150 L 810 270" },
                  ].map((line, lIdx) => {
                    const isActive = activeSystemNode === line.from || activeSystemNode === line.to;
                    const strokeColor = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
                    const strokeWidth = isActive ? 2.5 : 1.5;
                    const marker = isActive ? "url(#arrowHead)" : "url(#arrowHeadMuted)";
                    const dashStyle = line.from === "sync" || line.to === "sync" ? "5,3" : undefined;
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
                    { key: "client", type: "start", x: 40, y: 40, w: 120, h: 50, rx: 25, cx: 100, cy: 65, label: "User Request", sub: "Vite/Next.js Client" },
                    { key: "discord", type: "decision", d: "M 260 25 L 320 65 L 260 105 L 200 65 Z", cx: 260, cy: 65, label: "Auth?", sub: "Discord OAuth" },
                    { key: "api", type: "decision", d: "M 440 25 L 500 65 L 440 105 L 380 65 Z", cx: 440, cy: 65, label: "Cached?", sub: "Express API" },
                    { key: "postgres", type: "process", x: 560, y: 40, w: 130, h: 50, rx: 8, cx: 625, cy: 65, label: "Query Cache", sub: "Postgres / Prisma" },
                    { key: "postgres", type: "cylinder", x: 750, y: 80, w: 120, h: 70, cx: 810, cy: 115, label: "PostgreSQL DB", sub: "Postgres Cache" },
                    { key: "client", type: "process", x: 745, y: 270, w: 130, h: 50, rx: 8, cx: 810, cy: 295, label: "Render Stats", sub: "Update UI" },
                    { key: "sync", type: "process", x: 40, y: 220, w: 120, h: 50, rx: 8, cx: 100, cy: 245, label: "GitHub Actions", sub: "Cron Trigger" },
                    { key: "sync", type: "process", x: 220, y: 220, w: 130, h: 50, rx: 8, cx: 285, cy: 245, label: "Staggered Sync", sub: "2000ms Loop" },
                    { key: "riot", type: "process", x: 410, y: 220, w: 130, h: 50, rx: 8, cx: 475, cy: 245, label: "Ingest & Parse", sub: "Riot API" },
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
                            {/* Cylinder Bottom body */}
                            <path
                              d={`M ${node.x} ${node.y + 12} L ${node.x} ${node.y + node.h} A ${node.w / 2} 12 0 0 0 ${node.x + node.w} ${node.y + node.h} L ${node.x + node.w} ${node.y + 12} Z`}
                              fill={fillBg}
                              stroke={strokeColor}
                              strokeWidth={strokeWidth}
                            />
                            {/* Cylinder Top Ellipse */}
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

                        {/* Title text */}
                        <text
                          x={node.cx}
                          y={node.cy - 2}
                          textAnchor="middle"
                          fontWeight="800"
                          fill={theme.palette.text.primary}
                          fontSize="11"
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
                          fontSize="9.5"
                          fontFamily="Inter, sans-serif"
                        >
                          {node.sub}
                        </text>
                      </g>
                    );
                  })}

                  {/* Legend */}
                  <text x="20" y="340" fontSize="10.5" fill={theme.palette.text.secondary} fontFamily="Inter, sans-serif">
                    ── Process Flow  ╌╌ Async/Cron Trigger  Click nodes to highlight execution pathways
                  </text>
                </svg>
              </DiagramBoard>
            </Box>

            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            {/* ════ Section 4: Project Workflows ════ */}
            <Box id="workflows" sx={{ scrollMarginTop: 120, mb: 4 }}>
              <SectionHeading theme={theme}>Project Workflows</SectionHeading>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 700 }}>
                Key execution pipelines that coordinate authentication, player registrations, and scheduled telemetry updates.
              </Typography>

              <Grid container spacing={3}>
                {/* Workflow Detail Panel */}
                <Grid size={{ xs: 12, md: 9 }}>
                  <GlassCard sx={{ p: 3.5, height: "100%" }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                      {React.cloneElement(workflows[activeWorkflow].icon, { color: "primary", sx: { fontSize: 22 } })}
                      {workflows[activeWorkflow].title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontStyle: "italic" }}>
                      {workflows[activeWorkflow].description}
                    </Typography>

                    <Stack spacing={2.5} sx={{ position: "relative" }}>
                      {workflows[activeWorkflow].steps.map((step, index) => (
                        <Box key={index} sx={{ display: "flex", gap: 2, position: "relative" }}>
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Box
                              sx={{
                                width: 26,
                                height: 26,
                                borderRadius: "50%",
                                backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.15)",
                                color: "primary.main",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.75rem",
                                fontWeight: 800,
                                border: `1px solid ${theme.palette.mode === "light" ? "rgba(79,70,229,0.15)" : "rgba(129,140,248,0.25)"}`,
                              }}
                            >
                              {index + 1}
                            </Box>
                            {index < workflows[activeWorkflow].steps.length - 1 && (
                              <Box
                                sx={{
                                  width: 1.5,
                                  flex: 1,
                                  backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
                                  my: 0.5,
                                }}
                              />
                            )}
                          </Box>
                          <Box sx={{ pb: index < workflows[activeWorkflow].steps.length - 1 ? 2 : 0 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5, color: "text.primary" }}>
                              {step.label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: "0.85rem" }}>
                              {step.text}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </GlassCard>
                </Grid>

                {/* Workflow Selector */}
                <Grid size={{ xs: 12, md: 3 }}>
                  <Stack spacing={1}>
                    {Object.entries(workflows).map(([key, flow]) => {
                      const isActive = activeWorkflow === key;
                      return (
                        <Button
                          key={key}
                          onClick={() => setActiveWorkflow(key)}
                          variant={isActive ? "contained" : "outlined"}
                          startIcon={React.cloneElement(flow.icon, { sx: { fontSize: 18 } })}
                          sx={{
                            justifyContent: "flex-start",
                            textTransform: "none",
                            fontWeight: 700,
                            py: 1.5,
                            px: 2.5,
                            borderRadius: 2,
                            boxShadow: isActive ? "0 4px 14px rgba(79, 70, 229, 0.2)" : "none",
                            backgroundColor: isActive ? theme.palette.primary.main : "transparent",
                            borderColor: isActive ? "transparent" : theme.palette.mode === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)",
                            color: isActive ? "#FFF" : "text.secondary",
                            "&:hover": {
                              backgroundColor: isActive ? theme.palette.primary.main : theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
                              borderColor: isActive ? "transparent" : theme.palette.primary.main,
                              transform: "none",
                              boxShadow: isActive ? "0 4px 14px rgba(79, 70, 229, 0.2)" : "none",
                            },
                          }}
                        >
                          {flow.title.split(" Flow")[0].split(" Engine")[0]}
                        </Button>
                      );
                    })}
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            {/* ════ Section 5: Database Schema ════ */}
            <Box id="database" sx={{ scrollMarginTop: 120, mb: 4 }}>
              <SectionHeading theme={theme}>Database Schema</SectionHeading>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 700 }}>
                A graphical, interactive entity-relationship layout of ValoDash cached tables.
                Click any table card to view its fields, types, and primary-foreign key relationships.
              </Typography>

              {/* ER Diagram Board */}
              <DiagramBoard sx={{ mb: 4 }}>
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
                    { from: "User", to: "Team", path: "M 240 100 L 340 100" },
                    { from: "User", to: "ManualSyncLog", path: "M 140 170 L 140 330" },
                    { from: "Player", to: "User", path: "M 340 395 C 270 395, 270 150, 240 150" },
                    { from: "Team", to: "TeamPlayer", path: "M 440 150 L 440 190" },
                    { from: "Player", to: "TeamPlayer", path: "M 440 330 L 440 300" },
                    { from: "Player", to: "RankHistory", path: "M 540 395 C 600 395, 620 425, 680 425" },
                    { from: "Player", to: "PlayerMatchStats", path: "M 540 365 C 600 365, 620 275, 680 275" },
                    { from: "Match", to: "PlayerMatchStats", path: "M 790 150 L 790 200" },
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

                  {/* Table Cards */}
                  {[
                    {
                      id: "User", x: 40, y: 30, w: 200, h: 140,
                      fields: [{ n: "id", k: "PK" }, { n: "email", k: "UK" }, { n: "name", k: "" }, { n: "discordId", k: "UK" }, { n: "playerId", k: "FK" }]
                    },
                    {
                      id: "SyncMetadata", x: 40, y: 200, w: 200, h: 100,
                      fields: [{ n: "id", k: "PK" }, { n: "key", k: "UK" }, { n: "lastSyncedAt", k: "" }]
                    },
                    {
                      id: "ManualSyncLog", x: 40, y: 330, w: 200, h: 100,
                      fields: [{ n: "id", k: "PK" }, { n: "userId", k: "FK" }, { n: "createdAt", k: "" }]
                    },
                    {
                      id: "Team", x: 340, y: 30, w: 200, h: 120,
                      fields: [{ n: "id", k: "PK" }, { n: "name", k: "" }, { n: "creatorId", k: "FK" }, { n: "isFeatured", k: "" }]
                    },
                    {
                      id: "TeamPlayer", x: 340, y: 190, w: 200, h: 110,
                      fields: [{ n: "teamId", k: "PK/FK" }, { n: "playerId", k: "PK/FK" }, { n: "joinedAt", k: "" }]
                    },
                    {
                      id: "Player", x: 340, y: 330, w: 200, h: 130,
                      fields: [{ n: "id", k: "PK" }, { n: "puuid", k: "UK" }, { n: "name", k: "" }, { n: "tag", k: "" }]
                    },
                    {
                      id: "Match", x: 680, y: 30, w: 220, h: 120,
                      fields: [{ n: "id", k: "PK" }, { n: "matchId", k: "UK" }, { n: "mapName", k: "" }, { n: "startedAt", k: "" }]
                    },
                    {
                      id: "PlayerMatchStats", x: 680, y: 200, w: 220, h: 150,
                      fields: [{ n: "id", k: "PK" }, { n: "playerId", k: "FK" }, { n: "matchId", k: "FK" }, { n: "kills", k: "" }, { n: "tierName", k: "" }]
                    },
                    {
                      id: "RankHistory", x: 680, y: 380, w: 220, h: 90,
                      fields: [{ n: "id", k: "PK" }, { n: "playerId", k: "FK" }, { n: "tierId", k: "" }]
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
                                  fill={fld.k.includes("PK") ? "rgba(16, 185, 129, 0.15)" : fld.k.includes("UK") ? "rgba(245, 158, 11, 0.15)" : "rgba(239, 68, 68, 0.15)"}
                                />
                                <text
                                  x={tbl.x + tbl.w - 28}
                                  y={tbl.y + 51 + (fIdx * 18)}
                                  textAnchor="middle"
                                  fill={fld.k.includes("PK") ? "#10b981" : fld.k.includes("UK") ? "#f59e0b" : "#ef4444"}
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
              </DiagramBoard>

              {/* Table Detail Panel */}
              <GlassCard sx={{ p: { xs: 2.5, sm: 3.5 }, minHeight: 320 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, color: "primary.main" }}>
                    {activeTable} Table
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                    {activeTableData.description}
                  </Typography>
                </Box>

                {/* Fields */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", letterSpacing: "1px", display: "block", mb: 1.5 }}>
                    Fields & Types
                  </Typography>
                  <Grid container spacing={1}>
                    {activeTableData.fields.map((field, i) => (
                      <Grid key={field.name} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 1.5,
                            border: `1px solid ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)"}`,
                            backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.01)" : "rgba(255, 255, 255, 0.01)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "monospace", fontSize: "0.82rem" }}>
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
                          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
                            {field.type}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Relations */}
                {activeTableData.relations.length > 0 && (
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", letterSpacing: "1px", display: "block", mb: 1.5 }}>
                      Relations
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {activeTableData.relations.map((rel) => (
                        <Button
                          key={rel}
                          onClick={() => setActiveTable(rel)}
                          size="small"
                          startIcon={<AltRouteIcon sx={{ fontSize: 14 }} />}
                          sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "0.8rem",
                            borderRadius: 1.5,
                            px: 1.5,
                            py: 0.4,
                            border: `1px solid ${theme.palette.mode === "light" ? "rgba(79,70,229,0.15)" : "rgba(129,140,248,0.15)"}`,
                            color: "primary.main",
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
              </GlassCard>
            </Box>

            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            {/* ════ Section 5: Key Features ════ */}
            <Box id="features" sx={{ scrollMarginTop: 120, mb: 4 }}>
              <SectionHeading theme={theme}>Key Features</SectionHeading>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 650 }}>
                Core capabilities that power the ValoDash analytics platform.
              </Typography>

              <Grid container spacing={2.5}>
                {features.map((f, i) => (
                  <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
                    <GlassCard sx={{ p: 3, height: "100%" }}>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: theme.palette.mode === "light" ? "rgba(79,70,229,0.08)" : "rgba(129,140,248,0.1)",
                          color: "primary.main",
                          mb: 2,
                        }}
                      >
                        {f.icon}
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.75 }}>
                        {f.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {f.desc}
                      </Typography>
                    </GlassCard>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            {/* ════ Section 6: Snapshots ════ */}
            <Box id="snapshots" sx={{ scrollMarginTop: 120, mb: 4 }}>
              <SectionHeading theme={theme}>Snapshots</SectionHeading>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 650 }}>
                Visual walkthrough of the ValoDash interface on desktop and mobile viewports. Click any image to view it full-screen.
              </Typography>

              {/* Subheading: Desktop Views */}
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2.5, display: "flex", alignItems: "center", gap: 1 }}>
                <TimelineIcon color="primary" fontSize="small" />
                Desktop Layouts
              </Typography>

              <Grid container spacing={3} sx={{ mb: 6 }}>
                {snapshotsList.filter(s => s.type === "desktop").map((item, idx) => {
                  const originalIndex = snapshotsList.findIndex(s => s.src === item.src);
                  return (
                    <Grid key={idx} size={{ xs: 12, sm: 6 }}>
                      <Box
                        onClick={() => {
                          setLightboxIndex(originalIndex);
                          setLightboxOpen(true);
                        }}
                        sx={{
                          cursor: "pointer",
                          position: "relative",
                          borderRadius: 3,
                          overflow: "hidden",
                          border: "3px solid rgba(255, 255, 255, 0.15)",
                          background: theme.palette.mode === "light" ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.4)",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            transform: "translateY(-4px) scale(1.01)",
                            boxShadow: theme.palette.mode === "light" ? "0 12px 30px rgba(79, 70, 229, 0.15)" : "0 12px 30px rgba(129, 140, 248, 0.15)",
                            borderColor: "primary.main",
                            "& .hover-overlay": { opacity: 1 },
                          }
                        }}
                      >
                        <Box
                          component="img"
                          src={item.src}
                          alt={item.title}
                          sx={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                          }}
                        />
                        {/* Hover Overlay */}
                        <Box
                          className="hover-overlay"
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(15, 23, 42, 0.6)",
                            backdropFilter: "blur(4px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            p: 2,
                            textAlign: "center"
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
                            {item.title}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>

              {/* Subheading: Mobile Views */}
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2.5, display: "flex", alignItems: "center", gap: 1 }}>
                <SportsEsportsIcon color="primary" fontSize="small" />
                Mobile Viewports
              </Typography>

              {/* Grid layout for vertical mobile viewports */}
              <Grid container spacing={3} columns={10}>
                {snapshotsList.filter(s => s.type === "mobile").map((item, idx) => {
                  const originalIndex = snapshotsList.findIndex(s => s.src === item.src);
                  return (
                    <Grid key={idx} size={{ xs: 5, md: 2 }}>
                      <Box
                        onClick={() => {
                          setLightboxIndex(originalIndex);
                          setLightboxOpen(true);
                        }}
                        sx={{
                          cursor: "pointer",
                          position: "relative",
                          borderRadius: 3,
                          overflow: "hidden",
                          border: "3px solid rgba(255, 255, 255, 0.15)",
                          background: theme.palette.mode === "light" ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.4)",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            transform: "translateY(-4px) scale(1.02)",
                            boxShadow: theme.palette.mode === "light" ? "0 12px 30px rgba(79, 70, 229, 0.18)" : "0 12px 30px rgba(129, 140, 248, 0.18)",
                            borderColor: "primary.main",
                            "& .hover-overlay": { opacity: 1 },
                          }
                        }}
                      >
                        <Box
                          component="img"
                          src={item.src}
                          alt={item.title}
                          sx={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            aspectRatio: "383/851",
                            objectFit: "cover"
                          }}
                        />
                        {/* Hover Overlay */}
                        <Box
                          className="hover-overlay"
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(15, 23, 42, 0.65)",
                            backdropFilter: "blur(4px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            p: 1.5,
                            textAlign: "center"
                          }}
                        >
                          <Typography variant="caption" sx={{ color: "#fff", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.75rem" }}>
                            {item.title}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

          </Box>
        </Box>
      </Container>

      {/* ── Lightbox Modal ── */}
      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        maxWidth="lg"
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
            overflow: "visible",
            m: { xs: 1, sm: 2 }
          }
        }}
      >
        <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Close Button */}
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{
              position: "absolute",
              top: -48,
              right: 0,
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" }
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Active Image */}
          <Box
            component="img"
            src={snapshotsList[lightboxIndex].src}
            alt={snapshotsList[lightboxIndex].title}
            sx={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: 0,
              boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
              backgroundColor: theme.palette.mode === "light" ? "rgba(255,255,255,0.95)" : "#0f172a",
              border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"}`,
            }}
          />

          {/* Unified Navigation & Caption Control Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              mt: 2,
              px: 2,
              py: 1.2,
              borderRadius: 0,
              backgroundColor: "rgba(15,23,42,0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.08)",
              gap: 2
            }}
          >
            {/* Prev Image Button */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev === 0 ? snapshotsList.length - 1 : prev - 1));
              }}
              sx={{
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.05)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" }
              }}
            >
              <NavigateBeforeIcon />
            </IconButton>

            {/* Caption */}
            <Box sx={{ textAlign: "center", flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", fontSize: { xs: "0.85rem", sm: "1rem" } }}>
                {snapshotsList[lightboxIndex].title}
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", display: "block", mt: 0.5 }}>
                Screenshot {lightboxIndex + 1} of {snapshotsList.length} • {snapshotsList[lightboxIndex].type.toUpperCase()} VIEW
              </Typography>
            </Box>

            {/* Next Image Button */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev === snapshotsList.length - 1 ? 0 : prev + 1));
              }}
              sx={{
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.05)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" }
              }}
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ValoDashDetail;
