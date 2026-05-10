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
  borderRadius: theme.spacing(3),
  background: theme.palette.mode === "light"
    ? "rgba(255, 255, 255, 0.4)"
    : "rgba(15, 23, 42, 0.4)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
}));

const ExperienceCard = styled(Box)(({ theme }) => ({
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
      title: "Software Engineer III",
      company: "Cargo Stream",
      companyLogo: "/cargo_stream_logo.png",
      companyUrl: "https://cargostream.co/",
      location: "Vilnius, Lithuania · Remote",
      duration: "Nov 2025 - Present",
      type: "Full-time",
      achievements: [
        "Developing a dynamic document-processing system that parses diverse logistics and invoice PDFs from multiple partners.",
        "Building a flexible, layout-aware PDF parser capable of handling inconsistent invoice structures across different companies.",
        "Extracting tabular and irregular data using custom logic, fallback rules, and pattern-matching techniques.",
        "Transforming raw PDF output into structured JSON and CSV formats for automated downstream workflows.",
        "Ensuring data accuracy by implementing normalization pipelines and format-agnostic extraction strategies.",
        "Working closely with CTO to optimize data ingestion flows and improve document-processing performance.",
        "Enhancing scalability and robustness of the parsing module to support increasing document volumes.",
      ],
      technologies: [
        "Laravel",
        "PHP",
        "Pattern Recognition",
        "Data Normalization",
        "Text Analysis",
        "PDF-to-text tools",
        "Docker",
        "Git",
      ],
    },
    {
      title: "Software Engineer II",
      company: "Eucaps AB",
      companyLogo: "/eucaps_logo.png",
      companyUrl: "https://eucaps.com/",
      location: "Stockholm, Sweden · Remote",
      duration: "Dec 2021 - Oct 2025",
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
      companyUrl: "https://nsups.org/",
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
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800, color: "text.primary" }} gutterBottom>
              Professional Experience
            </Typography>
          </Box>

          {/* Experience Cards */}
          <Stack spacing={3}>
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} elevation={3}>
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
                      <CompanyLogo src={exp.companyLogo} alt={`${exp.company} logo`}>
                        <BusinessIcon />
                      </CompanyLogo>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                          {exp.title}
                        </Typography>
                        <Link href={exp.companyUrl} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ color: "text.secondary" }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                            {exp.company} • {exp.type}
                          </Typography>
                        </Link>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                      <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: { xs: "flex-start", sm: "flex-end" } }}>
                        <CalendarIcon sx={{ fontSize: 14 }} /> {exp.duration}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: { xs: "flex-start", sm: "flex-end" }, mt: 0.5 }}>
                        <LocationIcon sx={{ fontSize: 14 }} /> {exp.location}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.1)" }} />

                  <Box sx={{ mb: 2 }}>
                    <List sx={{ p: 0 }}>
                      {exp.achievements.map((achievement, achIndex) => (
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
                    {exp.technologies.map((tech, techIndex) => (
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
              </ExperienceCard>
            ))}
          </Stack>
        </OuterPaper>
      </Container>
    </Box>
  );
};

export default Experience;
