import { useEffect, useRef, useState } from "react";
import KakaoMap from "../components/KakaoMap";
import { Loc, MarkerType } from "../types/interface";
import KakaoMapSnackBar from "../components/KakaoMapSnackBar";
import KakaoMapDropDown from "../components/KakaoMapDropDown";
import KakaoMapButtons from "../components/KakaoMapButtons";

const INITIAL_CENTER: Readonly<Loc> = {
  lat: 36.35767,
  lng: 127.38677,
};

function MapPage() {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<Loc>(INITIAL_CENTER);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("구 선택");
  const [barIsExpanded, setBarExpand] = useState(false);
  const [barIsOpen, setBarOpen] = useState(false);
  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    fetch("/data/solarPanels.json", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setMarkers(data.panel));
  }, []);

  const changeMapLevel = (level: number) => {
    const map = mapRef.current;
    if (map) map.setLevel(level);
  };

  return (
    <div className="static">
      <KakaoMap
        mapCenter={mapCenter}
        mapRef={mapRef}
        markers={markers}
        setBarOpen={setBarOpen}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />

      {barIsOpen && selectedIndex != null && (
        <KakaoMapSnackBar
          markers={markers}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setBarOpen={setBarOpen}
          barIsExpanded={barIsExpanded}
          setBarExpand={setBarExpand}
        />
      )}

      <KakaoMapDropDown
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        setMapCenter={setMapCenter}
        changeMapLevel={changeMapLevel}
      />

      <KakaoMapButtons />
    </div>
  );
}

export default MapPage;
