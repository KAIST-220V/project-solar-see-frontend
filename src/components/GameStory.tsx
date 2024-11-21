import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type Props = {
  setIsFirstVisit: React.Dispatch<React.SetStateAction<boolean>>;
};

function GameButton(props: Props) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black overflow-auto">
      <div className="m-5 font-roboto">
        <div className="space-y-8 text-white">
          <p>
            깨끗한 공(기), 푸른 하늘, 지속 가능한 에너지. 신재생 에너지는 우리의
            환경을 지키고, 후세대를 위한 필수불가결한 존재입니다.
          </p>
          <p>
            그러나 이런 신재생 에너지는 켜고 끄기 쉽다는 이유로 전력 수요 예측
            실패 시 가장 먼저 가동 중단되는 현실에 처해 있습니다. 이는 화석연료
            발전에 대한 의존도를 높이고, 신재생 에너지의 가치를 제한하는 결과를
            초래합니다.
          </p>
          <p>
            이 문제를 해결하려면 정확한 전력 수요 예측이 필수적입니다. 하지만 이
            예측을 어렵게 만드는 중요한 요인이 있습니다. 바로 발전량이 계측되지
            않는 비계량 태양광 패널입니다.
          </p>
          <p>
            현재 대한민국의 전력 수요 피크 시간에서 비계량 태양광 패널이
            차지하는 비율은 약 11%로 추정됩니다. 발전량이 측정되지 않으면 수요
            예측에 어려움이 발생하고, 이는 신재생 에너지의 활용률 저하로
            이어집니다.
          </p>
          <p>
            저희 Team 220V는 이러한 문제를 해결하기 위해 Solar-See 프로젝트를
            시작했습니다. 이 프로젝트는 항공사진과 AI 기술을 활용해 대한민국
            전역의 비계량 태양광 패널을 분석하고 발전량을 예측하는 데 목표를
            두고 있습니다.
          </p>
          <p>
            대형 시설부터 개인이 설치한 소규모 태양광 패널까지, 전국 각지의
            데이터를 수집하고 이를 통해 비계량 태양광의 영향을 예측합니다.
          </p>
          <p>
            여러분도 이 과정에 참여할 수 있습니다. 게임을 통해 지도에서 태양광
            패널의 위치를 확인하고, 직접 데이터를 수집함으로써 신재생 에너지의
            성장을 지원할 수 있습니다.
          </p>
          <p>
            여러분의 게임 플레이는 AI의 학습과 발전에 직접적인 기여를 하게
            됩니다. 이를 통해 대한민국의 신재생 에너지 확산에 큰 도움이 될
            것입니다.
          </p>
          <p>
            우리 함께 환경 친화적인 미래를 만들어가는 데 동참해 보지
            않으시겠습니까? 지금 시작하세요. 우리의 노력은 후손을 위한 희망으로
            이어질 것입니다.
          </p>
        </div>
        <button
          className="rounded-lg bg-yellow"
          onClick={() => {
            props.setIsFirstVisit(false);
            Cookies.set("visited", "true", { expires: 7 });
          }}
        >
          게임 시작하기
        </button>
      </div>
    </div>
  );
}

export default GameButton;
