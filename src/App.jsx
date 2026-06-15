import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import AgenticAI from "./components/AgenticAI";
import Research from "./components/Research";
import Projects from "./components/Projects";
import CompetitiveProgramming from "./components/CompetitiveProgramming";
import Education from "./components/Education";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import ValoDashDetail from "./components/projects/valodash/ValoDashDetail";
import CargoStreamDetail from "./components/experiences/cargostream/CargoStreamDetail";


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

// Landing page sections
const LandingPage = () => {
  return (
    <>
      <Intro id="intro" />
      <Experience id="experience" />
      <AgenticAI id="agentic-ai" />
      <Projects id="projects" />
      <Research id="research" />
      <CompetitiveProgramming id="cp" />
      <Education id="education" />
      <Gallery id="gallery" />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <ScrollHandler />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects/valodash" element={<ValoDashDetail />} />
        <Route path="/experience/cargostream" element={<CargoStreamDetail />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
