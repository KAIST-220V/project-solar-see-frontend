import { useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import solars from "./solars.json";

function App() {
  const markers = solars.Solars;
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null);

  return (
    <div>
      <Map center={{ lat: 36.357670, lng: 127.386770 }} level={7} style={{width: "100%", height: "600px"}}>
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
    </div>
  );
}

export default App;
