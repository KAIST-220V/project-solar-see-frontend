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
    <div className="static flex flex-col h-[100dvh]">
      <GameButton />
      <div className="flex flex-row w-full justify-center items-center pt-[11.286vh] space-x-1">
        <p className="font-bold text-3xl">태양광 패널 찾기</p>
        <Logo />
      </div>
      <div className="p-3 text-center text-sm items-center">
        <p>SolarSee AI가 항공사진에서 태양광 패널을 찾았어요.</p>
        <p>패널이 맞는데 빠뜨리거나, 패널이 아닌데 맞다고 판단한</p>
        <p>AI의 실수를 잡아내 주세요!</p>
      </div>
      <div className="w-full p-3">
        <Image
          className="object-cover w-full h-full"
          onClick={handleOnDebugTriggerCount}
        />
      </div>

      <div className="flex w-full p-3 flex-grow flex-col-reverse">
        <button
          className="rounded-lg bg-yellow w-full h-[6.45533991vh] font-bold"
          onClick={() => navigate("/game/play")}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}

export default GameHomePage;
