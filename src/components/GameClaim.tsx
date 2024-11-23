import { ReactComponent as Wrong } from "../assets/check2.svg";
import { ReactComponent as FalsePositive } from "../assets/FalsePositive.svg";
import { ReactComponent as SelectedFalsePositive } from "../assets/SelectedFalsePositive.svg";
import { ReactComponent as FalseNegative } from "../assets/FalseNegative.svg";
import { ReactComponent as SelectedFalseNegative } from "../assets/SelectedFalseNegative.svg";
import sample from "../assets/image_4_2 1.jpg";
import { useState } from "react";

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
  marks: Position[];
  panel: { all_points_x: number[]; all_points_y: number[] }[];
  lifeCount: number;
  setLifeCount: React.Dispatch<React.SetStateAction<number>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setIsClaimed: React.Dispatch<React.SetStateAction<boolean>>;
  img: string;
};

function GameClaim(props: scoreProps) {
  const [positive, setPositive] = useState(Array(props.checks.length).fill(0));
  const [negative, setNegative] = useState(Array(props.marks.length).fill(0));

  const handleClaim = () => {
    props.setMode('score')
    props.setIsClaimed(true)
  }
  return (
    <div className="absolute relative top-[10vh] h-[90vh]">
      <div className="px-3">
        <p className="text-[#FFA629] font-bold tracking-widest">
          <span className="font-handwriting">AI</span>
          <span>의 실수 잡아내기</span>
        </p>
        <p className="mt-3">패널이 맞는데 빠뜨리거나, 패널이 아닌데</p>
        <p>
          <span>맞다고 판단한 </span>
          <span className="font-handwriting">AI</span>
          <span>의 실수를 잡아내 주세요!</span>
        </p>
      </div>
      <div className="relative flex aspect-square mt-3">
        <img src={props.img} className="w-full aspect-square" alt="" />
        <svg
          className="absolute left-0 top-0 z-10"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
        >
          {props.checks.map(
            (count, i) =>
              props.panel[i] && count === 0 && (
                <polygon
                  key={i}
                  points={props.panel[i].all_points_x
                    .map(
                      (point: number, j: number) =>
                        `${(point * 100) / 1024},${
                          (props.panel[i].all_points_y[j] * 100) / 1024
                        }`
                    )
                    .join(" ")}
                  fill="rgba(0, 0, 0, 0)"
                  stroke="#FF7729"
                  strokeWidth="1"
                />
              )
          )}
        </svg>

        {props.checks.map(
          (count, i) =>
            props.panel[i] && count === 0 && ( positive[i] == 0 ?
              <FalsePositive
                  key={i}
                  style={{
                    position: "absolute",
                    left: `min(calc(${(props.panel[i].all_points_x.reduce((acc, cur) => acc + cur, 0)/props.panel[i].all_points_x.length*100/1024)-18}vw), 64vw`,
                    top: `${(props.panel[i].all_points_y.reduce((acc, cur) => (cur < acc ? cur : acc), Infinity)*100/1024)-19}vw`,
                    width: '36vw',
                    zIndex: 20,
                  }}
                  onClick={() =>
                    setPositive((prev) =>
                      prev.map((value, idx) => (idx === i ? 1 : value))
                    )
                  }
                /> : <SelectedFalsePositive
                key={i}
                style={{
                  position: "absolute",
                  left: `min(calc(${(props.panel[i].all_points_x.reduce((acc, cur) => acc + cur, 0)/props.panel[i].all_points_x.length*100/1024)-18}vw), 64vw)`,
                  top: `${(props.panel[i].all_points_y.reduce((acc, cur) => (cur < acc ? cur : acc), Infinity)*100/1024)-19}vw`,
                  width: '36vw',
                  zIndex: 20,
                }}
                onClick={() =>
                  setPositive((prev) =>
                    prev.map((value, idx) => (idx === i ? 0 : value))
                  )
                }
              />
            )
        )}

        <ul>
          {props.marks.map((location, index) => (
            <li key={index}>
              {location.pIndex === -1 && (
                <div>
                <Wrong
                  style={{
                    position: "absolute",
                    left: `${location.x-12}px`,
                    top: `${location.y-26}px`,
                    width: "27.9px",
                    height: "29px",
                    zIndex: 20,
                  }}
                />
                {negative[index] === 0 ? <FalseNegative
                  style={{
                    position: "absolute",
                    left: `calc(${location.x}px - 18vw)`,
                    top: `${location.y}px`,
                    width: '36vw',
                    zIndex: 20,
                  }}
                  onClick={() =>
                    setNegative((prev) =>
                      prev.map((value, idx) => (idx === index ? 1 : value))
                    )
                  }
                /> : <SelectedFalseNegative
                style={{
                  position: "absolute",
                  left: `calc(${location.x}px - 18vw)`,
                  top: `${location.y}px`,
                  width: '36vw',
                  zIndex: 20,
                }}
                onClick={() =>
                  setNegative((prev) =>
                    prev.map((value, idx) => (idx === index ? 0 : value))
                  )
                }
              />}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>



      <div className="absolute bottom-[5vh] w-full px-3">
        <button className="rounded-lg bg-[#FFA629] w-full h-[6.45533991vh]"
          onClick={handleClaim}>
          제보하기
        </button>
      </div>
    </div>
  );
}

export default GameClaim;
