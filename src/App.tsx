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

type MarkerType = {
  shape_attributes: {
    mean_point_latitude: number;
    mean_point_logitude: number;
    shape_area_m2: number;
  };
};


function App() {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/data/solarPanels.json", {
      method: 'GET',
    }).then(res => res.json())
    .then(data => setMarkers(data.panel));
  }, [])
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null);

  const [dropdown, setDropdown] = useState<boolean>(false);
  const openDropdown = () => setDropdown(!dropdown);
  const [mapCenter, setMapCenter] = useState({ lat: 36.357670, lng: 127.386770 });
  const closeDropdown = () => setDropdown(false);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const changeLvl = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(6);
  }
  const districts = [{name: '유성구', center: { lat: 36.36405586, lng: 127.356163 }}, 
                    {name: '동구', center: { lat: 36.31204028, lng: 127.4548596 }}, 
                    {name: '중구', center: { lat: 36.32582989, lng: 127.421381 }}, 
                    {name: '서구', center: { lat:36.35707299, lng: 127.3834158 }}, 
                    {name: '대덕구', center: { lat: 36.35218384, lng: 127.4170933 }}];
  const [selectedDistrict, setSelectedDistrict] = useState<string>('구 선택');
  const showSelectedDistrict = (districtName: string, newCenter: { lat: number, lng: number }) => {
    setSelectedDistrict(districtName);  // Update the selected district name
    setMapCenter(newCenter);
    changeLvl();
    closeDropdown();  // Close the dropdown
  }

  const [barIsOpen, setBarState] = useState(false);
  const [barIsExpanded, setBarExpand] = useState(false);
  const animateState = barIsExpanded ? "opened" : "closed";

  return (
    <div className="static">
      <Map center={mapCenter} level={8} className="w-full h-screen" onCreate={mapInstance => (mapRef.current = mapInstance)}>
        <MarkerClusterer
          averageCenter={true}
          minLevel={5}
          calculator={[10, 30, 70]} // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
          styles={[{ // calculator 각 사이 값 마다 적용될 스타일을 지정한다
            width: '12.9vw',
            minWidth: '38px',
            height: '6.87vh',
            minHeight: '33px',
            backgroundImage: `url(${clusterer_below10})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: '#FFFFFF',
            textAlign: 'center',
            justifyContent: 'center',
            textAlignVertical: 'center',
            display: 'flex',
            alignItems: 'center',
            paddingBottom:'4px',
          },
          {
            width: '12.9vw',
            minWidth: '38px',
            height: '6.87vh',
            minHeight: '33px',
            backgroundImage: `url(${clusterer_11_30})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: '#FFFFFF',
            textAlign: 'center',
            justifyContent: 'center',
            textAlignVertical: 'center',
            display: 'flex',
            alignItems: 'center',
            paddingBottom:'4px',
          },
          {
            width: '12.9vw',
            minWidth: '38px',
            height: '6.87vh',
            minHeight: '33px',
            backgroundImage: `url(${clusterer_31_70})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: '#FFFFFF',
            textAlign: 'center',
            justifyContent: 'center',
            textAlignVertical: 'center',
            display: 'flex',
            alignItems: 'center',
            paddingBottom:'4px'
          },
          {
            width: '12.9vw',
            minWidth: '38px',
            height: '6.87vh',
            minHeight: '33px',
            backgroundImage: `url(${clusterer_over_70})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: '#FFFFFF',
            textAlign: 'center',
            justifyContent: 'center',
            textAlignVertical: 'center',
            display: 'flex',
            alignItems: 'center',
            paddingBottom:'4px'
          }]} 
        >
          {markers.map((marker, index) => 
            <MapMarker 
              key={index}
              position={{ lat: marker.shape_attributes.mean_point_latitude, lng: marker.shape_attributes.mean_point_logitude }}
              clickable={true}
              onClick={() => {
                setSelectedIndex(index);
                setBarState(true);
              }}>
              {selectedIndex === index && (
                <div style={{ minWidth: "150px" }}>
                  <img
                    alt="close"
                    width="14"
                    height="13"
                    src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                    style={{
                      position: "absolute",
                      right: "5px",
                      top: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedIndex(null)}
                  />
                  <div style={{ padding: "5px", color: "#000" }}>태양광 패널</div>
                </div>
              )}
            </MapMarker>
          )}
          {(barIsOpen && selectedIndex != null) && (<div className="absolute bottom-0 w-full h-full overflow-hidden">
            <motion.div className="h-full w-full md:w-[400px] absolute top-[60dvh] rounded-t-2xl min-h-40 z-10 bg-white will-change-transforms"
              drag="y" dragConstraints={{ top: 0, bottom: 0 }}
              animate={animateState}
              variants={{
                opened: { top: '10dvh' },
                closed: { top: '60dvh' },
              }}
              transition={{ type: "tween", ease: [0.12, 0, 0.39, 0], duration: 0.3 }}
              onDragEnd={
                (event, info) => {
                  const offsetThreshold = 150;
                  const deltaThreshold = 5;
                  const isOverOffsetThreshold = Math.abs(info.offset.y) > offsetThreshold;
                  const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold;
                  const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold;
                  if (!isOverThreshold) return;
                  const newIsOpened = info.offset.y < 0;
                  setBarExpand(newIsOpened);
                }
              }
            >
            <div className="flex justify-center items-center" onClick={()=>setBarExpand(!barIsExpanded)}>
              <img src="img/line.png" style={{padding: "10px", pointerEvents: "none"}}/>
            </div>
            <div className="m-5 pl-2">
              <div className="text-xl text-blue font-roboto font-bold">N {markers[selectedIndex].shape_attributes.mean_point_logitude.toFixed(4)}°, E {markers[selectedIndex].shape_attributes.mean_point_latitude.toFixed(4)}°</div>
              <div className="text-base">태양광 패널 ID: {selectedIndex}</div>
              <div className="text-base">면적: 100㎡</div>
              <div className="text-base">예상 발전량: 123,456W</div>
              {/*<div>면적: {shape_area_m2}</div>*/}
            </div>
            <div>
            <div className="flex justify-center items-center">
              <img
                alt="테스트"
                src="img/test_image.png"
                /*src=markers[i-1]["image_url"]*/
                className="md:size-full size-auto rounded-t-l"
                onClick={() => setSelectedIndex(null)}
              />
            </div>
            </div>
          </motion.div>
          </div>)}
        </MarkerClusterer>
      </Map>
      <div className="absolute flex flex-row z-10 w-[59.183673vw] md:w-[12.083vw] h-[5.2816901vh] md:h-[4.167vh] left-[0.625vw] top-[0.926vh] rounded-sm cursor-pointer shadow-lg"
        style = {{outline: dropdown ? '3px solid #364F85' : 'none', outlineOffset: '-1px'}}
        onClick={openDropdown}
      >
        <div className="flex justify-center items-center space-x-1 w-[6vw] md:w-[3vw] h-[5.2816901vh] md:h-[4.167vh] rounded-l-sm bg-white">
          <Logo className="h-[3.5211268vh] md:h-[2.78vh]"/>
        </div>
        <div className="flex items-center w-[53.183673vw] md:w-[9.083vw] h-[5.2816901vh] md:h-[4.167vh] rounded-r-sm bg-white" >
          <p className="text-sm text-slate-500">{selectedDistrict}</p>
          <DownT className="absolute w-[3.0612245vw] md:w-[0.625vw] right-[1.0625vw]"/> 
        </div>
      </div>
      {dropdown && (
        <div className="absolute z-10 w-[59.183673vw] md:w-[12.083vw] h-[21.126761vh] md:h-[16.667vh] left-[0.625vw] top-[7.3149vh] rounded-sm bg-white shadow-lg">
          <ul className="bg-white">
            {districts.map((district, index) => (
            <li className="px-4 py-2 text-sm text-slate-500 hover:rounded-t-sm hover:bg-[#5D799F] hover:text-white cursor-pointer"
                key={index}
                onClick={() => {showSelectedDistrict(district.name, district.center);}}>{district.name}</li>
            // <li className="px-4 py-2 text-sm text-slate-500 hover:bg-[#5D799F] hover:text-white cursor-pointer"
            //     onClick={() => {closeDropdown();
            //                     setSelectedDistrict(district.name);
            //                     setMapCenter({center: { lat: 36.31204028, lng: 127.4548596 }});
            //                     changeLvl(); }} >동구</li>
            // <li className="px-4 py-2 text-sm text-slate-500 hover:bg-[#5D799F] hover:text-white cursor-pointer"
            //     onClick={() => {closeDropdown();
            //                     setSelectedDistrict(district.name);
            //                     setMapCenter({center: { lat: 36.32582989, lng: 127.421381 }});
            //                     changeLvl(); }}>중구</li>
            // <li className="px-4 py-2 text-sm text-slate-500 hover:bg-[#5D799F] hover:text-white cursor-pointer"
            //     onClick={() => {closeDropdown();
            //                     setSelectedDistrict(district.name);
            //                     setMapCenter({center: { lat:36.35707299, lng: 127.3834158 }});
            //                     changeLvl(); }}>서구</li>
            // <li className="px-4 py-2 text-sm text-slate-500 hover:rounded-b-sm hover:bg-[#5D799F] hover:text-white cursor-pointer"
            //     onClick={() => {closeDropdown();
            //                     setSelectedDistrict(district.name);
            //                     setMapCenter({center: { lat: 36.35218384, lng: 127.4170933 }});
            //                     changeLvl(); }}>대덕구</li>
            ))}
          </ul>
        </div>
      )}
      <Map center={mapCenter} />
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
          <CurrentLocation className="w-[1.571vw]"/>
        </div>
        <div className="w-[2.5vw] h-[4.519vh] flex justify-center items-center">
          <ZoomOut className="w-[1vw]" />
        </div>
      </div>
    </div>
  );
}

export default App;
