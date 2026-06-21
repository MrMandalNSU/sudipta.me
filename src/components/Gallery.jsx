import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  useTheme as useMuiTheme,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import PrevIcon from "@mui/icons-material/ArrowBackIosNew";
import NextIcon from "@mui/icons-material/ArrowForwardIos";

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

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 500,
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
  backgroundColor: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.6)" : "rgba(30, 41, 59, 0.6)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",


  border: "1px solid rgba(255, 255, 255, 0.1)",
  [theme.breakpoints.down("sm")]: {
    height: 350,
    borderRadius: 0,
    borderLeft: "none",
    borderRight: "none",
  },
}));

const CarouselImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
  display: "block",
  position: "relative",
  zIndex: 1,
});

const BlurredBackground = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "-10%",
  left: "-10%",
  width: "120%",
  height: "120%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(20px)",
  opacity: theme.palette.mode === "light" ? 0.6 : 0.4,
  zIndex: 0,
  transition: "background-image 0.5s ease-in-out",
}));

const CaptionOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(4),
  background: theme.palette.mode === "light"
    ? "linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)"
    : "linear-gradient(to top, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(15, 23, 42, 0) 100%)",
  textAlign: "center",
  zIndex: 2,
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(15, 23, 42, 0.7)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",


  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(15, 23, 42, 0.9)",
  },
  zIndex: 10,
  [theme.breakpoints.down("sm")]: {
    top: "auto",
    bottom: theme.spacing(1), // align horizontally with the dots
    transform: "none",
    width: 32,
    height: 32,
    backgroundColor: "transparent", // remove background to look cleaner at bottom
    backdropFilter: "none",
  WebkitBackdropFilter: "none",


    "& svg": {
      fontSize: "1.2rem",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const DotsContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(1),
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(1),
  zIndex: 10,
}));

const Dot = styled(Box)(({ theme, active }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: active ? theme.palette.primary.main : theme.palette.text.secondary,
  opacity: active ? 1 : 0.5,
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    opacity: 1,
    transform: "scale(1.2)",
  },
}));

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const pulse = keyframes({
  "0%, 100%": { opacity: 0.6, transform: "scale(0.95)" },
  "50%": { opacity: 1, transform: "scale(1.05)" },
});

const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  // Solid semi-transparent background instead of expensive backdropFilter blur
  background: theme.palette.mode === "light"
    ? "rgba(255, 255, 255, 0.85)"
    : "rgba(15, 23, 42, 0.85)",
  zIndex: 3,
  transition: "opacity 0.4s ease-in-out, visibility 0.4s ease-in-out",
}));

const SpinnerWrapper = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 80,
  height: 80,
});

const SpinnerRing = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: "50%",
  border: `3px solid ${
    theme.palette.mode === "light"
      ? "rgba(79, 70, 229, 0.08)"
      : "rgba(129, 140, 248, 0.08)"
  }`,
  borderTop: `3px solid ${theme.palette.primary.main}`,
  borderRight: `3px solid ${theme.palette.secondary.main}`,
  animation: `${spin} 1s linear infinite`,
  position: "absolute",
}));

const SpinnerPulse = styled(Box)(({ theme }) => ({
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: theme.palette.mode === "light"
    ? "radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%)"
    : "radial-gradient(circle, rgba(129, 140, 248, 0.15) 0%, rgba(34, 211, 238, 0.05) 100%)",
  animation: `${pulse} 2s ease-in-out infinite`,
  position: "absolute",
}));

// Hoisted to module scope — no longer recreated every render
const GALLERY_IMAGES = [
  { img: "/gallery/annual_dinner_eucaps_2022.webp", title: "Eucaps AB Annual Dinner 2022" },
  { img: "/gallery/annual_tour_eucaps_2024.webp", title: "Eucaps AB Annual Tour 2024" },
  { img: "/gallery/bootcamp_intro_2020.webp", title: "NSUPS Bootcamp Intro Session 2020" },
  { img: "/gallery/convocation_2023.webp", title: "NSU Convocation Ceremony 2023" },
  { img: "/gallery/full_team_intra_2023.webp", title: "Organizing Team, Intra NSU Programming Contest 2023" },
  { img: "/gallery/icpc_team_2019.webp", title: "ACM ICPC Regional Team (NSU_0011) 2019" },
  { img: "/gallery/intra_nsu_2018.webp", title: "Placement, Intra NSU Programming Contest 2018" },
  { img: "/gallery/intra_nsu_2019.webp", title: "Intra NSU Junior Programming Contest 2019" },
  { img: "/gallery/intra_nsu_jr_contest_2024.webp", title: "Intra NSU Junior Programming Contest 2024" },
  { img: "/gallery/judge_pannel_intra_2023.webp", title: "Judge Panel, Intra NSU Programming Contest 2023" },
  { img: "/gallery/team_lunch_eucaps_2022.webp", title: "Eucaps AB Team Lunch 2022" },
];

