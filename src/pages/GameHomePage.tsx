import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo_smiling.svg";
import { ReactComponent as Image } from "../assets/img_sample.svg";
import GameButton from "../components/GameButton";
import { useState } from "react";
import Cookies from "js-cookie";

function GameHomePage() {
  const navigate = useNavigate();
  const [onDebugTriggerCount, setOnDebugTriggerCount] = useState<number>(0);

  const handleOnDebugTriggerCount = () => {
    setOnDebugTriggerCount((value) => {
      if (value === 2) {
        Cookies.remove("visited");
        console.log("visited cookie removed");
      }
      return value + 1;
    });
  };

  return (
    <div className="static">
      <GameButton />
      <div className="flex flex-row w-full justify-center items-center absolute top-[11.286vh] space-x-1">
        <p className="font-bold text-xl">태양광 패널 찾기</p>
        <Logo />
      </div>
      <div className="absolute top-[17.708vh] px-2 text-sm text-center">
        <p>SolarSee AI가 항공사진에서 태양광 패널을 찾았어요.</p>
        <p>패널이 맞는데 빠뜨리거나, 패널이 아닌데 맞다고 판단한</p>
        <p>AI의 실수를 잡아내 주세요!</p>
      </div>
      <Image
        className="absolute top-[29.563vh] w-[98vw] ml-[1vw] self-center"
        onClick={handleOnDebugTriggerCount}
      />
      <div className="flex w-full px-3 absolute top-[91.079vh]">
        <button
          className="rounded-lg bg-yellow w-full h-[6.45533991vh]"
          onClick={() => navigate("/game/play")}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}

export default GameHomePage;
