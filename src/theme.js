import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode (indigo + slate)
          primary: {
            main: "#4F46E5",
          },
          secondary: {
            main: "#06B6D4",
          },
          background: {
            default: "transparent",
            paper: "rgba(255, 255, 255, 0.6)",
          },
          text: {
            primary: "#0F172A",
            secondary: "#475569",
          },
        }
      : {
          // Dark mode (indigo + slate)
          primary: {
            main: "#818CF8",
          },
          secondary: {
            main: "#22D3EE",
          },
          background: {
            default: "transparent",
            paper: "rgba(15, 23, 42, 0.6)",
          },
          text: {
            primary: "#F8FAFC",
            secondary: "#94A3B8",
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    responsiveHeader: {
      fontSize: "2rem",
      fontWeight: 800,
      letterSpacing: "-0.02em",
      wordBreak: "break-word",
      hyphens: "auto",
      background: "linear-gradient(45deg, #4F46E5, #06B6D4)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
      "@media (min-width:900px)": {
        fontSize: "3rem",
      },
      "@media (min-width:1200px)": {
        fontSize: "3.5rem",
      },
    },

    responsiveTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      wordBreak: "break-word",
      hyphens: "auto",
      "@media (min-width:600px)": {
        fontSize: "1.8rem",
      },
      "@media (min-width:900px)": {
        fontSize: "2rem",
      },
      "@media (min-width:1200px)": {
        fontSize: "2.2rem",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          transition: "all 0.2s ease-in-out",
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease-in-out",
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
          "&:hover": {
            transform: "translateY(-2px) scale(1.05)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
  },
});

export const lightTheme = createTheme(getDesignTokens("light"));
export const darkTheme = createTheme(getDesignTokens("dark"));
