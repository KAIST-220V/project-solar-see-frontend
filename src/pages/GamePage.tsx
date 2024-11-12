import KakaoMapButtons from "../components/KakaoMapButtons";
import GamePlay from "../components/GamePlay";

function GamePage() {
  return (
    <div className='static'>
      <p>태양광 패널 찾기</p>
      <KakaoMapButtons />
      <GamePlay />
    </div>
  );
}

export default GamePage;
