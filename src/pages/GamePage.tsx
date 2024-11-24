import { useEffect, useState } from "react";
import GameButton from "../components/GameButton";
import { PanelInImages } from "../types/interface";
import GamePlay from "../components/GamePlay";
import GameScore from "../components/GameScore";
import GameStory from "../components/GameStory";
import Cookies from "js-cookie";
import GameClaim from "../components/GameClaim";
import { useNavigate } from "react-router-dom";

type Position = {
  x: number;
  y: number;
  pIndex: number;
};

function GamePage() {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [check, setCheck] = useState<number[]>([0]);
  const [panel, setPanel] = useState<PanelInImages[]>([]);
  const [marks, setMarks] = useState<Position[]>([]);
  const [mode, setMode] = useState('game');
  const [lifeCount, setLifeCount] = useState(5);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isClaimed, setIsClaimed] = useState(false);
  const [img, setImg] = useState('');

  useEffect(() => {
    fetch("https://solar-see.site/api/v1/game/image", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPanel(data.polygon);
        setCheck(Array(data.polygon.length).fill(0));
        setImg(data.image_url)
        console.log(data.polygon)
      });
  }, [round]);

  useEffect(() => {
    const visited = Cookies.get('visited');
    if (visited) {
      setIsFirstVisit(false);
    }
  }, [])

  const navigate = useNavigate();
  navigate('/game/ranking', { state: { score } })

  return (
    <div className="static">
      {isFirstVisit && (
        <GameStory
          setIsFirstVisit={setIsFirstVisit}
        />
      )}
      {!isFirstVisit && (
        <div>
          <p className="absolute font-semibold flex top-[2vh] h-[5.28169vh] items-center w-full justify-center">태양광 패널 찾기</p>
          <GameButton />
          {mode === 'game' && (
            <GamePlay
              panelsInImage={panel}
              round={round}
              score={score}
              check={check}
              setCheck={setCheck}
              marks={marks}
              setMarks={setMarks}
              setMode={setMode}
              lifeCount={lifeCount}
              setLifeCount={setLifeCount}
              setIsClaimed={setIsClaimed}
              img={img}
            />
          )}
          {mode === 'score' && (
            <GameScore
              round={round}
              setRound={setRound}
              score={score}
              setScore={setScore}
              panel={panel}
              checks={check}
              setChecks={setCheck}
              marks={marks}
              setMarks={setMarks}
              lifeCount={lifeCount}
              setLifeCount={setLifeCount}
              setMode={setMode}
              isClaimed={isClaimed}
              setIsClaimed={setIsClaimed}
              img={img}
            />
          )}
          {mode === 'claim' && (
            <GameClaim
              round={round}
              setRound={setRound}
              score={score}
              setScore={setScore}
              panel={panel}
              checks={check}
              marks={marks}
              lifeCount={lifeCount}
              setLifeCount={setLifeCount}
              setMode={setMode}
              setIsClaimed={setIsClaimed}
              img={img}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default GamePage;
