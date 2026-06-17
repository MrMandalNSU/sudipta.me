import React from "react";
import {
  LockOutlined as LockIcon,
  RssFeedOutlined as RssIcon,
  TimelineOutlined as TimelineIcon,
  StorageOutlined as DatabaseIcon,
  BoltOutlined as LiveIcon,
  BuildOutlined as BuildIcon,
  ComputerOutlined as ClientIcon,
  AltRouteOutlined as ApiIcon,
  CachedOutlined as CacheIcon,
  TimerOutlined as CronIcon,
  DynamicFeedOutlined as SyncIcon,
  SearchOutlined as SearchIcon,
  ShareOutlined as WebhookIcon,
  CodeOutlined as CodeIcon,
  BugReportOutlined as BugIcon,
  CloudUploadOutlined as CloudIcon,
} from "@mui/icons-material";

const BoltIcon = LiveIcon;

export const features = [
  { icon: <LockIcon />, title: "OTP & OAuth Security", shortTitle: "Auth Flow", desc: "Custom email OTP authentication with Nodemailer/ZeptoMail and Google/Facebook social callback redirection." },
  { icon: <RssIcon />, title: "SportsDB Integration", shortTitle: "SportsDB Client", desc: "Unified SportsDB v1/v2 API client with automatic rate limit handlers, staggered loops, and timeouts." },
  { icon: <BoltIcon />, title: "Real-time Live Scores", shortTitle: "WebSockets", desc: "WebSocket server broadcasting 30s fetch updates to active dashboard subscribers in real-time." },
  { icon: <CacheIcon />, title: "Multi-Tier Caching", shortTitle: "Performance", desc: "Response latency speedups using node-cache for route lookups and Redis for database query caching." },
  { icon: <DatabaseIcon />, title: "50+ Database Models", shortTitle: "Schema Design", desc: "Highly relational PostgreSQL schemas linking sports, leagues, venues, players, events, and overrides." },
  { icon: <BuildIcon />, title: "CMS Layout Controls", shortTitle: "CMS Admin", desc: "CMS controls managing reorderable home sections, ticker speeds, ad placements, and layouts." },
];

export const systemNodes = {
  client: {
    title: "Client Portal (React Dashboard)",
    shortTitle: "Client UI",
    icon: <ClientIcon />,
    description: "The frontend client rendering scores and schedules, connecting to the server via standard HTTP requests and WebSocket streams.",
    role: "Listens to WebSocket broadcasts and fetches filtered route endpoints.",
  },
  api: {
    title: "Strapi v5 API Router (Koa HTTP Server)",
    shortTitle: "Strapi Router",
    icon: <ApiIcon />,
    description: "Serves endpoints with custom Koa routing middlewares, validating JWT signatures, parameters, and query structures.",
    role: "Processes requests, executes permissions, check caches, and queries postgres.",
  },
  cache: {
    title: "Multi-Tier Cache Layer (Redis & node-cache)",
    shortTitle: "Cache Service",
    icon: <CacheIcon />,
    description: "Speeds up lookups by saving formatted list arrays in node-cache and querying Redis cache instances prior to database accesses.",
    role: "Intercepts query requests, returning hits, and writing cache-miss outputs.",
  },
  postgres: {
    title: "PostgreSQL Database (Neon DB Cloud)",
    shortTitle: "PostgreSQL",
    icon: <DatabaseIcon />,
    description: "Cloud-hosted relational PostgreSQL database with table indexes and relationship configurations.",
    role: "Persistently stores sports records, override configurations, stats, and preferences.",
  },
  crons: {
    title: "Background Schedulers (Cron Workers)",
    shortTitle: "Cron Schedulers",
    icon: <CronIcon />,
    description: "Deferred background jobs running at specific intervals (hourly, daily, monthly) to trigger synchronization services.",
    role: "Invokes sync-leagues, sync-players, news cleanup, and daily reset scripts.",
  },
  sportsdb: {
    title: "SportsDB Service (API Client)",
    shortTitle: "SportsDB API",
    icon: <SyncIcon />,
    description: "HTTP client querying external SportsDB API endpoints with retries, timeout parameters, and rate-limiting limits.",
    role: "Requests raw sports JSON objects, handling errors and network drops.",
  },
  websocket: {
    title: "WebSocket Server (Socket.io Provider)",
    shortTitle: "Socket Server",
    icon: <LiveIcon />,
    description: "Handles active WebSocket subscriptions, broadcasting score changes from the scheduler loop.",
    role: "Emits real-time live match updates to connected clients.",
  },
};

