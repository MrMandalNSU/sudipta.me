import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Close as CloseIcon,
  Download as DownloadIcon,
  Fullscreen as FullscreenIcon,
} from "@mui/icons-material";

const RESUME_PATH = "/Resume_Sudipta_Mandal.pdf";

const ResumeModal = ({ open, onClose }) => {


  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = RESUME_PATH;
    link.download = "Resume_Sudipta_Mandal.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFullscreen = () => {
    const pdfWindow = window.open(RESUME_PATH, "_blank");
    pdfWindow.focus();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          backgroundImage: "none",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "1.3rem",
        }}
      >
        My Resume
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "text.primary",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "action.hover",
          minHeight: "500px",
        }}
      >
        <iframe
          src={RESUME_PATH}
          width="100%"
          height="600px"
          style={{
            border: "none",
            borderRadius: "8px",
          }}
          title="Resume PDF Viewer"
        />
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 1.5,
        }}
      >
        <Box 
          sx={{ 
            display: "flex", 
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
            width: { xs: "100%", sm: "auto" }
          }}
        >
          <Tooltip title="View in new tab">
            <Button
              startIcon={<FullscreenIcon />}
              onClick={handleFullscreen}
              variant="outlined"
              size="small"
              sx={{ 
                width: { xs: "100%", sm: "auto" },
                whiteSpace: "nowrap"
              }}
            >
              Full Screen
            </Button>
          </Tooltip>
          <Tooltip title="Download PDF">
            <Button
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              variant="contained"
              color="primary"
              size="small"
              sx={{ 
                width: { xs: "100%", sm: "auto" },
                whiteSpace: "nowrap"
              }}
            >
              Download
            </Button>
          </Tooltip>
        </Box>
        <Button 
          onClick={onClose} 
          variant="outlined"
          size="small"
          startIcon={<CloseIcon />}
          sx={{ 
            width: { xs: "100%", sm: "auto" },
            ml: "0 !important", // Override default MUI margin-left to prevent alignment mismatch
            color: "text.secondary",
            transition: "all 0.2s ease-in-out",
            borderColor: (theme) => theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.15)",
            "&:hover": {
              color: "error.main",
              borderColor: "error.main",
              backgroundColor: (theme) => theme.palette.mode === "light" ? "rgba(211, 47, 47, 0.04)" : "rgba(244, 67, 54, 0.08)",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(211, 47, 47, 0.12)"
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResumeModal;
