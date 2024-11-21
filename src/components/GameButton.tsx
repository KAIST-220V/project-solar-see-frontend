import { useNavigate } from "react-router-dom";

function GameButton() {
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute flex justify-evenly items-center z-10 w-[26vw] h-[5.28169vh] left-[71.246vw] top-[2vh] rounded-sm text-sm bg-white shadow-custom">
        <div
          className="w-[11.5vw] h-[4.2253vh] flex justify-center items-center rounded-sm hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          <p className="w-fit h-fit text-blue font-semibold">지도</p>
        </div>
        <div className="w-[11.5vw] h-[4.2253vh] flex justify-center items-center rounded-sm hover:cursor-pointer bg-blue">
          <p className="w-fit h-fit text-white font-semibold">게임</p>
        </div>
      </div>
    </>
  );
}

export default GameButton;
