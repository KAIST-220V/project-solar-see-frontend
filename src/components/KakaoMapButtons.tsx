import React from "react";
import { ReactComponent as CurrentLocation } from "../assets/current_location.svg";
import { ReactComponent as ZoomIn } from "../assets/zoom_in.svg";
import { ReactComponent as ZoomOut } from "../assets/zoom_out.svg";

function KakaoMapButtons() {
  return (
    <>
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
    </>
  );
}

export default KakaoMapButtons;
