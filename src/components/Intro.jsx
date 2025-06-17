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
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
}));

const TextBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[2],
  flex: 1, // Ensures equal width with the image container
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const ProfileImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  maxHeight: 300,
  maxWidth: 300,
  objectFit: "cover",
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
}));

const Intro = () => {
  return (
    <Box
      sx={{
        mt: 10,
        // minHeight: "calc(100vh - 64px)",
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

              <Typography variant="body1">
                A software engineer with more than three years of industrial
                experience. <br />
                I like to be adequate, organized, dedicated and self-driven
                person. Interested in to explore new things while sticking
                around my comfort zone. Love programming and problem-solving.
                Like to lead while being efficient at teamwork. Former
                competitive programming contestant, current problem setter and
                judge of NSU Problem Solvers (NSUPS). <br />
                Currently working as Software Engineer (Level 2) at Eucaps AB
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
                >
                  View My Work
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ minWidth: 200 }}
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
                <IconButton color="primary" sx={{ fontSize: 40 }}>
                  <Facebook />
                </IconButton>
                <IconButton color="primary" sx={{ fontSize: 40 }}>
                  <Instagram />
                </IconButton>
                <IconButton color="primary" sx={{ fontSize: 40 }}>
                  <Twitter />
                </IconButton>
                <IconButton color="primary" sx={{ fontSize: 40 }}>
                  <LinkedIn />
                </IconButton>
                <IconButton color="primary" sx={{ fontSize: 40 }}>
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
