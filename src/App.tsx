import MapPage from "./pages/MapPage";
import GamePage from "./pages/GamePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

type MarkerType = {
  shape_attributes: {
    mean_point_latitude: number;
    mean_point_longitude: number;
    shape_area_m2: number;
  };
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
