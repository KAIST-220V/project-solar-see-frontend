import { useEffect, useRef, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { ReactComponent as Logo } from "./assets/logo_100px.svg";
import { ReactComponent as DownT } from "./assets/triangle.svg";
import { ReactComponent as CurrentLocation } from "./assets/current_location.svg";
import { ReactComponent as ZoomIn } from "./assets/zoom_in.svg";
import { ReactComponent as ZoomOut } from "./assets/zoom_out.svg";
import clusterer_below10 from "./assets/clusterer_below10.svg";
import clusterer_11_30 from "./assets/clusterer_11_30.svg";
import clusterer_31_70 from "./assets/clusterer_31_70.svg";
import clusterer_over_70 from "./assets/clusterer_over_70.svg";
import { motion } from "framer-motion";
import MapPage from "./pages/MapPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

type MarkerType = {
  shape_attributes: {
    mean_point_latitude: number;
    mean_point_logitude: number;
    shape_area_m2: number;
  };
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