export const workflows = {
  auth: {
    title: "OTP & OAuth Social Authentication Flow",
    shortTitle: "Auth Flow",
    icon: <LockIcon />,
    description: "Validates email registrations via secure numeric OTP, or handles Google/Facebook OAuth provider redirects and callback code exchanges to issue JWT authorizations.",
    subFlows: {
      otp: {
        title: "Email OTP Sign-In",
        steps: [
          { label: "Email OTP Submission", text: "User enters their email address and clicks 'Send OTP' on the sign-in screen." },
          { label: "OTP Generation & Dispatch", text: "The backend server generates a cryptographically secure 6-digit verification code, stores it with an expiration timestamp (e.g., 10 minutes), and sends it to the user via Nodemailer/ZeptoMail." },
          { label: "Verification Code Submission", text: "The user retrieves the code and submits it to the backend endpoint `POST /api/auth/verify-otp` along with their email address." },
          { label: "JWT Issuance & Local Login", text: "The backend validates the code, sets the user status to 'confirmed', creates/updates the User record in PostgreSQL, generates a secure JWT token, and returns user details to the client." }
        ],
        payload: {
          email: "user@sportsfixtures.net",
          code: "839401"
        },
        responsePayload: {
          jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          user: {
            id: 42,
            email: "user@sportsfixtures.net",
            username: "sudipta_mandal",
            provider: "local",
            confirmed: true
          }
        }
      },
      oauth: {
        title: "Google & Facebook OAuth Sign-In",
        steps: [
          { label: "Provider Selection & Redirect", text: "The user clicks 'Sign in with Google' or 'Sign in with Facebook'. The client redirects the user to the provider's OAuth consent screen with client ID and scope parameters." },
          { label: "Authorization Code Callback", text: "The user logs in and grants consent. Google/Facebook redirects back to the client redirect URI (`http://localhost:5173/connect/google/redirect`) with an authorization code." },
          { label: "Callback Token Exchange", text: "The client extracts the authorization code and POSTs it to the backend redirect handler `/api/connect/google/callback`." },
          { label: "OAuth Verification & Profile Mapping", text: "The backend exchanges the auth code for an access token with Google/Facebook, fetches the user's profile metadata, registers or updates the user record in PostgreSQL, generates a JWT session token, and returns it to the client." }
        ],
        payload: {
          provider: "google",
          authorizationCode: "4/0AeaYSHC0q...",
          redirectUri: "http://localhost:5173/connect/google/redirect"
        },
        responsePayload: {
          jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          user: {
            id: 42,
            email: "user@sportsfixtures.net",
            username: "sudipta_mandal",
            provider: "google",
            confirmed: true
          }
        }
      }
    }
  },
  sportsdb_sync: {
    title: "Automated SportsDB Synchronization Cron",
    shortTitle: "Cron Sync",
    icon: <SyncIcon />,
    description: "Scheduled background workers loading and normalizing sports datasets incrementally.",
    steps: [
      { label: "Scheduler Trigger", text: "Monthly cron worker triggers sync for long-lived catalogs (leagues, teams, sports, players), while an hourly cron triggers event and TV event syncing to pull current fixtures." },
      { label: "Staggered Fetching", text: "Client requests API endpoints in staggered arrays to prevent rate limit lockout blocks." },
      { label: "Payload Normalization", text: "Raw JSON payloads are mapped to Strapi structure rules, correcting names (e.g. mapping Soccer to Football)." },
      { label: "Database Insert & Clear", text: "Updates records in Neon Postgres database and clears relevant caches in node-cache." }
    ],
    payload: {
      syncType: "teams",
      leagueId: "4328",
      rateLimitIntervalMs: 2000
    },
    responsePayload: {
      status: "COMPLETED",
      recordsInserted: 20,
      errors: [],
      executionTimeMs: 14500
    }
  },
  livescore: {
    title: "Real-time WebSocket Score Broadcasting",
    shortTitle: "Livescore WS",
    icon: <LiveIcon />,
    description: "Broadcasts active scores fetched from the SportsDB API to clients in real-time.",
    steps: [
      { label: "Livescore Scheduler", text: "deferred livescore-scheduler worker runs every 30 seconds." },
      { label: "SportsDB Query", text: "Queries SportsDB v2 live scoring endpoint for matches in progress." },
      { label: "Socket.io Broadcast", text: "Socket server serializes active scores and broadcasts them immediately via Socket.io." },
      { label: "Optimistic UI Update", text: "Client receives the WebSocket packet, updating scores with micro-animations in the UI." }
    ],
    payload: {
      activeMatchesCount: 3,
      broadcastChannel: "livescores"
    },
    responsePayload: {
      event: "livescores:update",
      data: [
        {
          idEvent: "570021",
          strEvent: "Chelsea vs Arsenal",
          intHomeScore: "1",
          intAwayScore: "1",
          strStatus: "In Progress",
          strProgress: "72'"
        }
      ]
    }
  }
};

