import React from "react";
import { Box, Typography, Dialog, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Timeline as TimelineIcon,
  SportsEsports as SportsEsportsIcon,
  Close as CloseIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import { snapshotsList } from "./constants";
import { SectionHeading } from "./styles";

const SnapshotsSection = ({
  theme,
  lightboxOpen,
  setLightboxOpen,
  lightboxIndex,
  setLightboxIndex,
}) => {
  return (
    <>
      {/* ════ Section 6: Snapshots ════ */}
      <Box id="snapshots" sx={{ scrollMarginTop: 120, mb: 4 }}>
        <SectionHeading theme={theme}>Snapshots</SectionHeading>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 650 }}>
          Visual walkthrough of the ValoDash interface on desktop and mobile viewports. Click any image to view it full-screen.
        </Typography>

        {/* Subheading: Desktop Views */}
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2.5, display: "flex", alignItems: "center", gap: 1 }}>
          <TimelineIcon color="primary" fontSize="small" />
          Desktop Layouts
        </Typography>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {snapshotsList.filter(s => s.type === "desktop").map((item, idx) => {
            const originalIndex = snapshotsList.findIndex(s => s.src === item.src);
            return (
              <Grid key={idx} size={{ xs: 12, sm: 6 }}>
                <Box
                  onClick={() => {
                    setLightboxIndex(originalIndex);
                    setLightboxOpen(true);
                  }}
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "3px solid rgba(255, 255, 255, 0.15)",
                    background: theme.palette.mode === "light" ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.4)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-4px) scale(1.01)",
                      boxShadow: theme.palette.mode === "light" ? "0 12px 30px rgba(79, 70, 229, 0.15)" : "0 12px 30px rgba(129, 140, 248, 0.15)",
                      borderColor: "primary.main",
                      "& .hover-overlay": { opacity: 1 },
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={item.src}
                    alt={item.title}
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                  {/* Hover Overlay */}
                  <Box
                    className="hover-overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(15, 23, 42, 0.6)",
                      backdropFilter: "blur(4px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      p: 2,
                      textAlign: "center"
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Subheading: Mobile Views */}
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2.5, display: "flex", alignItems: "center", gap: 1 }}>
          <SportsEsportsIcon color="primary" fontSize="small" />
          Mobile Viewports
        </Typography>

        {/* Grid layout for vertical mobile viewports */}
        <Grid container spacing={3} columns={10}>
          {snapshotsList.filter(s => s.type === "mobile").map((item, idx) => {
            const originalIndex = snapshotsList.findIndex(s => s.src === item.src);
            return (
              <Grid key={idx} size={{ xs: 5, md: 2 }}>
                <Box
                  onClick={() => {
                    setLightboxIndex(originalIndex);
                    setLightboxOpen(true);
                  }}
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "3px solid rgba(255, 255, 255, 0.15)",
                    background: theme.palette.mode === "light" ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.4)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-4px) scale(1.02)",
                      boxShadow: theme.palette.mode === "light" ? "0 12px 30px rgba(79, 70, 229, 0.18)" : "0 12px 30px rgba(129, 140, 248, 0.18)",
                      borderColor: "primary.main",
                      "& .hover-overlay": { opacity: 1 },
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={item.src}
                    alt={item.title}
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      aspectRatio: "383/851",
                      objectFit: "cover"
                    }}
                  />
                  {/* Hover Overlay */}
                  <Box
                    className="hover-overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(15, 23, 42, 0.65)",
                      backdropFilter: "blur(4px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      p: 1.5,
                      textAlign: "center"
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "#fff", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.75rem" }}>
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* ── Lightbox Modal ── */}
      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        maxWidth="lg"
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
            overflow: "visible",
            m: { xs: 1, sm: 2 }
          }
        }}
      >
        <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Close Button */}
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{
              position: "absolute",
              top: -48,
              right: 0,
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" }
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Active Image */}
          <Box
            component="img"
            src={snapshotsList[lightboxIndex].src}
            alt={snapshotsList[lightboxIndex].title}
            sx={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: 0,
              boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
              backgroundColor: theme.palette.mode === "light" ? "rgba(255,255,255,0.95)" : "#0f172a",
              border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"}`,
            }}
          />

          {/* Unified Navigation & Caption Control Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              mt: 2,
              px: 2,
              py: 1.2,
              borderRadius: 0,
              backgroundColor: "rgba(15,23,42,0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.08)",
              gap: 2
            }}
          >
            {/* Prev Image Button */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev === 0 ? snapshotsList.length - 1 : prev - 1));
              }}
              sx={{
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.05)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" }
              }}
            >
              <NavigateBeforeIcon />
            </IconButton>

            {/* Caption */}
            <Box sx={{ textAlign: "center", flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", fontSize: { xs: "0.85rem", sm: "1rem" } }}>
                {snapshotsList[lightboxIndex].title}
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", display: "block", mt: 0.5 }}>
                Screenshot {lightboxIndex + 1} of {snapshotsList.length} • {snapshotsList[lightboxIndex].type.toUpperCase()} VIEW
              </Typography>
            </Box>

            {/* Next Image Button */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev === snapshotsList.length - 1 ? 0 : prev + 1));
              }}
              sx={{
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.05)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" }
              }}
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default SnapshotsSection;
