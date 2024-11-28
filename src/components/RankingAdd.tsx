import { useState } from "react";
import { ReactComponent as Prof1 } from "../assets/profile1.svg";
import { ReactComponent as Prof2 } from "../assets/profile2.svg";
import { ReactComponent as Prof3 } from "../assets/profile3.svg";
import { ReactComponent as Prof4 } from "../assets/profile4.svg";

type userProps = {
  score: number;
  currentUuid: string;
  gameId: string | null;
  setMode: React.Dispatch<React.SetStateAction<string>>;
};

function RankingAdd(props: userProps) {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const isButtonActive = nickname.length === 3;

  const handleProfileClick = (profile: string) => {
    setSelectedProfile(profile);
  };

  const registerRanking = async () => {
    await fetch("https://solar-see.site/api/v1/game/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
        uuid: props.currentUuid,
        score: props.score,
        image_url: selectedProfile,
      }),
    });
    sessionStorage.setItem("lastGameId", props.gameId || "");
    props.setMode("showranks");
  };

  return (
    <>
      {!selectedProfile && (
        <div className="absolute flex h-full w-full flex-col items-center justify-center bg-white">
          <p className="text-2xl font-semibold">게임 랭킹에서 사용할</p>
          <p className="text-2xl font-semibold">프로필사진을 선택하세요</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <div className="flex w-full items-center justify-evenly">
              <Prof1
                className="h-[25.445293vw] w-[25.445293vw]"
                onClick={() =>
                  handleProfileClick(
                    "https://github.com/user-attachments/assets/b7f809c8-4bc9-45d9-ad21-4cb2c806f260",
                  )
                }
              />
              <Prof2
                className="h-[25.445293vw] w-[25.445293vw]"
                onClick={() =>
                  handleProfileClick(
                    "https://github.com/user-attachments/assets/9830d988-45b3-4c5d-abb0-c2400ee5d509",
                  )
                }
              />
            </div>
            <div className="mt-4 flex w-full items-center justify-evenly">
              <Prof3
                className="h-[25.445293vw] w-[25.445293vw]"
                onClick={() =>
                  handleProfileClick(
                    "https://github.com/user-attachments/assets/a482e6aa-aeda-4d94-98f7-48857772584f",
                  )
                }
              />
              <Prof4
                className="h-[25.445293vw] w-[25.445293vw]"
                onClick={() =>
                  handleProfileClick(
                    "https://github.com/user-attachments/assets/524ef136-95dd-41c7-b728-758ceb52b243",
                  )
                }
              />
            </div>
          </div>
        </div>
      )}
      {selectedProfile && (
        <div className="mt-10 flex flex-col items-center">
          <p className="text-2xl font-semibold">게임 랭킹에서 사용할</p>
          <p className="text-2xl font-semibold">이니셜을 입력하세요.</p>
          {selectedProfile ===
            "https://github.com/user-attachments/assets/b7f809c8-4bc9-45d9-ad21-4cb2c806f260" && (
            <Prof1 className="h-[25.445293vw] w-[25.445293vw]" />
          )}
          {selectedProfile ===
            "https://github.com/user-attachments/assets/9830d988-45b3-4c5d-abb0-c2400ee5d509" && (
            <Prof2 className="h-[25.445293vw] w-[25.445293vw]" />
          )}
          {selectedProfile ===
            "https://github.com/user-attachments/assets/a482e6aa-aeda-4d94-98f7-48857772584f" && (
            <Prof3 className="h-[25.445293vw] w-[25.445293vw]" />
          )}
          {selectedProfile ===
            "https://github.com/user-attachments/assets/524ef136-95dd-41c7-b728-758ceb52b243" && (
            <Prof4 className="h-[25.445293vw] w-[25.445293vw]" />
          )}

          <div className="relative justify-center text-3xl font-bold tracking-widest">
            {Array.from({ length: 3 }).map((_, index) => (
              <span key={index} className="mx-2 border-b-2 text-black">
                {nickname[index] || "_"}
              </span>
            ))}
            <input
              type="text"
              maxLength={3}
              value={nickname}
              onChange={(e) => setNickname(e.target.value.toUpperCase())}
              className="absolute left-0 top-0 h-full w-full opacity-0"
              autoFocus
            />
          </div>
          <p className="justify-center pt-2 text-3xl font-semibold text-gray-400">
            {props.score}
          </p>

          <button
            className={`mt-8 w-[91.348601vw] rounded px-6 py-3 font-bold ${
              isButtonActive
                ? "bg-yellow text-white"
                : "bg-gray-300 text-gray-500"
            }`}
            disabled={!isButtonActive}
            onClick={registerRanking}
          >
            랭킹 등록하기
          </button>
        </div>
      )}
    </>
  );
}

export default RankingAdd;
