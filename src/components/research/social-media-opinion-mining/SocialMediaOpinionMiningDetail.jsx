import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DatasetAnnotationSection from "./DatasetAnnotationSection";
import ExploratoryAnalysisSection from "./ExploratoryAnalysisSection";
import MethodologySection from "./MethodologySection";
import ModelResultsSection from "./ModelResultsSection";
import OverviewSection from "./OverviewSection";
import PublicationFutureSection from "./PublicationFutureSection";
import { paperMeta, tocSections } from "./constants";
import { MobileTocChip, TocLink } from "./styles";

const SocialMediaOpinionMiningDetail = () => {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    document.title = "Bangla Social Media Opinion Mining Research | Sudipta Mandal";

    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement("meta");
      descriptionMeta.setAttribute("name", "description");
      document.head.appendChild(descriptionMeta);
    }
    const originalDesc = descriptionMeta.getAttribute("content");
    descriptionMeta.setAttribute(
      "content",
      "Detailed overview of Sudipta Mandal's ICCIT 2021 research on Bangla social media opinion mining, annotated Facebook comments, TF-IDF features, and machine learning classification."
    );

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    const originalCanonical = canonicalLink.getAttribute("href");
    canonicalLink.setAttribute("href", "https://sudipta.xyz/research/social-media-opinion-mining");

    return () => {
      document.title = "Sudipta Mandal | Software Engineer & Researcher";
      if (descriptionMeta && originalDesc) {
        descriptionMeta.setAttribute("content", originalDesc);
      }
      if (canonicalLink && originalCanonical) {
        canonicalLink.setAttribute("href", originalCanonical);
      }
    };
  }, []);

  useEffect(() => {
    const intersectingSections = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingSections.add(entry.target.id);
          } else {
            intersectingSections.delete(entry.target.id);
          }
        });

        const active = tocSections.find((section) => intersectingSections.has(section.id));
        if (active) {
          setActiveSection(active.id);
        }
      },
      {
        root: null,
        rootMargin: "-110px 0px -30% 0px",
        threshold: 0,
      }
    );

    tocSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeChip = document.getElementById(`research-toc-chip-${activeSection}`);
    if (activeChip) {
      activeChip.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeSection]);

  const scrollTo = useCallback((id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, []);

  return (
    <Box
      sx={{
        pt: { xs: 10, sm: 12 },
        pb: 0,
        minHeight: "100vh",
        textAlign: "left",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 5 } }}>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            position: "sticky",
            top: 70,
            zIndex: 10,
            overflowX: "auto",
            gap: 1,
            pb: 1.5,
            mb: 3,
            px: 0.5,
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {tocSections.map((section) => (
            <MobileTocChip
              id={`research-toc-chip-${section.id}`}
              key={section.id}
              label={section.label}
              active={activeSection === section.id ? 1 : 0}
              onClick={() => scrollTo(section.id)}
              size="small"
            />
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: { md: 5, lg: 6 } }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              width: 220,
              minWidth: 220,
              position: "sticky",
              top: 120,
              alignSelf: "flex-start",
              height: "fit-content",
              gap: 0.5,
              pt: 1.2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: "text.secondary",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                pl: 2,
                mb: 1,
              }}
            >
              Research Contents
            </Typography>
            {tocSections.map((section) => (
              <TocLink
                key={section.id}
                active={activeSection === section.id ? 1 : 0}
                onClick={() => scrollTo(section.id)}
              >
                {section.label}
              </TocLink>
            ))}
          </Box>

          <Box sx={{ flex: 1, minWidth: 0, pt: 4 }}>
            <OverviewSection theme={theme} />
            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            <DatasetAnnotationSection theme={theme} />
            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            <MethodologySection theme={theme} />
            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            <ExploratoryAnalysisSection theme={theme} />
            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            <ModelResultsSection theme={theme} />
            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            <PublicationFutureSection theme={theme} paperMeta={paperMeta} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SocialMediaOpinionMiningDetail;
