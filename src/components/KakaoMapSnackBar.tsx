import { motion } from "framer-motion";
import React from "react";

type Props = {
  barIsExpanded: boolean;
  setBarExpand: React.Dispatch<React.SetStateAction<boolean>>;
  markers: any;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function KakaoMapSnackBar(props: Props) {
  return (
    <div className="absolute bottom-0 w-full h-full overflow-hidden">
      <motion.div
        className="h-full w-full md:w-[400px] absolute top-[60dvh] rounded-t-2xl min-h-40 z-10 bg-white will-change-transforms"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        animate={props.barIsExpanded ? "opened" : "closed"}
        variants={{
          opened: { top: "10dvh" },
          closed: { top: "60dvh" },
        }}
        transition={{
          type: "tween",
          ease: [0.12, 0, 0.39, 0],
          duration: 0.3,
        }}
        onDragEnd={(event, info) => {
          const offsetThreshold = 150;
          const deltaThreshold = 5;
          const isOverOffsetThreshold =
            Math.abs(info.offset.y) > offsetThreshold;
          const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold;
          const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold;
          if (!isOverThreshold) return;
          const newIsOpened = info.offset.y < 0;
          props.setBarExpand(newIsOpened);
        }}
      >
        <div
          className="flex justify-center items-center"
          onClick={() => props.setBarExpand(!props.barIsExpanded)}
        >
          <img
            src="img/line.png"
            style={{ padding: "10px", pointerEvents: "none" }}
          />
        </div>
        <div className="m-5 pl-2">
          <div className="text-xl text-blue font-roboto font-bold">
            N{" "}
            {props.markers[
              props.selectedIndex
            ].shape_attributes.mean_point_longitude.toFixed(4)}
            °, E{" "}
            {props.markers[
              props.selectedIndex
            ].shape_attributes.mean_point_latitude.toFixed(4)}
            °
          </div>
          <div className="text-base">태양광 패널 ID: {props.selectedIndex}</div>
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
              onClick={() => props.setSelectedIndex(null)}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default KakaoMapSnackBar;
