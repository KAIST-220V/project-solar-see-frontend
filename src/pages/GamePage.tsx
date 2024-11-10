import { useEffect, useState } from "react";
import sample from "../assets/image_4_2 1.jpg";
import GameButton from "../components/GameButton";
import { MarkerType } from "../types/interface";

function GamePage() {
  const [message, setMessage] = useState('');
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [check, setCheck] = useState([]);
    const [panel, setPanel] = useState<MarkerType[]>([]);

    useEffect(() => {
      fetch("http://localhost:3000/data/panel.json", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setPanel(data.polygon));
    }, []);
  
    const handlePolygonClick = (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => {
      const { clientX, clientY } = event;
      setMessage(`Clicked at position: (${clientX}, ${clientY})`);
    };
    
  return (
    <div className='static'>
      <p>태양광 패널 찾기</p>
      <GameButton />
      <div className='flex flex-row'>
        <p>Round {round}</p>
        <p>{score}</p>
      </div>
      <p>SolarSee AI는 패널 {panel.length}개를 찾았어요.</p>
      <p>최대 {panel.length}개의 패널을 선택해 주세요.</p>
      <h2>{message}</h2>
      <div className='relative flex bg-black w-full aspect-square'>
        <img src={sample} className='w-full aspect-square' alt=''/>
        <svg className='absolute left-0 top-0 z-10' width="100%" height="100%" viewBox='0 0 100 100'>
        {panel.map((pan: any, index: number) => (
            <polygon
              points={pan.all_points_x.map((point: number, i: number) => 
                `${point * 100 / 393},${pan.all_points_y[i] * 100 / 393}`
              ).join(' ')} 
              fill='rgba(0, 0, 0, 0)' 
              onClick={handlePolygonClick}
              key={index}
            />
        ))}
        </svg>
      </div>  
    </div>
  );
}

export default GamePage;
