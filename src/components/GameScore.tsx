import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo_100px.svg";
import { ReactComponent as EmptyLogo } from "../assets/logo_outline.svg";
import { ReactComponent as Correct } from "../assets/check1.svg";
import { ReactComponent as Wrong } from "../assets/check2.svg";
import { ReactComponent as OverLogo } from "../assets/gameover_100px.svg";
import { ReactComponent as Home } from "../assets/home.svg";
import { PanelInImages } from "../types/interface";
import { v4 as uuidv4 } from "uuid";

type Position = {
  x: number;
  y: number;
  pIndex: number;
};
type scoreProps = {
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  checks: number[];
  setChecks: React.Dispatch<React.SetStateAction<number[]>>;
  marks: Position[];
  setMarks: React.Dispatch<React.SetStateAction<Position[]>>;
  panel: { all_points_x: number[]; all_points_y: number[] }[];
  lifeCount: number;
  setLifeCount: React.Dispatch<React.SetStateAction<number>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  isClaimed: boolean;
  setIsClaimed: React.Dispatch<React.SetStateAction<boolean>>;
  img: string;
  setPanel: React.Dispatch<React.SetStateAction<PanelInImages[]>>;
  setImg: React.Dispatch<React.SetStateAction<string>>;
  setImgId: React.Dispatch<React.SetStateAction<number>>;
};

