import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const technologies = [
  "Laravel",
  "Node.js",
  "Express",
  "React",
  "Next.js",
  "GraphQL",
  "PostgreSQL",
  "MySQL",
  "AWS Lambda",
  "AWS S3",
  "AWS Amplify",
  "DynamoDB",
  "Pattern Recognition",
  "Context Programming",
  "Analytical Thinking",
  "JavaScript",
  "TypeScript",
  "Php",
  "Python",
  "C++",
  "Java",
  "Docker",
  "Redis",
  "CI/CD",
];

const CarouselWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  padding: theme.spacing(2, 0),
  marginTop: theme.spacing(4),
  marginBottom: 0, // Reduces bottom space to match the top
  background: theme.palette.mode === "light"
    ? "rgba(255, 255, 255, 0.3)"
    : "rgba(0, 0, 0, 0.2)",
  borderRadius: theme.spacing(2),
  boxShadow: theme.palette.mode === "light"
    ? "inset 0 2px 15px rgba(0,0,0,0.03), 0 4px 15px rgba(0,0,0,0.02)"
    : "inset 0 2px 15px rgba(0,0,0,0.3), 0 4px 15px rgba(0,0,0,0.1)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
}));

const MaskContainer = styled(Box)({
  overflow: "hidden",
  whiteSpace: "nowrap",
  width: "100%",
  maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
});

const Track = styled(Box)({
  display: "inline-flex",
  width: "max-content",
  animation: "marquee 40s linear infinite",
  "@keyframes marquee": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" },
  },
  "&:hover": {
    animationPlayState: "paused",
  },
});

const TechItem = styled(Typography)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  margin: "0 2.5rem",
  fontSize: "0.875rem",
  fontWeight: 700,
  color:
    theme.palette.mode === "light"
      ? theme.palette.primary.main
      : theme.palette.primary.light,
  textTransform: "uppercase",
  letterSpacing: "2px",
  opacity: 0.7,
  transition: "opacity 0.3s ease, transform 0.3s ease",
  "&:hover": {
    opacity: 1,
    transform: "scale(1.1)",
  },
}));

const TechCarousel = () => {
  return (
    <CarouselWrapper>
      <MaskContainer>
        <Track>
          {/* Render array twice for seamless loop */}
          {[...technologies, ...technologies].map((tech, index) => (
            <TechItem key={index} variant="h6">
              {tech}
            </TechItem>
          ))}
        </Track>
      </MaskContainer>
    </CarouselWrapper>
  );
};

export default TechCarousel;
