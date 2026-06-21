import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import AgenticAI from "./components/AgenticAI";
import Research from "./components/Research";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

// Lazy-loaded homepage sections
const CompetitiveProgramming = lazy(() => import("./components/CompetitiveProgramming"));
const Education = lazy(() => import("./components/Education"));
const Gallery = lazy(() => import("./components/Gallery"));

// Lazy-loaded detail routes
const ValoDashDetail = lazy(() => import("./components/projects/valodash/ValoDashDetail"));
const ColorCuddleDetail = lazy(() => import("./components/projects/colorcuddle/ColorCuddleDetail"));
const TextAnalyzerDetail = lazy(() => import("./components/projects/textanalyzer/TextAnalyzerDetail"));
const DseOpsDetail = lazy(() => import("./components/projects/dseops/DseOpsDetail"));
const CargoStreamDetail = lazy(() => import("./components/experiences/cargostream/CargoStreamDetail"));
const SportsFixturesDetail = lazy(() => import("./components/experiences/sportsfixtures/SportsFixturesDetail"));
const EucapsDetail = lazy(() => import("./components/experiences/eucaps/EucapsDetail"));
const NsupsDetail = lazy(() => import("./components/experiences/nsups/NsupsDetail"));


// Scroll handler to reset scroll to top on route change, or scroll to section anchors (hashes) on the home page.
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      if (hash) {
        const id = hash.replace("#", "");
        // Small delay to ensure the page DOM is fully mounted/rendered before scrolling
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            const navbarHeight = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

// Landing page sections with lazy below-fold components and height-matching skeletons to avoid CLS
const LandingPage = () => {
  return (
    <>
      <Intro id="intro" />
      <Experience id="experience" />
      <AgenticAI id="agentic-ai" />
      <Projects id="projects" />
      <Research id="research" />
      
      <Suspense fallback={<Box id="cp" sx={{ minHeight: 400 }} />}>
        <CompetitiveProgramming id="cp" />
      </Suspense>
      
      <Suspense fallback={<Box id="education" sx={{ minHeight: 600 }} />}>
        <Education id="education" />
      </Suspense>
      
      <Suspense fallback={<Box id="gallery" sx={{ minHeight: 600 }} />}>
        <Gallery id="gallery" />
      </Suspense>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <ScrollHandler />
      <Suspense fallback={null}>
        <Box component="main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects/valodash" element={<ValoDashDetail />} />
            <Route path="/projects/colorcuddle" element={<ColorCuddleDetail />} />
            <Route path="/projects/textanalyzer" element={<TextAnalyzerDetail />} />
            <Route path="/projects/dseops" element={<DseOpsDetail />} />
            <Route path="/experiences/cargostream" element={<CargoStreamDetail />} />
            <Route path="/experiences/sportsfixtures" element={<SportsFixturesDetail />} />
            <Route path="/experiences/eucaps" element={<EucapsDetail />} />
            <Route path="/experiences/nsups" element={<NsupsDetail />} />
          </Routes>
        </Box>
      </Suspense>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
