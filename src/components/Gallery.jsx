import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  useTheme as useMuiTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBackIosNew as PrevIcon,
  ArrowForwardIos as NextIcon,
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

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 500,
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
  backgroundColor: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.6)" : "rgba(30, 41, 59, 0.6)",
  backdropFilter: "blur(12px)",
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
  objectFit: "contain", // changed from "cover" to avoid cropping
  display: "block",
  transition: "opacity 0.5s ease-in-out",
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

const Gallery = ({ id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  const initialImages = [
    { img: "/gallery/annual_dinner_eucaps_2022.jpg", title: "Eucaps AB Annual Dinner 2022" },
    { img: "/gallery/annual_tour_eucaps_2024.jpg", title: "Eucaps AB Annual Tour 2024" },
    { img: "/gallery/bootcamp_intro_2020.jpg", title: "NSUPS Bootcamp Intro Session 2020" },
    { img: "/gallery/convocation_2023.jpg", title: "NSU Convocation Ceremony 2023" },
    { img: "/gallery/full_team_intra_2023.JPG", title: "Organizing Team at Intra NSU Programming Contest 2023" },
    { img: "/gallery/icpc_team_2019.jpg", title: "ACM ICPC Regional Team (NSU_0011) 2019" },
    { img: "/gallery/intra_nsu_2018.png", title: "Placement at Intra NSU Programming Contest 2018" },
    { img: "/gallery/intra_nsu_2019.jpg", title: "Intra NSU Programming Contest 2019" },
    { img: "/gallery/intra_nsu_jr_contest_2024.jpg", title: "Intra NSU Junior Programming Contest 2024" },
    { img: "/gallery/judge_pannel_intra_2023.JPG", title: "Serving on the Judge Panel - Intra NSU Programming Contest 2023" },
    { img: "/gallery/team_lunch_eucaps_2022.png", title: "Eucaps AB Team Lunch 2022" },
  ];

  // Randomize images on mount
  useEffect(() => {
    const shuffled = [...initialImages].sort(() => 0.5 - Math.random());
    setImages(shuffled);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Auto-slide every 7 seconds
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(handleNext, 7000);
    return () => clearInterval(interval);
  }, [images.length, currentIndex]); // depends on currentIndex so it resets on manual navigation

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
          <Box sx={{ mb: 4, pt: { xs: 4, sm: 0 }, px: { xs: 2, sm: 0 }, textAlign: "center" }}>
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
              style={{ backgroundImage: `url(${images[currentIndex].img})` }} 
            />
            <CarouselImage
              key={currentIndex} // forces re-render/animation on index change
              src={images[currentIndex].img}
              alt={images[currentIndex].title}
            />

            <CaptionOverlay>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
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
                  onClick={() => setCurrentIndex(idx)}
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
