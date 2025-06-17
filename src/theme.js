import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode (blue + white)
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#2196f3",
          },
          background: {
            default: "#ffffff",
            paper: "#f5f5f5",
          },
          text: {
            primary: "#333333",
            secondary: "#555555",
          },
        }
      : {
          // Dark mode (red + black)
          primary: {
            main: "#f44336",
          },
          secondary: {
            main: "#ff5252",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#ffffff",
            secondary: "#cccccc",
          },
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },

    responsiveHeader: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      wordBreak: "break-word",
      hyphens: "auto",
      "@media (min-width:600px)": {
        fontSize: "2.2rem",
      },
      "@media (min-width:900px)": {
        fontSize: "2.5rem",
      },
      "@media (min-width:1200px)": {
        fontSize: "3rem",
      },
    },
  },
});

export const lightTheme = createTheme(getDesignTokens("light"));
export const darkTheme = createTheme(getDesignTokens("dark"));
