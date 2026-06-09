import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
  Avatar,
  Chip,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  AutoAwesome as AutoAwesomeIcon,
  Hub as HubIcon,
  Memory as MemoryIcon,
  SettingsSuggest as SettingsSuggestIcon,
} from "@mui/icons-material";

const OuterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  background: theme.palette.mode === "light"
    ? "rgba(255, 255, 255, 0.4)"
    : "rgba(15, 23, 42, 0.4)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    padding: 0,
    borderRadius: 0,
    background: "transparent",
    boxShadow: "none",
  },
}));

const ExperienceCard = styled(Box)(({ theme, active, isdimmed }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: theme.palette.mode === "light"
    ? "rgba(255, 255, 255, 0.6)"
    : "rgba(30, 41, 59, 0.6)",
  border: active
    ? `1.5px solid ${theme.palette.primary.main}`
    : "1.5px solid rgba(255, 255, 255, 0.08)",
  boxShadow: active
    ? "0 12px 24px rgba(79, 70, 229, 0.2)"
    : "0 4px 16px rgba(0, 0, 0, 0.05)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  transform: active ? "translateY(-6px) scale(1.01)" : "none",
  "& .MuiAvatar-root, & .MuiTypography-root, & .MuiChip-root, & svg, & img": {
    opacity: isdimmed ? 0.45 : 1,
    transition: "opacity 0.3s ease",
  },
  "@media (hover: hover)": {
    "&:hover": {
      transform: "translateY(-6px) scale(1.01)",
      border: `1.5px solid ${theme.palette.primary.main}`,
      boxShadow: `0 12px 24px rgba(79, 70, 229, 0.2)`,
    },
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
    borderLeft: "none",
    borderRight: "none",
  },
}));

const ToolBadge = styled(Box)(({ theme, active, isdimmed, brandcolor }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  borderRadius: "20px",
  backgroundColor: theme.palette.mode === "light"
    ? active ? `${brandcolor}15` : "rgba(0, 0, 0, 0.03)"
    : active ? `${brandcolor}25` : "rgba(255, 255, 255, 0.03)",
  border: active ? `1.5px solid ${brandcolor}` : "1.5px solid rgba(255, 255, 255, 0.08)",
  boxShadow: active ? `0 6px 16px ${brandcolor}3d` : "none",
  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
  cursor: "pointer",
  transform: active ? "translateY(-3px)" : "none",
  opacity: isdimmed ? 0.4 : 1,
  "@media (hover: hover)": {
    "&:hover": {
      transform: "translateY(-3px)",
      border: `1.5px solid ${brandcolor}`,
      backgroundColor: theme.palette.mode === "light" ? `${brandcolor}1a` : `${brandcolor}2d`,
      boxShadow: `0 8px 20px ${brandcolor}4a`,
    },
  },
}));

const LogoImage = styled("img")(({ theme, isgpt }) => ({
  width: 20,
  height: 20,
  objectFit: "contain",
  filter: theme.palette.mode === "dark" && isgpt ? "invert(0.9) brightness(2)" : "none",
}));

