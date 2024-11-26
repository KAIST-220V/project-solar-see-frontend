import { useNavigate } from "react-router-dom";

function KakaoMapButtons() {
  const navigate = useNavigate();
  return (
    <>
      <div className="absolute flex justify-evenly items-center z-10 w-[26vw] h-[5.28169vh] left-[70vw] top-[2vh] rounded-lg text-sm bg-white shadow-custom">
        <div className="w-[11.5vw] h-[4.2253vh] flex justify-center items-center rounded-lg hover:cursor-pointer bg-blue">
          <p className="w-fit h-fit text-white font-semibold">지도</p>
        </div>
        <div
          className="w-[11.5vw] h-[4.2253vh] flex justify-center items-center rounded-sm hover:cursor-pointer bg-white"
          onClick={() => navigate("/game")}
        >
          <p className="w-fit h-fit text-blue font-semibold">게임</p>
        </div>
      </div>
    </>
  );
}

export default KakaoMapButtons;
