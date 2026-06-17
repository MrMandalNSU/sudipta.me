import React from "react";
import {
  Group as GroupIcon,
  Search as ScraperIcon,
  Leaderboard as RankingIcon,
  Timeline as ActivityIcon,
  Fingerprint as SecurityIcon,
  Storage as DbIcon,
  AltRoute as RouteIcon,
  Rule as RuleIcon,
  Terminal as TerminalIcon,
  Speed as SpeedIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

export const features = [
  { icon: <GroupIcon />, title: "Bootcamp Management", shortTitle: "Bootcamp", desc: "Core participant registry, batch allocations, and profile verification API flows." },
  { icon: <ScraperIcon />, title: "Automated OJ Crawlers", shortTitle: "Crawlers", desc: "Scheduled scraper nodes querying Codeforces, Vjudge, AtCoder, and LightOJ." },
  { icon: <RankingIcon />, title: "Leaderboard Aggregator", shortTitle: "Leaderboard", desc: "Real-time query compiler aggregating solve counts and batch rankings." },
  { icon: <ActivityIcon />, title: "Solve Stats Dashboard", shortTitle: "Analytics", desc: "Visual user dashboards tracking GitHub-style activity delta metrics." },
  { icon: <SecurityIcon />, title: "Session Gate Middleware", shortTitle: "Auth", desc: "Role-based API tokens and whitelisted coordinates for secure administrative panel access." },
];

export const systemNodes = {
  bootcamp: {
    title: "Bootcamp Manager (CRUD Services)",
    shortTitle: "Bootcamp",
    icon: <GroupIcon />,
    description: "Orchestrates student profile creation, batch enrollments, registration state verification, and mentor matching.",
    role: "Provides core administrative controls and participant data integrity.",
  },
  api: {
    title: "Laravel API Gateway",
    shortTitle: "API Gateway",
    icon: <SettingsIcon />,
    description: "Handles external REST queries, user state updates, handle verification checks, and leaderboard delivery.",
    role: "Acts as the central communications coordinator for the bootcamp services.",
  },
  crawler: {
    title: "Automated Scraping Daemon",
    shortTitle: "Crawler Node",
    icon: <ScraperIcon />,
    description: "Scheduled worker script querying public Online Judge profiles via REST APIs or HTTP curl parsing, rotating proxy credentials.",
    role: "Fetches live user performance indicators across multiple platforms asynchronously.",
  },
  database: {
    title: "Relational Schema Gateway",
    shortTitle: "MySQL / Redis",
    icon: <DbIcon />,
    description: "Maintains transactions for handles, submissions, daily deltas, and caches leaderboard scores for fast retrieval.",
    role: "Stores structured entity states and coordinates high-speed active indices.",
  },
  aggregator: {
    title: "Live Sorter & Rank Compiler",
    shortTitle: "Leaderboard Engine",
    icon: <RankingIcon />,
    description: "Triggers calculated scoring formulas based on total solves, time-period filters, and active batch constraints.",
    role: "Compiles the main ranks leaderboard served to students and admin panels.",
  },
  dashboard: {
    title: "Solve Analytics & Grids",
    shortTitle: "Stats UI",
    icon: <ActivityIcon />,
    description: "Processes raw daily solve histories into Github-style contribution heatmap arrays and chronological timelines.",
    role: "Exposes consumable JSON datasets to power active student dashboards.",
  },
  codeforces: {
    title: "Codeforces API Tracker",
    shortTitle: "Codeforces",
    icon: <TerminalIcon />,
    description: "Queries public Codeforces APIs to synchronize user profiles, verify active handles, and log daily solving counts.",
    role: "Feeds raw competitive programming submission data into the platform.",
  },
  vjudge: {
    title: "Vjudge Page Scraper",
    shortTitle: "Vjudge Scraper",
    icon: <TerminalIcon />,
    description: "Scrapes virtual judge profiles using HTTP clients, parsing HTML markup to isolate submission histories.",
    role: "Retrieves cross-platform solved counts not supported by standard APIs.",
  },
  AtCoder: {
    title: "AtCoder Parser Node",
    shortTitle: "AtCoder Scraper",
    icon: <TerminalIcon />,
    description: "Tracks Japanese programming contest standings, parsing contest results and daily submission metrics.",
    role: "Monitors participant contest performance scores on Japanese formats.",
  },
  lightoj: {
    title: "LightOJ API/HTML Parser",
    shortTitle: "LightOJ Scraper",
    icon: <TerminalIcon />,
    description: "Crawls regional LightOJ profiles via structured APIs and HTML DOM parsing to extract solve counts.",
    role: "Captures local database submission deltas for bootcampers.",
  },
};

export const workflows = {
  crawler_sync: {
    title: "Automated Scraper Crawler Pipeline",
    shortTitle: "Scraper Flow",
    icon: <ScraperIcon />,
    description: "Triggers background ingestion runs to synchronize students' latest online judge submissions.",
    steps: [
      { label: "Load Handles Queue", text: "Queries the MySQL database to pull all active user handles for Codeforces, Vjudge, AtCoder, and LightOJ." },
      { label: "Fetch Online Judges", text: "Triggers asynchronous curl request pipelines with custom request headers and proxy node rotation." },
      { label: "Parse Solve Statistics", text: "Extracts user solve counts, verified submission IDs, and problem timestamps from JSON payloads and HTML blocks." },
      { label: "Incremental DB Update", text: "Filters out previously logged submissions and commits new unique solved records, incrementing daily deltas." }
    ],
    payload: {
      activeHandles: 1450,
      platforms: ["codeforces", "vjudge", "AtCoder", "lightoj"],
      schedulerCron: "Every 6 Hours"
    },
    responsePayload: {
      newSubmissionsCrawled: 480,
      errorsEncountered: 0,
      databaseSyncTimeMs: 145
    }
  },
  leaderboard_compile: {
    title: "Live Leaderboard Compilation Pipeline",
    shortTitle: "Leaderboard",
    icon: <RankingIcon />,
    description: "Re-calculates active bootcamp student scores and ranks based on solved problems within date boundaries.",
    steps: [
      { label: "Fetch Batch Bounds", text: "Loads start and end timestamps for the selected active bootcamp batch." },
      { label: "Sum Submissions", text: "Queries the submissions log to aggregate all accepted (AC) verdicts matching registered user handles." },
      { label: "Apply Multipliers", text: "Calculates rank points using platform scoring weights and deducts penalties for late submissions." },
      { label: "Redis Cache Warmup", text: "Updates active rank indices in MySQL and refreshes the Redis cache to serve fast leaderboard endpoints." }
    ],
    payload: {
      batchId: 4,
      scoringWeights: { codeforces: 1.0, vjudge: 0.8, lightoj: 1.2, AtCoder: 0.9 },
      rankLimit: 200
    },
    responsePayload: {
      totalStudentsRanked: 180,
      redisWarmupStatus: "SUCCESS",
      executionTimeMs: 22
    }
  },
  verification_flow: {
    title: "Onboarding Handle Verification Flow",
    shortTitle: "Onboarding",
    icon: <GroupIcon />,
    description: "Verifies that newly submitted student handles are active and exist on the targeted online judges.",
    steps: [
      { label: "Submit Registration", text: "Student submits their signup form with name, email, batch, and online judge handles." },
      { label: "Ping Platforms", text: "API backend calls external judge user APIs to verify the profile handle's existence." },
      { label: "Verify Integrity", text: "Returns validation responses. If handle is invalid, alerts user immediately to update registration." },
      { label: "Activate Profile", text: "Marks handles as verified in database, initiates initial crawl to fetch existing solve history." }
    ],
    payload: {
      studentEmail: "student@nsu.edu",
      handlesSubmitted: { codeforces: "tourist", vjudge: "v_user1" }
    },
    responsePayload: {
      handlesVerified: { codeforces: true, vjudge: true },
      onboardingStatus: "COMPLETED",
      initialSolveCount: 1820
    }
  }
};

export const conceptualSchemas = {
  "Bootcamp Core": {
    description: "Manages student enrollments, attendance, mentor links, and batch calendars.",
    sections: [
      { name: "Participants", fields: ["participant_id (PK)", "name", "email", "batch_id (FK)", "registered_at"] },
      { name: "Bootcamp Batches", fields: ["batch_id (PK)", "batch_name", "start_date", "end_date", "active_status"] },
      { name: "Registrations", fields: ["registration_id (PK)", "participant_id (FK)", "payment_status", "verified_by_admin_id", "approved_at"] },
      { name: "Attendance Records", fields: ["attendance_id (PK)", "participant_id (FK)", "session_date", "status_present", "notes"] },
      { name: "Instructors", fields: ["instructor_id (PK)", "name", "email", "specialty_topic"] },
      { name: "Mentor Assignments", fields: ["assignment_id (PK)", "participant_id (FK)", "instructor_id (FK)", "assigned_date"] },
      { name: "Batch Calendars", fields: ["calendar_id (PK)", "batch_id (FK)", "class_title", "schedule_time", "room_location"] }
    ]
  },
  "Scraper Registry": {
    description: "Coordinates judge credentials, platform settings, rate limit configs, and proxies.",
    sections: [
      { name: "OJ Handles", fields: ["handle_id (PK)", "participant_id (FK)", "platform_id (FK)", "handle_username", "is_verified"] },
      { name: "OJ Platforms", fields: ["platform_id (PK)", "platform_name", "base_api_url", "is_active_scraping"] },
      { name: "Credentials", fields: ["credential_id (PK)", "platform_id (FK)", "api_key_encrypted", "secret_token", "rotated_at"] },
      { name: "Platform Configs", fields: ["config_id (PK)", "platform_id (FK)", "scraping_interval_seconds", "parser_type (JSON/HTML)", "timeout_ms"] },
      { name: "Proxy Nodes", fields: ["proxy_id (PK)", "ip_address", "port", "auth_credentials", "health_status_active"] },
      { name: "Rate Limit Rules", fields: ["rule_id (PK)", "platform_id (FK)", "max_requests_per_min", "cool_down_duration_seconds"] },
      { name: "Crawler Whitelists", fields: ["whitelist_id (PK)", "platform_id (FK)", "whitelisted_domain_or_ip", "granted_date"] }
    ]
  },
  "Submissions Tracker": {
    description: "Stores individual crawled solves, problems library, verdicts, and categories.",
    sections: [
      { name: "Crawled Submissions", fields: ["submission_id (PK)", "handle_id (FK)", "problem_id (FK)", "submission_time", "verdict_id (FK)", "execution_time_ms"] },
      { name: "Problems Library", fields: ["problem_id (PK)", "platform_id (FK)", "problem_code", "title", "difficulty_score"] },
      { name: "Problem Categories", fields: ["category_id (PK)", "category_name", "description"] },
      { name: "Submission Verdicts", fields: ["verdict_id (PK)", "verdict_code (AC/WA/TLE)", "description_name"] },
      { name: "Difficulty Mappings", fields: ["mapping_id (PK)", "problem_id (FK)", "category_id (FK)", "assigned_by_admin_id"] },
      { name: "Solve Achievements", fields: ["achievement_id (PK)", "participant_id (FK)", "badge_name", "earned_date", "solve_count_threshold"] },
      { name: "Language Statistics", fields: ["stat_id (PK)", "handle_id (FK)", "programming_language", "total_submissions_count"] }
    ]
  },
  "Leaderboards & Scoring": {
    description: "Aggregates rankings, points multipliers, penalty deductions, and snapshots.",
    sections: [
      { name: "Leaderboard Ranks", fields: ["rank_id (PK)", "participant_id (FK)", "batch_id (FK)", "total_solved_count", "current_rank", "last_updated"] },
      { name: "Scoring Multipliers", fields: ["multiplier_id (PK)", "platform_id (FK)", "multiplier_factor", "is_active"] },
      { name: "Monthly Points", fields: ["point_id (PK)", "participant_id (FK)", "month_year", "points_earned", "bonus_points"] },
      { name: "Leaderboard Snapshots", fields: ["snapshot_id (PK)", "batch_id (FK)", "snapshot_date", "top_participant_id", "serialized_rankings_json"] },
      { name: "Penalty Exceptions", fields: ["exception_id (PK)", "participant_id (FK)", "reason_label", "waived_points", "approved_at"] },
      { name: "Contest Integrations", fields: ["contest_id (PK)", "batch_id (FK)", "external_contest_url", "contest_date", "max_solves"] },
      { name: "User Tier Ranks", fields: ["tier_id (PK)", "participant_id (FK)", "tier_level (BRONZE/SILVER/GOLD)", "updated_at"] }
    ]
  },
  "Activity Analytics": {
    description: "Monitors crawler logs, daily solve deltas, health trends, and contribution grids.",
    sections: [
      { name: "Daily Solved Stats", fields: ["stat_id (PK)", "participant_id (FK)", "date_day", "solve_count_delta", "submission_count_delta"] },
      { name: "Weekly Summaries", fields: ["summary_id (PK)", "batch_id (FK)", "week_start_date", "total_batch_solves", "active_participants_count"] },
      { name: "System Health Logs", fields: ["log_id (PK)", "log_level (INFO/ERROR)", "message_text", "logged_at", "module_context"] },
      { name: "Activity Contribution Grids", fields: ["grid_id (PK)", "participant_id (FK)", "year_number", "contribution_map_blob"] },
      { name: "User Engagement Scores", fields: ["score_id (PK)", "participant_id (FK)", "engagement_score", "daily_streak_count", "max_streak"] },
      { name: "Crawler Job Schedules", fields: ["job_id (PK)", "cron_expression", "is_enabled", "last_run_time", "next_run_time"] },
      { name: "Run Audits", fields: ["audit_id (PK)", "job_id (FK)", "status_state", "items_processed", "duration_seconds"] }
    ]
  }
};
