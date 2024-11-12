import React, { useState } from "react";
import sample from "../assets/image_4_2 1.jpg";
import checkmark from "../assets/check1.png";
import { NumberLiteralType } from "typescript";

type Position = {
  x: number;
  y: number;
  pIndex: number;
}

type Props = {
  panelsInImage: any;
  round: number;
  score: number;
  check: any[];
  setCheck: React.Dispatch<React.SetStateAction<any[]>>;
};

function GamePlay(props: Props) {
  const [count, setCount] = useState(0);
  const [marks, setMarks] = useState<Position[]>([]);

  const handleImageClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const { clientX, clientY } = event;
    if (count < props.panelsInImage.polygon.length) {
      setMarks([...marks, { x: clientX, y: clientY, pIndex: -1}]);
      setCount(count => count + 1);
    }
  };
  const handlePolygonClick = (key: number, event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => {
    const { clientX, clientY } = event;
    event.stopPropagation();
    if (count < props.panelsInImage.polygon.length) {
      setMarks([...marks, { x: clientX, y: clientY, pIndex: key }]);
      setCount(count => count + 1);
      props.setCheck(check => check.map((cnt, i) => i === key ? cnt + 1 : cnt))
    }
  };
  const handleMarkClick = (key: number, event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.stopPropagation();
    setMarks(marks => marks.filter((_, i) => i !== key));
    const tmp = [...props.check];
    if (marks[key].pIndex != -1) {
      props.setCheck(check => check.map((cnt, i) => i === marks[key].pIndex ? cnt - 1 : cnt));
    }
    setCount(count => count - 1);
  }
  return (
    <div className='sm:p-4 md:p-6 lg:p-8'>
      <div className='flex flex-row'>
        <p>Round {props.round}</p>
        <p>{props.score}</p>
      </div>
      <p>SolarSee AI는 패널 {props.panelsInImage.polygon.length}개를 찾았어요.</p>
      <p>최대 {props.panelsInImage.polygon.length}개의 패널을 선택해 주세요.</p>
      <div className='relative flex bg-black aspect-square'>
        <img src={sample} className='w-full select-none aspect-square' alt='' />
        <svg className='absolute left-0 top-0 z-10 w-full h-full' viewBox='0 0 100 100' onClick={handleImageClick}>
          {props.panelsInImage.polygon.map((pan: any, index: number) => (
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