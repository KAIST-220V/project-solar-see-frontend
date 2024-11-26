import { useEffect, useState } from "react";
import { PanelInImages } from "../types/interface";
import GamePlay from "../components/GamePlay";
import GameScore from "../components/GameScore";
import Cookies from "js-cookie";
import GameClaim from "../components/GameClaim";
import GameStory from "../components/GameStory"


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
  const [mode, setMode] = useState("game");
  const [lifeCount, setLifeCount] = useState(5);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isClaimed, setIsClaimed] = useState(false);
  const [img, setImg] = useState("");
  const [imgId, setImgId] = useState(0);

  useEffect(() => {
    fetch("https://solar-see.site/api/v1/game/image", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPanel(data.polygon);
        setCheck(Array(data.polygon.length).fill(0));
        setImg(data.image_url);
        setImgId(data.id);
      });
  }, []);

  useEffect(() => {
    const visited = Cookies.get("visited");
    if (visited) {
      setIsFirstVisit(false);
    }
  }, []);

  return (
    <div className="static">
      {isFirstVisit && <GameStory setIsFirstVisit={setIsFirstVisit} />}
      {!isFirstVisit && (
        <div>
          <p className="absolute font-semibold flex top-[2vh] h-[5.28169vh] items-center w-full justify-center">
            태양광 패널 찾기
          </p>
          {mode === "game" && (
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
          {mode === "score" && (
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
              setImg={setImg}
              setPanel={setPanel}
              setImgId={setImgId}
            />
          )}
          {mode === "claim" && (
            <GameClaim
              round={round}
              setRound={setRound}
              panel={panel}
              checks={check.reduce((acc: number[], check, i) => {
                if (check === 0) acc.push(i);
                return acc;
              }, [])}
              marks={marks}
              setMode={setMode}
              setIsClaimed={setIsClaimed}
              img={img}
              imgId={imgId}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default GamePage;
