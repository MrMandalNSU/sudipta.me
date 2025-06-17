import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Experience from "./components/Experience";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Intro />
      <Experience />
    </ThemeProvider>
  );
}

export default App;
