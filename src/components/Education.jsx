import React from "react";
import {
  Box,
  Container,
  Typography,
  CardContent,
  Stack,
  Divider,
  Paper,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import CalendarIcon from "@mui/icons-material/CalendarToday";

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

const EducationCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  cursor: "default",


  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "@media (hover: hover)": {
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      boxShadow: "0 12px 24px rgba(16, 185, 129, 0.2)",
      border: `1px solid ${theme.palette.success.main}`,
    },
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    borderRadius: 0,
  },
}));

const InstitutionLogo = styled(Avatar)(({ theme }) => ({
  width: 90,
  height: 90,
  marginRight: theme.spacing(3),
  backgroundColor: "transparent",
  "& .MuiAvatar-img": {
    objectFit: "contain",
  },
  [theme.breakpoints.down("sm")]: {
    width: 60,
    height: 60,
    marginRight: theme.spacing(2),
  },
}));

const Education = ({ id }) => {
  const educations = [
    {
      institution: "North South University (NSU)",
      degree: "BSc in Computer Science & Engineering",
      duration: "Class of 2021",
      logo: "/education/nsu_logo.webp",
      details: [
        "CGPA: 3.53/4.00 (88%+)",
        "CSE Major CGPA: 3.62/4.00 (90%+)",
        "Distinction: Cum Laude"
      ],
      description: "Actively involved in competitive programming, solving complex algorithmic challenges and participating in national and regional contests."
    },
    {
      institution: "BCIC College",
      degree: "Higher Secondary in Science",
      duration: "Class of 2015",
      logo: "/education/bcic_logo.webp",
      details: [
        "GPA 5.00/5.00"
      ],
      description: "Participated in the Math Olympiad and engaged in advanced mathematical problem-solving."
    },
    {
      institution: "Betagi Govt. High School",
      degree: "Secondary in Science",
      duration: "Class of 2013",
      logo: "/education/bghs_logo.webp",
      details: [
        "GPA 5.00/5.00"
      ],
      description: "Participated in multiple Science Fairs and achieved national level recognition in boys scouts."
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
              Education
            </Typography>
          </Box>

          {/* Education Cards */}
          <Box sx={{ position: "relative" }}>
            {/* Continuous Vertical Timeline Line */}
            <Box
              sx={{
                position: "absolute",
                top: { xs: "24px", sm: "32px" },
                bottom: { xs: "24px", sm: "32px" },
                left: { xs: "46px", sm: "61px" }, // 46px = 16px padding + 30px (center of 60px logo), 61px = 16px padding + 45px (center of 90px logo)
                width: 2,
                backgroundColor: (theme) => theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)",
                zIndex: 0,
              }}
            />

            <Stack spacing={4}>
              {educations.map((edu, index) => (
                <EducationCard key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "row",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <InstitutionLogo 
                      src={edu.logo} 
                      alt={`${edu.institution} logo`}
                      imgProps={{ width: 90, height: 90, loading: "lazy" }}
                    >
                      <SchoolIcon />
                    </InstitutionLogo>

                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, flexGrow: 1, gap: 2, alignItems: "stretch", justifyContent: "center" }}>

                      {/* Left Details */}
                      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", alignItems: "flex-start", textAlign: "left" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            mb: 0.5,
                          }}
                        >
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 700, lineHeight: 1.2, color: "text.primary", mb: 0.25, textAlign: "left" }}>
                            {edu.institution}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "text.primary", mb: 0.25, textAlign: "left" }}>
                            {edu.degree}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "text.primary", textAlign: "left" }}>
                            {edu.duration}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0.5 }}>
                          {edu.details.map((detail, idx) => (
                            <Typography key={idx} variant="body2" sx={{ color: "text.primary", textAlign: "left" }}>
                              {detail}
                            </Typography>
                          ))}
                        </Box>
                      </Box>

                      {/* Divider */}
                      <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" }, borderColor: (theme) => theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)" }} />
                      <Divider orientation="horizontal" flexItem sx={{ display: { xs: "block", md: "none" }, borderColor: (theme) => theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)", my: 0.5 }} />

                      {/* Right Description */}
                      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", alignItems: "flex-start", textAlign: "left" }}>
                        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6, fontStyle: "italic", textAlign: "left" }}>
                          "{edu.description}"
                        </Typography>
                      </Box>

                    </Box>
                  </Box>
                </EducationCard>
              ))}
            </Stack>
          </Box>
        </OuterPaper>
      </Container>
    </Box>
  );
};

export default Education;
