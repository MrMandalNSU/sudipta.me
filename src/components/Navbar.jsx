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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../contexts/ThemeContext";

const navItems = ["Home", "About", "Skills", "Projects", "Contact"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, toggleColorMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Sudipta Mandal
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <Button fullWidth>
              <ListItemText primary={item} />
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%", lg: "70%" },
        transform: "translateX(-50%)",
        position: "fixed",
        top: 0,
        left: "50%",
        zIndex: 1100,
      }}
    >
      <AppBar component="nav" position="sticky" sx={{ width: "100%" }}>
        <Toolbar>
          <Button
            sx={{
              textTransform: "none", // Prevent text from being capitalized
              fontSize: "1.25rem", // Adjust text size
              color: "inherit", // Inherit the color from the theme
              backgroundColor: "transparent", // Transparent background
              boxShadow: "none", // Remove default button shadow
              "&:hover": {
                transform: "translateY(-3px)", // Lift the button a bit
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Add glow effect
                backgroundColor: "rgba(255, 255, 255, 0.08)", // Optional: add subtle background change on hover
              },
              display: { xs: "none", sm: "block" }, // Only display on larger screens
              mr: "auto", // Keep it left-aligned
            }}
          >
            Sudipta Mandal
          </Button>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
          <IconButton color="inherit" onClick={toggleColorMode} sx={{ ml: 1 }}>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 1, display: { sm: "none" } }}
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
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
