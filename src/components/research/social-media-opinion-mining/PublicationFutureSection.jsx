import React from "react";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Article as ArticleIcon,
  OpenInNew as OpenInNewIcon,
  PublishedWithChanges as PublishedWithChangesIcon,
} from "@mui/icons-material";
import { futureWork, paperMeta } from "./constants";
import { GlassCard, SectionHeading } from "./styles";

const PublicationFutureSection = ({ theme }) => {
  return (
    <Box id="publication" sx={{ scrollMarginTop: 120, mb: 6 }}>
      <SectionHeading theme={theme}>Publication & Future Work</SectionHeading>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <ArticleIcon color="primary" />
              Published Paper
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 2 }}>
              {paperMeta.title} was published at {paperMeta.venue}, {paperMeta.year}. The shipped site should
              link to the official IEEE publication only; the temporary locked PDF is source material and is
              not exposed through the UI.
            </Typography>
            <Link href={paperMeta.ieeeLink} target="_blank" rel="noopener noreferrer" underline="none">
              <Button variant="contained" startIcon={<OpenInNewIcon />} sx={{ borderRadius: 1.2, fontWeight: 800, textTransform: "none" }}>
                View IEEE Publication
              </Button>
            </Link>
          </GlassCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <GlassCard sx={{ p: { xs: 3, sm: 4 }, height: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <PublishedWithChangesIcon color="primary" />
              Future Research Direction
            </Typography>
            <Stack spacing={2}>
              {futureWork.map((item, index) => (
                <Box key={item} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.72rem",
                      fontWeight: 900,
                      color: "#fff",
                      backgroundColor: theme.palette.primary.main,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicationFutureSection;
