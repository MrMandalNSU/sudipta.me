import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
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
}));

const TextBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "transparent",
  flex: 1, // Ensures equal width with the image container
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const ProfileImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  maxHeight: 320,
  maxWidth: 320,
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
        pb: 4,
        display: "flex",
        alignItems: "center",
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <OuterPaper elevation={3}>
          {/* Main Layout Box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on desktop
              alignItems: "center",
              gap: 4,
            }}
          >
            {/* Text First on Mobile, Left on Desktop */}
            <TextBox
              sx={{
                flex: 2, // making the text box wider than image
                order: { xs: 2, md: 1 },
              }}
            >
              <Typography
                variant="responsiveHeader"
                component="h1"
                gutterBottom
              >
                Hi, I'm Sudipta Mandal
              </Typography>

              <Typography variant="body1" sx={{ color: "text.primary", fontSize: "1.1rem", lineHeight: 1.7, mb: 1 }}>
                A dedicated Software Engineer with over three years of experience building scalable, high-performance web applications and backend systems. Currently serving as a Software Engineer III at Cargo Stream, I specialize in modern cloud architectures, complex data parsing, and full-stack development.
                <br /><br />
                With a strong foundation in competitive programming, I thrive on tackling algorithmic challenges and delivering robust, user-centric solutions. Beyond my professional work, I actively contribute to the programming community as a mentor, problem setter, and judge for NSU Problem Solvers (NSUPS).
              </Typography>

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on desktop
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ minWidth: 200 }}
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
                  sx={{ minWidth: 200 }}
                  component="a"
                  href="mailto:mr.mandal16@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Me
                </Button>
              </Box>
            </TextBox>

            {/* Image First on Mobile, Right on Desktop */}
            <Box
              sx={{
                flex: 1,
                flexDirection: "column",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                alignSelf: "flex-start",
                order: { xs: 1, md: 2 },
              }}
            >
              <ProfileImage src={PROFILE_PHOTO} alt="Profile" />
              {/* Social Media Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  mt: 3,
                }}
              >
                <IconButton
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
                </IconButton>
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
          </Box>
        </OuterPaper>
      </Container>
    </Box>
  );
};

export default Intro;