const Gallery = ({ id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // Track whether the enter animation has completed (separate from image load)
  const [animationPhase, setAnimationPhase] = useState("idle"); // "idle" | "entering" | "visible"
  const theme = useMuiTheme();

  // Randomize images on mount
  useEffect(() => {
    const shuffled = [...GALLERY_IMAGES].sort(() => 0.5 - Math.random());
    setImages(shuffled);
  }, []);

  // Preload next and previous images for instant loading
  useEffect(() => {
    if (images.length === 0) return;
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    [nextIndex, prevIndex].forEach((idx) => {
      if (images[idx]) {
        const img = new Image();
        img.src = images[idx].img;
      }
    });
  }, [currentIndex, images]);

  // Handle slide transition: set up animation phase when image loads
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    setAnimationPhase("entering");
    // After animation completes, mark as visible
    const timer = setTimeout(() => setAnimationPhase("visible"), 500);
    return () => clearTimeout(timer);
  }, []);

  const goToSlide = useCallback((newIndex, direction) => {
    setIsLoaded(false);
    setAnimationPhase("idle");
    if (direction) {
      // direction is implicit from comparison
    }
    setCurrentIndex(newIndex);
  }, []);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    goToSlide((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, goToSlide]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    goToSlide(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [currentIndex, images.length, goToSlide]);

  // Auto-slide every 7 seconds, pausing when the tab/page is hidden to save resources and prevent background load bugs
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      if (!document.hidden) {
        handleNext();
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [images.length, handleNext]);

  // Touch handlers for swiping
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  if (images.length === 0) return null;

  // Compute image styles: crossfade + subtle scale animation without key remount
  const imageStyle = {
    opacity: isLoaded ? 1 : 0,
    transform: animationPhase === "entering" ? "scale(1)" : isLoaded ? "scale(1)" : "scale(0.97)",
    transition: "opacity 0.5s ease-in-out, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
  };

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
          <Box sx={{ mb: { xs: 2, sm: 4 }, pt: { xs: 2, sm: 0 }, px: { xs: 2, sm: 0 }, textAlign: "center" }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800, color: "text.primary", fontSize: { xs: "1.75rem", sm: "2.125rem" } }} gutterBottom>
              Moments & Achievements
            </Typography>
          </Box>

          <CarouselContainer
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <BlurredBackground
              style={{
                backgroundImage: `url(${images[currentIndex].img})`,
                opacity: isLoaded
                  ? (theme.palette.mode === "light" ? 0.6 : 0.4)
                  : 0,
              }}
            />
            {/* No key prop — src change triggers new load without destroying the DOM node */}
            <CarouselImage
              src={images[currentIndex].img}
              alt={images[currentIndex].title}
              onLoad={handleImageLoad}
              onError={() => setIsLoaded(true)}
              style={imageStyle}
              loading="lazy"
            />

            <LoadingOverlay
              style={{
                opacity: isLoaded ? 0 : 1,
                visibility: isLoaded ? "hidden" : "visible",
              }}
            >
              <SpinnerWrapper>
                <SpinnerRing />
                <SpinnerPulse />
              </SpinnerWrapper>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: "text.secondary",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                  textTransform: "uppercase",
                  animation: `${pulse} 2s ease-in-out infinite`,
                }}
              >
                Loading Moment...
              </Typography>
            </LoadingOverlay>

            <CaptionOverlay>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  fontSize: { xs: "0.75rem", sm: "1.25rem" },
                  lineHeight: { xs: 1.2, sm: 1.6 },
                }}
              >
                {images[currentIndex].title}
              </Typography>
            </CaptionOverlay>

            <NavButton onClick={handlePrev} sx={{ left: 16 }}>
              <PrevIcon />
            </NavButton>

            <NavButton onClick={handleNext} sx={{ right: 16 }}>
              <NextIcon />
            </NavButton>

            <DotsContainer>
              {images.map((_, idx) => (
                <Dot
                  key={idx}
                  active={idx === currentIndex ? 1 : 0}
                  onClick={() => {
                    goToSlide(idx);
                  }}
                />
              ))}
            </DotsContainer>
          </CarouselContainer>
        </OuterPaper>
      </Container>
    </Box>
  );
};

export default Gallery;
