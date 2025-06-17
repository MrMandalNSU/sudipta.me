import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../theme";

const ThemeContext = createContext({
  mode: "light",
  toggleColorMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// Function to get system preference
const getSystemTheme = () => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light"; // fallback
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedMode = localStorage.getItem("theme-mode");
    if (savedMode) {
      return savedMode;
    }
    return getSystemTheme();
  });

  // Save to localStorage when mode changes
  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  // Listen for system changes only if no saved preference exists
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode");
    if (!savedMode) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e) => {
        setMode(e.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
