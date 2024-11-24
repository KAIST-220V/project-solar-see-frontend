import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RankingAdd from "../components/RankingAdd";
import ShowRanking from "../components/ShowRanking";
import { v4 as uuidv4 } from 'uuid';

let uniqueId = localStorage.getItem('uniqueClientId');
if (!uniqueId) {
  uniqueId = uuidv4();
  localStorage.setItem('uniqueClientId', uniqueId);
}

type Rank = {
    image_url: string;
    nickname: string;
    score: number;
    is_mine: boolean;
}

function GameRanking() {
    const [mode, setMode] = useState('addrank');
    const location = useLocation();

  return (
    <div className="absolute flex flex-col items-center justify-center w-full h-full bg-white">
        {/* <RankingAdd score={state.score}/> */}
        {mode === 'addrank' && uniqueId && <RankingAdd score={location.state.score} currentUuid={uniqueId} setMode={setMode}/>}
        {mode === 'showranks' && uniqueId && <ShowRanking currentUuid={uniqueId} setMode={setMode}/>}
    </div>
  );
}

export default GameRanking;