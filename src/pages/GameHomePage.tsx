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
    <div className="static flex h-[100dvh] flex-col">
      <GameButton />
      <div className="flex w-full flex-row items-center justify-center space-x-1 pt-[11.286vh]">
        <p className="text-3xl font-bold">태양광 패널 찾기</p>
        <Logo />
      </div>
      <div className="items-center p-3 text-center text-sm">
        <p>SolarSee AI가 항공사진에서 태양광 패널을 찾았어요.</p>
        <p>패널이 맞는데 빠뜨리거나, 패널이 아닌데 맞다고 판단한</p>
        <p>AI의 실수를 잡아내 주세요!</p>
      </div>
      <div className="w-full p-3">
        <Image
          className="h-full w-full object-cover"
          onClick={handleOnDebugTriggerCount}
        />
      </div>

      <div className="flex w-full flex-grow flex-col-reverse p-3">
        <button
          className="h-[6.45533991vh] w-full rounded-lg bg-yellow font-bold"
          onClick={() => navigate("/game/play")}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}

export default GameHomePage;
