import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";
import { Schema as SchemaIcon } from "@mui/icons-material";

const schemasData = {
  "Bootcamp Core": {
    description: "Database configurations mapping participant profiles, bootcamp batches, registrations, attendance, and calendars.",
    tables: [
      { title: "Bootcamp Batches", fields: ["batch_id (PK)", "batch_name", "start_date", "end_date", "active_status"], x: 30, y: 10, w: 180 },
      { title: "Participants", fields: ["participant_id (PK)", "name", "email", "batch_id (FK)", "registered_at"], x: 30, y: 160, w: 180 },
      { title: "Registrations", fields: ["registration_id (PK)", "participant_id (FK)", "payment_status", "verified_by_admin_id", "approved_at"], x: 250, y: 10, w: 180 },
      { title: "Attendance Records", fields: ["attendance_id (PK)", "participant_id (FK)", "session_date", "status_present", "notes"], x: 250, y: 195, w: 180 },
      { title: "Instructors", fields: ["instructor_id (PK)", "name", "email", "specialty_topic"], x: 470, y: 10, w: 180 },
      { title: "Mentor Assignments", fields: ["assignment_id (PK)", "participant_id (FK)", "instructor_id (FK)", "assigned_date"], x: 470, y: 175, w: 180 },
      { title: "Batch Calendars", fields: ["calendar_id (PK)", "batch_id (FK)", "class_title", "schedule_time", "room_location"], x: 690, y: 10, w: 180 }
    ],
    connections: [
      { path: "M 120 132 V 160" }, // Batches -> Participants
      { path: "M 210 205 H 230 V 70 H 250" }, // Participants -> Registrations
      { path: "M 210 205 H 230 V 230 H 250" }, // Participants -> Attendance
      { path: "M 210 205 H 230 V 175 H 450 V 235 H 470" }, // Participants -> Mentor Assignments
      { path: "M 560 115 V 175" }, // Instructors -> Mentor Assignments
      { path: "M 210 70 H 690" } // Batches -> Calendars
    ]
  },
  "Scraper Registry": {
    description: "Database configurations managing scraper engine handles, judge APIs, proxies, and crawler parameters.",
    tables: [
      { title: "OJ Platforms", fields: ["platform_id (PK)", "platform_name", "base_api_url", "is_active_scraping"], x: 30, y: 10, w: 180 },
      { title: "OJ Handles", fields: ["handle_id (PK)", "participant_id (FK)", "platform_id (FK)", "handle_username", "is_verified"], x: 30, y: 160, w: 180 },
      { title: "Credentials", fields: ["credential_id (PK)", "platform_id (FK)", "api_key_encrypted", "secret_token", "rotated_at"], x: 250, y: 10, w: 180 },
      { title: "Platform Configs", fields: ["config_id (PK)", "platform_id (FK)", "scraping_interval_seconds", "parser_type", "timeout_ms"], x: 250, y: 195, w: 180 },
      { title: "Proxy Nodes", fields: ["proxy_id (PK)", "ip_address", "port", "auth_credentials", "health_status_active"], x: 470, y: 10, w: 180 },
      { title: "Rate Limit Rules", fields: ["rule_id (PK)", "platform_id (FK)", "max_requests_per_min", "cool_down_duration"], x: 470, y: 175, w: 180 },
      { title: "Crawler Whitelists", fields: ["whitelist_id (PK)", "platform_id (FK)", "whitelisted_domain_or_ip", "granted_date"], x: 690, y: 10, w: 180 }
    ],
    connections: [
      { path: "M 120 132 V 160" }, // Platforms -> Handles
      { path: "M 210 70 H 250" }, // Platforms -> Credentials
      { path: "M 210 70 H 230 V 230 H 250" }, // Platforms -> Configs
      { path: "M 210 70 H 230 V 175 H 450 V 235 H 470" }, // Platforms -> Rate Limits
      { path: "M 210 70 H 690" } // Platforms -> Whitelists
    ]
  },
  "Submissions Tracker": {
    description: "Database configurations managing crawled student solutions, problem lists, categories, and statistics.",
    tables: [
      { title: "Problems Library", fields: ["problem_id (PK)", "platform_id (FK)", "problem_code", "title", "difficulty_score"], x: 30, y: 10, w: 180 },
      { title: "Crawled Submissions", fields: ["submission_id (PK)", "handle_id (FK)", "problem_id (FK)", "submission_time", "verdict_id (FK)"], x: 30, y: 160, w: 180 },
      { title: "Problem Categories", fields: ["category_id (PK)", "category_name", "description"], x: 250, y: 10, w: 180 },
      { title: "Submission Verdicts", fields: ["verdict_id (PK)", "verdict_code", "description_name"], x: 250, y: 195, w: 180 },
      { title: "Difficulty Mappings", fields: ["mapping_id (PK)", "problem_id (FK)", "category_id (FK)", "assigned_by_admin_id"], x: 470, y: 10, w: 180 },
      { title: "Solve Achievements", fields: ["achievement_id (PK)", "participant_id (FK)", "badge_name", "earned_date"], x: 470, y: 175, w: 180 },
      { title: "Language Statistics", fields: ["stat_id (PK)", "handle_id (FK)", "programming_language", "total_submissions"], x: 690, y: 10, w: 180 }
    ],
    connections: [
      { path: "M 120 132 V 160" }, // Problems -> Submissions
      { path: "M 210 205 H 250" }, // Submissions -> Verdicts
      { path: "M 210 70 H 470" }, // Problems -> Difficulty Mappings
      { path: "M 430 70 H 470" }, // Categories -> Difficulty Mappings
      { path: "M 210 205 H 230 V 175 H 450 V 235 H 470" }, // Submissions -> Achievements
      { path: "M 210 205 H 230 V 155 H 670 V 70 H 690" } // Submissions -> Language Stats
    ]
  },
  "Leaderboards & Scoring": {
    description: "Database configurations managing active rank leaderboards, penalty calculations, points snapshots, and tiers.",
    tables: [
      { title: "Scoring Multipliers", fields: ["multiplier_id (PK)", "platform_id (FK)", "multiplier_factor", "is_active"], x: 30, y: 10, w: 180 },
      { title: "Leaderboard Ranks", fields: ["rank_id (PK)", "participant_id (FK)", "batch_id (FK)", "total_solved_count", "current_rank"], x: 30, y: 160, w: 180 },
      { title: "Monthly Points", fields: ["point_id (PK)", "participant_id (FK)", "month_year", "points_earned", "bonus_points"], x: 250, y: 10, w: 180 },
      { title: "Leaderboard Snapshots", fields: ["snapshot_id (PK)", "batch_id (FK)", "snapshot_date", "top_participant_id"], x: 250, y: 195, w: 180 },
      { title: "Penalty Exceptions", fields: ["exception_id (PK)", "participant_id (FK)", "reason_label", "waived_points"], x: 470, y: 10, w: 180 },
      { title: "Contest Integrations", fields: ["contest_id (PK)", "batch_id (FK)", "external_contest_url", "contest_date"], x: 470, y: 175, w: 180 },
      { title: "User Tier Ranks", fields: ["tier_id (PK)", "participant_id (FK)", "tier_level", "updated_at"], x: 690, y: 10, w: 180 }
    ],
    connections: [
      { path: "M 120 132 V 160" }, // Multipliers -> Ranks
      { path: "M 210 205 H 230 V 70 H 250" }, // Ranks -> Monthly Points
      { path: "M 210 205 H 230 V 230 H 250" }, // Ranks -> Snapshots
      { path: "M 210 205 H 230 V 175 H 450 V 235 H 470" }, // Ranks -> Penalty Exceptions
      { path: "M 210 205 H 230 V 155 H 670 V 70 H 690" } // Ranks -> User Tiers
    ]
  },
  "Activity Analytics": {
    description: "Database configurations managing health logs, run audits, streak tracking, and crawler timers.",
    tables: [
      { title: "Weekly Summaries", fields: ["summary_id (PK)", "batch_id (FK)", "week_start_date", "total_batch_solves"], x: 30, y: 10, w: 180 },
      { title: "Daily Solved Stats", fields: ["stat_id (PK)", "participant_id (FK)", "date_day", "solve_count_delta", "submission_delta"], x: 30, y: 160, w: 180 },
      { title: "System Health Logs", fields: ["log_id (PK)", "log_level", "message_text", "logged_at", "module_context"], x: 250, y: 10, w: 180 },
      { title: "Activity Grids", fields: ["grid_id (PK)", "participant_id (FK)", "year_number", "contribution_map_blob"], x: 250, y: 195, w: 180 },
      { title: "User Engagement", fields: ["score_id (PK)", "participant_id (FK)", "engagement_score", "daily_streak_count"], x: 470, y: 10, w: 180 },
      { title: "Crawler Job Schedules", fields: ["job_id (PK)", "cron_expression", "is_enabled", "last_run_time"], x: 470, y: 175, w: 180 },
      { title: "Run Audits", fields: ["audit_id (PK)", "job_id (FK)", "status_state", "items_processed"], x: 690, y: 10, w: 180 }
    ],
    connections: [
      { path: "M 120 132 V 160" }, // Weekly -> Daily Stats
      { path: "M 210 205 H 250" }, // Daily Stats -> Activity Grids
      { path: "M 210 205 H 230 V 70 H 250" }, // Daily Stats -> User Engagement
      { path: "M 650 235 H 670 V 70 H 690" } // Job Schedules -> Run Audits
    ]
  }
};

