import React from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

/* ── Keyframes ── */
export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const pulseGlow = keyframes`
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1; }
`;

export const dashFlow = keyframes`
  to { stroke-dashoffset: -20; }
`;

/* ── Styled Components ── */
export const GlassCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.55)"
      : "rgba(30, 41, 59, 0.5)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: `1px solid ${theme.palette.mode === "light"
    ? "rgba(0, 0, 0, 0.06)"
    : "rgba(255, 255, 255, 0.08)"
    }`,
  boxShadow:
    theme.palette.mode === "light"
      ? "0 4px 24px rgba(0, 0, 0, 0.06)"
      : "0 4px 24px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "@media (hover: hover)": {
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow:
        theme.palette.mode === "light"
          ? "0 12px 32px rgba(79, 70, 229, 0.15)"
          : "0 12px 32px rgba(129, 140, 248, 0.15)",
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const StatCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.5)"
      : "rgba(30, 41, 59, 0.4)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: `1px solid ${theme.palette.mode === "light"
    ? "rgba(79, 70, 229, 0.1)"
    : "rgba(129, 140, 248, 0.1)"
    }`,
  textAlign: "center",
  transition: "all 0.3s ease",
  "@media (hover: hover)": {
    "&:hover": {
      transform: "translateY(-2px)",
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const TocLink = styled(Button)(({ theme, active }) => ({
  justifyContent: "flex-start",
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1),
  textTransform: "none",
  fontWeight: active ? 700 : 500,
  fontSize: "0.875rem",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  borderLeft: `3px solid ${active ? theme.palette.primary.main : "transparent"
    }`,
  backgroundColor: active
    ? theme.palette.mode === "light"
      ? "rgba(79, 70, 229, 0.08)"
      : "rgba(129, 140, 248, 0.1)"
    : "transparent",
  transition: "all 0.2s ease",
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
  fontWeight: active ? 700 : 500,
  cursor: "pointer",
  backgroundColor: active
    ? theme.palette.primary.main
    : theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.6)"
      : "rgba(30, 41, 59, 0.6)",
  color: active ? "#FFF" : theme.palette.text.secondary,
  border: `1px solid ${active
    ? "transparent"
    : theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.08)"
      : "rgba(255, 255, 255, 0.08)"
    }`,
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: active
      ? theme.palette.primary.main
      : theme.palette.mode === "light"
        ? "rgba(79, 70, 229, 0.08)"
        : "rgba(129, 140, 248, 0.1)",
  },
}));

export const SidebarItem = styled(Button)(({ theme, active }) => ({
  justifyContent: "flex-start",
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.spacing(1),
  textTransform: "none",
  fontWeight: active ? 700 : 500,
  fontSize: "0.85rem",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active
    ? theme.palette.mode === "light"
      ? "rgba(79, 70, 229, 0.06)"
      : "rgba(129, 140, 248, 0.08)"
    : "transparent",
  borderLeft: `3px solid ${active ? theme.palette.primary.main : "transparent"
    }`,
  transition: "all 0.15s ease",
  minWidth: "unset",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(79, 70, 229, 0.04)"
        : "rgba(129, 140, 248, 0.05)",
    transform: "none",
    boxShadow: "none",
  },
}));

export const DiagramBoard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  background:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.35)"
      : "rgba(15, 23, 42, 0.25)",
  backgroundImage:
    theme.palette.mode === "light"
      ? "radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px)"
      : "radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
  border: `1px solid ${theme.palette.mode === "light"
    ? "rgba(0, 0, 0, 0.06)"
    : "rgba(255, 255, 255, 0.06)"
    }`,
  padding: theme.spacing(3),
  boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.04)",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    overflowX: "auto",
  },
}));

export const SectionHeading = ({ children, theme }) => (
  <Box sx={{ borderLeft: `4px solid ${theme.palette.primary.main}`, pl: 2.5, mb: 3 }}>
    <Typography variant="h4" sx={{ fontWeight: 900, fontSize: { xs: "1.6rem", sm: "2rem" } }}>
      {children}
    </Typography>
  </Box>
);
