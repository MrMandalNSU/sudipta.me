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

  const handleTableSelect = (tableName) => {
    setSelectedTable(tableName);
    // Automatically switch tabs if they clicked a table that belongs to a different domain tab
    const mappedKey = tableKeyMapping[tableName] || tableName;
    const info = entityLookup[mappedKey];
    if (info && info.category && activeTab !== "ER Relationships") {
      setActiveTab(info.category);
    }
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
              {activeTableData.description}
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", letterSpacing: "1px", display: "block", mb: 1.5 }}>
          Fields & Constraints
        </Typography>
        
        <Grid container spacing={1.5}>
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
                viewBox="0 0 920 370"
                style={{ display: "block", maxWidth: "100%", height: "auto" }}
              >
                <defs>
                  <marker id="erArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={primaryColor} />
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
                  { label: "Core Sports Data", x: 15, y: 15, w: 890, h: 160 },
                  { label: "Matches & Overrides", x: 15, y: 190, w: 460, h: 160 },
                  { label: "Analytics & User", x: 495, y: 190, w: 410, h: 160 }
                ].map((sg, sgIdx) => (
                  <g key={sgIdx}>
                    <rect
                      x={sg.x}
                      y={sg.y}
                      width={sg.w}
                      height={sg.h}
                      rx="8"
                      fill={theme.palette.mode === "light" ? "rgba(0,0,0,0.01)" : "rgba(255,255,255,0.01)"}
                      stroke={theme.palette.mode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)"}
                      strokeWidth="1.5"
                    />
                    <text
                      x={sg.x + 15}
                      y={sg.y + 20}
                      fontWeight="800"
                      fill={theme.palette.text.secondary}
                      fontSize="11"
                      fontFamily="Inter, sans-serif"
                    >
                      {sg.label}
                    </text>
                  </g>
                ))}

                {/* Connection Lines (Highlight when related to selectedTable) */}
                {[
                  { from: "Sport", to: "League", path: "M 150 77 H 200" }, // Sport -> League
                  { from: "Country", to: "League", path: "M 255 110 V 105" }, // Country -> League
                  { from: "League", to: "Team", path: "M 310 77 H 360" }, // League -> Team
                  { from: "Venue", to: "Team", path: "M 415 110 V 105" }, // Venue -> Team
                  { from: "Team", to: "Player", path: "M 470 77 H 520" }, // Team -> Player
                  { from: "League", to: "Event", path: "M 255 105 V 220" }, // League -> Event (Core -> Matches)
                  { from: "Event", to: "TV Event", path: "M 200 247 H 150" }, // Event -> TV Event
                  { from: "Event", to: "OverrideItem", path: "M 310 247 H 340" }, // Event -> OverrideItem
                  { from: "User", to: "UserFavorite", path: "M 630 247 H 670" }, // User -> UserFavorite
                  { from: "User", to: "Notification", path: "M 575 275 V 307 H 670" }, // User -> Notification
                ].map((line, lIdx) => {
                  const isRelated = activeTableKey === tableKeyMapping[line.from] || activeTableKey === tableKeyMapping[line.to];
                  return (
                    <path
                      key={lIdx}
                      d={line.path}
                      stroke={isRelated ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)")}
                      strokeWidth={isRelated ? "2.5" : "1.5"}
                      fill="none"
                      markerEnd="url(#erArrow)"
                      style={{ transition: "all 0.2s ease" }}
                    />
                  );
                })}

                {/* Entities */}
                {[
                  // Core Sports Data (y: 15 to 175)
                  { id: "Sport", cx: 95, cy: 77, x: 40, y: 50, w: 110, h: 55, label: "Sport", sub: "PK: idSport", items: ["strSport", "displayName"] },
                  { id: "League", cx: 255, cy: 77, x: 200, y: 50, w: 110, h: 55, label: "League", sub: "PK: idLeague", items: ["strLeague", "slug"] },
                  { id: "Country", cx: 255, cy: 137, x: 200, y: 110, w: 110, h: 55, label: "Country", sub: "PK: code", items: ["name", "flagUrl32"] },
                  { id: "Team", cx: 415, cy: 77, x: 360, y: 50, w: 110, h: 55, label: "Team", sub: "PK: idTeam", items: ["strTeam", "strColour1"] },
                  { id: "Venue", cx: 415, cy: 137, x: 360, y: 110, w: 110, h: 55, label: "Venue", sub: "PK: idVenue", items: ["strVenue", "timezone"] },
                  { id: "Player", cx: 575, cy: 77, x: 520, y: 50, w: 110, h: 55, label: "Player", sub: "PK: idPlayer", items: ["strPlayer", "strPosition"] },

                  // Matches & Overrides (y: 190 to 350)
                  { id: "Event", cx: 255, cy: 247, x: 200, y: 220, w: 110, h: 55, label: "Event", sub: "PK: idEvent", items: ["strEvent", "strStatus"] },
                  { id: "TV Event", cx: 95, cy: 247, x: 40, y: 220, w: 110, h: 55, label: "TV Event", sub: "PK: idBroadcast", items: ["strChannel", "dateEvent"] },
                  { id: "OverrideItem", cx: 395, cy: 247, x: 340, y: 220, w: 110, h: 55, label: "OverrideItem", sub: "PK: idEvent", items: ["item_type", "priority"] },

                  // User & Analytics (y: 190 to 350)
                  { id: "User", cx: 575, cy: 247, x: 520, y: 220, w: 110, h: 55, label: "User", sub: "PK: id", items: ["email", "username"] },
                  { id: "UserFavorite", cx: 725, cy: 247, x: 670, y: 220, w: 110, h: 55, label: "UserFavorite", sub: "PK: id", items: ["entityType", "entityId"] },
                  { id: "Notification", cx: 725, cy: 307, x: 670, y: 280, w: 110, h: 55, label: "Notification", sub: "PK: id", items: ["emailEnabled", "timezone"] },
                ].map((ent, eIdx) => {
                  const isSelected = activeTableKey === tableKeyMapping[ent.id];
                  const fillBg = isSelected
                    ? (theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.08)" : "rgba(129, 140, 248, 0.15)")
                    : (theme.palette.mode === "light" ? "rgba(255,255,255,0.95)" : "rgba(17,24,39,0.9)");
                  const strokeColor = isSelected ? primaryColor : (theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)");
                  const strokeWidth = isSelected ? "2" : "1.2";
                  
                  return (
                    <g key={eIdx} onClick={() => handleTableSelect(ent.id)} style={{ cursor: "pointer" }}>
                      <rect
                        x={ent.x}
                        y={ent.y}
                        width={ent.w}
                        height={ent.h}
                        rx="6"
                        fill={fillBg}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        filter={isSelected ? "url(#glow-db)" : undefined}
                        style={{ transition: "all 0.2s ease" }}
                      />
                      {/* Entity Header */}
                      <text
                        x={ent.cx}
                        y={ent.y + 16}
                        textAnchor="middle"
                        fontWeight="800"
                        fill={isSelected ? primaryColor : theme.palette.text.primary}
                        fontSize="10"
                        fontFamily="Inter, sans-serif"
                      >
                        {ent.label}
                      </text>
                      {/* PK indicator */}
                      <text
                        x={ent.cx}
                        y={ent.y + 28}
                        textAnchor="middle"
                        fill={isSelected ? "primary.main" : theme.palette.text.secondary}
                        fontWeight="700"
                        fontSize="7.5"
                        fontFamily="monospace"
                      >
                        {ent.sub}
                      </text>
                      {/* Fields */}
                      <text
                        x={ent.cx}
                        y={ent.y + 40}
                        textAnchor="middle"
                        fill={theme.palette.text.secondary}
                        fontSize="7.5"
                        fontFamily="Inter, sans-serif"
                      >
                        {ent.items.join(" | ")}
                      </text>
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

          <Grid container spacing={3}>
            {Object.entries(conceptualSchemas[activeTab].entities).map(([entityName, fields], idx) => {
              const isSelected = selectedTable === entityName;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                  <Paper
                    variant="outlined"
                    onClick={() => setSelectedTable(entityName)}
                    sx={{
                      p: 2.2,
                      height: "100%",
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
                    <Typography variant="body2" sx={{ fontWeight: 800, mb: 1.5, display: "flex", alignItems: "center", gap: 1, color: isSelected ? "primary.main" : "text.primary" }}>
                      <BlockIcon color={isSelected ? "primary" : "action"} sx={{ fontSize: 16 }} />
                      {entityName} Entity
                    </Typography>
                    
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      {fields.slice(0, 3).map((f, fIdx) => (
                        <Box
                          key={fIdx}
                          sx={{
                            p: 1,
                            borderRadius: 1.5,
                            backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)"}`,
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.2
                          }}
                        >
                          <Typography variant="caption" sx={{ fontFamily: "monospace", color: "text.primary", fontWeight: 700 }}>
                            {f.name}
                          </Typography>
                          <Typography variant="caption" sx={{ fontSize: "0.7rem", color: "text.secondary", fontFamily: "sans-serif" }}>
                            {f.type}
                          </Typography>
                        </Box>
                      ))}
                      {fields.length > 3 && (
                        <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center", fontStyle: "italic", mt: 0.5 }}>
                          + {fields.length - 3} more fields (click to view)
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </GlassCard>
      )}
    </Box>
  );
};

export default SchemaSection;


