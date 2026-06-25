import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CardContent,
  Chip,
  Stack,
  Divider,
  List,
  ListItem,
  Paper,
  Avatar,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Code as CodeIcon,
  Language as LanguageIcon,
  GitHub as GitHubIcon,
  SmartToy as SmartToyIcon,
  Dashboard as DashboardIcon,
  SportsEsports as SportsEsportsIcon,
  TextFields as TextFieldsIcon,
  Timeline as TimelineIcon,
} from "@mui/icons-material";

const OuterPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  zIndex: 0,
  isolation: "isolate",
  overflow: "hidden",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  background:
    theme.palette.mode === "light"
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

const ProjectCard = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  isolation: "isolate",
  overflow: "hidden",
  borderRadius: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.6)"
      : "rgba(30, 41, 59, 0.6)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",

  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "none",
  transition:
    "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.25s ease, background-color 0.25s ease",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    pointerEvents: "none",
    opacity: 0,
    boxShadow:
      "inset 0 0 0 1px rgba(129, 140, 248, 0.35), inset 0 0 32px rgba(79, 70, 229, 0.14)",
    transition: "opacity 0.25s ease",
  },
  "@media (hover: hover)": {
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      border: `1px solid ${theme.palette.primary.main}`,
      "&::after": {
        opacity: 1,
      },
    },
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
    borderLeft: "none",
    borderRight: "none",
  },
}));

const ProjectIconBox = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  marginRight: theme.spacing(1.5),
  backgroundColor: "rgba(79, 70, 229, 0.1)",
  color: theme.palette.primary.main,
  borderRadius: "12px",
  "& .MuiAvatar-img": {
    objectFit: "contain",
    padding: theme.spacing(0.5),
  },
}));

