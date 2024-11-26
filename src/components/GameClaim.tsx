import { ReactComponent as Wrong } from "../assets/check2.svg";
import { ReactComponent as DefaultO } from "../assets/default_O.svg";
import { ReactComponent as SelectedO } from "../assets/selected_O.svg";
import { ReactComponent as DefaultX } from "../assets/default_X.svg";
import { ReactComponent as SelectedX } from "../assets/selected_X.svg";
import { ReactComponent as BackButton } from "../assets/back.svg";
import { useState, useEffect, useRef } from "react";

type Position = {
  x: number;
  y: number;
  pIndex: number;
};

type scoreProps = {
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  checks: number[];
  marks: Position[];
  panel: { all_points_x: number[]; all_points_y: number[] }[];
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setIsClaimed: React.Dispatch<React.SetStateAction<boolean>>;
  img: string;
  imgId: number;
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
  const marks = props.marks.reduce((acc: number[], mark, i) => {
    if (mark.pIndex === -1) acc.push(i);
    return acc;
  }, []);
  const [positive, setPositive] = useState(
    Array(props.checks.length + marks.length).fill(0)
  );

  const handleClaim = () => {
    props.setMode("score");
    props.setIsClaimed(true);
  };
  return (
    <div>
      <BackButton
          className="absolute top-[3vh] left-[6.4vw] w-[5vw] cursor-pointer z-10"
          onClick={() => props.setMode("score")}
        />
      <div className="relative flex flex-col top-[10dvh] h-[90dvh]">
        <div className="px-3 flex flex-col">
          <p className="text-[#FFA629] font-bold tracking-widest">
            <span className="font-handwriting">AI</span>
            <span>의 실수 잡아내기</span>
          </p>
          <div className="flex flex-row items-center">
            <span className="bg-[#FF7729] w-[4vw] h-[4vw] rounded-full flex items-center justify-center">
              <p className="text-white text-center ">{currentIndex + 1}</p>
            </span>
            <span className="ml-1">은 태양광 패널이 맞나요?</span>
          </div>
        </div>
        <div
          ref={containerRef}
          className="relative flex flex-shrink-0 flex-row aspect-square mt-3 snap-x snap-mandatory overflow-x-auto w-full"
        >
          {Array.from({ length: props.checks.length + marks.length }).map(
            (_, i) =>
              i < props.checks.length ? (
                <div
                  className="flex-none w-full snap-start aspect-square relative"
                  key={`div-${i}`}
                >
                  <img src={props.img} className="w-full aspect-square" alt="" />
                  <svg
                    className="absolute left-0 top-0 z-10"
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                  >
                    <polygon
                      points={props.panel[props.checks[i]].all_points_x
                        .map((point: number, j: number) => {
                          const yPoint =
                            props.panel[props.checks[i]].all_points_y[j] ?? 0; // 기본값 0
                          return `${(point * 100) / 1024},${
                            (yPoint * 100) / 1024
                          }`;
                        })
                        .join(" ")}
                      fill="rgba(0, 0, 0, 0)"
                      stroke="#FF7729"
                      strokeWidth="0.5"
                    />
                  </svg>
                  <div>
                    <div
                      className="bg-white absolute w-[9vw] aspect-square rounded-md z-30 flex items-center justify-center"
                      style={{
                        left: `min(calc(${
                          ((props.panel[props.checks[i]].all_points_x.reduce(
                            (acc, cur) => acc + cur,
                            0
                          ) /
                            props.panel[props.checks[i]].all_points_x.length) *
                            100) /
                            1024 -
                          4.5
                        }vw), 91vw)`,
                        top: `max(${
                          (props.panel[props.checks[i]].all_points_y.reduce(
                            (acc, cur) => (cur < acc ? cur : acc),
                            Infinity
                          ) *
                            100) /
                            1024 -
                          14
                        }vw, 0vw)`,
                      }}
                    >
                      <div className="bg-[#FF7729] w-[6vw] h-[6vw] rounded-full flex items-center justify-center">
                        <p className="text-white text-center ">{i + 1}</p>
                      </div>
                    </div>
                    <div
                      className="absolute w-0 h-0 border-l-[2.5vw] border-r-[2.5vw] border-t-[4vw] border-transparent border-t-white z-20"
                      style={{
                        left: `min(calc(${
                          ((props.panel[props.checks[i]].all_points_x.reduce(
                            (acc, cur) => acc + cur,
                            0
                          ) /
                            props.panel[props.checks[i]].all_points_x.length) *
                            100) /
                            1024 -
                          2.5
                        }vw), 94vw)`,
                        top: `max(${
                          (props.panel[props.checks[i]].all_points_y.reduce(
                            (acc, cur) => (cur < acc ? cur : acc),
                            Infinity
                          ) *
                            100) /
                            1024 -
                          7
                        }vw, 0vw)`,
                      }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div
                  className="flex-none w-full h-full snap-start relative aspect-square"
                  key={`div-${i}`}
                >
                  <img
                    src={props.img}
                    className="w-full h-full aspect-square"
                    alt=""
                  />
                  <Wrong
                    style={{
                      position: "absolute",
                      left: `${
                        props.marks[marks[i - props.checks.length]].x - 12
                      }px`,
                      top: `${
                        props.marks[marks[i - props.checks.length]].y - 26
                      }px`,
                      width: "27.9px",
                      height: "29px",
                      zIndex: 20,
                    }}
                  />
                  <div>
                    <div
                      className="bg-white absolute w-[9vw] aspect-square rounded-md z-30 flex items-center justify-center"
                      style={{
                        left: `min(calc(${
                          props.marks[marks[i - props.checks.length]].x
                        }px - 4.5vw), 91vw)`,
                        top: `max(0vw, calc(${
                          props.marks[marks[i - props.checks.length]].y
                        }px - 19vw))`,
                      }}
                    >
                      <div className="bg-[#FF7729] w-[6vw] h-[6vw] rounded-full flex items-center justify-center">
                        <p className="text-white text-center ">{i + 1}</p>
                      </div>
                    </div>
                    <div
                      className="absolute w-0 h-0 border-l-[2.5vw] border-r-[2.5vw] border-t-[4vw] border-transparent border-t-white z-20"
                      style={{
                        left: `min(calc(${
                          props.marks[marks[i - props.checks.length]].x
                        }px - 2.5vw), 94vw)`,
                        top: `max(0vw, calc(${
                          props.marks[marks[i - props.checks.length]].y
                        }px - 12vw))`,
                      }}
                    ></div>
                  </div>
                </div>
              )
          )}
        </div>
        {/* <div className="flex overflow-auto snap-x snap-mandatory w-full h-[90vh]">
          <div className="flex-none w-full h-full items-center justify-center snap-start">
            <div className="relative top-[5vh] bg-gray-200 sm: h-[100vw] md:h-[55vh] md: aspect-none">
              <img src={img1} className="w-full h-full object-cover"></img>
            </div>
            <div className="relative top-[5vh] pt-8 pl-8 pr-8 w-full text-center">
              <p className="text-xl text-black font-extrabold">전력 수요 예측을 어렵게 하는 범인,</p>
              <p className="text-xl text-black font-extrabold">바로 비계량 태양광이에요</p>
              <p className="text-sm text-gray-500 mt-5">비계량 태양광은 발전량이 측정되지 않는</p>
              <p className="text-sm text-gray-500">태양광으로, 피크 전력 수요의 11%나 차지해요</p>
            </div>
          </div>
          <div className="flex-none w-full h-full items-center justify-center snap-start">
            <div className="relative top-[5vh] bg-gray-200 sm: h-[100vw] md:h-[55vh] md: aspect-none">
              <img src={img2} className="w-full h-full object-cover"></img>
            </div>
            <div className="relative top-[5vh] pt-8 pl-8 pr-8 w-full text-center">
              <p className="text-xl text-black font-extrabold">그래서 Team 220V는</p>
              <p className="text-xl text-black font-extrabold">SolarSee 프로젝트를 시작했어요</p>
              <p className="text-sm text-gray-500 mt-3">SolarSee 프로젝트는</p>
              <p className="text-sm text-gray-500">항공사진과 최신 AI기술을 활용하여</p>
              <p className="text-sm text-gray-500">비계량 태양광 패널을 탐색하는 프로젝트이에요</p>
            </div>
          </div>
          <div className="flex-none w-full h-full items-center justify-center snap-start">
            <div className="relative top-[5vh] bg-gray-200 sm: h-[100vw] md:h-[55vh] md: aspect-none">
              <img src={img3} className="w-full h-full object-cover"></img>
            </div>
            <div className="relative top-[5vh] pt-8 pl-8 pr-8 w-full text-center">
              <p className="text-xl text-black font-extrabold">여러분도 게임을 플레이하면서</p>
              <p className="text-xl text-black font-extrabold">프로젝트에 참여할 수 있어요</p>
              <p className="text-sm text-gray-500 mt-5">게임을 플레이하면서 모인 데이터는</p>
              <p className="text-sm text-gray-500">AI 정확도 향상에 사용될 거예요</p>
            </div>
          </div>
          <div className="flex-none w-full h-full items-center justify-center snap-start">
            <div className="relative top-[5vh] bg-gray-200 sm: h-[100vw] md:h-[55vh] md: aspect-none">
              <img src={img4} className="w-full h-full object-cover"></img>
            </div>
            <div className="relative top-[5vh] pt-8 pl-8 pr-8 w-full text-center">
              <p className="text-xl text-black font-extrabold">그럼 지구의 미래를 위해서,</p>
              <p className="text-xl text-black font-extrabold">게임을 시작해 볼까요?</p>
              <button className="rounded-lg bg-yellow w-full h-[6.45533991vh] mt-5">
                게임하기
              </button>
            </div>
          </div>
        </div> */}
        <div className="flex flex-row space-x-1 justify-center mt-3">
          {Array.from({ length: marks.length + props.checks.length }).map(
            (_, i) => (
              <div
                className={`w-[2vw] aspect-square rounded-full ${
                  i === currentIndex ? "bg-[#444444]" : "bg-[#B3B3B3]"
                }`}
                key={i}
              ></div>
            )
          )}
        </div>
        <div className="flex flex-row my-3 justify-evenly mx-7">
          {positive[currentIndex] === 1 ? (
            <SelectedO
              className="w-[20vw]"
              onClick={() =>
                setPositive((prev) =>
                  prev.map((value, idx) => (idx === currentIndex ? 0 : value))
                )
              }
            />
          ) : (
            <DefaultO
              className="w-[20vw]"
              onClick={() =>
                setPositive((prev) =>
                  prev.map((value, idx) => (idx === currentIndex ? 1 : value))
                )
              }
            />
          )}
          {positive[currentIndex] === -1 ? (
            <SelectedX
              className="w-[20vw]"
              onClick={() =>
                setPositive((prev) =>
                  prev.map((value, idx) => (idx === currentIndex ? 0 : value))
                )
              }
            />
          ) : (
            <DefaultX
              className="w-[20vw]"
              onClick={() =>
                setPositive((prev) =>
                  prev.map((value, idx) => (idx === currentIndex ? -1 : value))
                )
              }
            />
          )}
        </div>
        <div className="flex flex-grow flex-col-reverse w-full p-3">
          <button
            className="rounded-lg bg-[#FFA629] w-full h-[6.45533991vh]"
            onClick={handleClaim}
          >
            제보 완료하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameClaim;
