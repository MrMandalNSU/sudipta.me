import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Facebook,
  Twitter,
  LinkedIn,
  GitHub,
  Instagram,
  KeyboardArrowUp as ArrowUpIcon,
} from "@mui/icons-material";

const FooterContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(8, "auto", 4, "auto"),
  padding: theme.spacing(4),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "90%",
    borderRadius: theme.spacing(4),
  },
  [theme.breakpoints.up("md")]: {
    width: "80%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "70%",
  },
  background: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(15, 23, 42, 0.7)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  color: "text.primary",
}));

const ScrollTopButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "rgba(79, 70, 229, 0.1)",
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    transform: "translateY(-4px)",
  },
  transition: "all 0.3s ease",
}));

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <FooterContainer component="footer">
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Sudipta Mandal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Software Engineer III @ Cargo Stream
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton color="primary" component="a" href="https://www.linkedin.com/in/mrmandal/" target="_blank" rel="noopener noreferrer">
              <LinkedIn />
            </IconButton>
            <IconButton color="primary" component="a" href="https://github.com/MrMandalNSU/" target="_blank" rel="noopener noreferrer">
              <GitHub />
            </IconButton>
            <IconButton color="primary" component="a" href="https://www.facebook.com/sudipta.dipta2/" target="_blank" rel="noopener noreferrer">
              <Facebook />
            </IconButton>
            <IconButton color="primary" component="a" href="https://www.instagram.com/mr_mandal/" target="_blank" rel="noopener noreferrer">
              <Instagram />
            </IconButton>
            <IconButton color="primary" component="a" href="https://x.com/mr_mandal_16/" target="_blank" rel="noopener noreferrer">
              <Twitter />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", md: "block" } }}>
              Back to top
            </Typography>
            <ScrollTopButton onClick={scrollToTop} size="medium">
              <ArrowUpIcon />
            </ScrollTopButton>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Sudipta Mandal. Built with React, Vite, Material-UI & Coffee ☕.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
