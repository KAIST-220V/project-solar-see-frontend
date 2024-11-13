import { useNavigate } from "react-router-dom";

function GameButton() {
    const navigate = useNavigate();
  return (
    <>
      <div className="absolute flex justify-evenly items-center z-10 w-[25.445vw] h-[5.28169vh] left-[71.246vw] top-[0.926vh] rounded-sm text-sm bg-white">
        <div className="w-[12.468vw] h-[4.2253vh] flex justify-center items-center rounded-sm hover:cursor-pointer bg-white" onClick={() => navigate("/")}>
          <p className="w-fit h-fit text-blue">지도</p>
        </div>
        <div className="w-[12.468vw] h-[4.2253vh] flex justify-center items-center rounded-sm hover:cursor-pointer bg-blue">
          <p className="w-fit h-fit text-white">게임</p>
        </div>
      </div>
    </>
  );
}

export default GameButton;