export const conceptualSchemas = {
  "Core Sports Data": {
    description: "Core relational tables representing general sports structures, rosters, and stadiums.",
    entities: {
      Sport: [
        { name: "idSport", type: "string (unique, PK)" },
        { name: "strSport", type: "string (name: e.g. Football)" },
        { name: "displayName", type: "string" },
        { name: "slug", type: "string (unique)" },
        { name: "isActive", type: "boolean" },
        { name: "leagues", type: "Relation (oneToMany) to League" }
      ],
      League: [
        { name: "idLeague", type: "string (unique, PK)" },
        { name: "strLeague", type: "string" },
        { name: "strBadge", type: "string (URL)" },
        { name: "strLogo", type: "string (URL)" },
        { name: "strBanner", type: "string (URL)" },
        { name: "slug", type: "string (unique)" },
        { name: "sport", type: "Relation (manyToOne) to Sport" },
        { name: "countryRef", type: "Relation (manyToOne) to Country" }
      ],
      Team: [
        { name: "idTeam", type: "string (unique, PK)" },
        { name: "strTeam", type: "string" },
        { name: "strBadge", type: "string (URL)" },
        { name: "strLogo", type: "string (URL)" },
        { name: "strColour1", type: "string (hex)" },
        { name: "slug", type: "string (unique)" },
        { name: "league", type: "Relation (manyToOne) to League" },
        { name: "venue", type: "Relation (manyToOne) to Venue" }
      ],
      Player: [
        { name: "idPlayer", type: "string (unique, PK)" },
        { name: "strPlayer", type: "string" },
        { name: "strPosition", type: "string (e.g. Forward)" },
        { name: "dateBorn", type: "date" },
        { name: "isActive", type: "boolean" },
        { name: "team", type: "Relation (manyToOne) to Team" }
      ],
      Venue: [
        { name: "idVenue", type: "string (unique, PK)" },
        { name: "strVenue", type: "string" },
        { name: "intCapacity", type: "string" },
        { name: "strLocation", type: "string" },
        { name: "timezone", type: "string" },
        { name: "slug", type: "string (unique)" }
      ],
      Country: [
        { name: "code", type: "string (unique, PK)" },
        { name: "name", type: "string" },
        { name: "flagUrl32", type: "string (URL)" },
        { name: "slug", type: "string (unique)" },
        { name: "leagues", type: "Relation (oneToMany) to League" }
      ]
    }
  },
  "Live & Matches": {
    description: "Entities storing match metadata, upcoming schedules, TV broadcasters, and active score statistics.",
    entities: {
      Event: [
        { name: "idEvent", type: "string (unique, PK)" },
        { name: "strEvent", type: "string (e.g. Chelsea vs Arsenal)" },
        { name: "intHomeScore", type: "integer (nullable)" },
        { name: "intAwayScore", type: "integer (nullable)" },
        { name: "dateEvent", type: "date" },
        { name: "strTime", type: "string" },
        { name: "strStatus", type: "string (Finished, Scheduled, etc.)" },
        { name: "strVenue", type: "string" },
        { name: "slug", type: "string" }
      ],
      "TV Event": [
        { name: "idBroadcast", type: "string (unique, PK)" },
        { name: "idEvent", type: "string" },
        { name: "strChannel", type: "string (broadcaster channel)" },
        { name: "strStatus", type: "enum [Scheduled, Live, Final]" },
        { name: "dateEvent", type: "date" },
        { name: "slug", type: "string" }
      ],
      "Finished/Upcoming Item Overrides": [
        { name: "idEvent", type: "string (unique)" },
        { name: "item_type", type: "enum [match, promo, ad, featured]" },
        { name: "priority", type: "integer" },
        { name: "manual_override", type: "boolean" },
        { name: "intHomeScore", type: "string (nullable)" },
        { name: "intAwayScore", type: "string (nullable)" },
        { name: "card_color_primary", type: "string (hex)" },
        { name: "card_color_text", type: "string (hex)" }
      ]
    }
  },
  "CMS Configurations": {
    description: "CMS admin single-types allowing dynamic control of navigation, layouts, sections, and system states.",
    entities: {
      "Section Control": [
        { name: "sectionName", type: "string" },
        { name: "isVisible", type: "boolean" },
        { name: "order", type: "integer" },
        { name: "featureColor", type: "string" }
      ],
      "Ticker Config": [
        { name: "speed_offset", type: "integer" },
        { name: "bg_color", type: "string (hex)" },
        { name: "text_color", type: "string (hex)" },
        { name: "breaking_color", type: "string (hex)" },
        { name: "sync_enabled", type: "boolean" },
        { name: "sync_interval_minutes", type: "integer" }
      ],
      "Ad Creative & Placement": [
        { name: "name", type: "string" },
        { name: "external_campaign_id", type: "string" },
        { name: "script", type: "richtext" },
        { name: "html", type: "richtext" },
        { name: "cpm_eur", type: "decimal" },
        { name: "impression_cap", type: "integer" },
        { name: "placements", type: "Relation (manyToMany) to Placement" }
      ],
      "Hero Config": [
        { name: "heroTitle", type: "richtext" },
        { name: "backgroundType", type: "enum [gradient, image, video]" },
        { name: "backgroundImage", type: "media" },
        { name: "showSearchbar", type: "boolean" },
        { name: "videoAutoplay", type: "boolean" }
      ],
      "Navbar Config": [
        { name: "sectionName", type: "string" },
        { name: "logoText", type: "string" },
        { name: "logoUrl", type: "string" },
        { name: "backgroundColor", type: "string" },
        { name: "textColor", type: "string" },
        { name: "isSticky", type: "boolean" },
        { name: "showLoginButton", type: "boolean" }
      ],
      "Logo Config": [
        { name: "siteName", type: "string" },
        { name: "siteTagline", type: "string" },
        { name: "siteDescription", type: "text" },
        { name: "logoWidth", type: "integer" },
        { name: "logoHeight", type: "integer" },
        { name: "primaryColor", type: "string" },
        { name: "copyrightText", type: "string" }
      ],
      "Searchbar Config": [
        { name: "placeholderText", type: "string" },
        { name: "showTrendingTags", type: "boolean" },
        { name: "maxSearchHistory", type: "integer" },
        { name: "enableSuggestions", type: "boolean" }
      ],
      "Fixtures Results Config": [
        { name: "defaultDateRangeDays", type: "integer" },
        { name: "defaultPageSize", type: "integer" },
        { name: "enableLiveFlash", type: "boolean" },
        { name: "showBroadcasters", type: "boolean" }
      ],
      "Popular Competitions Config": [
        { name: "maxCompetitionsShown", type: "integer" },
        { name: "enableAutoOrdering", type: "boolean" },
        { name: "showCountryFlags", type: "boolean" }
      ],
      "News Section Config": [
        { name: "newsCountLimit", type: "integer" },
        { name: "showThumbnails", type: "boolean" },
        { name: "defaultNewsCategory", type: "string" },
        { name: "enableInfiniteScroll", type: "boolean" }
      ],
      "Sync Status": [
        { name: "lastSyncTime", type: "datetime" },
        { name: "isSyncing", type: "boolean" },
        { name: "syncProgress", type: "percent" }
      ],
      "Sports Grid Config": [
        { name: "gridColumns", type: "integer" },
        { name: "enableCategoryIcons", type: "boolean" }
      ],
      "Notification System Setting": [
        { name: "sendGridApiKey", type: "string" },
        { name: "enablePushNotifications", type: "boolean" }
      ],
      "Finished Event Setting": [
        { name: "retentionDaysLimit", type: "integer" },
        { name: "archiveBatchSize", type: "integer" }
      ],
      "All Events Setting": [
        { name: "calendarRangeMonths", type: "integer" },
        { name: "groupEventsByDate", type: "boolean" }
      ],
      "Todays Highlights Setting": [
        { name: "autoplayIntervalMs", type: "integer" },
        { name: "showVideoPlayer", type: "boolean" }
      ],
      "Upcoming Event Setting": [
        { name: "maxUpcomingEvents", type: "integer" },
        { name: "enableCountdowns", type: "boolean" }
      ],
      "Top Live Setting": [
        { name: "refreshIntervalSeconds", type: "integer" },
        { name: "soundAlertsEnabled", type: "boolean" }
      ],
      "Top League Small Config": [
        { name: "maxLeagues", type: "integer" },
        { name: "showIcons", type: "boolean" }
      ]
    }
  },
  "Analytics & User": {
    description: "Engagement tracking tables, search analytic logs, push configurations, and users' bookmark tables.",
    entities: {
      Trending: [
        { name: "category", type: "enum [league, team, sport, country]" },
        { name: "value", type: "string" },
        { name: "idValue", type: "string (SportsDB ID)" },
        { name: "searchCountToday", type: "integer" },
        { name: "searchCountWeek", type: "integer" },
        { name: "trendingScore", type: "decimal" },
        { name: "isHot", type: "boolean" }
      ],
      "Search Tracking": [
        { name: "userId", type: "string (nullable)" },
        { name: "strLeague", type: "string" },
        { name: "strTeam", type: "string" },
        { name: "resultCount", type: "integer" },
        { name: "hasFilters", type: "boolean" },
        { name: "userAgent", type: "string" },
        { name: "ipAddress", type: "string" },
        { name: "timestamp", type: "datetime" }
      ],
      "User Favorite": [
        { name: "entityType", type: "enum [event, sport, league, team, country]" },
        { name: "entityId", type: "string (SportsDB / region key)" },
        { name: "user", type: "Relation (manyToOne) to User" }
      ],
      "Notification Preference": [
        { name: "emailEnabled", type: "boolean" },
        { name: "digestFrequency", type: "enum [daily, weekly]" },
        { name: "upcomingMatchesEnabled", type: "boolean" },
        { name: "matchResultsEnabled", type: "boolean" },
        { name: "timezone", type: "string" },
        { name: "user", type: "Relation (oneToOne) to User" }
      ]
    }
  }
};

