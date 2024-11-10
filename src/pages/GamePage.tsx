import { useState } from "react";
import sample from "../assets/image_4_2 1.jpg";
import GameButton from "../components/GameButton";

function GamePage() {
  const [message, setMessage] = useState('');
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [check, setCheck] = useState([]);
    const panel = 
    {
      polygon:[
        {
          all_points_x: [
            141,
            141,
            210,
            210
          ],
          all_points_y: [
            202,
            216,
            216,
            202
          ],
        },
        {
          all_points_x: [
            141,
            141,
            210,
            210
          ],
          all_points_y: [
            228,
            241,
            241,
            228
          ],
        },
        {
          all_points_x: [
            160,
            160,
            210,
            210
          ],
          all_points_y: [
            255,
            268,
            268,
            255
          ],
        },
        {
          all_points_x: [
            160,
            160,
            210,
            210
          ],
          all_points_y: [
            279,
            292,
            292,
            279
          ],
        },
        {
          all_points_x: [
            160,
            160,
            210,
            210
          ],
          all_points_y: [
            305,
            318,
            318,
            305
          ],
        },
        {
          all_points_x: [
            160,
            160,
            210,
            210
          ],
          all_points_y: [
            330,
            343,
            343,
            330
          ],
        },
        {
          all_points_x: [
            230,
            230,
            250,
            250
          ],
          all_points_y: [
            101,
            147,
            147,
            101
          ],
        },
        {
          all_points_x: [
            303,
            303,
            353,
            353
          ],
          all_points_y: [
            175,
            188,
            188,
            175
          ],
        },
        {
          all_points_x: [
            303,
            303,
            353,
            353
          ],
          all_points_y: [
            200,
            213,
            213,
            200
          ],
        },
        {
          all_points_x: [
            303,
            303,
            353,
            353
          ],
          all_points_y: [
            225,
            238,
            238,
            225
          ],
        },
      ]
    }
  
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
      <p>SolarSee AI는 패널 {panel.polygon.length}개를 찾았어요.</p>
      <p>최대 {panel.polygon.length}개의 패널을 선택해 주세요.</p>
      <h2>{message}</h2>
      <div className='relative flex bg-black w-full aspect-square'>
        <img src={sample} className='w-full aspect-square' alt=''/>
        <svg className='absolute left-0 top-0 z-10' width="100%" height="100%" viewBox='0 0 100 100'>
        {panel.polygon.map((pan: any, index: number) => (
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
