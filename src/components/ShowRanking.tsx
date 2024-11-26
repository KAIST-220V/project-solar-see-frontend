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
      <div className="flex items-center justify-center h-full w-full bg-white">
        <div className="text-center">
          <div className="loader border-t-yellow border-4 w-16 h-16 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-dvh w-screen">
      <Home
        className="absolute top-[3vh] left-[6.4vw] w-[5vw] cursor-pointer z-10"
        onClick={() => navigate("/game")}
      />
      <p className="absolute font-semibold flex top-[2vh] h-[5.28169vh] items-center w-full justify-center">태양광 패널 찾기</p>
      <GameButton />
      <main className="p-4 mt-[10dvh]">
        <h2 className="text-center text-3xl font-bold mb-6">
          누적 점수 TOP 10
        </h2>

        <div className="flex justify-center items-end space-x-4">
          {/* 상위 3등 표시 */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <img
                src={ranks[1].image_url}
                className={`w-full h-full rounded-lg ${
                  ranks[1].is_mine ? "border-4 border-solid border-gray" : ""
                }`}
                alt="Second place profile"
              />
              <SecondPlace className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              <img
                src={ranks[0].image_url}
                className={`w-full h-full rounded-lg ${
                  ranks[0].is_mine
                    ? "border-4 border-solid border-yellow/50"
                    : ""
                }`}
                alt="First place profile"
              />
              <FirstPlace className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <img
                src={ranks[2].image_url}
                className={`w-full h-full rounded-lg ${
                  ranks[2].is_mine
                    ? "border-4 border-solid border-orange/50"
                    : ""
                }`}
                alt="Third place profile"
              />
              <ThirdPlace className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-12 mt-4 font-bold">
          <div className="text-center">
            <span className=" text-base">{ranks[1]?.nickname}</span>
            <br />
            <span className="text-gray-500 text-sm">{ranks[1]?.score}</span>
          </div>
          <div className="text-center">
            <span className="text-base">{ranks[0]?.nickname}</span>
            <br />
            <span className="text-gray-500 text-sm">{ranks[0]?.score}</span>
          </div>
          <div className="text-center">
            <span className="text-base ">{ranks[2]?.nickname}</span>
            <br />
            <span className="text-gray-500 text-sm">{ranks[2]?.score}</span>
          </div>
        </div>
        <div className="pt-4 -mx-4">
          {ranks.length > 0 &&
            topTen.map((user, index) => (
              <div key={`div${index}`}>
                {index > 2 && (
                  <div
                    key={index}
                    className={`${user.is_mine ? "bg-yellow/50" : ""} py-2`}
                  >
                    <div className="flex items-center">
                      <div className="pl-10 font-bold text-black w-20">
                        {index + 1}
                      </div>
                      <img
                        src={user.image_url}
                        className="w-8 h-8"
                        alt="profile"
                      />
                      <p className="flex-grow font-bold pl-4">
                        {user.nickname}
                      </p>
                      <p className="font-bold pr-10 text-gray-500">
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
            <div className="bg-yellow/50 py-2  -mx-4 flex items-center">
              <div className="pl-10 font-bold text-black w-20">
                {latestMyRank + 1}
              </div>
              <img
                src={latestMyInfo!.image_url}
                className="w-8 h-8"
                alt="profile"
              />
              <p className="flex-grow font-bold pl-4">
                {latestMyInfo!.nickname}
              </p>
              <p className="font-bold pr-10 text-gray-500">
                {latestMyInfo!.score}
              </p>
            </div>
          </>
        )}
      </main>

      <footer className="p-4">
        <button
          className="w-full py-3 bg-yellow text-black font-bold rounded shadow"
          onClick={() => navigate("/game/play")}
        >
          게임 다시하기
        </button>
      </footer>
    </div>
  );
}

export default ShowRanking;
