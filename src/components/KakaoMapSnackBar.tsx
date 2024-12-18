import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import snack_bar_holder from "../assets/snack_bar_holder.png";
import { MarkerType } from "../types/interface";

type Props = {
  barIsExpanded: boolean;
  setBarExpand: React.Dispatch<React.SetStateAction<boolean>>;
  markers: MarkerType[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

function KakaoMapSnackBar(props: Props) {
  const [isReported, setIsReported] = useState(false);

  const handleReport = () => {
    if (isReported) {
      return;
    }

    let prevListStr = localStorage.getItem("qwerty_list");
    let list = [];

    if (prevListStr !== null) {
      try {
        list = JSON.parse(prevListStr);
      } catch (e) {
        console.error("Error parsing JSON from localStorage:", e);
        list = [];
      }
    }

    list.push(`${props.markers[props.selectedIndex]["id"]}`);
    localStorage.setItem("qwerty_list", JSON.stringify(list));

    setIsReported(true);
  };

  useEffect(() => {
    let prevListStr = localStorage.getItem("qwerty_list");
    let list = [];

    if (prevListStr !== null) {
      try {
        list = JSON.parse(prevListStr);
      } catch (e) {
        console.error("Error parsing JSON from localStorage:", e);
        list = [];
      }
    }

    setIsReported(list.includes(`${props.markers[props.selectedIndex]["id"]}`));
  }, [props.selectedIndex]);

  return (
    <div className="absolute bottom-0 h-[100dvh] w-full overflow-hidden">
      <motion.div
        initial="closed"
        className="will-change-transforms absolute bottom-0 z-10 h-full w-full rounded-2xl bg-white md:w-[400px]"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        animate={props.barIsExpanded ? "opened" : "closed"}
        variants={{
          opened: { top: "10dvh" },
          closed: { top: "80dvh" },
        }}
        transition={{
          type: "tween",
          ease: [0.25, 0.8, 0.5, 1], // 자연스러운 가속/감속
          duration: 1.0, // 약간 짧게
        }}
        onDragEnd={(event, info) => {
          const offsetThreshold = 50;
          const deltaThreshold = 5;
          const isOverOffsetThreshold =
            Math.abs(info.offset.y) > offsetThreshold;
          const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold;
          const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold;
          if (!isOverThreshold) return;

          const target = event.target as HTMLElement;
          if (target.style) {
            target.style.transform = "translateY(0px)";
          }

          const isControlDown =
            info.offset.y > offsetThreshold || info.delta.y > deltaThreshold;
          if (props.barIsExpanded && isControlDown) props.setBarExpand(false);
          else if (!props.barIsExpanded && isControlDown)
            props.setSelectedIndex(null);
          else if (!props.barIsExpanded && !isControlDown)
            props.setBarExpand(true);
        }}
      >
        <div
          className="flex items-center justify-center"
          onClick={() => props.setBarExpand(!props.barIsExpanded)}
        >
          <img
            alt="line"
            src={snack_bar_holder}
            style={{ padding: "10px", pointerEvents: "none" }}
          />
        </div>
        <div className="ml-6 mr-6">
          <div className="font-roboto text-xl font-bold text-blue">
            N {props.markers[props.selectedIndex].longitude.toFixed(4)}
            °, E {props.markers[props.selectedIndex].latitude.toFixed(4)}°
          </div>
          <div className="text-base">
            태양광 패널 ID: {props.markers[props.selectedIndex].id}
          </div>
          <div className="text-base">
            면적: {props.markers[props.selectedIndex].area_m2.toFixed(2)}㎡
          </div>
          <div className="text-base">예상 발전량: --- W</div>
        </div>
        <div>
          <div className="m-6 flex items-center justify-center">
            <img
              alt="테스트"
              src={props.markers[props.selectedIndex].image_url}
              className="size-full"
              onClick={() => props.setSelectedIndex(null)}
            />
          </div>
        </div>
        <div className="m-6 flex-col items-center justify-center">
          <div className="text-base text-slate-500">
            {"혹시, 태양광 패널이 아닌가요?"}
          </div>
          <button
            className={`h-[5vh] w-full rounded-lg font-bold ${
              isReported ? "bg-[#D9D9D9]" : "bg-yellow"
            }`}
            onClick={() => handleReport()}
          >
            {isReported ? "제보 되었어요" : "제보하기"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default KakaoMapSnackBar;
