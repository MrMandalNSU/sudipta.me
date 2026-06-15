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
  margin: theme.spacing(4, "auto", 4, "auto"),
  padding: theme.spacing(2), // Reduce padding on mobile
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "95%",
    padding: theme.spacing(3),
    borderRadius: theme.spacing(4),
  },
  [theme.breakpoints.up("md")]: {
    width: "95%",
    padding: theme.spacing(4),
  },
  [theme.breakpoints.up("lg")]: {
    width: "80%",
  },
  background: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(15, 23, 42, 0.7)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",


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
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 3 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row", // Always keep it as a row
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Left Side: Name, Icons, Subtitle */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
                Sudipta Mandal
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <IconButton size="small" color="primary" component="a" href="https://www.linkedin.com/in/mrmandal/" target="_blank" rel="noopener noreferrer" sx={{ p: 0.5 }}>
                  <LinkedIn fontSize="small" />
                </IconButton>
                <IconButton size="small" color="primary" component="a" href="https://github.com/MrMandalNSU/" target="_blank" rel="noopener noreferrer" sx={{ p: 0.5 }}>
                  <GitHub fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Software Engineer III @ Cargo Stream
            </Typography>
          </Box>

          {/* Right Side: Back to top */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", sm: "block" } }}>
              Back to top
            </Typography>
            <ScrollTopButton onClick={scrollToTop} size="small">
              <ArrowUpIcon />
            </ScrollTopButton>
          </Box>
        </Box>

        <Divider sx={(theme) => ({ my: { xs: 1.5, sm: 1.5 }, borderColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)" })} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Sudipta Mandal. Built with React, Vite, Material-UI, Context Engineering & Coffee ☕.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
