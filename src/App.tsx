import MapPage from "./pages/MapPage";
import GameHomePage from "./pages/GameHomePage";
import GamePage from "./pages/GamePage";
import GameRanking from "./pages/GameRanking";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/game" element={<GameHomePage />} />
        <Route path="/game/play" element={<GamePage />} />
        <Route path="/game/ranking" element={<GameRanking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
