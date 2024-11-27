import { useState, useRef } from "react";
import Cookies from "js-cookie";
import { ReactComponent as Logo } from "../assets/logo_100px.svg";
import img1 from "../assets/page1.jpg";
import img2 from "../assets/page2.jpg";
import img3 from "../assets/page3.jpg";
import img4 from "../assets/page4.jpg";

type Props = {
  setIsFirstVisit: React.Dispatch<React.SetStateAction<boolean>>;
};

const indexList = [0, 1, 2, 3]

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
    <div className="w-screen h-screen font-roboto flex flex-col">
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
      {
        (currentView !== 3) &&
        <p className="animate-slide font-handwriting text-lg text-end mb-[-5dvh] text-gray-500 h-[5dvh]">
          오른쪽으로 넘겨주세요 {">>"}
        </p>
      }
      <div
        ref={containerRef}
        className="flex overflow-auto snap-x snap-mandatory w-full h-[75dvh]"
        onScroll={handleScroll}
      >
        {[img1, img2, img3, img4].map((img, index) => (
          <div
            key={index}
            className="flex-none w-full h-full items-center justify-center snap-start"
          >
            <div className="relative top-[5vh] bg-gray-200 sm: h-[100vw] md:h-[55vh] md: aspect-none">
              <img src={img} className="w-full h-full object-cover"></img>
            </div>
            <div className="relative top-[5vh] pt-8 pl-8 pr-8 w-full text-center">
              {index === 0 && (
                <>
                  <p className="text-xl text-black font-extrabold">
                    전력 수요 예측을 어렵게 하는 범인,
                  </p>
                  <p className="text-xl text-black font-extrabold">
                    바로 비계량 태양광이에요
                  </p>
                  <p className="text-sm text-gray-500 mt-5">
                    비계량 태양광은 발전량이 측정되지 않는
                  </p>
                  <p className="text-sm text-gray-500">
                    태양광으로, 피크 전력 수요의 11%나 차지해요
                  </p>
                </>
              )}
              {index === 1 && (
                <>
                  <p className="text-xl text-black font-extrabold">
                    그래서 Team 220V는
                  </p>
                  <p className="text-xl text-black font-extrabold">
                    SolarSee 프로젝트를 시작했어요
                  </p>
                  <p className="text-sm text-gray-500 mt-3">
                    SolarSee 프로젝트는
                  </p>
                  <p className="text-sm text-gray-500">
                    항공사진과 최신 AI기술을 활용하여
                  </p>
                  <p className="text-sm text-gray-500">
                    비계량 태양광 패널을 탐색하는 프로젝트이에요
                  </p>
                </>
              )}
              {index === 2 && (
                <>
                  <p className="text-xl text-black font-extrabold">
                    여러분도 게임을 플레이하면서
                  </p>
                  <p className="text-xl text-black font-extrabold">
                    프로젝트에 참여할 수 있어요
                  </p>
                  <p className="text-sm text-gray-500 mt-5">
                    게임을 플레이하면서 모인 데이터는
                  </p>
                  <p className="text-sm text-gray-500">
                    AI 정확도 향상에 사용될 거예요
                  </p>
                </>
              )}
              {index === 3 && (
                <>
                  <p className="text-xl text-black font-extrabold">
                    그럼 지구의 미래를 위해서,
                  </p>
                  <p className="text-xl text-black font-extrabold">
                    게임을 시작해 볼까요?
                  </p>
                  <button
                    className="rounded-lg bg-yellow w-full h-[6.45533991vh] mt-5"
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
          width: '100%',
          padding: '10px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        {
          indexList.map((index) => {
            if (index === currentView) {
              return (
                <svg key={index} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="8" height="8" rx="4" fill="#FFCD00" />
                </svg>

              );
            } else {
              return (
                <svg key={index} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.3">
                    <rect width="8" height="8" rx="4" fill="black" />
                  </g>
                </svg>
              );
            }
          })
        }
      </div>
    </div>
  );
}

export default GameStory;
