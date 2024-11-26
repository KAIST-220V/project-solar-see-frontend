import { useState } from "react";
import { useLocation } from "react-router-dom";
import RankingAdd from "../components/RankingAdd";
import ShowRanking from "../components/ShowRanking";
import { v4 as uuidv4 } from "uuid";

let uniqueId = localStorage.getItem("uniqueClientId");
if (!uniqueId) {
  uniqueId = uuidv4();
  localStorage.setItem("uniqueClientId", uniqueId);
}

function GameRanking() {
  const location = useLocation();
  const defaultMode =
    location.state == null ||
    sessionStorage.getItem("lastGameId") === location.state.game_id
      ? "showranks"
      : "addrank";
  const [mode, setMode] = useState(defaultMode);
  return (
    <div className="absolute flex flex-col items-center justify-start w-full h-dvh bg-white">
      {mode === "addrank" &&
        location.state &&
        location.state.score !== null && (
          <RankingAdd
            score={location.state.score}
            currentUuid={uniqueId!}
            gameId={location.state.game_id}
            setMode={setMode}
          />
        )}
      {mode === "showranks" && <ShowRanking currentUuid={uniqueId!} />}
    </div>
  );
}

export default GameRanking;
