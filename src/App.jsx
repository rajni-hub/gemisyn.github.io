import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import DiamondViewerPage from "./pages/DiamondViewerPage";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diamond-viewer" element={<DiamondViewerPage />} />
      </Routes>
      <SpeedInsights />
    </Router>
  );
}

export default App;
