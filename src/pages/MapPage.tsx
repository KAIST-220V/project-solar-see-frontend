import { SetStateAction, useEffect, useRef, useState } from "react";

import { ReactComponent as Logo } from "../assets/logo_100px.svg";
import { ReactComponent as DownT } from "../assets/triangle.svg";
import { ReactComponent as CurrentLocation } from "../assets/current_location.svg";
import { ReactComponent as ZoomIn } from "../assets/zoom_in.svg";
import { ReactComponent as ZoomOut } from "../assets/zoom_out.svg";

import { motion } from "framer-motion";
import KakaoMap from "../components/KakaoMap";
import { District, Loc, MarkerType } from "../types/interface";
import { MapMarker } from "react-kakao-maps-sdk";
import KakaoMapSnackBar from "../components/KakaoMapSnackBar";

function MapPage() {
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  const [dropdown, setDropdown] = useState<boolean>(false);
  const openDropdown = () => setDropdown(!dropdown);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [mapCenter, setMapCenter] = useState<Loc>({
    lat: 36.35767,
    lng: 127.38677,
  });
  const closeDropdown = () => setDropdown(false);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const changeLvl = (level: number) => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(level);
  };

  const districts: District[] = [
    { name: "유성구", center: { lat: 36.36405586, lng: 127.356163 } },
    { name: "동구", center: { lat: 36.31204028, lng: 127.4548596 } },
    { name: "중구", center: { lat: 36.32582989, lng: 127.421381 } },
    { name: "서구", center: { lat: 36.35707299, lng: 127.3834158 } },
    { name: "대덕구", center: { lat: 36.35218384, lng: 127.4170933 } },
  ];
  const [selectedDistrict, setSelectedDistrict] = useState<string>("구 선택");
  const showSelectedDistrict = (
    districtName: string,
    newCenter: { lat: number; lng: number }
  ) => {
    setSelectedDistrict(districtName); // Update the selected district name
    setMapCenter(newCenter);
    changeLvl(6);
    closeDropdown(); // Close the dropdown
  };

  const [barIsExpanded, setBarExpand] = useState(false);
  const [barIsOpen, setBarOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/data/solarPanels.json", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setMarkers(data.panel));
  }, []);

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
          barIsExpanded={false}
          setBarExpand={setBarExpand}
        />
      )}

      <div
        className="absolute flex flex-row z-10 w-[59.183673vw] md:w-[12.083vw] h-[5.2816901vh] md:h-[4.167vh] left-[0.625vw] top-[0.926vh] rounded-sm cursor-pointer shadow-lg"
        style={{
          outline: dropdown ? "3px solid #364F85" : "none",
          outlineOffset: "-1px",
        }}
        onClick={openDropdown}
      >
        <div className="flex justify-center items-center space-x-1 w-[6vw] md:w-[3vw] h-[5.2816901vh] md:h-[4.167vh] rounded-l-sm bg-white">
          <Logo className="h-[3.5211268vh] md:h-[2.78vh]" />
        </div>
        <div className="flex items-center w-[53.183673vw] md:w-[9.083vw] h-[5.2816901vh] md:h-[4.167vh] rounded-r-sm bg-white">
          <p className="text-sm text-slate-500">{selectedDistrict}</p>
          <DownT className="absolute w-[3.0612245vw] md:w-[0.625vw] right-[1.0625vw]" />
        </div>
      </div>
      {dropdown && (
        <div className="absolute z-10 w-[59.183673vw] md:w-[12.083vw] h-[21.126761vh] md:h-[16.667vh] left-[0.625vw] top-[7.3149vh] rounded-sm bg-white shadow-lg">
          <ul className="bg-white">
            {districts.map((district, index) => (
              <li
                className="px-4 py-2 text-sm text-slate-500 hover:rounded-t-sm hover:bg-[#5D799F] hover:text-white cursor-pointer"
                key={index}
                onClick={() => {
                  showSelectedDistrict(district.name, district.center);
                }}
              >
                {district.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="absolute flex justify-evenly items-center z-10 w-[6.25vw] h-[4.444vh] left-[87.271vw] top-[0.926vh] rounded-sm text-sm font-bold bg-white">
        <div className="w-[2.8125vw] h-[3.556vh] flex justify-center items-center rounded-sm bg-yellow">
          <p className="text-white w-fit h-fit">지도</p>
        </div>
        <div className="w-[2.8125vw] h-[3.556vh] flex justify-center items-center">
          <p className="w-fit h-fit">게임</p>
        </div>
      </div>
      <div className="absolute flex justify-evenly items-center z-10 w-[5vw] h-[4.444vh] left-[94.271vw] top-[0.926vh] rounded-sm bg-white">
        <p className="font-bold text-yellow">로그인</p>
      </div>
      <div className="absolute z-10 w-[2.5vw] h-[13.557vh] left-[96.771vw] top-[43.222vh] bg-white rounded-sm">
        <div className="w-[2.5vw] h-[4.519vh] flex justify-center items-center">
          <ZoomIn className="w-[1vw]" />
        </div>
        <div className="w-[2.5vw] h-[4.519vh] flex justify-center items-center border-t border-b">
          <CurrentLocation className="w-[1.571vw]" />
        </div>
        <div className="w-[2.5vw] h-[4.519vh] flex justify-center items-center">
          <ZoomOut className="w-[1vw]" />
        </div>
      </div>
    </div>
  );
}

export default MapPage;
