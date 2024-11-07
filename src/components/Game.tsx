import React, { useState } from "react";
import sample from "../assets/image_4_2 1.jpg";

type Props = {
  round: number;
  score: number;
  image: any;
  panels: any;
  life: number;
};

function Game(props: Props) {
    const [message, setMessage] = useState('');
  
    const handlePolygonClick = (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => {
      const { clientX, clientY } = event;
      setMessage(`Clicked at position: (${clientX}, ${clientY})`);
    };

  return (
    <div>
    <div className='flex flex-row'>
        <p>Round {props.round}</p>
        <p>{props.score}</p>
      </div>
      <p>SolarSee AI는 패널 {props.panels.polygon.length}개를 찾았어요.</p>
      <p>최대 {props.panels.polygon.length}개의 패널을 선택해 주세요.</p>
      <h2>{message}</h2>
      <div className='relative flex bg-black w-full aspect-square'>
        <img src={sample} className='w-full aspect-square' alt=''/>
        <svg className='absolute left-0 top-0 z-10' width="100%" height="100%" viewBox='0 0 100 100'>
        {props.panels.polygon.map((pan: any, index: number) => (
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

export default Game;
