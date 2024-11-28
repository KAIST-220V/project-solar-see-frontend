import { useState, useRef } from "react";
import Cookies from "js-cookie";
import { ReactComponent as Logo } from "../assets/logo_100px.svg";
import { ReactComponent as Img1 } from "../assets/story1.svg";
import { ReactComponent as Img2 } from "../assets/story2.svg";
import { ReactComponent as Img3 } from "../assets/story3.svg";
import { ReactComponent as Img4 } from "../assets/story4.svg";
import { ReactComponent as Img5 } from "../assets/story5.svg";

type Props = {
  setIsFirstVisit: React.Dispatch<React.SetStateAction<boolean>>;
};

const indexList = [0, 1, 2, 3, 4];

function GameStory(props: Props) {
  const [currentView, setCurrentView] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const containerWidth = containerRef.current.offsetWidth;
      const newView = Math.round(scrollLeft / containerWidth);
      setCurrentView(newView);
    }
  };

  return (
    <div className="w-screen h-dvh font-roboto flex flex-col">
      <div className="flex justify-between items-center w-full h-[10dvh] p-5">
        <Logo className="w-[7vh] h-[7vh] max-h-xs max-w-xs"></Logo>
        <div className="items-end flex flex-col">
          <p
            className="text-gray-500 font-handwriting"
            onClick={() => {
              props.setIsFirstVisit(false);
              Cookies.set("visited", "true", { expires: 7 });
            }}
          >
            Skip
          </p>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory w-full flex-grow scrollbar-hide"
        onScroll={handleScroll}
      >
        {[Img1, Img2, Img3, Img4, Img5].map((SVGComponent, index) => (
          <div
            key={index}
            className="flex-none w-full h-full items-center justify-center snap-start"
          >
            <div
              className="relative bg-gray-200 aspect-none"
              style={{
                height:
                  (55 / 100) * window.innerHeight > window.innerWidth
                    ? `${window.innerWidth}px`
                    : "55dvh",
              }}
            >
              <SVGComponent
                className="w-full h-full object-cover"
                preserveAspectRatio="none"
              />
            </div>
            <div className="relative pt-8 pl-8 pr-8 w-full text-center">
              {index === 0 && (
                <>
                  <p className="text-xl text-black font-extrabold">
                    전력은 저장이 어려워서
                  </p>
                  <p className="text-xl text-black font-extrabold">
                    생산과 동시에 소비되어야 해요
                  </p>
                  <p className="text-sm text-gray-500 mt-5">
                    전력 저장 시설은 위험하고 가격이 비싸요
                  </p>
                  <p className="text-sm text-gray-500">
                    그래서 소비되는 만큼 생산량을 조절하고 있어요
                  </p>
                </>
              )}
              {index === 1 && (
                <>
                  <p className="text-xl text-black font-extrabold">
                    생산된 에너지를 버리지 않기 위해
                  </p>
                  <p className="text-xl text-black font-extrabold">
                    전력 수요 예측은 정확해야 해요
                  </p>
                  <p className="text-sm text-gray-500 mt-3">
                    공급 부족에 의한 대규모 정전을 막고,
                  </p>
                  <p className="text-sm text-gray-500">
                    공금 과잉으로 이미 발전된 에너지를
                  </p>
                  <p className="text-sm text-gray-500">버리지 않기 위해서죠</p>
                </>
              )}
              {index === 2 && (
                <>
                  <p className="text-xl text-black font-extrabold">
                    그런데 등록되지 않은 비계량
                  </p>
                  <p className="text-xl text-black font-extrabold">
                    태양광 패널이 이를 어렵게 해요
                  </p>
                  <p className="text-sm text-gray-500 mt-5">
                    발전량을 정확히 알 수 없는데
                  </p>
                  <p className="text-sm text-gray-500">
                    전체 태양광 설비의 72%나 차지해서 문제예요.
                  </p>
                  <p className="text-sm text-gray-500">
                    피크 시간 전력의 11%를 책임져서 무시 못해요.
                  </p>
                </>
              )}
              {index === 3 && (
                <>
                  <p className="text-xl text-black font-extrabold">
                    그래서 Team 220V는
                  </p>
                  <p className="text-xl text-black font-extrabold">
                    SolarSee 프로젝트를 시작했어요
                  </p>
                  <p className="text-sm text-gray-500 mt-5">
                    항공사진과 AI 기술을 활용해
                  </p>
                  <p className="text-sm text-gray-500">
                    숨어 있는 비계량 태양광 패널을
                  </p>
                  <p className="text-sm text-gray-500">
                    재미있게 찾도록 돕는 게임이에요.
                  </p>
                </>
              )}
              {index === 4 && (
                <>
                  <p className="text-xl text-black font-extrabold">
                    지속가능한 미래,
                  </p>
                  <p className="text-xl text-black font-extrabold">
                    여러분도 함께할 수 있어요!
                  </p>
                  <p className="text-sm text-gray-500">
                    여러분이 게임을 하면서 모인 정보로
                  </p>
                  <p className="text-sm text-gray-500">
                    데이터의 정확도가 향상될 거예요.
                  </p>
                  <button
                    className="rounded-lg bg-yellow w-full h-[6.45533991dvh] mt-5 font-bold"
                    onClick={() => {
                      props.setIsFirstVisit(false);
                      Cookies.set("visited", "true", { expires: 7 });
                    }}
                  >
                    게임하기
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          width: "100%",
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          // boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.25)",
        }}
      >
        {indexList.map((index) => {
          if (index === currentView) {
            return (
              <svg
                key={index}
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="8" height="8" rx="4" fill="#FFCD00" />
              </svg>
            );
          } else {
            return (
              <svg
                key={index}
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.3">
                  <rect width="8" height="8" rx="4" fill="black" />
                </g>
              </svg>
            );
          }
        })}
      </div>
    </div>
  );
}

export default GameStory;
