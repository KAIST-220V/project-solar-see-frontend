import { useState, useEffect } from "react";
import { ReactComponent as FirstPlace } from "../assets/1st_place.svg";
import { ReactComponent as SecondPlace } from "../assets/2nd_place.svg";
import { ReactComponent as ThirdPlace } from "../assets/3rd_place.svg";
import { useNavigate } from "react-router-dom";
import GameButton from "./GameButton";
import { ReactComponent as Home } from "../assets/home.svg";

type Rank = {
  image_url: string;
  nickname: string;
  score: number;
  is_mine: boolean;
  created_at: string;
};

type rankProps = {
  currentUuid: string;
};

function ShowRanking(props: rankProps) {
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [topTen, setTopTen] = useState<Rank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://solar-see.site/api/v1/game/ranking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: props.currentUuid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.ranking)) {
          setRanks(data.ranking);
          if (data.ranking.length >= 10) {
            setTopTen(data.ranking.slice(0, 10));
          }
        } else {
          setRanks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching ranking data:", error);
        setRanks([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const latestMyRank = (() => {
    let latestRank = Infinity;
    for (let i = 0; i < ranks.length; i++) {
      if (
        ranks[i].is_mine &&
        (latestRank === Infinity ||
          ranks[i].created_at > ranks[latestRank].created_at)
      ) {
        latestRank = i;
      }
    }
    return latestRank;
  })();

  const isOutside10 = latestMyRank > 9;
  const latestMyInfo = isOutside10 ? ranks[latestMyRank] : null;

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <div className="text-center">
          <div className="loader mx-auto h-16 w-16 animate-spin rounded-full border-4 border-t-yellow"></div>
          <p className="mt-4 text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="h-[9dvh]">
        <Home
          className="absolute left-[6.4vw] top-[3vh] z-10 w-[5vw] cursor-pointer"
          onClick={() => navigate("/game")}
        />
        <p className="absolute top-[2vh] flex h-[5.28169vh] w-full items-center justify-center font-semibold">
          태양광 패널 찾기
        </p>
        <GameButton />
      </div>
      <div
        className={`flex flex-col h-[${"calc(100dvh-9vh)"}] static w-screen`}
      >
        <main className="p-4">
          <h2 className="mb-6 text-center text-3xl font-bold">
            누적 점수 TOP 10
          </h2>

          <div className="flex items-end justify-center space-x-4">
            {/* 상위 3등 표시 */}
            <div className="flex flex-col items-center">
              <div className="relative h-16 w-16 md:h-20 md:w-20">
                <img
                  src={ranks[1].image_url}
                  className={`h-full w-full rounded-lg ${
                    ranks[1].is_mine
                      ? "border-4 border-solid border-yellow/50"
                      : ""
                  }`}
                  alt="Second place profile"
                />
                <SecondPlace className="absolute right-0 top-0 h-6 w-6 -translate-y-2 translate-x-2 transform" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative h-20 w-20 md:h-24 md:w-24">
                <img
                  src={ranks[0].image_url}
                  className={`h-full w-full rounded-lg ${
                    ranks[0].is_mine
                      ? "border-4 border-solid border-yellow/50"
                      : ""
                  }`}
                  alt="First place profile"
                />
                <FirstPlace className="absolute right-0 top-0 h-6 w-6 -translate-y-2 translate-x-2 transform" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative h-16 w-16 md:h-20 md:w-20">
                <img
                  src={ranks[2].image_url}
                  className={`h-full w-full rounded-lg ${
                    ranks[2].is_mine
                      ? "border-4 border-solid border-yellow/50"
                      : ""
                  }`}
                  alt="Third place profile"
                />
                <ThirdPlace className="absolute right-0 top-0 h-6 w-6 -translate-y-2 translate-x-2 transform" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center space-x-4 font-bold">
            <div className="w-16 text-center">
              <span className="text-base">{ranks[1]?.nickname}</span>
              <br />
              <span className="text-sm text-gray-500">{ranks[1]?.score}</span>
            </div>
            <div className="w-20 text-center">
              <span className="text-base">{ranks[0]?.nickname}</span>
              <br />
              <span className="text-sm text-gray-500">{ranks[0]?.score}</span>
            </div>
            <div className="w-16 text-center">
              <span className="text-base">{ranks[2]?.nickname}</span>
              <br />
              <span className="text-sm text-gray-500">{ranks[2]?.score}</span>
            </div>
          </div>
          <div className="-mx-4 pt-4">
            {ranks.length > 0 &&
              topTen.map((user, index) => (
                <div key={`div${index}`}>
                  {index > 2 && (
                    <div
                      key={index}
                      className={`${user.is_mine ? "bg-yellow/50" : ""} py-2`}
                    >
                      <div className="flex items-center">
                        <div className="w-20 pl-10 font-bold text-black">
                          {index + 1}
                        </div>
                        <img
                          src={user.image_url}
                          className="h-8 w-8"
                          alt="profile"
                        />
                        <p className="flex-grow pl-4 font-bold">
                          {user.nickname}
                        </p>
                        <p className="pr-10 font-bold text-gray-500">
                          {user.score}
                        </p>
                      </div>
                    </div>
                  )}
                  {index > 2 && index !== topTen.length - 1 && (
                    <hr className="border-gray-300" />
                  )}
                </div>
              ))}
          </div>
          {isOutside10 && latestMyInfo && (
            <>
              <hr className="border-gray-300" />
              <div className="-mx-4 flex items-center bg-yellow/50 py-2">
                <div className="w-20 pl-10 font-bold text-black">
                  {latestMyRank + 1}
                </div>
                <img
                  src={latestMyInfo!.image_url}
                  className="h-8 w-8"
                  alt="profile"
                />
                <p className="flex-grow pl-4 font-bold">
                  {latestMyInfo!.nickname}
                </p>
                <p className="pr-10 font-bold text-gray-500">
                  {latestMyInfo!.score}
                </p>
              </div>
            </>
          )}
        </main>

        <footer className="p-4">
          <button
            className="w-full rounded-lg bg-yellow py-3 font-bold text-black shadow"
            onClick={() => navigate("/game/play")}
          >
            게임 다시하기
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ShowRanking;
