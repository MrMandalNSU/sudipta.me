import React, { useState } from "react";
import { Box, Button, Typography, Paper, Chip, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GlassCard, SectionHeading, DiagramBoard } from "./styles";
import { conceptualSchemas } from "./constants";
import {
  Schema as SchemaIcon,
  Storage as BlockIcon,
  Link as LinkIcon,
} from "@mui/icons-material";

// ER Diagram label to conceptual schemas entity mapping
const tableKeyMapping = {
  "Sport": "Sport",
  "League": "League",
  "Country": "Country",
  "Team": "Team",
  "Venue": "Venue",
  "Player": "Player",
  "Event": "Event",
  "TV Event": "TV Event",
  "Finished/Upcoming Item Overrides": "Finished/Upcoming Item Overrides",
  "OverrideItem": "Finished/Upcoming Item Overrides",
  "Section Control": "Section Control",
  "Ticker Config": "Ticker Config",
  "Ad Creative & Placement": "Ad Creative & Placement",
  "Hero Config": "Hero Config",
  "Trending": "Trending",
  "Search Tracking": "Search Tracking",
  "User Favorite": "User Favorite",
  "UserFavorite": "User Favorite",
  "Notification Preference": "Notification Preference",
  "Notification": "Notification Preference",
  "User": "User"
};

// Setup flattened lookup table for entities
const allEntities = {};
Object.entries(conceptualSchemas).forEach(([category, catData]) => {
  Object.entries(catData.entities).forEach(([entityName, fields]) => {
    allEntities[entityName] = {
      category,
      description: catData.description,
      fields: fields.map(f => ({ name: f.name, type: f.type }))
    };
  });
});

const entityLookup = {
  ...allEntities,
  "User": {
    category: "Analytics & User",
    description: "Core authentication user accounts mapping logins, authentication credentials, and user preferences.",
    fields: [
      { name: "id", type: "integer (unique, PK)" },
      { name: "email", type: "string (unique, UK)" },
      { name: "username", type: "string" },
      { name: "confirmed", type: "boolean" },
      { name: "blocked", type: "boolean" },
      { name: "favorites", type: "Relation (oneToMany) to User Favorite" },
      { name: "notificationPreference", type: "Relation (oneToOne) to Notification Preference" }
    ]
  }
};

// Setup relationships lookup mapping for dynamic buttons
const tableRelations = {
  "Sport": ["League", "User Favorite"],
  "League": ["Sport", "Country", "Team", "Event", "User Favorite"],
  "Country": ["League", "User Favorite"],
  "Team": ["League", "Venue", "Player", "User Favorite"],
  "Venue": ["Team"],
  "Player": ["Team", "User Favorite"],
  "Event": ["League", "TV Event", "Finished/Upcoming Item Overrides", "User Favorite"],
  "TV Event": ["Event"],
  "Finished/Upcoming Item Overrides": ["Event"],
  "User": ["User Favorite", "Notification Preference"],
  "User Favorite": ["User", "Sport", "League", "Team", "Country", "Event", "Player"],
  "Notification Preference": ["User"],
  "Trending": ["Sport", "League", "Team", "Country"],
  "Search Tracking": ["User", "League", "Team"]
};