const AgenticAI = ({ id }) => {
  const theme = useTheme();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredTool, setHoveredTool] = useState(null);

  const tools = [
    { id: "claude", name: "Claude", logo: "/ai_logos/claude_logo.svg", color: "#cc5a37" },
    { id: "gpt", name: "GPT", logo: "/ai_logos/gpt_logo.svg", color: "#10b981" },
    { id: "gemini", name: "Gemini", logo: "/ai_logos/gemini_logo.svg", color: "#818cf8" },
    { id: "claudecode", name: "Claude Code", logo: "/ai_logos/claudecode_logo.svg", color: "#e4932aff" },
    { id: "antigravity", name: "Antigravity", logo: "/ai_logos/antigravity_logo.svg", color: "#d946ef" },
    { id: "cursor", name: "Cursor", logo: "/ai_logos/cursor_logo.svg", color: "#0ea5e9" },
    { id: "codex", name: "Codex", logo: "/ai_logos/codex_logo.svg", color: "#f59e0b" },
  ];

  const cards = [
    {
      id: "card1",
      title: "AI-Assisted Dev Workflows",
      icon: <AutoAwesomeIcon sx={{ color: "primary.main" }} />,
      text: "Designed and optimized AI-assisted software development workflows using Claude Code, Antigravity, Cursor, Codex, and other agentic coding tools to accelerate feature development, debugging, and code maintenance.",
      tools: ["claudecode", "antigravity", "cursor", "codex"]
    },
    {
      id: "card2",
      title: "Frontier Models Orchestration",
      icon: <HubIcon sx={{ color: "primary.main" }} />,
      text: "Utilized multiple frontier AI models, including Claude Opus, Sonnet, GPT, Composer, and Gemini, selecting model-specific workflows based on task complexity, reasoning requirements, and development objectives.",
      tools: ["claude", "gpt", "gemini", "cursor"]
    },
    {
      id: "card3",
      title: "Context Engineering & Memory",
      icon: <MemoryIcon sx={{ color: "primary.main" }} />,
      text: "Built custom context-engineering strategies leveraging persistent memory, structured context management, and MCP server integrations to automate repetitive development tasks and maximize AI agent reliability.",
      tools: ["claudecode", "antigravity"]
    },
    {
      id: "card4",
      title: "Automated Engineering Workflows",
      icon: <SettingsSuggestIcon sx={{ color: "primary.main" }} />,
      text: "Developed reusable AI-driven workflows for code generation, refactoring, documentation, testing, and project scaffolding, drastically minimizing manual engineering effort across professional and personal projects.",
      tools: ["claudecode", "cursor", "codex", "antigravity"]
    }
  ];

  // Helper check for tool highlight state
  const isToolActive = (toolId) => {
    if (hoveredTool === toolId) return true;
    if (hoveredCard) {
      const activeCard = cards.find(c => c.id === hoveredCard);
      return activeCard ? activeCard.tools.includes(toolId) : false;
    }
    return false;
  };

  // Helper check for tool dim state
  const isToolDimmed = (toolId) => {
    if (hoveredTool && hoveredTool !== toolId) return true;
    if (hoveredCard) {
      const activeCard = cards.find(c => c.id === hoveredCard);
      return activeCard ? !activeCard.tools.includes(toolId) : false;
    }
    return false;
  };

  // Helper check for card highlight state
  const isCardActive = (cardId) => {
    if (hoveredCard === cardId) return true;
    if (hoveredTool) {
      const activeCard = cards.find(c => c.id === cardId);
      return activeCard ? activeCard.tools.includes(hoveredTool) : false;
    }
    return false;
  };

  // Helper check for card dim state
  const isCardDimmed = (cardId) => {
    if (hoveredCard && hoveredCard !== cardId) return true;
    if (hoveredTool) {
      const activeCard = cards.find(c => c.id === cardId);
      return activeCard ? !activeCard.tools.includes(hoveredTool) : false;
    }
    return false;
  };

  return (
    <Box
      id={id}
      sx={{
        mt: 0,
        display: "flex",
        alignItems: "center",
        px: { xs: 0, sm: 2 },
        py: { xs: 0, sm: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 3 } }}>
        <OuterPaper elevation={3}>
          {/* Header Section */}
          <Box sx={{ mb: { xs: 4, sm: 5 }, pt: { xs: 2, sm: 0 }, px: { xs: 2, sm: 0 }, textAlign: "center" }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800, color: "text.primary", fontSize: { xs: "1.75rem", sm: "2.125rem" } }}>
              Agentic AI & Context Engineering
            </Typography>

            {/* Interactive Tool Stack Banner directly under Title */}
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1.5, mt: 3 }}>
              {tools.map((tool) => {
                const active = isToolActive(tool.id);
                const isdimmed = isToolDimmed(tool.id);
                return (
                  <ToolBadge
                    key={tool.id}
                    active={active}
                    isdimmed={isdimmed}
                    brandcolor={tool.color}
                    onMouseEnter={() => setHoveredTool(tool.id)}
                    onMouseLeave={() => setHoveredTool(null)}
                  >
                    <LogoImage src={tool.logo} alt={tool.name} isgpt={tool.id === "gpt"} />
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.85rem", color: "text.primary" }}>
                      {tool.name}
                    </Typography>
                  </ToolBadge>
                );
              })}
            </Box>
          </Box>

          {/* 2x2 Grid of Experience Cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
              mb: 2,
              px: { xs: 0, sm: 0 },
            }}
          >
            {cards.map((card) => {
              const active = isCardActive(card.id);
              const isdimmed = isCardDimmed(card.id);
              return (
                <ExperienceCard
                  key={card.id}
                  active={active}
                  isdimmed={isdimmed}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.25 }}>
                      <Avatar sx={{ backgroundColor: "rgba(79, 70, 229, 0.1)", width: 40, height: 40 }}>
                        {card.icon}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem", textAlign: "left" }}>
                        {card.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, textAlign: "left", mb: 1.75 }}>
                      {card.text}
                    </Typography>
                  </Box>

                  {/* Logos mapped to this card */}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: "auto", pt: 1.5, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <Typography variant="caption" sx={{ color: "text.secondary", width: "100%", textAlign: "left", mb: 0.5, fontWeight: 600 }}>
                      Tools & Models:
                    </Typography>
                    {card.tools.map((toolId) => {
                      const tool = tools.find(t => t.id === toolId);
                      if (!tool) return null;
                      return (
                        <Chip
                          key={toolId}
                          avatar={<LogoImage src={tool.logo} alt={tool.name} isgpt={tool.id === "gpt"} />}
                          label={tool.name}
                          size="small"
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            "& .MuiChip-avatar": {
                              width: 20,
                              height: 20,
                              marginLeft: "4px"
                            }
                          }}
                        />
                      );
                    })}
                  </Box>
                </ExperienceCard>
              );
            })}
          </Box>
        </OuterPaper>
      </Container>
    </Box>
  );
};

export default AgenticAI;
