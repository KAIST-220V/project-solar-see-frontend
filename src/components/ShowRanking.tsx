import { useState, useEffect } from "react";
import { ReactComponent as FirstPlace } from "../assets/1st_place.svg";
import { ReactComponent as SecondPlace } from "../assets/2nd_place.svg";
import { ReactComponent as ThirdPlace } from "../assets/3rd_place.svg";
import { useNavigate } from "react-router-dom";

type Rank = {
  image_url: string;
  nickname: string;
  score: number;
  is_mine: boolean;
};

type rankProps = {
  currentUuid: string;
};

function ShowRanking(props: rankProps) {
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [topTen, setTopTen] = useState<Rank[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true); // 로딩 상태 시작
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
        setIsLoading(false); // 로딩 완료
      });
  }, [props.currentUuid]);

  const currentUserRank = ranks.findIndex((user) => user.is_mine);
  const isOutside10 = currentUserRank > 9;
  console.log(JSON.stringify(ranks), currentUserRank);
  const currentUserInfo = isOutside10
    ? ranks.find((user) => user.is_mine)
    : null;

  if (isLoading) {
    // 로딩 화면 렌더링
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
      <main className="p-4">
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
                  currentUserRank === 1
                    ? "border-4 border-solid border-gray"
                    : ""
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
                  currentUserRank === 0
                    ? "border-4 border-solid border-yellow"
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
                  currentUserRank === 2
                    ? "border-4 border-solid border-orange"
                    : ""
                }`}
                alt="Third place profile"
              />
              <ThirdPlace className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-12 mt-4">
          <div className="text-center">
            <span className="font-medium text-base">{ranks[1]?.nickname}</span>
            <br />
            <span className="text-gray-500 text-sm">{ranks[1]?.score}</span>
          </div>
          <div className="text-center">
            <span className="font-medium text-base">{ranks[0]?.nickname}</span>
            <br />
            <span className="text-gray-500 text-sm">{ranks[0]?.score}</span>
          </div>
          <div className="text-center">
            <span className="font-medium text-base">{ranks[2]?.nickname}</span>
            <br />
            <span className="text-gray-500 text-sm">{ranks[2]?.score}</span>
          </div>
        </div>
        <div className="pt-4 -mx-4">
          {ranks.length > 0 &&
            topTen.map((user, index) => (
              <>
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
              </>
            ))}
        </div>
        {isOutside10 && currentUserInfo && (
          <>
            <hr className="border-gray-300" />
            <div className="bg-yellow/50 py-2  -mx-4 flex items-center">
              <div className="pl-10 font-bold text-black w-20">
                {currentUserRank + 1}
              </div>
              <img
                src={currentUserInfo!.image_url}
                className="w-8 h-8"
                alt="profile"
              />
              <p className="flex-grow font-bold pl-4">
                {currentUserInfo!.nickname}
              </p>
              <p className="font-bold pr-10 text-gray-500">
                {currentUserInfo!.score}
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
