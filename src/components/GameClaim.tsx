import { ReactComponent as Wrong } from "../assets/check2.svg";
import { ReactComponent as FalsePositive } from "../assets/FalsePositive.svg";
import { ReactComponent as SelectedFalsePositive } from "../assets/SelectedFalsePositive.svg";
import { ReactComponent as FalseNegative } from "../assets/FalseNegative.svg";
import { ReactComponent as SelectedFalseNegative } from "../assets/SelectedFalseNegative.svg";
import sample from "../assets/image_4_2 1.jpg";
import { useState, useEffect, useRef } from "react";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft; // 현재 스크롤 위치
    const containerWidth = container.offsetWidth;

    const newIndex = Math.round(scrollLeft / containerWidth); // 현재 이미지 인덱스 계산
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const checks = props.checks.reduce((acc: number[], check, i) => {
    if (check === 0) acc.push(i);
    return acc;
  }, []);
  const marks = props.marks.reduce((acc: number[], mark, i) => {
    if (mark.pIndex === -1) acc.push(i);
    return acc;
  }, []);
  const [positive, setPositive] = useState(Array(checks.length + marks.length).fill(0));

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
      <div
        ref={containerRef}
        className="relative flex flex-row aspect-square mt-3 bg-slate-30 snap-x overflow-x-auto">
        {Array.from({ length: checks.length + marks.length }).map(
          (_, i) => 
            (
              i < checks.length 
                ? (<div className="snap-center w-screen min-w-screen aspect-square relative" key={`div-${i}`}>
                    <img src={props.img} className="w-screen aspect-square" alt="" />
                    <svg
                      className="absolute left-0 top-0 z-10"
                      width="100%"
                      height="100%"
                      viewBox="0 0 100 100"
                    >
                  <polygon
                    points={
                      props.panel[checks[i]] &&
                      props.panel[checks[i]].all_points_x &&
                      props.panel[checks[i]].all_points_y
                        ? props.panel[checks[i]].all_points_x
                            .map((point: number, j: number) => {
                              const yPoint = props.panel[checks[i]].all_points_y[j] ?? 0; // 기본값 0
                              return `${(point * 100) / 1024},${(yPoint * 100) / 1024}`;
                            })
                            .join(' ')
                        : ''
                    }
                    fill="rgba(0, 0, 0, 0)"
                    stroke="#FF7729"
                    strokeWidth="1"
                  />
                    </svg>
                    { positive[i] === 0  ?
              <FalsePositive
                  key={`FalsePositive-${i}`}
                  style={{
                    position: "absolute",
                    left: `min(calc(${(props.panel[checks[i]].all_points_x.reduce((acc, cur) => acc + cur, 0)/props.panel[checks[i]].all_points_x.length*100/1024)-18}vw), 64vw`,
                    top: `max(${(props.panel[checks[i]].all_points_y.reduce((acc, cur) => (cur < acc ? cur : acc), Infinity)*100/1024)-19}vw, 0vw)`,
                    width: '36vw',
                    zIndex: 20,
                  }}
                  onClick={() =>
                    setPositive((prev) =>
                      prev.map((value, idx) => (idx === i ? 1 : value))
                    )
                  }
                /> : <SelectedFalsePositive
                key={`SelectedFalsePositive-${i}`}
                style={{
                  position: "absolute",
                  left: `min(calc(${(props.panel[checks[i]].all_points_x.reduce((acc, cur) => acc + cur, 0)/props.panel[checks[i]].all_points_x.length*100/1024)-18}vw), 64vw)`,
                  top: `max(${(props.panel[checks[i]].all_points_y.reduce((acc, cur) => (cur < acc ? cur : acc), Infinity)*100/1024)-19}vw, 0vw)`,
                  width: '36vw',
                  zIndex: 20,
                }}
              />
              }
                  </div>)
                : (<div className="relative snap-center w-screen min-w-screen aspect-square" key={`div-${i}`}>
                    <img src={props.img} className="w-screen aspect-square" alt="" />
                    <Wrong
                          style={{
                            position: "absolute",
                            left: `${props.marks[marks[i-checks.length]].x-12}px`,
                            top: `${props.marks[marks[i-checks.length]].y-26}px`,
                            width: "27.9px",
                            height: "29px",
                            zIndex: 20,
                          }}
                        />
                    {positive[i] === 0 ? <FalseNegative
                  style={{
                    position: "absolute",
                    left: `min(calc(${props.marks[marks[i-checks.length]].x}px - 18vw), 64vw)`,
                    top: `max(0vw, ${props.marks[marks[i-checks.length]].y}px)`,
                    width: '36vw',
                    zIndex: 20,
                  }}
                  onClick={() =>
                    setPositive((prev) =>
                      prev.map((value, idx) => (idx === i ? 1 : value))
                    )
                  }
                /> : <SelectedFalseNegative
                    style={{
                      position: "absolute",
                      left: `min(calc(${props.marks[marks[i-checks.length]].x}px - 18vw), 64vw)`,
                      top: `max(${props.marks[marks[i-checks.length]].y}px, 0vw)`,
                      width: '36vw',
                      zIndex: 20,
                    }}
                  />}
                  </div>)
            )
          
        )}
      </div>
      <div className="flex flex-row space-x-1 justify-center mt-3">
        {Array.from({ length : marks.length + checks.length }).map((_, i) => (
          <div className={`w-[2vw] aspect-square rounded-full ${i === currentIndex ? "bg-[#444444]" : "bg-[#B3B3B3]"}`}></div>
        ))}
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
