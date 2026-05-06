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
} from "@mui/icons-material";

const OuterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
}));

const ResearchCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
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
      institutionLogo: "/sudipta.svg",
      institutionUrl: "https://www.northsouth.edu/",
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
        px: 2,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <OuterPaper elevation={3}>
          {/* Header Section */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="responsiveHeader" component="h1" gutterBottom>
              Research Experience
            </Typography>
          </Box>

          {/* Research Cards */}
          <Stack spacing={3}>
            {researches.map((research, index) => (
              <ResearchCard key={index} elevation={3}>
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
                      {/* School Icon for larger screens only */}
                      <SchoolIcon
                        color="primary"
                        sx={{
                          mr: 1,
                          display: {
                            xs: "none",
                            sm: "block",
                          },
                        }}
                      />

                      {/* Research Title */}
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
                        {research.title}
                      </Typography>

                      {/* School Icon and Institution Name for mobile only */}
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
                        <InstitutionLogo
                          src={research.institutionLogo}
                          alt={`${research.institution} logo`}
                          sx={{ mr: 1 }}
                        >
                          <BusinessIcon />
                        </InstitutionLogo>
                        <Link
                          href={research.institutionUrl}
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
                            {research.institution}
                          </Typography>
                        </Link>
                      </Box>

                      {/* Research Type Chip */}
                      <Chip
                        label={research.type}
                        color="primary"
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

                    {/* Institution name with logo for larger screens */}
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
                      <InstitutionLogo
                        src={research.institutionLogo}
                        alt={`${research.institution} logo`}
                      >
                        <BusinessIcon />
                      </InstitutionLogo>
                      <Link
                        href={research.institutionUrl}
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
                          {research.institution}
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
                          {research.location}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <CalendarIcon fontSize="small" color="action" />
                        <Typography variant="body1" color="text.secondary">
                          {research.duration}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Research Focus */}
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: "text.primary",
                          fontStyle: "italic",
                        }}
                      >
                        Focus: {research.focus}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  {/* Achievements/Contributions Section */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      Key Contributions
                    </Typography>
                    <List sx={{ pl: 0 }}>
                      {research.achievements.map((achievement, achIndex) => (
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

                  {/* Technologies/Methods Section */}
                  <Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      Technologies & Methods
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {research.technologies.map((tech, techIndex) => (
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
              </ResearchCard>
            ))}
          </Stack>
        </OuterPaper>
      </Container>
    </Box>
  );
};

export default Research;
