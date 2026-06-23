import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import OverviewSection from "./OverviewSection";
import SystemDesignSection from "./SystemDesignSection";
import WorkflowsSection from "./WorkflowsSection";
import VectorStoreSection from "./VectorStoreSection";
import KeyFeaturesSection from "./KeyFeaturesSection";
import { MobileTocChip, TocLink } from "./styles";

const tocSections = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "System Design" },
  { id: "workflows", label: "Project Workflows" },
  { id: "database", label: "Vector Store" },
  { id: "features", label: "Key Features" },
];

const AskSudiptaDetail = () => {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState("overview");
  const [activeSystemNode, setActiveSystemNode] = useState("retrieval");
  const [activeWorkflow, setActiveWorkflow] = useState("chat");
  const [activeVectorNode, setActiveVectorNode] = useState("knowledge_chunks");

  useEffect(() => {
    document.title = "AskSudipta - Portfolio RAG Assistant Backend | Sudipta Mandal";

    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement("meta");
      descriptionMeta.setAttribute("name", "description");
      document.head.appendChild(descriptionMeta);
    }
    const originalDesc = descriptionMeta.getAttribute("content");
    descriptionMeta.setAttribute(
      "content",
      "Detailed breakdown of AskSudipta: the TypeScript, Express, Gemini, and Supabase pgvector RAG backend powering Sudipta Mandal's portfolio chatbot."
    );

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    const originalCanonical = canonicalLink.getAttribute("href");
    canonicalLink.setAttribute("href", "https://sudipta.xyz/projects/asksudipta");

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
    const cb = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingSections.add(entry.target.id);
        } else {
          intersectingSections.delete(entry.target.id);
        }
      });

      const active = tocSections.find((s) => intersectingSections.has(s.id));
      if (active) {
        setActiveSection(active.id);
      }
    };

    const observer = new IntersectionObserver(cb, {
      root: null,
      rootMargin: "-110px 0px -30% 0px",
      threshold: 0,
    });
    tocSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const activeChip = document.getElementById(`toc-chip-${activeSection}`);
    if (activeChip) {
      activeChip.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeSection]);

  const primaryColor = theme.palette.mode === "light" ? "#4F46E5" : "#818CF8";

  return (
    <Box sx={{ pt: { xs: 10, sm: 12 }, pb: 0, minHeight: "100vh", textAlign: "left" }}>
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
          {tocSections.map((s) => (
            <MobileTocChip
              id={`toc-chip-${s.id}`}
              key={s.id}
              label={s.label}
              active={activeSection === s.id ? 1 : 0}
              onClick={() => scrollTo(s.id)}
              size="small"
            />
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: { md: 5, lg: 6 } }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              width: 200,
              minWidth: 200,
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
              Contents
            </Typography>
            {tocSections.map((s) => (
              <TocLink key={s.id} active={activeSection === s.id ? 1 : 0} onClick={() => scrollTo(s.id)}>
                {s.label}
              </TocLink>
            ))}
          </Box>

          <Box sx={{ flex: 1, minWidth: 0, pt: 4 }}>
            <OverviewSection theme={theme} />
            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            <SystemDesignSection
              theme={theme}
              activeSystemNode={activeSystemNode}
              setActiveSystemNode={setActiveSystemNode}
              primaryColor={primaryColor}
            />
            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            <WorkflowsSection
              theme={theme}
              activeWorkflow={activeWorkflow}
              setActiveWorkflow={setActiveWorkflow}
            />
            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            <VectorStoreSection
              theme={theme}
              activeVectorNode={activeVectorNode}
              setActiveVectorNode={setActiveVectorNode}
              primaryColor={primaryColor}
            />
            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            <KeyFeaturesSection theme={theme} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AskSudiptaDetail;