const entityTaglines = {
  "Sport": "Defines athletic catalogs (e.g. Football, Basketball) and active display states.",
  "League": "Represents regional/global tournaments with badges, logos, and country linkages.",
  "Country": "Stores country codes, localized names, flags, and related athletic divisions.",
  "Team": "Captures sports teams roster metadata, primary brand colors, and home venues.",
  "Venue": "Tracks stadium location details, timezone settings, and seating capacity.",
  "Player": "Maps active sports players, field positions, and roster memberships.",
  "Event": "Stores live match events, dates, scores, and status updates.",
  "TV Event": "Links broadcaster details and live scheduling data to specific matches.",
  "Finished/Upcoming Item Overrides": "Manages promotional tiles, custom card colors, and manual score overrides.",
  "User": "Authenticates user registrations, OTP tokens, and account permission states.",
  "User Favorite": "Bookmarks favorite leagues, sports, teams, and events for user dashboards.",
  "Notification Preference": "Manages user-configured email notifications and digest frequencies.",
  "Trending": "Calculates real-time trending scores and hot indicators for sports entities.",
  "Search Tracking": "Logs search inputs, user device user-agents, and search filtering stats.",
  "Navbar Config": "Admin-managed top navigation settings controlling menus and social redirects.",
  "Logo Config": "Dynamic header/footer logo assets, size properties, and color branding variables.",
  "Searchbar Config": "Configures search input suggestions, history limits, and placeholders.",
  "Fixtures Results Config": "Controls date range scopes, pagination size, and live scoreboard flags.",
  "Popular Competitions Config": "Manages order and visibility constraints for league tables.",
  "News Section Config": "Configures article counts, categories, and scroll styles for home news.",
  "Sync Status": "Displays execution status, history, and diagnostic logs for background synchronization workers.",
  "Sports Grid Config": "Manages categories structure, card filters, and grid columns on the home page.",
  "Notification System Setting": "Manages Firebase credentials and global push notification templates.",
  "Finished Event Setting": "Manages query scope and archive depth for retrieving completed matches.",
  "All Events Setting": "Controls calendar display thresholds and date-grouping settings.",
  "Todays Highlights Setting": "Manages highlight slider controls, scroll parameters, and source leagues.",
  "Upcoming Event Setting": "Configures display thresholds and filters for upcoming matches.",
  "Top Live Setting": "Controls live refresh intervals and score flash behaviors.",
  "Top League Small Config": "Configures list limit constraints and display icons for sidebar leagues.",
  "Section Control": "Tracks visible status, reordering sequences, and brand feature colors for home sections.",
  "Hero Config": "Manages landing page title headers, background media elements, and search display toggles.",
  "Ad Creative & Placement": "Stores advertisements, script code insertions, campaign IDs, CPM values, and display placements.",
  "Ticker Config": "Manages breaking news ticker scroll speeds, alert theme colors, active league scopes, and sync intervals."
};

const getKeyType = (field) => {
  const name = field.name.toLowerCase();
  const type = field.type.toLowerCase();
  if (type.includes("pk") || name === "idsport" || name === "idleague" || name === "idteam" || name === "idplayer" || name === "idvenue" || name === "idevent" || name === "idbroadcast" || name === "id") return "PK";
  if (type.includes("fk") || type.includes("relation") || name.endsWith("ref") || name.startsWith("id")) return "FK";
  if (type.includes("unique")) return "UK";
  return null;
};