const alphaHex = (hex, opacity) => {
  if (!hex || !hex.startsWith("#") || hex.length !== 7) {
    return `rgba(79, 70, 229, ${opacity})`;
  }

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const getLiveIcon = (iconKey) => {
  const iconSx = { fontSize: 16 };

  if (iconKey === "dashboard") return <DashboardIcon sx={iconSx} />;
  if (iconKey === "game") return <SportsEsportsIcon sx={iconSx} />;
  if (iconKey === "text") return <TextFieldsIcon sx={iconSx} />;
  if (iconKey === "market") return <TimelineIcon sx={iconSx} />;

  return <LanguageIcon sx={iconSx} />;
};

const Projects = ({ id }) => {
  const projects = [
    {
      title: "Valo Dash",
      type: "SaaS Analytics Platform",
      logo: "/project_logos/valodash_logo.svg",
      accentColor: "#ff4655",
      liveLink: "https://valodash.sudipta.xyz/",
      liveLabel: "Open Analytics",
      liveIcon: "dashboard",
      githubLink: "",
      detailsLink: "/projects/valodash",
      achievements: [
        "Developed a SaaS Analytics Platform for custom Valorant teams, using Node.js, TypeScript, Next.js, Zod, Prisma, and PostgreSQL. Integrated Riot Games APIs to collect and process player profiles and historical match data, powering team leaderboards, comparative analytics, graphical analysis, and performance insights.",
        "Engineered a cron scheduler and background worker service that executes staggered data ingestion updates to handle third-party API rate limits and refresh telemetry cache.",
        "Integrated Discord OAuth2 authentication and architected a PostgreSQL database with relational tables via Prisma ORM, utilizing cascading integrity constraints and team-scoped roster isolation to ensure total data privacy.",
        "Designed a multi-tiered leaderboard sorting algorithm (evaluating competitive MMR, ACS, and K/D ratios) and built a responsive UI optimized with micro-animations and touchscreen swiping for image previews.",
        "The platform is adoped by more than 50 individual valorant players and 10 teams. Valodash currently helping valorant teams to understand and organize their match data and analytics. To see how I designed the project and visualized the use cases, click on the System Design button above.",
      ],
      technologies: [
        "Node.js",
        "TypeScript",
        "Next.js",
        "Zod",
        "Prisma",
        "PostgreSQL",
        "Riot Games API",
        "Cron Jobs",
        "Rate Limit",
        "Github Action",
        "Caching Layer",
        "Data Visualization",
      ],
    },
    {
      title: "Ask Sudipta",
      type: "Conversational RAG Intelligence",
      logo: "/project_logos/chatbot_logo.svg",
      accentColor: "#22D3EE",
      liveLink: "",
      githubLink: "",
      detailsLink: "/projects/asksudipta",
      tryAssistant: true,
      achievements: [
        "Built the full AskSudipta chat system directly inside this portfolio, including the React and Material UI floating assistant plus a TypeScript and Express Retrieval-Augmented Generation (RAG) backend; users can click the Try Assistant button to open the chat window and test it live.",
        "Implemented the chatbot frontend with open, minimized, expanded, and mobile states; sessionStorage-backed chat history; suggested prompts; loading indicators; markdown-like response formatting; verified source cards; and route-aware citation navigation via sourceMapper.",
        "Built a markdown ingestion pipeline that scans the portfolio knowledge base, normalizes text, creates heading-aware chunks, generates Gemini embeddings, and stores vectors in Supabase PostgreSQL with pgvector.",
        "Implemented hybrid retrieval by combining vector similarity search with keyword alias matching, merging duplicate results, and returning source metadata for verified answer citations.",
        "Optimized answer quality and latency with grounded prompt construction, fast Gemini generation defaults, bounded output tokens, prompt compression, process-local caches, and deterministic work-experience duration calculation.",
      ],
      technologies: [
        "Retrieval-Augmented Generation (RAG)",
        "Embeddings",
        "Vector DB",
        "Hybrid Retrieval",
        "Prompt Engineering",
        "Gemini API",
        "React",
        "Express",
        "pgvector",
        "Vitest",
      ],
    },
    {
      title: "Color Cuddle",
      type: "Interactive Web Game",
      logo: "/project_logos/colorcuddle_logo.svg",
      accentColor: "#ec4899",
      liveLink: "https://colorcuddle.sudipta.xyz/",
      liveLabel: "Play Game",
      liveIcon: "game",
      githubLink: "",
      detailsLink: "/projects/colorcuddle",
      achievements: [
        "Developed Color Cuddle Games, an interactive web-based game using Next.js, featuring low-latency gameplay, drag-and-drop gameplay mechanics, responsive UI, and full mobile compatibility across devices.",
        "Designed and implemented three difficulty levels with dynamic game logic, creating a progressive user experience while optimizing performance and accessibility for both desktop and mobile users.",
        "Implemented dynamic 3D card flip animations and difficulty-adapted visual masking (such as padlocked attempts in Insane Mode) to deliver highly immersive feedback loops.",
        "Built a localized diagnostic console emulator to output real-time evaluation logs and telemetry without interrupting window scroll stability on touchscreen viewports.",
        "Created an adaptive Wordle-style share compiler that serializes attempt histories into formatted Unicode grid maps or locked log layouts directly to the clipboard.",
      ],
      technologies: [
        "Next.js",
        "React",
        "Drag-and-Drop",
        "Web Game",
        "Responsive Design",
        "Mobile Optimization",
      ],
    },
    {
      title: "Text Analyzer",
      type: "Lexical Intelligence & Utility Suite",
      logo: "/project_logos/textanalyzer_logo.svg",
      accentColor: "#4a8bb8",
      liveLink: "https://text.sudipta.xyz/",
      liveLabel: "Analyze Text",
      liveIcon: "text",
      githubLink: "",
      detailsLink: "/projects/textanalyzer",
      achievements: [
        "Developed an online platform to analyze text data with auto-generated reports. Implemented CRUD for text, with each browser acting as a unique user. Ensured fast, lightweight analysis. Adopted by 10+ active users.",
        "Built an interactive UI, optimized analysis, and deployed using Node, Express, TS, React, Vite, MUI, and TDD.",
        "Engineered an on-demand calculation caching engine storing regex-based lexical metrics (word/character counts, paragraph structures) in MongoDB, featuring automated cache invalidation upon document revisions.",
        "Integrated a client-side syntax-highlighting JSON parser and formatting workspace with custom filter shortcuts (trimming double spacing, case adjustments, digit stripping) for developer usability.",
        "Designed an anonymous browser sandboxing strategy via LocalStorage session tracking, isolating user CRUD scopes and workspace preferences with zero registration friction.",
      ],
      technologies: [
        "Node",
        "Express",
        "TypeScript",
        "React",
        "Vite",
        "Material UI",
        "TDD",
      ],
    },
    {
      title: "DSE Ops",
      type: "SaaS Market Analytics & Archival System",
      logo: "/project_logos/dsescript_logo.svg",
      accentColor: "#10b981",
      liveLink: "https://dse.sudipta.xyz",
      liveLabel: "View Market Data",
      liveIcon: "market",
      githubLink: "",
      detailsLink: "/projects/dseops",
      achievements: [
        "Engineered an automated Node.js and Express pipeline that scrapes daily DSE SME EOD market statistics, parses raw HTML table layouts, and normalizes public board metrics, ticker records, and block trades.",
        "Built ticker-level historical analytics with range summaries, overlapping Recharts metrics, hover point inspection, selected-date detail cards, and responsive stat panels for individual instruments.",
        "Implemented Supabase PostgreSQL persistence with cascading refreshes for idempotent daily updates plus S3/Supabase Storage CSV generation, archival, streaming, and download workflows.",
        "Added NodeCache-backed JSON read endpoints with terminal hit/miss/set logging and cron-triggered cache flushing after successful scrape, database, and CSV writes.",
        "Secured the public dashboard by routing browser reads through same-origin Next.js API routes, keeping backend URLs and cron secrets server-side while preserving sortable tables, chart data, and CSV downloads.",
      ],
      technologies: [
        "Node.js",
        "Express.js",
        "HTML Parser",
        "NodeCache",
        "Supabase",
        "PostgreSQL",
        "AWS S3",
        "Cron Jobs",
        "Next.js",
        "Next.js API Routes",
        "Recharts",
        "Vanilla CSS",
        "CSV Export",
        "Railway",
        "Vercel",
      ],
    },
    {
      title: "Product Pouch",
      type: "Full-Stack Web App",
      logo: "/project_logos/productpouch_logo.svg",
      accentColor: "#f59e0b",
      liveLink: "",
      githubLink: "https://github.com/MrMandalNSU/ProductPouch",
      achievements: [
        "Developed a comprehensive full-stack interactive platform featuring complete product buy, sell, and rental functionalities.",
        "Built a robust backend using Node.js, Apollo Express, Prisma ORM, and PostgreSQL to handle complex database relations and user data.",
        "Designed a responsive and modern frontend utilizing React, Next.js, and Mantine UI, fully integrated with GraphQL queries and mutations.",
      ],
      technologies: [
        "React",
        "Next.js",
        "GraphQL",
        "Node.js",
        "Prisma",
        "PostgreSQL",
        "Mantine UI",
      ],
    },
  ];

  return (
    <Box
      id={id}
      sx={{
        position: "relative",
        zIndex: 0,
        isolation: "isolate",
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
          <Box
            sx={{
              mb: { xs: 2, sm: 4 },
              pt: { xs: 2, sm: 0 },
              px: { xs: 2, sm: 0 },
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                fontSize: { xs: "1.75rem", sm: "2.125rem" },
              }}
              gutterBottom
            >
              Projects
            </Typography>
          </Box>

          {/* Project Cards */}
          <Stack spacing={3}>
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                elevation={3}
                sx={{
                  "@media (hover: hover)": {
                    "&:hover": {
                      border: `1px solid ${project.accentColor || "#4F46E5"}`,
                    },
                  },
                  "&::after": {
                    boxShadow: `inset 0 0 0 1px ${alphaHex(project.accentColor, 0.35)}, inset 0 0 32px ${alphaHex(project.accentColor, 0.14)}`,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", sm: "center" },
                      mb: 2,
                      gap: 2,
                    }}
                  >
                    {project.detailsLink ? (
                      <RouterLink
                        to={project.detailsLink}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            cursor: "pointer",
                            "&:hover .project-title": {
                              color: project.accentColor || "primary.main",
                            },
                          }}
                        >
                          <ProjectIconBox
                            src={project.logo}
                            alt={`${project.title} logo`}
                            sx={{
                              backgroundColor: project.logo
                                ? "transparent"
                                : "rgba(79, 70, 229, 0.1)",
                            }}
                          >
                            <CodeIcon />
                          </ProjectIconBox>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              textAlign: "left",
                            }}
                          >
                            <Typography
                              className="project-title"
                              variant="h6"
                              component="h3"
                              sx={{
                                fontWeight: 700,
                                lineHeight: 1.2,
                                transition: "color 0.2s",
                              }}
                            >
                              {project.title}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              component="p"
                              sx={{ fontWeight: 500, color: "text.secondary" }}
                            >
                              {project.type}
                            </Typography>
                          </Box>
                        </Box>
                      </RouterLink>
                    ) : project.liveLink ? (
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                        sx={{ color: "inherit" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            cursor: "pointer",
                            "&:hover .project-title": {
                              color: project.accentColor || "primary.main",
                            },
                          }}
                        >
                          <ProjectIconBox
                            src={project.logo}
                            alt={`${project.title} logo`}
                            sx={{
                              backgroundColor: project.logo
                                ? "transparent"
                                : "rgba(79, 70, 229, 0.1)",
                            }}
                          >
                            <CodeIcon />
                          </ProjectIconBox>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              textAlign: "left",
                            }}
                          >
                            <Typography
                              className="project-title"
                              variant="h6"
                              component="h3"
                              sx={{
                                fontWeight: 700,
                                lineHeight: 1.2,
                                transition: "color 0.2s",
                              }}
                            >
                              {project.title}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              component="p"
                              sx={{ fontWeight: 500, color: "text.secondary" }}
                            >
                              {project.type}
                            </Typography>
                          </Box>
                        </Box>
                      </Link>
                    ) : project.githubLink ? (
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                        sx={{ color: "inherit" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            cursor: "pointer",
                            "&:hover .project-title": {
                              color: project.accentColor || "primary.main",
                            },
                          }}
                        >
                          <ProjectIconBox
                            src={project.logo}
                            alt={`${project.title} logo`}
                            sx={{
                              backgroundColor: project.logo
                                ? "transparent"
                                : "rgba(79, 70, 229, 0.1)",
                            }}
                          >
                            <CodeIcon />
                          </ProjectIconBox>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              textAlign: "left",
                            }}
                          >
                            <Typography
                              className="project-title"
                              variant="h6"
                              component="h3"
                              sx={{
                                fontWeight: 700,
                                lineHeight: 1.2,
                                transition: "color 0.2s",
                              }}
                            >
                              {project.title}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              component="p"
                              sx={{ fontWeight: 500, color: "text.secondary" }}
                            >
                              {project.type}
                            </Typography>
                          </Box>
                        </Box>
                      </Link>
                    ) : (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <ProjectIconBox
                          src={project.logo}
                          alt={`${project.title} logo`}
                          sx={{
                            backgroundColor: project.logo
                              ? "transparent"
                              : "rgba(79, 70, 229, 0.1)",
                          }}
                        >
                          <CodeIcon />
                        </ProjectIconBox>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            textAlign: "left",
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{ fontWeight: 700, lineHeight: 1.2 }}
                          >
                            {project.title}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            component="p"
                            sx={{ fontWeight: 500, color: "text.secondary" }}
                          >
                            {project.type}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        textAlign: { xs: "left", sm: "right" },
                      }}
                    >
                      {project.detailsLink && (
                        <RouterLink
                          to={project.detailsLink}
                          aria-label={`System Design details for ${project.title} project`}
                          style={{ textDecoration: "none" }}
                        >
                          <Chip
                            icon={<CodeIcon fontSize="small" />}
                            label="System Design"
                            size="small"
                            sx={{
                              cursor: "pointer",
                              fontWeight: 600,
                              backgroundColor: alphaHex(
                                project.accentColor,
                                0.1,
                              ),
                              color: project.accentColor || "primary.main",
                              border: `1px solid ${alphaHex(project.accentColor, 0.3)}`,
                              "&:hover": {
                                backgroundColor: alphaHex(
                                  project.accentColor,
                                  0.2,
                                ),
                              },
                            }}
                          />
                        </RouterLink>
                      )}
                      {project.liveLink && (
                        <Link
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="none"
                        >
                          <Chip
                            icon={getLiveIcon(project.liveIcon)}
                            label={project.liveLabel || "Live Link"}
                            size="small"
                            sx={{
                              cursor: "pointer",
                              fontWeight: 600,
                              backgroundColor: alphaHex(
                                project.accentColor,
                                0.1,
                              ),
                              color: project.accentColor || "#10b981",
                              border: `1px solid ${alphaHex(project.accentColor, 0.3)}`,
                              "&:hover": {
                                backgroundColor: alphaHex(
                                  project.accentColor,
                                  0.2,
                                ),
                              },
                            }}
                          />
                        </Link>
                      )}
                      {project.githubLink && (
                        <Link
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="none"
                        >
                          <Chip
                            icon={<GitHubIcon fontSize="small" />}
                            label="GitHub"
                            size="small"
                            sx={{
                              cursor: "pointer",
                              fontWeight: 600,
                              backgroundColor: alphaHex(
                                project.accentColor,
                                0.1,
                              ),
                              color: project.accentColor || "text.primary",
                              border: `1px solid ${alphaHex(project.accentColor, 0.3)}`,
                              "&:hover": {
                                backgroundColor: alphaHex(
                                  project.accentColor,
                                  0.2,
                                ),
                              },
                            }}
                          />
                        </Link>
                      )}
                      {project.tryAssistant && (
                        <Chip
                          icon={<SmartToyIcon fontSize="small" />}
                          label="Try Assistant"
                          size="small"
                          onClick={() =>
                            window.dispatchEvent(new Event("open-chatbot"))
                          }
                          sx={{
                            cursor: "pointer",
                            fontWeight: 600,
                            backgroundColor: alphaHex(project.accentColor, 0.1),
                            color: project.accentColor || "#06b6d4",
                            border: `1px solid ${alphaHex(project.accentColor, 0.3)}`,
                            "&:hover": {
                              backgroundColor: alphaHex(
                                project.accentColor,
                                0.2,
                              ),
                            },
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  <Divider
                    sx={{ mb: 2, borderColor: "rgba(255,255,255,0.1)" }}
                  />

                  <Box sx={{ mb: 2 }}>
                    <List sx={{ p: 0 }}>
                      {project.achievements.map((achievement, achIndex) => (
                        <ListItem
                          key={achIndex}
                          sx={{ p: 0, pb: 1, alignItems: "flex-start" }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: project.accentColor || "primary.main",
                              mr: 1,
                              mt: 0.25,
                            }}
                          >
                            ✦
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ lineHeight: 1.6 }}
                          >
                            {achievement}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 2 }}
                  >
                    {project.technologies.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          borderRadius: 1,
                          backgroundColor: alphaHex(project.accentColor, 0.1),
                          color: project.accentColor || "primary.main",
                          border: "none",
                          "&:hover": {
                            backgroundColor: alphaHex(project.accentColor, 0.2),
                          },
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </ProjectCard>
            ))}
          </Stack>
        </OuterPaper>
      </Container>
    </Box>
  );
};

export default Projects;
