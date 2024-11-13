import { useEffect, useState } from "react";
import GameButton from "../components/GameButton";
import { PanelInImages } from "../types/interface";
import GamePlay from "../components/GamePlay";
import GameScore from "../components/GameScore";

type Position = {
  x: number;
  y: number;
  pIndex: number;
}

function GamePage() {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [check, setCheck] = useState<any[]>([]);
  const [panel, setPanel] = useState<PanelInImages[]>([]);
  const [marks, setMarks] = useState<Position[]>([]);
  const [isGameMode, setIsGameMode] = useState(true);
  const [lifeCount, setLifeCount] = useState(5);

  useEffect(() => {
    fetch("http://localhost:3000/data/panel.json", {
      method: "GET",
    })
    .then((res) => res.json())
    .then((data) => setPanel(data.polygon));
  }, []);
    
  return (
    <div className='static'>
      <p>태양광 패널 찾기</p>
      <GameButton />
      {isGameMode && <GamePlay 
        panelsInImage={panel}
        round={round}
        score={score}
        check={check}
        setCheck={setCheck}
        marks={marks}
        setMarks={setMarks}
        setIsGameMode={setIsGameMode}
      />}
      {!isGameMode && <GameScore
        panel={panel}
        marks={marks}
        lifeCount={lifeCount}
        setLifeCount={setLifeCount}
        setIsGameMode={setIsGameMode}
      />}
    </div>
  );
}

export default GamePage;