function GameScore(props: scoreProps) {
  const correctClicks = props.checks.filter((num: number) => num >= 1).length;
  const wrongClicks = props.marks.filter(
    (value: Position) => value.pIndex === -1,
  ).length;

  const navigate = useNavigate();

  const [gameOver, setGameOver] = useState(false);
  const [gameOverLoading, setGameOverLoading] = useState(false);

  useEffect(() => {
    if (props.lifeCount - wrongClicks <= 0) {
      setGameOver(true);
      setGameOverLoading(true);

      const timer = setTimeout(() => {
        setGameOverLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [props.lifeCount, wrongClicks]);

  const logos = [
    ...Array(Math.max(0, props.lifeCount - wrongClicks))
      .fill(null)
      .map((_, index) => <Logo key={index} className="h-[10vw] w-[10vw]" />),
    ...Array(Math.min(5, Math.max(0, 5 - props.lifeCount + wrongClicks)))
      .fill(null)
      .map((_, index) => (
        <EmptyLogo
          key={props.lifeCount + index}
          className="h-[10vw] w-[10vw]"
        />
      )),
  ];

  const handleNextGame = () => {
    props.setImg("");
    fetch("https://solar-see.site/api/v1/game/image", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        props.setPanel(data.polygon);
        props.setChecks(Array(data.polygon.length).fill(0));
        props.setImg(data.image_url);
        props.setImgId(data.id);
      });
    props.setScore(props.score + correctClicks);
    props.setLifeCount(Math.max(0, props.lifeCount - wrongClicks));
    props.setMode("game");
    props.setRound(props.round + 1);
    props.setChecks([]);
    props.setMarks([]);
  };

  const handleRanking = () => {
    navigate("/game/ranking", {
      state: { score: props.score + correctClicks, game_id: uuidv4() },
    });
  };

  return (
    <div>
      {gameOverLoading && !props.isClaimed && (
        <div>
          <div className="fixed left-0 top-0 z-30 h-[100dvh] w-screen items-center justify-center bg-blue opacity-75"></div>
          <div className="fixed top-[20vh] z-40 flex h-[50vh] w-full flex-col items-center justify-center opacity-100">
            <OverLogo className="z-40 h-[15vh] w-[15vh] opacity-100" />
            <p className="font-handwriting text-4xl tracking-widest text-orange">
              <span>Round </span>
              <span>{props.round}</span>
            </p>
            <p className="font-nanum text-2xl font-semibold tracking-widest text-orange">
              <span>게임 오버</span>
            </p>
          </div>
        </div>
      )}
      <Home
        className="absolute left-[6.4vw] top-[3vh] z-10 w-[5vw] cursor-pointer"
        onClick={() => navigate("/game")}
      />
      <div className="relative top-[10dvh] flex h-[90dvh] flex-col">
        <div className="px-3">
          <div className="mb-1 flex flex-row justify-between font-handwriting tracking-widest text-blue">
            <p>ROUND {props.round}</p>
            <p>
              SCORE {(props.score + correctClicks).toString().padStart(3, "0")}
            </p>
          </div>
        </div>
        <div className="relative mt-3 flex aspect-square">
          <img src={props.img} className="aspect-square w-full" alt="" />
          <svg
            className="absolute left-0 top-0 z-10"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
          >
            {props.checks.map(
              (count, i) =>
                props.panel[i] && (
                  <polygon
                    key={i}
                    points={props.panel[i].all_points_x
                      .map(
                        (point: number, j: number) =>
                          `${(point * 100) / 1024},${
                            (props.panel[i].all_points_y[j] * 100) / 1024
                          }`,
                      )
                      .join(" ")}
                    fill="rgba(0, 0, 0, 0)"
                    stroke={`${count === 0 ? "#FF7729" : "rgb(127, 168, 255)"}`}
                    strokeWidth="0.5"
                  />
                ),
            )}
          </svg>
          <ul>
            {props.marks.map((location, index) => (
              <li key={index}>
                {location.pIndex !== -1 && (
                  <Correct
                    style={{
                      position: "absolute",
                      left: `${location.x - 9}px`,
                      top: `${location.y - 23}px`,
                      width: "27.9px",
                      height: "29px",
                      zIndex: 20,
                    }}
                  />
                )}
                {location.pIndex === -1 && (
                  <Wrong
                    style={{
                      position: "absolute",
                      left: `${location.x - 9}px`,
                      top: `${location.y - 23}px`,
                      width: "27.9px",
                      height: "29px",
                      zIndex: 20,
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 flex justify-evenly">
          {logos.map((logo, index) => (
            <div key={index}>{logo}</div>
          ))}
        </div>

        <div className="mt-3 flex flex-col items-center">
          <p>
            {props.panel.length}개 중 {correctClicks}개 맞힘, {wrongClicks}개
            틀림, {props.panel.length - correctClicks}개 놓침
          </p>

          <div className="flex">
            <div className="flex-grow text-center font-handwriting text-3xl font-bold text-yellow">
              + {correctClicks} 점
            </div>

            {wrongClicks > 0 && (
              <div className="ml-6 flex-grow text-center font-handwriting text-3xl font-bold text-red-500">
                - {wrongClicks} Life
              </div>
            )}
          </div>
        </div>

        {props.isClaimed || props.panel.length === correctClicks ? (
          gameOver ? (
            <div className="relative flex w-full flex-grow flex-col-reverse p-3">
              <button
                className="h-[6.45533991vh] w-full rounded-lg bg-yellow font-bold"
                onClick={() => {
                  props.setIsClaimed(false);
                  handleRanking();
                }}
              >
                랭킹 등록하기
              </button>
            </div>
          ) : (
            <div className="relative flex w-full flex-grow flex-col-reverse p-3">
              <button
                className="h-[6.45533991vh] w-full rounded-lg bg-yellow font-bold"
                onClick={() => {
                  props.setIsClaimed(false);
                  handleNextGame();
                }}
              >
                다음 게임 시작하기
              </button>
            </div>
          )
        ) : (
          <div className="relative flex w-full flex-grow flex-col-reverse p-3">
            <div className="flex justify-evenly">
              <button
                className="h-[6.45533991vh] w-[44.2744809vw] rounded-lg bg-[#FFA629] font-bold"
                onClick={() => props.setMode("claim")}
              >
                AI의 실수 잡아내기
              </button>
              {gameOver ? (
                <button
                  className="h-[6.45533991vh] w-[44.2744809vw] rounded-lg bg-[#D9D9D9] font-bold"
                  onClick={handleRanking}
                >
                  랭킹 등록하기
                </button>
              ) : (
                <button
                  className="h-[6.45533991vh] w-[44.2744809vw] rounded-lg bg-[#D9D9D9] font-bold"
                  onClick={handleNextGame}
                >
                  다음 게임 시작하기
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameScore;
