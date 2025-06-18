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
  Work as WorkIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Business as BusinessIcon,
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

const CompanyLogo = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  //   backgroundColor: theme.palette.primary.main,
  marginRight: theme.spacing(1.5),
  "& .MuiAvatar-img": {
    objectFit: "contain",
    padding: theme.spacing(0.5),
  },
}));

const Experience = ({ id }) => {
  const experiences = [
    {
      title: "Software Engineer (L2)",
      company: "Eucaps AB",
      companyLogo: "/eucaps_logo.png",
      companyUrl: "https://eucaps.com/",
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
      companyLogo: "/nsups_logo.png",
      companyUrl: "https://nsups.vercel.app/",
      location: "Dhaka, Bangladesh",
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
            <Typography variant="responsiveHeader" component="h1" gutterBottom>
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
                        alignItems: {
                          xs: "flex-start",
                          sm: "center",
                        },
                        flexDirection: {
                          xs: "column",
                          sm: "row",
                        },
                        mb: 2,
                        gap: {
                          xs: 1.5,
                          sm: 1,
                        },
                      }}
                    >
                      {/* Work Icon for larger screens only */}
                      <WorkIcon
                        color="primary"
                        sx={{
                          mr: 1,
                          display: {
                            xs: "none",
                            sm: "block",
                          },
                        }}
                      />

                      {/* Job Title */}
                      <Typography
                        variant="responsiveTitle"
                        component="h2"
                        sx={{
                          fontWeight: "bold",
                          flex: {
                            xs: "none",
                            sm: 1,
                          },
                          order: {
                            xs: 1,
                            sm: 2,
                          },
                          textAlign: {
                            xs: "left",
                            sm: "center",
                          },
                        }}
                      >
                        {exp.title}
                      </Typography>

                      {/* Work Icon and Company Name for mobile only */}
                      <Box
                        sx={{
                          display: {
                            xs: "flex",
                            sm: "none",
                          },
                          alignItems: "center",
                          order: 2,
                        }}
                      >
                        <CompanyLogo
                          src={exp.companyLogo}
                          alt={`${exp.company} logo`}
                          sx={{ mr: 1 }}
                        >
                          <BusinessIcon />
                        </CompanyLogo>
                        <Link
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="hover"
                          sx={{ textDecoration: "none" }}
                        >
                          <Typography
                            variant="h5"
                            color="primary"
                            sx={{
                              fontWeight: 600,
                              "&:hover": {
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {exp.company}
                          </Typography>
                        </Link>
                      </Box>

                      {/* Employment Type Chip */}
                      <Chip
                        label={exp.type}
                        color={
                          exp.type === "Full-time" ? "primary" : "secondary"
                        }
                        variant="outlined"
                        size="medium"
                        sx={{
                          order: {
                            xs: 3,
                            sm: 3,
                          },
                          alignSelf: {
                            xs: "flex-start",
                            sm: "center",
                          },
                        }}
                      />
                    </Box>

                    {/* Company name with logo for larger screens */}
                    <Box
                      sx={{
                        display: {
                          xs: "none",
                          sm: "flex",
                        },
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      <CompanyLogo
                        src={exp.companyLogo}
                        alt={`${exp.company} logo`}
                      >
                        <BusinessIcon />
                      </CompanyLogo>
                      <Link
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        sx={{ textDecoration: "none" }}
                      >
                        <Typography
                          variant="h5"
                          color="primary"
                          sx={{
                            fontWeight: 600,
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {exp.company}
                        </Typography>
                      </Link>
                    </Box>

                    {/* Location and Duration */}
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
                      Tech & Tools
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