const SchemaSection = ({ theme, activeTable: activeTab, setActiveTable: setActiveTab }) => {
  const [selectedTable, setSelectedTable] = useState("Sport");
  const primaryColor = theme.palette.mode === "light" ? "#4F46E5" : "#818CF8";
  
  const activeTableKey = tableKeyMapping[selectedTable] || selectedTable;
  const activeTableData = entityLookup[activeTableKey] || { category: "Unknown", description: "No description available", fields: [] };
  const activeTableRelations = tableRelations[activeTableKey] || [];

  const handleTableSelect = (tableName) => {
    setSelectedTable(tableName);
    // Automatically switch tabs if they clicked a table that belongs to a different domain tab
    const mappedKey = tableKeyMapping[tableName] || tableName;
    const info = entityLookup[mappedKey];
    if (info && info.category && activeTab !== "ER Relationships") {
      setActiveTab(info.category);
    }
  };

  const renderTableCard = (entityName, fields) => {
    const isSelected = selectedTable === entityName;
    const totalFields = fields.length;
    let pkCount = 0;
    let fkCount = 0;
    let ukCount = 0;
    fields.forEach((f) => {
      const keyType = getKeyType(f);
      if (keyType === "PK") pkCount++;
      else if (keyType === "FK") fkCount++;
      else if (keyType === "UK") ukCount++;
    });
    const relations = tableRelations[entityName] || [];

    return (
      <Paper
        variant="outlined"
        onClick={() => setSelectedTable(entityName)}
        sx={{
          p: 2.2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 2.5,
          backgroundColor: isSelected
            ? (theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.02)" : "rgba(129, 140, 248, 0.06)")
            : (theme.palette.mode === "light" ? "rgba(0,0,0,0.01)" : "rgba(255,255,255,0.01)"),
          border: `1px solid ${isSelected ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)")}`,
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            borderColor: primaryColor,
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
          }
        }}
      >
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 800, mb: 1.5, display: "flex", alignItems: "center", gap: 1, color: isSelected ? "primary.main" : "text.primary" }}>
            <BlockIcon color={isSelected ? "primary" : "action"} sx={{ fontSize: 16 }} />
            {entityName} Entity
          </Typography>
          
          {/* Table Description Tagline */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              fontSize: "0.82rem",
              lineHeight: 1.5,
              minHeight: 36,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {entityTaglines[entityName] || "No description available."}
          </Typography>

          {/* Table Metrics Summary */}
          <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mb: 1.5 }}>
            <Chip
              label={`${totalFields} Fields`}
              size="small"
              sx={{
                height: 18,
                fontSize: "0.65rem",
                fontWeight: 700,
                backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)",
                color: "text.secondary",
                borderRadius: 1
              }}
            />
            {pkCount > 0 && (
              <Chip
                label="PK"
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  borderRadius: 1
                }}
              />
            )}
            {fkCount > 0 && (
              <Chip
                label={`${fkCount} FK${fkCount > 1 ? "s" : ""}`}
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  color: "#ef4444",
                  borderRadius: 1
                }}
              />
            )}
            {ukCount > 0 && (
              <Chip
                label={`${ukCount} UK${ukCount > 1 ? "s" : ""}`}
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  backgroundColor: "rgba(245, 158, 11, 0.15)",
                  color: "#f59e0b",
                  borderRadius: 1
                }}
              />
            )}
          </Stack>
        </Box>

        {/* Interactive Clickable Relationships */}
        {relations.length > 0 && (
          <Box
            sx={{
              mt: 1.5,
              pt: 1.5,
              borderTop: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}`
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                fontSize: "0.62rem",
                display: "block",
                mb: 1
              }}
            >
              Relations
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.5}>
              {relations.map((rel) => (
                <Box
                  key={rel}
                  onClick={(e) => {
                    e.stopPropagation(); // Avoid triggering card parent select state
                    handleTableSelect(rel);
                  }}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    px: 0.8,
                    py: 0.2,
                    borderRadius: 1,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    border: `1px solid ${theme.palette.mode === "light" ? "rgba(79,70,229,0.12)" : "rgba(129,140,248,0.15)"}`,
                    color: "primary.main",
                    backgroundColor: theme.palette.mode === "light" ? "#fff" : "rgba(15,23,42,0.4)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)",
                      transform: "translateY(-1px)"
                    }
                  }}
                >
                  → {rel}
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Paper>
    );
  };

  return (
    <Box id="database" sx={{ scrollMarginTop: 120, mb: 5 }}>
      <SectionHeading theme={theme}>Database Schema Mapping</SectionHeading>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 800, lineHeight: 1.7 }}>
        Sportsfixtures features a highly normalized, relational database design mapping over 50 Strapi content-types.
        Click any database table or entity block below to inspect its attributes, relationships, and constraint keys.
      </Typography>

      {/* Selected Table Detail Card */}
      <GlassCard sx={{ p: 3.5, mb: 4, minHeight: { md: 240 } }}>
        <Box sx={{ mb: 2.5, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 1.5 }}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary" }}>
                {activeTableKey} Entity
              </Typography>
              <Chip
                label={activeTableData.category}
                size="small"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  borderRadius: 1,
                  backgroundColor: theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.12)",
                  color: "primary.main",
                  border: "none",
                }}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, maxWidth: 850 }}>
              {entityTaglines[activeTableKey] || activeTableData.description}
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", letterSpacing: "1px", display: "block", mb: 1.5 }}>
          Fields & Constraints
        </Typography>
        
        <Grid container spacing={1.5} sx={{ mb: activeTableRelations.length > 0 ? 3 : 0 }}>
          {activeTableData.fields.map((field, idx) => {
            const keyType = getKeyType(field);
            return (
              <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 1.5,
                    border: `1px solid ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)"}`,
                    backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.01)" : "rgba(255, 255, 255, 0.01)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "monospace", fontSize: "0.8rem", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {field.name}
                    </Typography>
                    {keyType && (
                      <Chip
                        label={keyType}
                        size="small"
                        sx={{
                          height: 16,
                          fontSize: "0.55rem",
                          fontWeight: 800,
                          borderRadius: 0.5,
                          px: 0.5,
                          backgroundColor: keyType === "PK"
                            ? "rgba(16, 185, 129, 0.15)"
                            : keyType === "UK"
                              ? "rgba(245, 158, 11, 0.15)"
                              : "rgba(239, 68, 68, 0.15)",
                          color: keyType === "PK"
                            ? "#10b981"
                            : keyType === "UK"
                              ? "#f59e0b"
                              : "#ef4444",
                        }}
                      />
                    )}
                  </Stack>
                  <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace", fontSize: "0.72rem", textAlign: "right" }}>
                    {field.type}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Relations Section */}
        {activeTableRelations.length > 0 && (
          <Box
            sx={{
              p: 2,
              mt: 2,
              borderRadius: 2,
              backgroundColor: theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.04)" : "rgba(129, 140, 248, 0.08)",
              border: `1px solid ${primaryColor}`,
              boxShadow: `0 4px 12px ${theme.palette.mode === "light" ? "rgba(79,70,229,0.06)" : "rgba(129,140,248,0.08)"}`,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "1px",
                display: "block",
                mb: 1.2,
                fontSize: "0.72rem"
              }}
            >
              Relations for {activeTableKey}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {activeTableRelations.map((rel) => (
                <Button
                  key={rel}
                  onClick={() => handleTableSelect(rel)}
                  size="small"
                  startIcon={<LinkIcon sx={{ fontSize: 14 }} />}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    borderRadius: 1.5,
                    px: 1.5,
                    py: 0.4,
                    border: `1px solid ${theme.palette.mode === "light" ? "rgba(79,70,229,0.15)" : "rgba(129,140,248,0.15)"}`,
                    color: "primary.main",
                    backgroundColor: theme.palette.mode === "light" ? "#fff" : "rgba(15,23,42,0.4)",
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

      {/* Domain Category Switcher */}
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
        {["ER Relationships", ...Object.keys(conceptualSchemas)].map((categoryName) => {
          const isActive = activeTab === categoryName;
          return (
            <Button
              key={categoryName}
              onClick={() => {
                setActiveTab(categoryName);
                if (categoryName !== "ER Relationships") {
                  // Reset selection to the first table in that domain
                  const firstTable = Object.keys(conceptualSchemas[categoryName].entities)[0];
                  if (firstTable) setSelectedTable(firstTable);
                }
              }}
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
              {categoryName}
            </Button>
          );
        })}
      </Box>

      {/* Conditional Rendering: Grid of Cards vs ER SVG Diagram */}
      {activeTab === "ER Relationships" ? (
        <GlassCard sx={{ p: 3.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, display: "flex", alignItems: "center", gap: 1, color: "text.primary" }}>
            <LinkIcon color="primary" sx={{ fontSize: 20 }} />
            Database Entity Relationship Diagram
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            A nested visual layout illustrating relationships. Click any schema node to display details inside the viewer card at the top.
          </Typography>

          <DiagramBoard>
            <Box sx={{ overflowX: "auto", minWidth: 800 }}>
              <svg
                width="100%"
                viewBox="0 0 1300 800"
                style={{ display: "block", maxWidth: "100%", height: "auto" }}
              >
                <defs>
                  <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6">
                    <circle cx="5" cy="5" r="3.5" fill={primaryColor} />
                  </marker>
                  <filter id="glow-db">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Subgraph Containers */}
                {[
                  { label: "Core Sports Data", x: 20, y: 20, w: 980, h: 360 },
                  { label: "Matches & Overrides", x: 20, y: 410, w: 730, h: 360 },
                  { label: "Analytics & User", x: 780, y: 410, w: 500, h: 360 }
                ].map((sg, sgIdx) => (
                  <g key={sgIdx}>
                    <rect
                      x={sg.x}
                      y={sg.y}
                      width={sg.w}
                      height={sg.h}
                      rx="12"
                      fill={theme.palette.mode === "light" ? "rgba(0,0,0,0.015)" : "rgba(255,255,255,0.015)"}
                      stroke={theme.palette.mode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)"}
                      strokeWidth="1.5"
                    />
                    <text
                      x={sg.x + 20}
                      y={sg.y + 25}
                      fontWeight="800"
                      fill={theme.palette.text.secondary}
                      fontSize="12"
                      fontFamily="Inter, sans-serif"
                    >
                      {sg.label}
                    </text>
                  </g>
                ))}

                {/* Connection Lines (Highlight when related to selectedTable) */}
                {[
                  // Sport -> League
                  { from: "Sport", to: "League", path: "M 240 112 H 265 V 166 H 290" },
                  // Country -> League
                  { from: "Country", to: "League", path: "M 480 184 H 500 V 282 H 480" },
                  // League -> Team
                  { from: "League", to: "Team", path: "M 480 112 H 505 V 166 H 530" },
                  // Venue -> Team
                  { from: "Venue", to: "Team", path: "M 720 184 H 740 V 282 H 720" },
                  // Team -> Player
                  { from: "Team", to: "Player", path: "M 720 112 H 745 V 166 H 770" },
                  // League -> Event
                  { from: "League", to: "Event", path: "M 290 112 H 275 V 602 H 290" },
                  // Event -> TV Event
                  { from: "Event", to: "TV Event", path: "M 290 512 C 265 512, 265 530, 240 530" },
                  // Event -> OverrideItem
                  { from: "Event", to: "OverrideItem", path: "M 480 512 H 530" },
                  // User -> UserFavorite
                  { from: "User", to: "UserFavorite", path: "M 1000 512 C 1025 512, 1025 530, 1050 530" },
                  // User -> Notification
                  { from: "User", to: "Notification", path: "M 905 600 V 690 H 1050" },
                  // UserFavorite -> Event
                  { from: "UserFavorite", to: "Event", path: "M 1100 460 V 390 H 385 V 460" },
                  // UserFavorite -> Team
                  { from: "UserFavorite", to: "Team", path: "M 1145 460 V 390 H 750 V 112 H 720" },
                  // UserFavorite -> Player
                  { from: "UserFavorite", to: "Player", path: "M 1190 460 V 390 H 865 V 180" }
                ].map((line, lIdx) => {
                  const isRelated = activeTableKey === tableKeyMapping[line.from] || activeTableKey === tableKeyMapping[line.to];
                  return (
                    <path
                      key={lIdx}
                      d={line.path}
                      stroke={isRelated ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)")}
                      strokeWidth={isRelated ? "2.5" : "1.5"}
                      fill="none"
                      markerEnd={isRelated ? "url(#dot)" : undefined}
                      style={{ transition: "all 0.2s ease" }}
                    />
                  );
                })}

                {/* Table Cards */}
                {[
                  // Core Sports Data (y: 20 to 380)
                  {
                    id: "Sport", x: 50, y: 60, w: 190, h: 120,
                    fields: [
                      { n: "idSport", k: "PK" },
                      { n: "strSport", k: "" },
                      { n: "displayName", k: "" },
                      { n: "slug", k: "UK" }
                    ]
                  },
                  {
                    id: "League", x: 290, y: 60, w: 190, h: 140,
                    fields: [
                      { n: "idLeague", k: "PK" },
                      { n: "strLeague", k: "" },
                      { n: "slug", k: "UK" },
                      { n: "sportId", k: "FK" },
                      { n: "countryCode", k: "FK" }
                    ]
                  },
                  {
                    id: "Country", x: 290, y: 230, w: 190, h: 120,
                    fields: [
                      { n: "code", k: "PK" },
                      { n: "name", k: "" },
                      { n: "flagUrl32", k: "" },
                      { n: "slug", k: "UK" }
                    ]
                  },
                  {
                    id: "Team", x: 530, y: 60, w: 190, h: 140,
                    fields: [
                      { n: "idTeam", k: "PK" },
                      { n: "strTeam", k: "" },
                      { n: "slug", k: "UK" },
                      { n: "leagueId", k: "FK" },
                      { n: "venueId", k: "FK" }
                    ]
                  },
                  {
                    id: "Venue", x: 530, y: 230, w: 190, h: 120,
                    fields: [
                      { n: "idVenue", k: "PK" },
                      { n: "strVenue", k: "" },
                      { n: "timezone", k: "" },
                      { n: "slug", k: "UK" }
                    ]
                  },
                  {
                    id: "Player", x: 770, y: 60, w: 190, h: 120,
                    fields: [
                      { n: "idPlayer", k: "PK" },
                      { n: "strPlayer", k: "" },
                      { n: "strPosition", k: "" },
                      { n: "teamId", k: "FK" }
                    ]
                  },

                  // Matches & Overrides (y: 410 to 770)
                  {
                    id: "TV Event", x: 50, y: 460, w: 190, h: 140,
                    fields: [
                      { n: "idBroadcast", k: "PK" },
                      { n: "eventId", k: "FK" },
                      { n: "strChannel", k: "" },
                      { n: "dateEvent", k: "" }
                    ]
                  },
                  {
                    id: "Event", x: 290, y: 460, w: 190, h: 160,
                    fields: [
                      { n: "idEvent", k: "PK" },
                      { n: "strEvent", k: "" },
                      { n: "intHomeScore", k: "" },
                      { n: "intAwayScore", k: "" },
                      { n: "dateEvent", k: "" },
                      { n: "leagueId", k: "FK" }
                    ]
                  },
                  {
                    id: "OverrideItem", x: 530, y: 460, w: 190, h: 140,
                    fields: [
                      { n: "idEvent", k: "PK/FK" },
                      { n: "item_type", k: "" },
                      { n: "priority", k: "" },
                      { n: "manual_override", k: "" }
                    ]
                  },

                  // User & Analytics (y: 410 to 770)
                  {
                    id: "User", x: 810, y: 460, w: 190, h: 140,
                    fields: [
                      { n: "id", k: "PK" },
                      { n: "email", k: "UK" },
                      { n: "username", k: "" },
                      { n: "confirmed", k: "" },
                      { n: "blocked", k: "" }
                    ]
                  },
                  {
                    id: "UserFavorite", x: 1050, y: 460, w: 190, h: 140,
                    fields: [
                      { n: "id", k: "PK" },
                      { n: "userId", k: "FK" },
                      { n: "entityType", k: "" },
                      { n: "entityId", k: "" }
                    ]
                  },
                  {
                    id: "Notification", x: 1050, y: 620, w: 190, h: 140,
                    fields: [
                      { n: "id", k: "PK" },
                      { n: "userId", k: "FK" },
                      { n: "emailEnabled", k: "" },
                      { n: "timezone", k: "" }
                    ]
                  }
                ].map((tbl) => {
                  const isActive = activeTableKey === (tableKeyMapping[tbl.id] || tbl.id);
                  const cardBg = isActive
                    ? (theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.08)" : "rgba(129, 140, 248, 0.12)")
                    : (theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(30, 41, 59, 0.85)");
                  const cardStroke = isActive ? primaryColor : (theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)");
                  const cardStrokeWidth = isActive ? 2.5 : 1.2;
                  const glowFilter = isActive ? "url(#glow-db)" : undefined;

                  return (
                    <g key={tbl.id} onClick={() => handleTableSelect(tbl.id)} style={{ cursor: "pointer" }}>
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

                      {/* Fields List */}
                      {tbl.fields.map((fld, fIdx) => {
                        const badgeW = fld.k === "PK/FK" ? 42 : 28;
                        const badgeX = tbl.x + tbl.w - badgeW - 12;
                        const textX = badgeX + badgeW / 2;
                        const badgeColor = fld.k.includes("PK")
                          ? { bg: "rgba(16, 185, 129, 0.15)", text: "#10b981" }
                          : fld.k.includes("UK")
                            ? { bg: "rgba(245, 158, 11, 0.15)", text: "#f59e0b" }
                            : { bg: "rgba(239, 68, 68, 0.15)", text: "#ef4444" };

                        return (
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
                                  x={badgeX}
                                  y={tbl.y + 42 + (fIdx * 18)}
                                  width={badgeW}
                                  height={13}
                                  rx={3}
                                  fill={badgeColor.bg}
                                />
                                <text
                                  x={textX}
                                  y={tbl.y + 51 + (fIdx * 18)}
                                  textAnchor="middle"
                                  fill={badgeColor.text}
                                  fontSize="8"
                                  fontWeight="800"
                                  fontFamily="Inter, sans-serif"
                                >
                                  {fld.k}
                                </text>
                              </g>
                            )}
                          </g>
                        );
                      })}
                    </g>
                  );
                })}
              </svg>
            </Box>
          </DiagramBoard>
        </GlassCard>
      ) : (
        /* Grid of Entity Blocks */
        <GlassCard sx={{ p: 3.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, display: "flex", alignItems: "center", gap: 1, color: "text.primary" }}>
            <SchemaIcon color="primary" sx={{ fontSize: 20 }} />
            {activeTab} Schema Mapping
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {conceptualSchemas[activeTab].description}
          </Typography>

          {activeTab === "CMS Configurations" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                overflowX: "auto",
                pb: 2.5,
                pt: 0.5,
                px: 0.5,
                scrollBehavior: "smooth",
                // Webkit scrollbar styling for premium feel
                "&::-webkit-scrollbar": {
                  height: 8,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)",
                  borderRadius: 4,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)",
                  borderRadius: 4,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                  }
                }
              }}
            >
              {(() => {
                const entitiesList = Object.entries(conceptualSchemas[activeTab].entities);
                const columnChunks = [];
                for (let i = 0; i < entitiesList.length; i += 2) {
                  columnChunks.push(entitiesList.slice(i, i + 2));
                }
                return columnChunks.map((col, colIdx) => (
                  <Box
                    key={colIdx}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      width: { xs: "280px", sm: "320px", md: "calc(33.333% - 16px)" },
                      minWidth: { xs: "280px", sm: "320px", md: "calc(33.333% - 16px)" },
                      flexShrink: 0
                    }}
                  >
                    {col.map(([entityName, fields]) => (
                      <Box key={entityName} sx={{ height: "100%" }}>
                        {renderTableCard(entityName, fields)}
                      </Box>
                    ))}
                  </Box>
                ));
              })()}
            </Box>
          ) : (
            <Grid container spacing={3}>
              {Object.entries(conceptualSchemas[activeTab].entities).map(([entityName, fields], idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                  {renderTableCard(entityName, fields)}
                </Grid>
              ))}
            </Grid>
          )}
        </GlassCard>
      )}
    </Box>
  );
};

export default SchemaSection;


