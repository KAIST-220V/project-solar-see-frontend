import { motion } from "framer-motion";
import React from "react";
import snack_bar_holder from "../assets/snack_bar_holder.png";

type Props = {
  barIsExpanded: boolean;
  setBarExpand: React.Dispatch<React.SetStateAction<boolean>>;
  markers: any;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

function KakaoMapSnackBar(props: Props) {
  return (
    <div className="absolute bottom-0 w-full h-[100dvh] overflow-hidden">
      <motion.div
        initial="closed"
        className="absolute h-full w-full md:w-[400px] bottom-0 rounded-2xl z-10 bg-white will-change-transforms"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        animate={props.barIsExpanded ? "opened" : "closed"}
        variants={{
          opened: { top: "30dvh" },
          closed: { top: "80dvh" },
        }}
        transition={{
          duration: 0.5,
        }}
        onDragEnd={(event, info) => {
          const offsetThreshold = 50;
          const deltaThreshold = 5;
          const isOverOffsetThreshold =
            Math.abs(info.offset.y) > offsetThreshold;
          const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold;
          const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold;
          if (!isOverThreshold) return;

          const isControlDown = info.offset.y > offsetThreshold || info.delta.y > deltaThreshold;
          if (props.barIsExpanded && isControlDown) props.setBarExpand(false);
          else if (!props.barIsExpanded && isControlDown)
            props.setSelectedIndex(null);
          else if (!props.barIsExpanded && !isControlDown)
            props.setBarExpand(true);
        }}
      >
        <div
          className="flex justify-center items-center"
          onClick={() => props.setBarExpand(!props.barIsExpanded)}
        >
          <img
            alt="line"
            src={snack_bar_holder}
            style={{ padding: "10px", pointerEvents: "none" }}
          />
        </div>
        <div className="ml-6 mr-6">
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
        </div>
        <div>
          <div className="flex justify-center items-center m-6">
            <img
              alt="테스트"
              src="img/test_image.png"
              /*src=markers[i-1]["image_url"]*/
              className="size-full"
              onClick={() => props.setSelectedIndex(null)}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default KakaoMapSnackBar;
