import React, { useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { Loc, MarkerType } from "../types/interface";
import clusterer_1 from "../assets/clusterer_1.svg";
import clusterer_below10 from "../assets/clusterer_below10.svg";
import clusterer_11_30 from "../assets/clusterer_11_30.svg";
import clusterer_31_70 from "../assets/clusterer_31_70.svg";
import clusterer_over_70 from "../assets/clusterer_over_70.svg";

type Props = {
  mapCenter: Loc;
  mapRef: React.MutableRefObject<kakao.maps.Map | null>;
  markers: MarkerType[];
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

function KakaoMap(props: Props) {
  return (
    <Map
      center={props.mapCenter}
      level={8}
      className="w-full h-dvh"
      onCreate={(mapInstance) => (props.mapRef.current = mapInstance)}
    >
      <MarkerClusterer
        averageCenter={true}
        minLevel={3}
        calculator={[10, 30, 70]} // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
        styles={[
          {
            // calculator 각 사이 값 마다 적용될 스타일을 지정한다
            width: "12.9vw",
            minWidth: "38px",
            height: "6.87vh",
            minHeight: "33px",
            backgroundImage: `url(${clusterer_below10})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "#FFFFFF",
            textAlign: "center",
            justifyContent: "center",
            textAlignVertical: "center",
            display: "flex",
            alignItems: "center",
            paddingBottom: "4px",
          },
          {
            width: "12.9vw",
            minWidth: "38px",
            height: "6.87vh",
            minHeight: "33px",
            backgroundImage: `url(${clusterer_11_30})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "#FFFFFF",
            textAlign: "center",
            justifyContent: "center",
            textAlignVertical: "center",
            display: "flex",
            alignItems: "center",
            paddingBottom: "4px",
          },
          {
            width: "12.9vw",
            minWidth: "38px",
            height: "6.87vh",
            minHeight: "33px",
            backgroundImage: `url(${clusterer_31_70})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "#FFFFFF",
            textAlign: "center",
            justifyContent: "center",
            textAlignVertical: "center",
            display: "flex",
            alignItems: "center",
            paddingBottom: "4px",
          },
          {
            width: "12.9vw",
            minWidth: "38px",
            height: "6.87vh",
            minHeight: "33px",
            backgroundImage: `url(${clusterer_over_70})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "#FFFFFF",
            textAlign: "center",
            justifyContent: "center",
            textAlignVertical: "center",
            display: "flex",
            alignItems: "center",
            paddingBottom: "4px",
          },
        ]}
      >
        {props.markers.map((marker, index) => (
          <MapMarker
            key={index}
            position={{
              lat: marker.shape_attributes.mean_point_latitude,
              lng: marker.shape_attributes.mean_point_longitude,
            }}
            clickable={true}
            onClick={() => {
              props.setSelectedIndex(index);
            }}
            image={{
              src: clusterer_1,
              size: {
                width: 50,
                height: 50,
              },
            }}
          >
            {/* {props.selectedIndex === index && (
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
                  onClick={() => props.setSelectedIndex(null)}
                />
                <div style={{ padding: "5px", color: "#000" }}>태양광 패널</div>
              </div>
            )} */}
          </MapMarker>
        ))}
      </MarkerClusterer>
    </Map>
  );
}

export default KakaoMap;
