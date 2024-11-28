import React, { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../assets/logo_100px.svg";
import { ReactComponent as EmptyLogo } from "../assets/logo_outline.svg";
import { ReactComponent as Correct } from "../assets/check1.svg";
import { ReactComponent as Home } from "../assets/home.svg";
import { useNavigate } from "react-router-dom";

type Position = {
  x: number;
  y: number;
  pIndex: number;
};

type Props = {
  panelsInImage: any;
  round: number;
  score: number;
  check: number[];
  setCheck: React.Dispatch<React.SetStateAction<number[]>>;
  marks: Position[];
  setMarks: React.Dispatch<React.SetStateAction<Position[]>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  lifeCount: number;
  setLifeCount: React.Dispatch<React.SetStateAction<number>>;
  setIsClaimed: React.Dispatch<React.SetStateAction<boolean>>;
  img: string;
};

function GamePlay(props: Props) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const minSelectionRequired = 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  });

  const newLogos = [
    ...Array(props.lifeCount)
      .fill(null)
      .map((_, index) => <Logo key={index} className="h-[10vw] w-[10vw]" />),
    ...Array(5 - props.lifeCount)
      .fill(null)
      .map((_, index) => (
        <EmptyLogo
          key={props.lifeCount + index}
          className="h-[10vw] w-[10vw]"
        />
      )),
  ];

  const handleImageClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
  ) => {
    const { clientX, clientY } = event;
    const eventTarget = event.target as SVGElement;
    const rect = eventTarget.getBoundingClientRect();
    if (count < props.panelsInImage.length) {
      props.setMarks([
        ...props.marks,
        { x: clientX - rect.left, y: clientY - rect.top, pIndex: -1 },
      ]);
      setCount((count) => count + 1);
    }
  };

  const handlePolygonClick = (
    key: number,
    event: React.MouseEvent<SVGPolygonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    const { clientX, clientY } = event;
    const eventTarget = event.target as SVGPolygonElement;
    const svgElement = eventTarget.closest("svg");
    if (svgElement) {
      const rect = svgElement.getBoundingClientRect();
      if (count < props.panelsInImage.length) {
        props.setMarks([
          ...props.marks,
          { x: clientX - rect.left, y: clientY - rect.top, pIndex: key },
        ]);
        setCount((count) => count + 1);
        props.setCheck((check) =>
          check.map((cnt, i) => (i === key ? cnt + 1 : cnt)),
        );
      }
    }
  };

  const handleMarkClick = (
    key: number,
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    props.setMarks((marks) => marks.filter((_, i) => i !== key));

    if (props.marks[key].pIndex !== -1) {
      props.setCheck((check) =>
        check.map((cnt, i) => (i === props.marks[key].pIndex ? cnt - 1 : cnt)),
      );
    }

    setCount((count) => count - 1);
  };

  return (
    <div>
      {loading && (
        <div>
          <div className="fixed left-0 top-0 z-30 h-[100dvh] w-screen items-center justify-center bg-blue opacity-75"></div>
          <div className="fixed top-[20vh] z-40 flex h-[50vh] w-full flex-col items-center justify-center opacity-100">
            <Logo className="z-40 h-[15vh] w-[15vh] opacity-100" />
            <p className="font-handwriting text-4xl tracking-widest text-yellow">
              <span>Round </span>
              <span>{props.round}</span>
            </p>
            <p className="font-nanum text-2xl font-semibold tracking-widest text-yellow">
              <span>패널 찾기 시작!</span>
            </p>
          </div>
        </div>
      )}
      <Home
        className="absolute left-[6.4vw] top-[3vh] z-10 w-[5vw] cursor-pointer"
        onClick={() => navigate("/game")}
      />
      <div className="absolute top-[10dvh] flex h-[90dvh] w-full flex-col">
        <div className="px-3">
          <div className="mb-1 flex flex-row justify-between font-handwriting tracking-widest text-blue">
            <p>ROUND {props.round}</p>
            <p>SCORE {props.score.toString().padStart(3, "0")}</p>
          </div>
          <p>
            <span>SolarSee AI는 패널 </span>
            <span className="font-handwriting">
              {props.panelsInImage.length}
            </span>
            <span>개를 찾았어요.</span>
          </p>
          <p>
            <span>최대 </span>
            <span className="font-handwriting">
              {props.panelsInImage.length}
            </span>
            <span>개, 최소 </span>
            <span className="font-handwriting">{minSelectionRequired}</span>
            <span>개의 패널을 선택해 주세요.</span>
          </p>
        </div>
        <div className="relative mt-3 flex aspect-square">
          <img
            src={props.img}
            className="aspect-square w-full select-none"
            alt=""
          />
          <svg
            className="absolute left-0 top-0 z-10 h-full w-full"
            viewBox="0 0 100 100"
            onClick={handleImageClick}
          >
            {props.panelsInImage.map((pan: any, index: number) => (
              <polygon
                points={pan.all_points_x
                  .map(
                    (point: number, i: number) =>
                      `${(point * 100) / 1024},${
                        (pan.all_points_y[i] * 100) / 1024
                      }`,
                  )
                  .join(" ")}
                fill="rgba(0, 0, 0, 0)"
                onClick={(event) => handlePolygonClick(index, event)}
                key={index}
              />
            ))}
          </svg>
          <div className="absolute left-0 top-0 h-full w-full">
            {props.marks.map((mark, index) => (
              <Correct
                key={index}
                onClick={(event) => handleMarkClick(index, event)}
                style={{
                  position: "absolute",
                  left: `${mark.x - 9}px`,
                  top: `${mark.y - 23}px`,
                  width: "27.9px",
                  height: "29px",
                  zIndex: 20,
                }}
              />
            ))}
          </div>
        </div>
        <div className="mt-3 flex justify-evenly">
          {newLogos.map((logo, index) => (
            <div key={index}>{logo}</div>
          ))}
        </div>
        <div className="relative flex w-full flex-grow flex-col-reverse p-3">
          <button
            className={`h-[6.45533991vh] w-full rounded-lg bg-yellow font-bold ${
              count < minSelectionRequired
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={() => props.setMode("score")}
            disabled={count < minSelectionRequired}
          >
            {count < minSelectionRequired ? (
              "패널을 선택해주세요"
            ) : (
              <>
                결과보기{" "}
                <span className="font-handwriting">{`(${count}/${props.panelsInImage.length})`}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
