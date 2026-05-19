import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TechCarousel from "./TechCarousel";
import {
  Facebook,
  Twitter,
  LinkedIn,
  GitHub,
  Instagram,
} from "@mui/icons-material";

const PROFILE_PHOTO = "./sudipta_dp.png";

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

const IntroCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.6)" : "rgba(30, 41, 59, 0.6)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",


  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
  borderRadius: theme.spacing(3),
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
    borderLeft: "none",
    borderRight: "none",
  },
}));

const ProfileImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  maxHeight: 275,
  maxWidth: 275,
  objectFit: "cover",
  borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
  boxShadow: "0 8px 32px rgba(79, 70, 229, 0.3)",
  animation: "float 6s ease-in-out infinite",
  transition: "all 0.5s ease-in-out",
  "&:hover": {
    borderRadius: "70% 30% 30% 70% / 70% 70% 30% 30%",
  }
}));

const Intro = ({ id }) => {
  return (
    <Box
      id={id}
      sx={{
        mt: 16,
        pb: { xs: 0, sm: 4 },
        display: "flex",
        alignItems: "center",
        px: { xs: 0, sm: 2 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 3 } }}>
        <OuterPaper elevation={3}>
          {/* Main Layout Box */}
          <IntroCard
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on desktop
              alignItems: "center",
              justifyContent: "space-between",
              p: { xs: 3, md: 5 },
            }}
          >
            {/* Text First on Mobile, Left on Desktop */}
            <Box
              sx={{
                flex: 2, // making the text box wider than image
                order: { xs: 2, md: 1 },
                pr: { md: 4 }, // Standard space between text and photo
              }}
            >
              <Typography
                variant="responsiveHeader"
                component="h1"
                gutterBottom
              >
                Hi, I'm Sudipta Mandal
              </Typography>

              <Typography variant="body2" sx={{ color: "text.primary", lineHeight: 1.7, mb: 1, textAlign: "justify" }}>
                A dedicated Software Engineer with 5+ years of industry experience in building scalable, high-performance web applications and backend systems. Currently working as a <b>Software Engineer III at Cargo Stream</b>, I specialize in backend engineering, cloud-based architectures, complex data parsing, and scalable system design. Experienced in collaborating with international remote teams, I combine strong technical expertise with effective English communication and product-focused problem solving.
                With a solid foundation in competitive programming and algorithms, I enjoy tackling complex engineering challenges and building reliable, user-centric solutions. Beyond my professional work, I actively contribute to the programming community as a mentor, problem setter, and judge at NSU Problem Solvers (NSUPS).
              </Typography>

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "row", // Keep in one line
                  gap: { xs: 1, sm: 2 },
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ flex: { xs: 1, sm: "none" }, minWidth: { xs: "auto", sm: 200 }, whiteSpace: "nowrap", px: { xs: 1, sm: 3 } }}
                  component="a"
                  href="https://github.com/MrMandalNSU?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View My Work
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ flex: { xs: 1, sm: "none" }, minWidth: { xs: "auto", sm: 200 }, whiteSpace: "nowrap", px: { xs: 1, sm: 3 } }}
                  component="a"
                  href="mailto:mr.mandal16@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Me
                </Button>
              </Box>
            </Box>

            {/* Image First on Mobile, Right on Desktop */}
            <Box
              sx={{
                flex: 1,
                flexDirection: "column",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                order: { xs: 1, md: 2 },
                zIndex: 2,
                position: "relative",
                mt: { xs: -8, md: -5 }, // Down-shifted slightly to align social buttons with left buttons perfectly
                mb: { xs: 4, md: 0 },
              }}
            >
              <ProfileImage src={PROFILE_PHOTO} alt="Profile" />
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  fontWeight: 600,
                  color: "text.primary",
                  textAlign: "center",
                  letterSpacing: "0.5px",
                  lineHeight: 1.5,
                  maxWidth: "280px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "2px 6px",
                  opacity: 0.9,
                  "& span": {
                    color: "primary.main",
                    fontWeight: 700,
                  }
                }}
              >
                5Y+ Experience <span>|</span> Laravel <span>|</span> Node.js <span>|</span> AWS <span>|</span> Context Engineering <span>|</span> Remote-First Engineer
              </Typography>
              {/* Social Media Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  mt: 2,
                }}
              >
                {/* <IconButton
                  color="primary"
                  sx={{ fontSize: 40 }}
                  component="a"
                  href="https://www.facebook.com/sudipta.dipta2/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  color="primary"
                  sx={{ fontSize: 40 }}
                  component="a"
                  href="https://www.instagram.com/mr_mandal/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  color="primary"
                  sx={{ fontSize: 40 }}
                  component="a"
                  href="https://x.com/mr_mandal_16/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter />
                </IconButton> */}
                <IconButton
                  color="primary"
                  sx={{ fontSize: 40 }}
                  component="a"
                  href="https://www.linkedin.com/in/mrmandal/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  color="primary"
                  sx={{ fontSize: 40 }}
                  component="a"
                  href="https://github.com/MrMandalNSU/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHub />
                </IconButton>
              </Box>
            </Box>
          </IntroCard>
          <TechCarousel />
        </OuterPaper>
      </Container>
    </Box>
  );
};

export default Intro;