const renderTableCardInSvg = (tbl, theme, primaryColor) => {
  const headerHeight = 32;
  const isLight = theme.palette.mode === "light";
  const cardBg = isLight ? "rgba(255, 255, 255, 0.95)" : "rgba(30, 41, 59, 0.9)";
  const headerBg = isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)";

  const nodeHeight = headerHeight + 8 + tbl.fields.length * 18 + 10;

  return (
    <g key={tbl.title}>
      {/* Card shadow */}
      <rect
        x={tbl.x + 2}
        y={tbl.y + 2}
        width={tbl.w}
        height={nodeHeight}
        rx={8}
        fill="rgba(0,0,0,0.15)"
        style={{ filter: "blur(2px)" }}
      />
      {/* Card border */}
      <rect
        x={tbl.x}
        y={tbl.y}
        width={tbl.w}
        height={nodeHeight}
        rx={8}
        fill={cardBg}
        stroke={primaryColor}
        strokeWidth={1.5}
      />
      {/* Header */}
      <path
        d={`M ${tbl.x} ${tbl.y + 8} A 8 8 0 0 1 ${tbl.x + 8} ${tbl.y} L ${tbl.x + tbl.w - 8} ${tbl.y} A 8 8 0 0 1 ${tbl.x + tbl.w} ${tbl.y + 8} L ${tbl.x + tbl.w} ${tbl.y + headerHeight} L ${tbl.x} ${tbl.y + headerHeight} Z`}
        fill={headerBg}
      />
      <text
        x={tbl.x + 12}
        y={tbl.y + 20}
        fill={theme.palette.text.primary}
        fontWeight="800"
        fontSize="10"
        fontFamily="Inter, sans-serif"
      >
        {tbl.title}
      </text>

      {/* Fields list */}
      {tbl.fields.map((field, idx) => {
        const fieldY = tbl.y + headerHeight + 16 + idx * 18;
        const isPk = field.includes("(PK)");
        const isFk = field.includes("(FK)");

        return (
          <g key={idx}>
            <text
              x={tbl.x + 12}
              y={fieldY}
              fill={isPk ? "#10b981" : isFk ? "#ef4444" : theme.palette.text.secondary}
              fontWeight={isPk || isFk ? "800" : "500"}
              fontSize="8.5"
              fontFamily="monospace"
            >
              {field}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const SchemaSection = ({ theme, activeTable, setActiveTable }) => {
  const currentSchema = schemasData[activeTable] || schemasData["Bootcamp Core"];
  const primaryColor = theme.palette.mode === "light" ? "#4F46E5" : "#818CF8";

  return (
    <Box id="database" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>Schema Mapping & Data Integrity</SectionHeading>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 800, lineHeight: 1.7 }}>
        Bootcamp records, crawler targets, solve tracking statistics, and user activities are mapped to structured schemas.
        Below are interactive Entity-Relationship (ER) diagrams illustrating Eucaps' table scopes.
      </Typography>

      {/* Document Tab Switcher */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          borderRadius: 2,
          p: 0.5,
          mb: 3.5,
          gap: { xs: 0.5, sm: 0 },
          backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}`,
          width: { xs: "100%", sm: "fit-content" },
        }}
      >
        {Object.keys(schemasData).map((key) => {
          const isActive = activeTable === key;
          return (
            <Button
              key={key}
              onClick={() => setActiveTable(key)}
              size="small"
              sx={{
                flex: { xs: "1 1 auto", sm: "initial" },
                textTransform: "none",
                fontWeight: isActive ? 800 : 600,
                fontSize: "0.8rem",
                borderRadius: 1.5,
                px: 2.5,
                py: 0.8,
                backgroundColor: isActive ? theme.palette.primary.main : "transparent",
                color: isActive ? "#FFF" : "text.secondary",
                "&:hover": {
                  backgroundColor: isActive ? theme.palette.primary.main : theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
                  transform: "none",
                  boxShadow: "none",
                },
              }}
            >
              {key}
            </Button>
          );
        })}
      </Box>

      {/* ER Diagram Container */}
      <GlassCard sx={{ p: 3.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <SchemaIcon color="primary" sx={{ fontSize: 20 }} />
          {activeTable} ER Diagram Mappings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {currentSchema.description}
        </Typography>

        <DiagramBoard>
          <Box sx={{ overflowX: "auto", width: "100%", "&::-webkit-scrollbar": { height: 6 } }}>
            <Box sx={{ minWidth: 900 }}>
              <svg
                width="100%"
                viewBox="0 0 920 340"
                style={{ display: "block", maxWidth: "100%", height: "auto" }}
              >
                <defs>
                  <marker id="erDot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6">
                    <circle cx="5" cy="5" r="3" fill={primaryColor} />
                  </marker>
                </defs>

                {/* Connection lines representing relationships */}
                {currentSchema.connections.map((conn, idx) => (
                  <path
                    key={idx}
                    d={conn.path}
                    stroke={primaryColor}
                    strokeWidth={1.5}
                    fill="none"
                    markerEnd="url(#erDot)"
                    strokeDasharray="4,4"
                  />
                ))}

                {/* Draw the entity blocks/tables */}
                {currentSchema.tables.map((tbl) => renderTableCardInSvg(tbl, theme, primaryColor))}
              </svg>
            </Box>
          </Box>
        </DiagramBoard>
      </GlassCard>
    </Box>
  );
};

export default SchemaSection;
