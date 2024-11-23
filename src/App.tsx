import MapPage from "./pages/MapPage";
import GameHomePage from "./pages/GameHomePage";
import GamePage from "./pages/GamePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/game" element={<GameHomePage />} />
        <Route path="/game/play" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
