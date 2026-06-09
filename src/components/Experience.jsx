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
  [theme.breakpoints.down("sm")]: {
    padding: 0,
    borderRadius: 0,
    background: "transparent",
    boxShadow: "none",
  },
}));

const ExperienceCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.6)" : "rgba(30, 41, 59, 0.6)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",


  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "@media (hover: hover)": {
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      boxShadow: "0 12px 24px rgba(79, 70, 229, 0.2)",
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
    borderLeft: "none",
    borderRight: "none",
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
        "Architect and built a flexible, layout-aware document-processing system utilizing Laravel, pattern recognition, text analysis, and context mapping to accurately parse inconsistent logistic PDFs from multiple global partners.",
        "Designed custom extraction logic and robust fallback rules to seamlessly isolate tabular and irregular data from unstructured logistic documents, including orders, credit notes, and service invoices across multiple languages.",
        "Engineered automated normalization pipelines that transformed raw, varied PDF outputs into highly structured JSON and CSV formats, ensuring format-agnostic data integrity for downstream workflows with 100% accuracy.",
        "Leveraged agentic AI-assisted context engineering, pattern analysis, and agentic workflow automation to accelerate development workflows. Improved research and development engineering productivity by 50%.",
        "Collaborated closely with the CTO to optimize core data ingestion flows, significantly enhancing the parsing module’s performance, robustness, accuracy, and scalability to support increasing document volumes.",
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
      title: "Senior Software Engineer",
      company: "Sports Fixtures",
      companyLogo: "/sports_fixures_logo.avif",
      companyUrl: "https://sportsfixtures.com/",
      location: "Pattaya, Thailand · Remote",
      duration: "Oct 2025 - Jan 2026",
      type: "Contract, Project-Based",
      achievements: [
        "Built and maintained from scratch using Node.js, Strapi v5, PostgreSQL, and Redis. Deployed and managed production infrastructure with centralized logging, monitoring, and environment management across platforms.",
        "Designed and optimized 50+ relational database models and advanced multi-model filtering/query systems, improving large-scale data retrieval with caching and data indexing. Increased performance by 40%.",
        "Implemented secure authentication and authorization features, including SMTP OTP verification, Google OAuth, Facebook OAuth, and JWT auth flow, improving login reliability and reducing authentication friction.",
        "Integrated complete SportsDB v1/v2 APIs, real-time live sports score functionality using WebSockets, and multiple third-party News APIs; optimized performance with Redis and Node cache strategies. Developed automated cron job schedulers and background workers that reduced API synchronization downtime by 30%.",
        "Boosted engineering productivity by 50% by architecting agentic AI workflows, automating documentation, and implementing advanced error logging and context-engineering strategies.",
      ],
      technologies: [
        "Node.js",
        "Strapi v5",
        "PostgreSQL",
        "Neon DB",
        "Redis",
        "Railway",
        "WebSocket",
        "OAuth",
        "SMTP",
        "Database Design",
        "System Architecture",
        "CI/CD",
        "Workflow Automation",
        "Agentic AI",
        "Context Engineering"
      ],
    },
    {
      title: "Software Engineer I → II",
      company: "Eucaps AB",
      companyLogo: "/eucaps_logo.png",
      companyUrl: "https://eucaps.com/",
      location: "Stockholm, Sweden · Remote",
      duration: "Dec 2021 - Sept 2025",
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
        "Implemented an automated crawler system to fetch and process data from multiple online judges for tracking users’ solve counts and submission activity.",
        "Developed and maintained backend services for the NSUPS Bootcamp participant management system using RESTful APIs and relational database design.",
        "Built CRUD operations, entity relationships, and data validation workflows for participant, batch, and activity management.",
        "Designed optimized database schemas and query structures to improve data consistency and backend maintainability.",
        "Collaborated with team members to develop scalable backend features and support internal university programming events.",
      ],
      technologies: ["Web Crawling", "Backend Development", "Data Management", "RestAPI", "Data Validation"],
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
        py: { xs: 0, sm: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 3 } }}>
        <OuterPaper elevation={3}>
          {/* Header Section */}
          <Box sx={{ mb: { xs: 2, sm: 4 }, pt: { xs: 2, sm: 0 }, px: { xs: 2, sm: 0 }, textAlign: "center" }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800, color: "text.primary", fontSize: { xs: "1.75rem", sm: "2.125rem" } }} gutterBottom>
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
