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

  useEffect(() => {
    fetch("https://solar-see.site/api/v1/game/ranking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: props.currentUuid,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.ranking)) {
          setRanks(data.ranking);
        } else {
          setRanks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching ranking data:", error);
        setRanks([]);
      });
  }, []);

  const currentUserRank = ranks.findIndex((user) => user.is_mine);
  const isOutside10 = currentUserRank === -1;
  const currentUserInfo = isOutside10
    ? ranks.find((user) => user.is_mine)
    : null;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <main className="p-4">
        <h2 className="text-center text-xl font-bold mb-6">누적 점수 TOP 10</h2>
        {/* <div className="top-three">
            <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center space-x-2">
                <div className="rank-number">1</div>
                <div>
                    <img src={ranks[0].image_url} className="w-100 h-100 ${currentUserRank === 0 ? 'border-4 border-solid border-yellow' : ''}"/>
                    <FirstPlace className="absolute top-0 right-0 w-6 h-6"/>
                </div>
                <p className="font-bold text-lg">{ranks[0].nickname}</p>
                </div>
                <p className="text-gray-500">{ranks[0].score}</p>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center space-x-2">
                <div className="rank-number">2</div>
                <div>
                    <img src={ranks[1].image_url} className={"w-74 h-74 ${currentUserRank === 1 ? 'border-4 border-solid border-gray' : ''}"}/>
                    <SecondPlace className="absolute top-0 right-0 w-6 h-6"/>
                </div>
                <p className="font-bold text-lg">{ranks[1].nickname}</p>
                </div>
                <p className="text-gray-500">{ranks[1].score}</p>
            </div>
            <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-2">
                <div className="rank-number">3</div>
                <div>
                    <img src={ranks[2].image_url} className={"w-74 h-74 ${currentUserRank === 2 ? 'border-4 border-solid border-orange' : ''}"}/>
                    <ThirdPlace className="absolute top-0 right-0 w-6 h-6"/>
                </div>
                <p>{ranks[2].nickname}</p>
                </div>
                <p className="font-bold text-yellow-500">{ranks[2].score}</p>
            </div>
        </div> */}
        <div className="10th">
          {ranks.length > 0 &&
            ranks.map((user, index) => (
              <div
                key={index}
                className={`flex items-center justify-between py-2 border-b last:border-b-0 ${
                  user.is_mine ? "bg-yellow" : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="rank-number">{index + 1}</div>
                  <img src={user.image_url} className="w-30 h-30" />
                  <p>{user.nickname}</p>
                </div>
                <p className="font-bold text-gray-700">{user.score}</p>
              </div>
            ))}
        </div>
        {isOutside10 && currentUserInfo && (
          <div className="bg-yellow p-4 rounded-lg mt-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">{currentUserRank + 1}</div>
              <img src={currentUserInfo.image_url} className="w-30 h-30" />
              <div className="text-base">{currentUserInfo.nickname}</div>
              <div className="text-gray-500">{currentUserInfo.score}</div>
            </div>
          </div>
        )}
      </main>

      <footer className="p-4">
        <button
          className="w-full py-3 bg-yellow text-white font-bold rounded shadow"
          onClick={() => navigate("/game/play")}
        >
          게임 다시하기
        </button>
      </footer>
    </div>
  );
}

export default ShowRanking;
