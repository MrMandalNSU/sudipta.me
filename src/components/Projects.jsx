import React from "react";
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
} from "@mui/icons-material";

const OuterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  background: theme.palette.mode === "light" 
    ? "rgba(255, 255, 255, 0.4)" 
    : "rgba(15, 23, 42, 0.4)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
}));

const ProjectCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.6)" : "rgba(30, 41, 59, 0.6)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 12px 24px rgba(79, 70, 229, 0.2)",
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

const ProjectIconBox = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  marginRight: theme.spacing(1.5),
  backgroundColor: "rgba(79, 70, 229, 0.1)",
  color: theme.palette.primary.main,
}));

const Projects = ({ id }) => {
  const projects = [
    {
      title: "Text Analyzer",
      type: "Web App",
      liveLink: "https://text-analyzer-sudipta.vercel.app/",
      githubLink: "https://github.com/MrMandalNSU/text-analyzer",
      achievements: [
        "Developed an online platform to analyze text data with auto-generated reports. Implemented CRUD for text, with each browser acting as a unique user. Ensured fast, lightweight analysis. Adopted by 10+ active users.",
        "Built an interactive UI, optimized analysis, and deployed using Node, Express, TS, React, Vite, MUI, and TDD.",
      ],
      technologies: [
        "Node",
        "Express",
        "TypeScript",
        "React",
        "Vite",
        "Material UI",
        "TDD"
      ],
    },
  ];

  return (
    <Box
      id={id}
      sx={{
        mt: 0,
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <OuterPaper elevation={3}>
          {/* Header Section */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800, color: "text.primary" }} gutterBottom>
              Projects
            </Typography>
          </Box>

          {/* Project Cards */}
          <Stack spacing={3}>
            {projects.map((project, index) => (
              <ProjectCard key={index} elevation={3}>
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
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <ProjectIconBox>
                        <CodeIcon />
                      </ProjectIconBox>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                          {project.title}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 500, color: "text.secondary" }}>
                          {project.type}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1.5, textAlign: { xs: "left", sm: "right" } }}>
                      {project.liveLink && (
                        <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" underline="none">
                          <Chip 
                            icon={<LanguageIcon fontSize="small" />} 
                            label="Live Link" 
                            size="small"
                            sx={{ cursor: "pointer", fontWeight: 600, backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.3)", "&:hover": { backgroundColor: "rgba(16, 185, 129, 0.2)" } }}
                          />
                        </Link>
                      )}
                      {project.githubLink && (
                        <Link href={project.githubLink} target="_blank" rel="noopener noreferrer" underline="none">
                          <Chip 
                            icon={<GitHubIcon fontSize="small" />} 
                            label="GitHub" 
                            size="small"
                            sx={{ cursor: "pointer", fontWeight: 600, backgroundColor: "rgba(255, 255, 255, 0.1)", color: "text.primary", border: "1px solid rgba(255, 255, 255, 0.2)", "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" } }}
                          />
                        </Link>
                      )}
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.1)" }} />

                  <Box sx={{ mb: 2 }}>
                    <List sx={{ p: 0 }}>
                      {project.achievements.map((achievement, achIndex) => (
                        <ListItem key={achIndex} sx={{ p: 0, pb: 1, alignItems: "flex-start" }}>
                          <Typography variant="body2" sx={{ color: "primary.main", mr: 1, mt: 0.25 }}>
                            ✦
                          </Typography>
                          <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6 }}>
                            {achievement}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 2 }}>
                    {project.technologies.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          borderRadius: 1,
                          backgroundColor: "rgba(79, 70, 229, 0.1)",
                          color: "primary.main",
                          border: "none",
                          "&:hover": { backgroundColor: "rgba(79, 70, 229, 0.2)" }
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
