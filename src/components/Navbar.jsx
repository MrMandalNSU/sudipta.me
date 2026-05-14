import { useState } from "react";
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
  useMediaQuery,
  useTheme as useMuiTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GetAppIcon from "@mui/icons-material/GetApp";
import DescriptionIcon from "@mui/icons-material/Description";
import { useTheme } from "../contexts/ThemeContext";
import ResumeModal from "./ResumeModal";

const navItems = ["Intro", "Experience", "Projects", "CP", "Gallery"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeMenuAnchor, setResumeMenuAnchor] = useState(null);
  const { mode, toggleColorMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

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
    switch (item) {
      case "Intro":
        scrollToSection("intro");
        break;
      case "Experience":
        scrollToSection("experience");
        break;
      case "Projects":
        scrollToSection("projects");
        break;
      case "CP":
        scrollToSection("cp");
        break;
      case "Gallery":
        scrollToSection("gallery");
        break;
      default:
        break;
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

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Sudipta Mandal
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <Button fullWidth onClick={() => handleNavClick(item)}>
              <ListItemText primary={item} />
            </Button>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <Button fullWidth onClick={handleViewResume}>
            <ListItemText primary="View Resume" />
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button fullWidth onClick={handleDownloadResume}>
            <ListItemText primary="Download Resume" />
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
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
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          color: "text.primary",
        }}
      >
        <Toolbar>
          <Button
            onClick={scrollToTop}
            sx={{
              textTransform: "none", // Prevent text from being capitalized
              fontSize: "1.25rem", // Adjust text size
              color: "inherit", // Inherit the color from the theme
              display: { xs: "none", md: "block" }, // Only display on md and larger screens
              mr: "auto", // Keep it left-aligned
              whiteSpace: "nowrap", // Prevent text from wrapping
              flexShrink: 0, // Prevent button from shrinking
            }}
          >
            Sudipta Mandal
          </Button>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "inherit", mx: 0.5 }}
                onClick={() => handleNavClick(item)}
              >
                {item}
              </Button>
            ))}
            <Button
              sx={{ color: "inherit", ml: 1 }}
              onClick={handleResumeMenuOpen}
              endIcon={<DescriptionIcon />}
            >
              Resume
            </Button>
            <Menu
              anchorEl={resumeMenuAnchor}
              open={Boolean(resumeMenuAnchor)}
              onClose={handleResumeMenuClose}
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
          <IconButton color="inherit" onClick={toggleColorMode} sx={{ ml: 1 }}>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 1, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
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
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
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
