import { useState, useEffect } from 'react';
import {ReactComponent as FirstPlace} from '../assets/1st_place.svg';
import {ReactComponent as SecondPlace} from '../assets/2nd_place.svg';
import {ReactComponent as ThirdPlace} from '../assets/3rd_place.svg';
import { useNavigate } from 'react-router-dom';

type Rank = {
    image_url: string;
    nickname: string;
    score: number;
    is_mine: boolean;
}

type rankProps = {
    currentUuid: string;
    setMode: React.Dispatch<React.SetStateAction<string>>;
}

function ShowRanking(props: rankProps) {
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [topTen, setTopTen] = useState<Rank[]>([]);

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
          });
    }, []);

    const currentUserRank = ranks.findIndex((user) => user.is_mine);
    const isOutside10 = currentUserRank === -1;
    const currentUserInfo = isOutside10? ranks.find((user) => user.is_mine) : null;
    const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <main className="p-4">
        <h2 className="text-center text-xl font-bold mb-6">누적 점수 TOP 10</h2>

        <div className="flex justify-center items-end space-x-4">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <img src={ranks[1].image_url}
                className="w-full h-full rounded-lg ${currentUserRank === 1 ? 'border-4 border-solid border-gray' : ''}"
                alt="Second place profile"
              />
              <SecondPlace className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              <img src={ranks[0].image_url}
                className="w-full h-full rounded-lg ${currentUserRank === 0 ? 'border-4 border-solid border-yellow' : ''}"
                alt="First place profile"
              />
              <FirstPlace className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <img src={ranks[2].image_url}
                className="w-full h-full rounded-lg ${currentUserRank === 2 ? 'border-4 border-solid border-orange' : ''}"
                alt="Third place profile"
              />
              <ThirdPlace className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-12 mt-4">
          <div className="text-center">
            <span className="font-medium text-base">{ranks[1].nickname}</span>
            <br />
            <span className="text-gray-500 text-sm">{ranks[1].score}</span>
          </div>
          <div className="text-center">
            <span className="font-medium text-base">{ranks[0].nickname}</span>
            <br />
            <span className="text-gray-500 text-sm">{ranks[0].score}</span>
          </div>
          <div className="text-center">
            <span className="font-medium text-base">{ranks[2].nickname}</span>
            <br />
            <span className="text-gray-500 text-sm">{ranks[2].score}</span>
          </div>
        </div>

        {ranks.length>0 && topTen.map((user, index) => (
          <div key={index}>
            {index>2 && (
              <div className="flex items-center space-x-6">
                <p className='font-bold text-black'>{index + 1}</p>
                <img src={user.image_url} className="w-30 h-30"/>
                <p>{user.nickname}</p>
                <p className="font-bold text-gray-700">{user.score}</p>
              </div>
            )}
          </div>
        ))}
        {isOutside10 && currentUserInfo && (
          <div className="bg-yellow p-4 rounded-lg mt-4">
            <div className="flex items-center justify-between">
                <div className="text-lg font-bold">{currentUserRank + 1}</div>
                <img src={currentUserInfo.image_url} className="w-30 h-30"/>
                <div className="text-base">{currentUserInfo.nickname}</div>
                <div className="text-gray-500">{currentUserInfo.score}</div>
            </div>
          </div>
        )}
      </main>

      <footer className="p-4">
        <button className="w-full py-3 bg-yellow text-white font-bold rounded shadow"
            onClick={() => navigate('/game/play')}>
          게임 다시하기
        </button>
      </footer>
    </div>
  );
};

export default ShowRanking;
