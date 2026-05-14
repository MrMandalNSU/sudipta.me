import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Avatar,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  School as SchoolIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Business as BusinessIcon,
  Language as LanguageIcon,
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

const ResearchCard = styled(Box)(({ theme }) => ({
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
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
    borderLeft: "none",
    borderRight: "none",
  },
}));

const InstitutionLogo = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  marginRight: theme.spacing(1.5),
  "& .MuiAvatar-img": {
    objectFit: "contain",
    padding: theme.spacing(0.5),
  },
}));

const Research = ({ id }) => {
  const researches = [
    {
      title: "Social Media Opinion Mining Based on Bangla Public Posts",
      institution: "North South University (NSU)",
      institutionLogo: "/research_logo.png",
      institutionUrl: "https://www.northsouth.edu/",
      researchLink: "https://ieeexplore.ieee.org/document/9689860",
      location: "Dhaka, Bangladesh",
      duration: "2021",
      type: "Research",
      focus: "Sentiment analysis of Bangla text from Facebook public posts",
      achievements: [
        "Conducted sentiment analysis on Bangla text using state-of-the-art ML techniques",
        "Created a dataset of 11K Bangla comments using semi-automatic crawler from Facebook",
        "Applied TF-IDF vectors, uni-bi-tri-gram analysis, and confusion matrix evaluation",
        "Implemented traditional ML algorithms for text classification and sentiment detection",
      ],
      technologies: [
        "Python",
        "Google Colab",
        "Machine Learning",
        "TF-IDF",
        "Natural Language Processing",
        "LaTeX",
        "Data Mining",
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
        px: { xs: 0, sm: 2 },
        py: 4,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 3 } }}>
        <OuterPaper elevation={3}>
          {/* Header Section */}
          <Box sx={{ mb: 4, pt: { xs: 4, sm: 0 }, px: { xs: 2, sm: 0 }, textAlign: "center" }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800, color: "text.primary", fontSize: { xs: "1.75rem", sm: "2.125rem" } }} gutterBottom>
              Research Experience
            </Typography>
          </Box>

          {/* Research Cards */}
          <Stack spacing={3}>
            {researches.map((research, index) => (
              <ResearchCard key={index} elevation={3}>
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
                      <InstitutionLogo src={research.institutionLogo} alt={`${research.institution} logo`}>
                        <BusinessIcon />
                      </InstitutionLogo>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                          {research.title}
                        </Typography>
                        <Link href={research.institutionUrl} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ color: "text.secondary" }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                            {research.institution} • {research.type}
                          </Typography>
                        </Link>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, alignItems: { xs: "flex-start", sm: "flex-end" }, textAlign: { xs: "left", sm: "right" } }}>
                      {research.researchLink && (
                        <Link href={research.researchLink} target="_blank" rel="noopener noreferrer" underline="none" sx={{ mb: 0.5 }}>
                          <Chip
                            icon={<LanguageIcon fontSize="small" />}
                            label="View Research"
                            size="small"
                            sx={{ cursor: "pointer", fontWeight: 600, backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.3)", "&:hover": { backgroundColor: "rgba(16, 185, 129, 0.2)" } }}
                          />
                        </Link>
                      )}
                      <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: { xs: "flex-start", sm: "flex-end" }, width: "100%" }}>
                        <CalendarIcon sx={{ fontSize: 14 }} /> {research.duration}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: { xs: "flex-start", sm: "flex-end" }, width: "100%" }}>
                        <LocationIcon sx={{ fontSize: 14 }} /> {research.location}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.1)" }} />

                  <Box sx={{ mb: 2 }}>
                    <List sx={{ p: 0 }}>
                      {research.focus && (
                        <ListItem sx={{ p: 0, pb: 1, alignItems: "flex-start" }}>
                          <Typography variant="body2" sx={{ color: "primary.main", mr: 1, mt: 0.25 }}>
                            ✦
                          </Typography>
                          <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6 }}>
                            <strong>Focus:</strong> {research.focus}
                          </Typography>
                        </ListItem>
                      )}
                      {research.achievements.map((achievement, achIndex) => (
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
                    {research.technologies.map((tech, techIndex) => (
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
              </ResearchCard>
            ))}
          </Stack>
        </OuterPaper>
      </Container>
    </Box>
  );
};

export default Research;