export const agenticAiLoops = [
  {
    id: "context",
    icon: <CodeIcon />,
    title: "Context-Primed Development",
    subtitle: "Accelerated Code Production",
    desc: "By designing schema blueprints, endpoint specifications, and guides in advance, Sudipta created a structured context directory. AI coders leveraged this to generate matching routes, controllers, and services with 100% API compatibility.",
    telemetryLogs: [
      "[09:12:04] INFO: Scanning local context repository...",
      "[09:12:05] LOAD: Primed 12 schema specs: Sport.json, League.json, TVEvent.json...",
      "[09:12:06] PARSE: Mapped 54 relational attributes case-insensitively.",
      "[09:12:07] AGENT: Bootstrapped Koa router endpoints and controller files.",
      "[09:12:08] STATUS: Context-primed generation completed with 100% endpoint alignment."
    ]
  },
  {
    id: "validation",
    icon: <WebhookIcon />,
    title: "API Schema Validation Loop",
    subtitle: "Swagger & Middleware Alignment",
    desc: "An automated loop checking Koa route paths, request payload validation rules, and Swagger UI configurations to guarantee OpenAPI specs dynamically align with route endpoints without stale properties.",
    telemetryLogs: [
      "[10:05:30] VERIFY: Initiating OpenAPI schema alignment checker...",
      "[10:05:31] COMPARE: Validation rules in Koa routes vs Swagger v3 JSON structure...",
      "[10:05:33] CHECK: Enforcing OTP auth schema fields (email, code) constraints...",
      "[10:05:34] SUCCESS: Swagger documentation is 100% synchronized with route middlewares.",
      "[10:05:35] STATUS: Loop finished: 0 validation warnings."
    ]
  },
  {
    id: "normalization",
    icon: <CronIcon />,
    title: "JSON Normalization Loop",
    subtitle: "SportsDB Data Verification",
    desc: "Ingests raw API feeds from SportsDB, matching objects against JSON layouts in dry-run schedules. Resolves spelling mismatches (e.g. mapping Soccer to Football) and filters out incomplete payloads.",
    telemetryLogs: [
      "[11:15:00] CRON: Fetching raw JSON fixtures feed from SportsDB v2 API...",
      "[11:15:02] PARSE: Retrieved 42 event objects. Validating fields...",
      "[11:15:03] ENFORCE: Normalizing SportName 'Soccer' -> 'Football' (standardized).",
      "[11:15:04] MAP: Home team 'Chelsea FC' matched with DB Team record id: 4328.",
      "[11:15:05] WRITE: 42 records verified and structured. Neon DB write queued."
    ]
  },
  {
    id: "testing",
    icon: <BugIcon />,
    title: "Testing Automation Loop",
    subtitle: "Trace Log Diagnostics",
    desc: "Generates developer diagnostic traces recording database writes, WebSocket connection heartbeats, and auth callback steps. Traces are fed into debugging agents to solve logic errors.",
    telemetryLogs: [
      "[12:40:22] TEST: Triggering integration test runner (npm run test:api)...",
      "[12:40:23] RUN: Testing JWT token authorization middleware...",
      "[12:40:24] POST: /api/auth/verify-otp (status: 200 OK, latency: 38ms) - PASS.",
      "[12:40:25] WS: Client handshake heartbeat connection active (socket.io) - PASS.",
      "[12:40:27] DIAGNOSTIC: Test report compiled. 0 failures, 24 test cases passed."
    ]
  },
  {
    id: "devops",
    icon: <CloudIcon />,
    title: "AI-Driven DevOps",
    subtitle: "Infrastructure Provisioning",
    desc: "Automated setup logs on Railway, configuring custom headers, proxy trust middleware in Koa, database SSL constraints with Neon, and build pipelines with zero configuration errors.",
    telemetryLogs: [
      "[14:22:10] DEPLOY: Webhook received. Launching Railway deployment worker...",
      "[14:22:12] ENGINE: Executing Docker multi-stage build. Node v20 runtime context...",
      "[14:22:15] CONFIG: Configuring Neon PG database SSL connections dynamically.",
      "[14:22:18] PROXY: Koa app trust-proxy headers verified.",
      "[14:22:20] SERVER: Application health-check route GET /health returned 200 OK. DEPLOYED!"
    ]
  },
  {
    id: "logging",
    icon: <WebhookIcon />,
    title: "AI-Assisted Error Logging",
    subtitle: "Winston & Sentry Tracing",
    desc: "Custom error filters formatting Strapi database failures and WebSockets connection drops into readable trace lines, allowing AI systems to automatically diagnose integration bugs.",
    telemetryLogs: [
      "[15:01:05] ERROR: Winston logger captured DB Connection Error on Neon host.",
      "[15:01:06] TRACE: Neon Postgres pool exhausted. Connection count: 20/20.",
      "[15:01:07] AGENT: Analyzing error logs. Recommendation: Enable dynamic pooling.",
      "[15:01:08] RESOLVE: Configured pool size constraints dynamically in database config.",
      "[15:01:10] FIXED: Database connection re-established. Diagnostic resolved automatically."
    ]
  },
];
