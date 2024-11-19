import { useEffect, useState } from "react";
import GameButton from "../components/GameButton";
import { PanelInImages } from "../types/interface";
import GamePlay from "../components/GamePlay";
import GameScore from "../components/GameScore";
import GameStory from "../components/GameStory";
import Cookies from "js-cookie";

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
  const [isGameMode, setIsGameMode] = useState(true);
  const [lifeCount, setLifeCount] = useState(5);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    fetch("/data/panel.json", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPanel(data.polygon);
        setCheck(Array(data.polygon.length).fill(0));
      });
  }, [round]);

  useEffect(() => {
    const visited = Cookies.get('visited');
    if (visited) {
      setIsFirstVisit(false);
    }
  })
  return (
    <div className={"static"}>
      {isFirstVisit && (
        <GameStory
          setIsFirstVisit={setIsFirstVisit}
        />
      )}
      {!isFirstVisit && (
        <div className="m-3 p-3">
          <p className="font-bold text-center">태양광 패널 찾기</p>
          <GameButton />
          {isGameMode && (
            <GamePlay
              panelsInImage={panel}
              round={round}
              score={score}
              check={check}
              setCheck={setCheck}
              marks={marks}
              setMarks={setMarks}
              setIsGameMode={setIsGameMode}
            />
          )}
          {!isGameMode && (
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
              setIsGameMode={setIsGameMode}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default GamePage;
