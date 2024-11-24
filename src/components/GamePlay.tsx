import React, { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../assets/logo_100px.svg";
import { ReactComponent as EmptyLogo } from "../assets/logo_outline.svg";
import { ReactComponent as Correct } from "../assets/check1.svg";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  });

  const newLogos = [
    ...Array(props.lifeCount)
      .fill(null)
      .map((_, index) => <Logo key={index} className="w-[10vw] h-[10vw]" />),
    ...Array(5 - props.lifeCount)
      .fill(null)
      .map((_, index) => (
        <EmptyLogo
          key={props.lifeCount + index}
          className="w-[10vw] h-[10vw]"
        />
      )),
  ];

  const handleImageClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>
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
    event: React.MouseEvent<SVGPolygonElement, MouseEvent>
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
          check.map((cnt, i) => (i === key ? cnt + 1 : cnt))
        );
      }
    }
  };

  const handleMarkClick = (
    key: number,
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    props.setMarks((marks) => marks.filter((_, i) => i !== key));

    if (props.marks[key].pIndex !== -1) {
      props.setCheck((check) =>
        check.map((cnt, i) => (i === props.marks[key].pIndex ? cnt - 1 : cnt))
      );
    }

    setCount((count) => count - 1);
  };

  return (
    <div>
      {loading && (
        <div>
          <div className="absolute top-0 left-0 w-screen h-screen z-30 bg-blue opacity-75 justify-center items-center"></div>
          <div className="absolute top-[20vh] flex flex-col w-full h-[50vh] z-40 opacity-100 justify-center items-center">
            <Logo className="w-[15vh] h-[15vh] z-40 opacity-100" />
            <p className="font-handwriting text-4xl tracking-widest text-yellow">
              <span>Round </span>
              <span>{props.round}</span>
            </p>
            <p className="font-nanum font-semibold text-2xl tracking-widest text-yellow">
              <span>패널 찾기 시작!</span>
            </p>
          </div>
        </div>
      )}
      <div className="absolute flex flex-col top-[10dvh] h-[90dvh] w-full">
        <div className="px-3">
          <div className="flex flex-row justify-between tracking-widest mb-1 text-blue font-handwriting">
            <p>ROUND {props.round}</p>
            <p>{props.score.toString().padStart(3, "0")}</p>
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
            <span>개의 패널을 선택해 주세요.</span>
          </p>
        </div>
        <div className="relative flex aspect-square mt-3">
          <img
            src={props.img}
            className="w-full select-none aspect-square"
            alt=""
          />
          <svg
            className="absolute left-0 top-0 z-10 w-full h-full"
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
                      }`
                  )
                  .join(" ")}
                fill="rgba(0, 0, 0, 0)"
                onClick={(event) => handlePolygonClick(index, event)}
                key={index}
              />
            ))}
          </svg>
          <div className="absolute top-0 left-0 w-full h-full">
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
        <div className="flex mt-3 justify-evenly">
          {newLogos.map((logo, index) => (
            <div key={index}>{logo}</div>
          ))}
        </div>
        <div className="relative flex flex-grow flex-col-reverse p-3 w-full">
          <button
            className="rounded-lg bg-yellow w-full h-[6.45533991vh]"
            onClick={() => props.setMode("score")}
          >
            결과보기 ({count}/{props.panelsInImage.length})
          </button>
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
