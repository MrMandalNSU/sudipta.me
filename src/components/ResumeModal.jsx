import React, { useState } from "react";
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
  const [isFullscreen, setIsFullscreen] = useState(false);

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
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="View in new tab">
            <Button
              startIcon={<FullscreenIcon />}
              onClick={handleFullscreen}
              variant="outlined"
              size="small"
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
            >
              Download
            </Button>
          </Tooltip>
        </Box>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResumeModal;
