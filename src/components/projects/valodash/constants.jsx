import React from "react";
import {
  Leaderboard as LeaderboardIcon,
  Analytics as AnalyticsIcon,
  History as HistoryIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Sync as SyncIcon,
  Timeline as TimelineIcon,
  SettingsSuggest as SettingsSuggestIcon,
  Storage as StorageIcon,
  SportsEsports as SportsEsportsIcon,
} from "@mui/icons-material";

export const features = [
  { icon: <LeaderboardIcon />, title: "Team Leaderboards", shortTitle: "Leaderboards", desc: "Dynamic roster rankings computed from aggregated player performance across custom team structures." },
  { icon: <AnalyticsIcon />, title: "Player Analytics", shortTitle: "Analytics", desc: "Per-player KDA, headshot %, win rate, and agent-specific performance breakdowns with trend lines." },
  { icon: <HistoryIcon />, title: "Match History", shortTitle: "History", desc: "Detailed round-by-round match breakdowns with map data, score timelines, and agent selections." },
  { icon: <TrendingUpIcon />, title: "Rank Tracking", shortTitle: "Tracking", desc: "Historical MMR progression charts showing rank fluctuations across competitive seasons." },
  { icon: <SecurityIcon />, title: "Discord Login", shortTitle: "Login", desc: "OAuth2-based authentication flow linking Discord profiles directly to Valorant game tags." },
  { icon: <SyncIcon />, title: "Auto Sync", shortTitle: "Sync", desc: "Scheduled cron workers pull match data hourly from Riot APIs without impacting frontend responsiveness." },
];

export const systemNodes = {
  client: {
    title: "Client Frontend (React / Next.js)",
    shortTitle: "Frontend",
    icon: <TimelineIcon />,
    description: "Responsive browser dashboard built with React and custom Vanilla CSS. Renders Valorant profiles, historical match analytics, dynamic leaderboards, and custom player stats tracking.",
    role: "Sends HTTP REST requests to the Backend, handles Discord login callbacks, and visualizes analytical insights.",
  },
  api: {
    title: "Backend API (Express.js / TypeScript)",
    shortTitle: "Backend",
    icon: <SettingsSuggestIcon />,
    description: "Express.js server structured in TypeScript. Validates request payloads with Zod schemas, manages authorization via JSON Web Tokens, and processes logging telemetry via Winston.",
    role: "Core application router coordinating Postgres client requests, scheduled background triggers, and user authentication mapping.",
  },
  postgres: {
    title: "PostgreSQL Database",
    shortTitle: "DB",
    icon: <StorageIcon />,
    description: "Relational database caching historical telemetry, user session metadata, Valorant player stats snapshots, and sync execution logs.",
    role: "Persistent store structured with relational constraint checks, mapped and queried via Prisma ORM.",
  },
  discord: {
    title: "Discord OAuth Integration",
    shortTitle: "OAuth",
    icon: <SecurityIcon />,
    description: "Integrates Discord OAuth for secure profile creation. Associates the logged-in Discord profile directly with their Valorant game tags.",
    role: "Resolves Discord avatar and account email, returning authorized secure user tokens.",
  },
  riot: {
    title: "Riot Games API",
    shortTitle: "API",
    icon: <SportsEsportsIcon />,
    description: "External Valorant API queried to look up in-game account identifiers (PUUID), rank MMR standings, game versions, maps, and detailed round stats.",
    role: "Source of real-time game telemetry, fetched in batches to minimize latency and manage rate limits.",
  },
  sync: {
    title: "Sync Service (Scheduled Cron Jobs)",
    shortTitle: "Sync",
    icon: <SyncIcon />,
    description: "Automated background process running on Node schedules. Cycles through tracked players, retrieves new matches, and upserts player statistics.",
    role: "Performs scheduled automated updates via GitHub Actions trigger webhooks to maintain database sync without throttling the client-facing APIs.",
  },
};

export const schemaTables = {
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

export const workflows = {
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

export const snapshotsList = [
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
