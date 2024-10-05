import { useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import solars from "./solars.json";
import { ReactComponent as Logo } from "./assets/logo_yellow.svg";
import { ReactComponent as Search } from "./assets/search.svg";
import { ReactComponent as CurrentLocation } from "./assets/current_location.svg";
import { ReactComponent as ZoomIn } from "./assets/zoom_in.svg";
import { ReactComponent as ZoomOut } from "./assets/zoom_out.svg";

function App() {
  const markers = solars.Solars;
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null);

  return (
    <div className="static">
      <Map center={{ lat: 36.357670, lng: 127.386770 }} level={7} className="w-full h-screen" mapTypeId={'SKYVIEW'}>
        <MarkerClusterer
          averageCenter={true}
          minLevel={5}
          calculator={[10, 30, 50]} // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
          styles={[{ // calculator 각 사이 값 마다 적용될 스타일을 지정한다
            width : '30px', height : '30px',
            background: 'rgba(51, 204, 255, .8)',
            borderRadius: '15px',
            color: '#FFFFFF',
            textAlign: 'center',
            fontWeight: 'bold',
            lineHeight: '31px',
          },
          {
              width : '40px', height : '40px',
              background: 'rgba(255, 153, 0, .8)',
              borderRadius: '20px',
              color: '#FFFFFF',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '41px'
          },
          {
              width : '50px', height : '50px',
              background: 'rgba(255, 51, 204, .8)',
              borderRadius: '25px',
              color: '#FFFFFF',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '51px'
          },
          {
              width : '60px', height : '60px',
              background: 'rgba(255, 80, 80, .8)',
              borderRadius: '30px',
              color: '#FFFFFF',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '61px'
          }
          ]} 
        >
          {markers.map((marker, index) => 
            <MapMarker 
              key={index}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              clickable={true}
              onClick={() => setSelectedIndex(index)}>
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
        </MarkerClusterer>
      </Map>
      <div className="absolute flex flex-row z-10 w-[22.5vw] h-[4.444vh] left-[0.625vw] top-[0.926vh]">
        <div className="flex justify-center items-center space-x-1 w-[7.8125vw] h-[4.444vh] rounded-l-sm bg-yellow">
          <Logo className="w-[1.25vw]"/>
          <p>SolarSee</p>
        </div>
        <div className="flex items-center px-2 w-[14.6875vw] h-[4.444vh] rounded-r-sm bg-white">
          <p className="text-sm text-slate-500">장소, 주소 검색</p>
          <Search className="absolute w-[1.25vw] right-2"/>
        </div>
      </div>
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
