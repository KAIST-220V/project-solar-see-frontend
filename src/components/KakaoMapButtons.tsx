import { useNavigate } from "react-router-dom";

function KakaoMapButtons() {
  const navigate = useNavigate();
  return (
    <>
      <div className="absolute left-[70vw] top-[2vh] z-10 flex h-[5.28169vh] w-[26vw] items-center justify-evenly rounded-lg bg-white text-sm shadow-custom">
        <div className="flex h-[4.2253vh] w-[11.5vw] items-center justify-center rounded-lg bg-blue hover:cursor-pointer">
          <p className="h-fit w-fit font-semibold text-white">지도</p>
        </div>
        <div
          className="flex h-[4.2253vh] w-[11.5vw] items-center justify-center rounded-sm bg-white hover:cursor-pointer"
          onClick={() => navigate("/game")}
        >
          <p className="h-fit w-fit font-semibold text-blue">게임</p>
        </div>
      </div>
    </>
  );
}

export default KakaoMapButtons;
