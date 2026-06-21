import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GetAppIcon from "@mui/icons-material/GetApp";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ScienceIcon from "@mui/icons-material/Science";
import { useTheme } from "../contexts/ThemeContext";
import ResumeModal from "./ResumeModal";

const navItems = ["Intro", "Experience", "Agentic AI", "Projects", "Research", "Programming", "Education", "Gallery"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeMenuAnchor, setResumeMenuAnchor] = useState(null);
  const { mode, toggleColorMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate offset to account for the fixed navbar
      const navbarHeight = 100; // Adjust this value based on your navbar's height + margin
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNavClick = (item) => {
    const sectionIds = {
      Intro: "intro",
      Experience: "experience",
      "Agentic AI": "agentic-ai",
      Projects: "projects",
      Research: "research",
      Programming: "cp",
      Education: "education",
      Gallery: "gallery",
    };
    const targetId = sectionIds[item];
    if (!targetId) return;

    if (location.pathname === "/") {
      scrollToSection(targetId);
    } else {
      navigate(`/#${targetId}`);
    }
  };

  const handleBrandClick = () => {
    if (location.pathname === "/") {
      scrollToTop();
    } else {
      navigate("/");
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleResumeMenuOpen = (event) => {
    setResumeMenuAnchor(event.currentTarget);
  };

  const handleResumeMenuClose = () => {
    setResumeMenuAnchor(null);
  };

  const handleViewResume = () => {
    setResumeModalOpen(true);
    handleResumeMenuClose();
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Resume_Sudipta_Mandal.pdf";
    link.download = "Resume_Sudipta_Mandal.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleResumeMenuClose();
  };

  const handleCloseResumeModal = () => {
    setResumeModalOpen(false);
  };

  const itemIcons = {
    Intro: <PersonIcon />,
    Experience: <WorkIcon />,
    "Agentic AI": <SmartToyIcon />,
    Projects: <CodeIcon />,
    Research: <ScienceIcon />,
    Programming: <EmojiEventsIcon />,
    Education: <SchoolIcon />,
    Gallery: <PhotoLibraryIcon />,
  };

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header section with close button and profile overview */}
      <Box
        sx={{
          p: 3,
          position: "relative",
          background: mode === "light"
            ? "linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(6, 182, 212, 0.1))"
            : "linear-gradient(135deg, rgba(129, 140, 248, 0.15), rgba(34, 211, 238, 0.15))",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <IconButton
          aria-label="close drawer"
          onClick={handleDrawerToggle}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "text.secondary"
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 1 }}>
          <Avatar
            src="/sudipta_dp.webp"
            alt="Sudipta Mandal"
            imgProps={{ width: 70, height: 70, loading: "lazy" }}
            sx={{
              width: 70,
              height: 70,
              mb: 1.5,
              border: "3px solid",
              borderColor: "primary.main",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)"
            }}
          />
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontWeight: 800,
              color: "text.primary",
              letterSpacing: "-0.01em",
              fontSize: "1.15rem"
            }}
          >
            Sudipta Mandal
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              fontSize: "0.8rem",
              textAlign: "center"
            }}
          >
            Senior Software Engineer @ Cargo Stream
          </Typography>
        </Box>
      </Box>

      {/* Navigation List */}
      <Box sx={{ flexGrow: 1, px: 2, py: 2, overflowY: "auto" }}>
        <List sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <Button
                fullWidth
                onClick={() => {
                  handleNavClick(item);
                  handleDrawerToggle();
                }}
                sx={{
                  justifyContent: "flex-start",
                  px: 2,
                  py: 1.25,
                  borderRadius: 2,
                  color: "text.primary",
                  transition: "all 0.2s ease",
                  textTransform: "none",
                  "& .MuiButton-startIcon": {
                    color: "primary.main",
                    transition: "transform 0.2s ease",
                  },
                  "&:hover": {
                    backgroundColor: mode === "light" ? "rgba(79, 70, 229, 0.08)" : "rgba(129, 140, 248, 0.15)",
                    transform: "translateX(4px)",
                    "& .MuiButton-startIcon": {
                      transform: "scale(1.1)",
                    },
                  }
                }}
                startIcon={itemIcons[item]}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: "0.3px" }}>
                  {item}
                </Typography>
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Resume Options and Social Links at Bottom */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          background: mode === "light" ? "rgba(0,0,0,0.01)" : "rgba(255,255,255,0.01)"
        }}
      >
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Button
            fullWidth
            onClick={() => {
              handleViewResume();
              handleDrawerToggle();
            }}
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<DescriptionIcon />}
            sx={{ py: 1, borderRadius: 2 }}
          >
            View Resume
          </Button>
          <Button
            fullWidth
            onClick={() => {
              handleDownloadResume();
              handleDrawerToggle();
            }}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<GetAppIcon />}
            sx={{ py: 1, borderRadius: 2 }}
          >
            Download PDF
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="center">
          <IconButton
            aria-label="LinkedIn Profile"
            color="primary"
            component="a"
            href="https://www.linkedin.com/in/mrmandal/"
            target="_blank"
            rel="noopener noreferrer"
            size="small"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            aria-label="GitHub Profile"
            color="primary"
            component="a"
            href="https://github.com/MrMandalNSU/"
            target="_blank"
            rel="noopener noreferrer"
            size="small"
          >
            <GitHubIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "95%", md: "95%", lg: "95%", xl: "80%" },
        transform: "translateX(-50%)",
        position: "fixed",
        top: { xs: 0, sm: 16 },
        left: "50%",
        zIndex: 1100,
      }}
    >
      <AppBar
        component="nav"
        position="static"
        sx={{
          width: "100%",
          borderRadius: { xs: 0, sm: 4 },
          background: mode === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(15, 23, 42, 0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",


          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ display: "flex" }}>
          <Button
            onClick={handleBrandClick}
            sx={{
              textTransform: "none",
              fontSize: { xs: "1.1rem", lg: "1.25rem" },
              color: "inherit",
              display: "block",
              order: { xs: 2, lg: 1 },
              ml: { xs: "auto", lg: 0 },
              mr: { xs: 0, lg: "auto" },
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Sudipta Mandal
          </Button>

          <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", order: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "inherit",
                  mx: { lg: 0.25, xl: 0.5 },
                  px: { lg: 1.25, xl: 2 },
                  minWidth: "auto",
                  fontSize: { lg: "0.875rem", xl: "1rem" }
                }}
                onClick={() => handleNavClick(item)}
              >
                {item}
              </Button>
            ))}
            <Button
              sx={{
                color: "inherit",
                ml: { lg: 0.5, xl: 1 },
                px: { lg: 1.25, xl: 2 },
                fontSize: { lg: "0.875rem", xl: "1rem" }
              }}
              onClick={handleResumeMenuOpen}
              endIcon={<DescriptionIcon sx={{ fontSize: { lg: "1.25rem", xl: "1.5rem" } }} />}
            >
              Resume
            </Button>
            <Menu
              anchorEl={resumeMenuAnchor}
              open={Boolean(resumeMenuAnchor)}
              onClose={handleResumeMenuClose}
              disableScrollLock
            >
              <MenuItem onClick={handleViewResume}>
                <DescriptionIcon sx={{ mr: 1 }} />
                View Resume
              </MenuItem>
              <MenuItem onClick={handleDownloadResume}>
                <GetAppIcon sx={{ mr: 1 }} />
                Download PDF
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", order: { xs: 1, lg: 3 } }}>
            <IconButton aria-label="toggle theme" color="inherit" onClick={toggleColorMode} sx={{ ml: { xs: 0, lg: 1 } }}>
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 1, display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            background: mode === "light"
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(243, 244, 246, 0.95))"
              : "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderLeft: "none",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "4px 0 24px rgba(0, 0, 0, 0.15)",
            color: "text.primary",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Resume Modal */}
      <ResumeModal open={resumeModalOpen} onClose={handleCloseResumeModal} />
    </Box>
  );
};

export default Navbar;
