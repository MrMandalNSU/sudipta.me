import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import Research from "./components/Research";

import Projects from "./components/Projects";
import CompetitiveProgramming from "./components/CompetitiveProgramming";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Intro id="intro" />
      <Experience id="experience" />
      <Research id="research" />
      <Projects id="projects" />
      <CompetitiveProgramming id="cp" />
      <Gallery id="gallery" />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
