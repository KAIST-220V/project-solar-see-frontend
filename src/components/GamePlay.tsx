import React, { useState } from "react";
import sample from "../assets/image_4_2 1.jpg";
import checkmark from "../assets/check1.png";

type Position = {
  x: number;
  y: number;
  pIndex: number;
}

function GamePlay() {
  const panel =
  {
    polygon: [
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
  const [message, setMessage] = useState('');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState(Array(panel.polygon.length).fill(0));
  const [marks, setMarks] = useState<Position[]>([]);
  const handleImageClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const { clientX, clientY } = event;
    if (count < panel.polygon.length) {
      setMarks([...marks, { x: clientX, y: clientY, pIndex: -1}]);
      setCount(count => count + 1);
    }
    console.log(check);
  };
  const handlePolygonClick = (key: number, event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => {
    const { clientX, clientY } = event;
    event.stopPropagation();
    if (count < panel.polygon.length) {
      setMarks([...marks, { x: clientX, y: clientY, pIndex: key }]);
      setCount(count => count + 1);
      setCheck(check => check.map((cnt, i) => i === key ? cnt + 1 : cnt))
    }
  };
  const handleMarkClick = (key: number, event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.stopPropagation();
    setMarks(marks => marks.filter((_, i) => i !== key));
    const tmp = [...check];
    if (marks[key].pIndex != -1) {
      setCheck(check => check.map((cnt, i) => i === marks[key].pIndex ? cnt - 1 : cnt));
    }
    setCount(count => count - 1);
  }
  return (
    <div className='sm:p-4 md:p-6 lg:p-8'>
      <div className='flex flex-row'>
        <p>Round {round}</p>
        <p>{score}</p>
      </div>
      <p>SolarSee AI는 패널 {panel.polygon.length}개를 찾았어요.</p>
      <p>최대 {panel.polygon.length}개의 패널을 선택해 주세요.</p>
      <h2>{message}</h2>
      <div className='relative flex bg-black w-3/5 aspect-square'>
        <img src={sample} className='w-full select-none aspect-square' alt='' />
        <svg className='absolute left-0 top-0 z-10 w-full h-full' viewBox='0 0 100 100' onClick={handleImageClick}>
          {panel.polygon.map((pan: any, index: number) => (
            <polygon
              points={pan.all_points_x.map((point: number, i: number) =>
                `${point * 100 / 393},${pan.all_points_y[i] * 100 / 393}`
              ).join(' ')}
              fill='rgba(0, 0, 0, 0)'
              onClick={(event) => handlePolygonClick(index, event)}
              key={index}
            />
          ))}
        </svg>
        <div className='absolute top-0 left-0 w-full h-full'>
          {marks.map((mark, index) => (
            <img src={checkmark}
              className="fixed w-8 h-8 z-20 select-none"
              key={`mark-${index}`}
              style={{top: `${mark.y-25}px`, left: `${mark.x-12}px`}}
              onClick={(event) => handleMarkClick(index, event)}
              ></img>
          ))}
        </div>
      </div>
      <button className="bg-yellow">채점하기</button>
    </div>
  )
}

export default GamePlay;