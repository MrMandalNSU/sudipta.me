import React from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const GlassCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.58)"
      : "rgba(30, 41, 59, 0.52)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: `1px solid ${
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.06)"
      : "rgba(255, 255, 255, 0.08)"
  }`,
  boxShadow:
    theme.palette.mode === "light"
      ? "0 4px 24px rgba(0, 0, 0, 0.06)"
      : "0 4px 24px rgba(0, 0, 0, 0.2)",
  transition: "all 0.25s ease",
  "@media (hover: hover)": {
    "&:hover": {
      transform: "translateY(-3px)",
      borderColor: theme.palette.primary.main,
      boxShadow:
        theme.palette.mode === "light"
          ? "0 12px 32px rgba(79, 70, 229, 0.14)"
          : "0 12px 32px rgba(129, 140, 248, 0.14)",
    },
  },
}));

export const StatCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2.5),
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.5)"
      : "rgba(15, 23, 42, 0.34)",
  border: `1px solid ${
    theme.palette.mode === "light"
      ? "rgba(79, 70, 229, 0.1)"
      : "rgba(129, 140, 248, 0.12)"
  }`,
  height: "100%",
}));

export const DiagramBoard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  background:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.36)"
      : "rgba(15, 23, 42, 0.28)",
  backgroundImage:
    theme.palette.mode === "light"
      ? "radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px)"
      : "radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
  border: `1px solid ${
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.06)"
      : "rgba(255, 255, 255, 0.06)"
  }`,
  padding: theme.spacing(3),
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

export const TocLink = styled(Button)(({ theme, active }) => ({
  justifyContent: "flex-start",
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1),
  textTransform: "none",
  fontWeight: active ? 800 : 500,
  fontSize: "0.875rem",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  borderLeft: `3px solid ${active ? theme.palette.primary.main : "transparent"}`,
  backgroundColor: active
    ? theme.palette.mode === "light"
      ? "rgba(79, 70, 229, 0.08)"
      : "rgba(129, 140, 248, 0.1)"
    : "transparent",
  minWidth: "unset",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(79, 70, 229, 0.05)"
        : "rgba(129, 140, 248, 0.06)",
    transform: "none",
    boxShadow: "none",
  },
}));

export const MobileTocChip = styled(Chip)(({ theme, active }) => ({
  fontWeight: active ? 800 : 600,
  cursor: "pointer",
  backgroundColor: active
    ? theme.palette.primary.main
    : theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.72)"
      : "rgba(30, 41, 59, 0.72)",
  color: active ? "#fff" : theme.palette.text.secondary,
  border: `1px solid ${
    active
      ? "transparent"
      : theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.08)"
        : "rgba(255, 255, 255, 0.08)"
  }`,
}));

export const SectionHeading = ({ children, theme }) => (
  <Box sx={{ borderLeft: `4px solid ${theme.palette.primary.main}`, pl: 2.5, mb: 3 }}>
    <Typography variant="h4" sx={{ fontWeight: 900, fontSize: { xs: "1.55rem", sm: "2rem" } }}>
      {children}
    </Typography>
  </Box>
);
