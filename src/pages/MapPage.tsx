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
  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    fetch("https://solar-see.site/api/v1/map/image", {
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
    <div className="static h-dvh">
      <KakaoMap
        mapCenter={mapCenter}
        mapRef={mapRef}
        markers={markers}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />

      {selectedIndex !== null && (
        <KakaoMapSnackBar
          markers={markers}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
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
