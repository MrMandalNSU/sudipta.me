import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Intro />
    </ThemeProvider>
  );
}

export default App;
