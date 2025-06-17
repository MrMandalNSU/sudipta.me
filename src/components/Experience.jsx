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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Work as WorkIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";

const OuterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
}));

const ExperienceCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer (L2)",
      company: "Eucaps AB",
      location: "Sweden Based, Remote",
      duration: "Dec 2021 - Present",
      type: "Full-time",
      achievements: [
        "Worked in technologies including Node JS, Laravel, Express JS, React JS, Next JS, AWS Amplify, Lambda, AWS S3 Bucket, Apollo Server, Apollo Client, GraphQL, MySQL, DynamoDB, PostgreSQL, REST API, Docker.",
        "Created REST APIs for external 3rd party access using an existing database with JWT token authentication. Secured token by creating custom HMac encryptions, and made documentation using GitHub wiki.",
        "Worked with S&P financial data, mnemonics, YoY-Margin-LTM calculations, generated scalable backend structure for 200+ megabytes JSON data, created express API with GraphQL to make consumable for frontend.",
        "Implemented APIs from external sources and features from scratch including services from pinpoint, inderes.",
        "Created several financial charts backend functionalities and implemented a filtering system for charts and maps.",
        "Worked on implementing the Stripe payment system gateway and the KYC verification system by Trulioo.",
        "Created Event Calendar feature on the project platform built on services from S&P Capital IQ APIs.",
        "Implemented OpenAI's GPT-3.5 Turbo API to generate context-aware hashtags from company descriptions, and used DALL·E 3 to create AI-generated images based on business summaries for enhanced presentation.",
      ],
      technologies: [
        "Node.js",
        "Laravel",
        "Express.js",
        "React.js",
        "Next.js",
        "AWS Amplify",
        "AWS Lambda",
        "AWS S3",
        "GraphQL",
        "MySQL",
        "DynamoDB",
        "PostgreSQL",
        "REST API",
        "Docker",
        "OpenAI GPT-3.5",
        "DALL·E 3",
      ],
    },
    {
      title: "Junior Developer",
      company: "NSUPS",
      location: "Voluntary",
      duration: "Oct 2020 - Nov 2021",
      type: "Volunteer",
      achievements: [
        "Implemented an automatic crawler to fetch data from different online judges to track the users' solve count frequency.",
        "Created backend for a system managing the participants of NSUPS Bootcamp.",
      ],
      technologies: ["Web Crawling", "Backend Development", "Data Management"],
    },
  ];

  return (
    <Box
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
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontSize: {
                  xs: "1.8rem", // Small screens
                  sm: "2.2rem", // Small-medium screens
                  md: "2.5rem", // Medium screens
                  lg: "3rem", // Large screens
                },
                fontWeight: "bold",
                wordBreak: "break-word", // Prevents overflow
                hyphens: "auto", // Adds hyphenation if needed
              }}
            >
              Professional Experience
            </Typography>
          </Box>

          {/* Experience Cards */}
          <Stack spacing={3}>
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} elevation={3}>
                <CardContent sx={{ p: 3 }}>
                  {/* Header Section */}
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <WorkIcon color="primary" sx={{ mr: 1 }} />
                      <Typography
                        variant="h4"
                        component="h2"
                        sx={{ fontWeight: "bold", flex: 1 }}
                      >
                        {exp.title}
                      </Typography>
                      <Chip
                        label={exp.type}
                        color={
                          exp.type === "Full-time" ? "primary" : "secondary"
                        }
                        variant="outlined"
                        size="medium"
                      />
                    </Box>

                    <Typography
                      variant="h5"
                      color="primary"
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      {exp.company}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        flexWrap: "wrap",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <LocationIcon fontSize="small" color="action" />
                        <Typography variant="body1" color="text.secondary">
                          {exp.location}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <CalendarIcon fontSize="small" color="action" />
                        <Typography variant="body1" color="text.secondary">
                          {exp.duration}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  {/* Achievements Section */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      Key Achievements
                    </Typography>
                    <List sx={{ pl: 0 }}>
                      {exp.achievements.map((achievement, achIndex) => (
                        <ListItem key={achIndex} sx={{ pl: 0, pb: 1 }}>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body1"
                                sx={{
                                  "&::before": {
                                    content: '"●"',
                                    color: "primary.main",
                                    fontWeight: "bold",
                                    mr: 1,
                                  },
                                }}
                              >
                                {achievement}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* Technologies Section */}
                  <Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      Technologies & Tools
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {exp.technologies.map((tech, techIndex) => (
                        <Chip
                          key={techIndex}
                          label={tech}
                          variant="outlined"
                          size="medium"
                          sx={{
                            borderRadius: 2,
                            "&:hover": {
                              backgroundColor: "primary.main",
                              color: "primary.contrastText",
                              borderColor: "primary.main",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </ExperienceCard>
            ))}
          </Stack>
        </OuterPaper>
      </Container>
    </Box>
  );
};

export default Experience;
