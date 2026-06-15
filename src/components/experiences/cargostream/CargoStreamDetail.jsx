import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Section Components
import OverviewSection from "./OverviewSection";
import ResponsibilitySection from "./ResponsibilitySection";
import AgenticAiSection from "./AgenticAiSection";
import DocumentationSection from "./DocumentationSection";
import SystemDesignSection from "./SystemDesignSection";
import WorkflowsSection from "./WorkflowsSection";
import SchemaSection from "./SchemaSection";
import KeyFeaturesSection from "./KeyFeaturesSection";

// Styled Components
import { TocLink, MobileTocChip } from "./styles";

const CargoStreamDetail = () => {
  const theme = useTheme();

  // ToC sections config
  const tocSections = [
    { id: "overview", label: "Overview" },
    { id: "responsibility", label: "Responsibility" },
    { id: "agentic-ai", label: "Agentic AI & Testing" },
    { id: "documentation", label: "Documentation" },
    { id: "architecture", label: "System Design" },
    { id: "workflows", label: "Workflows" },
    { id: "database", label: "Schema Mapping" },
    { id: "features", label: "Key Features" },
  ];

  const [activeSection, setActiveSection] = useState("overview");
  const [activeSystemNode, setActiveSystemNode] = useState("ingestion");
  const [activeTable, setActiveTable] = useState("Order");
  const [activeWorkflow, setActiveWorkflow] = useState("formatScan");

  /* ── SEO Meta updates ── */
  useEffect(() => {
    // 1. Update Document Title
    document.title = "Cargo Stream - Senior SWE Document Pipelines | Sudipta Mandal";

    // 2. Update Meta Description
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    const originalDesc = descriptionMeta.getAttribute('content');
    descriptionMeta.setAttribute(
      'content',
      "Architectural breakdown of Sudipta Mandal's work at Cargo Stream: building a format-agnostic document ingestion pipeline with Laravel, pattern recognition, and agentic AI multilingual mapping."
    );

    // 3. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const originalCanonical = canonicalLink.getAttribute('href');
    canonicalLink.setAttribute('href', 'https://sudipta.xyz/experience/cargostream');

    // 4. Restore original tags when leaving the page (unmounting)
    return () => {
      document.title = "Sudipta Mandal | Software Engineer & Researcher";
      if (descriptionMeta && originalDesc) {
        descriptionMeta.setAttribute('content', originalDesc);
      }
      if (canonicalLink && originalCanonical) {
        canonicalLink.setAttribute('href', originalCanonical);
      }
    };
  }, []);

  /* ── Scrollspy ── */
  useEffect(() => {
    const ids = tocSections.map((s) => s.id);
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
    ids.forEach((id) => {
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
    <Box
      sx={{
        pt: { xs: 10, sm: 12 },
        pb: 0,
        minHeight: "100vh",
        textAlign: "left",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 5 } }}>
        {/* ── Mobile ToC ── */}
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

        {/* ── Two-Column Layout: Sidebar + Content ── */}
        <Box sx={{ display: "flex", gap: { md: 5, lg: 6 } }}>
          {/* Left ToC Sidebar */}
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
              <TocLink
                key={s.id}
                active={activeSection === s.id ? 1 : 0}
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </TocLink>
            ))}
          </Box>

          {/* Right Content */}
          <Box sx={{ flex: 1, minWidth: 0, pt: 4 }}>
            {/* ════ Section 1: Overview ════ */}
            <OverviewSection theme={theme} />

            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            {/* ════ Section 2: Responsibility & Contribution ════ */}
            <ResponsibilitySection theme={theme} />

            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            {/* ════ Section 4: Agentic AI & Testing Automation ════ */}
            <AgenticAiSection theme={theme} primaryColor={primaryColor} />

            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            {/* ════ Section 5: Knowledge Engineering & Strategy ════ */}
            <DocumentationSection theme={theme} />

            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            {/* ════ Section 6: System Design ════ */}
            <SystemDesignSection
              theme={theme}
              activeSystemNode={activeSystemNode}
              setActiveSystemNode={setActiveSystemNode}
              primaryColor={primaryColor}
            />

            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            {/* ════ Section 7: Workflows ════ */}
            <WorkflowsSection
              theme={theme}
              activeWorkflow={activeWorkflow}
              setActiveWorkflow={setActiveWorkflow}
            />

            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            {/* ════ Section 8: Schema Mapping ════ */}
            <SchemaSection
              theme={theme}
              activeTable={activeTable}
              setActiveTable={setActiveTable}
            />

            <Divider sx={{ opacity: 0.06, mb: 4 }} />

            {/* ════ Section 9: Key Features ════ */}
            <KeyFeaturesSection theme={theme} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CargoStreamDetail;
