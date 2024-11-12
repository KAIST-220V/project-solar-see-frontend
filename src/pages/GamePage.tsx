import { useEffect, useState } from "react";
import GameButton from "../components/GameButton";
import { MarkerType } from "../types/interface";
import GamePlay from "../components/GamePlay";

function GamePage() {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [check, setCheck] = useState<any[]>([]);
  const [panel, setPanel] = useState<MarkerType[]>([]);

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
      <GamePlay 
        panelsInImage={panel}
        round={round}
        score={score}
        check={check}
        setCheck={setCheck}
      />
    </div>
  );
}

export default GamePage;
