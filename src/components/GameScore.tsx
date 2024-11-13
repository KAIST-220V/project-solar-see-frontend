import { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../assets/logo_100px.svg";
import { ReactComponent as EmptyLogo } from "../assets/logo_outline.svg";
import { ReactComponent as Wrong } from "../assets/check2.svg";
import sample from "../assets/image_4_2 1.jpg";

type Position = {
    x: number;
    y: number;
    pIndex: number;
}
type scoreProps = {
    marks: Position[];
    panel: {all_points_x: number[]; all_points_y: number[]}[];
    lifeCount: number;
    setLifeCount: React.Dispatch<React.SetStateAction<number>>;
    setIsGameMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function GameScore(props: scoreProps) {
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [showWrong, setShowWrong] = useState(false);
    const [logos, setLogos] = useState<JSX.Element[]>([]);
    let wrongClicks = 0;
    
    const handlePolygonClick = (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => {
        const { clientX, clientY } = event;
    };

    const isInPolygon = (mark: Position, pg: {all_points_x: number[]; all_points_y: number[]}) => {
        const markx = mark.x * 100 / 393;
        const marky = mark.y * 100 / 393;
        let isInside = false;

        for (let i = 0, j = 3; i < 4; j = i++) {
            const xi = pg.all_points_x[i] * 100 / 393;
            const yi = pg.all_points_y[i] * 100 / 393;
            const xj = pg.all_points_x[j] * 100 / 393;
            const yj = pg.all_points_y[j] * 100 / 393;
            const intersect = yi > marky !== yj > marky && markx < ((xj - xi) * (marky - yi)) / (yj - yi) + xi;
            if (intersect) isInside = !isInside;
        }
        return isInside;
    }

    const isMarkInPanel = (mark: Position) => {
        const isInPanel = props.panel.some((polygon) => isInPolygon(mark, polygon));
        if(!isInPanel) { wrongClicks++; }
        return isInPanel;
    };

    const getPanelCorners = (mark: Position) => {
        const panelWithMark = props.panel.find((polygon) => isInPolygon(mark, polygon));
        if (panelWithMark) {
          return panelWithMark.all_points_x.map((x, index) => ({
            x,
            y: panelWithMark.all_points_y[index]
          }));
        }
        return [];
      };

      useEffect(() => {
        const timer = setTimeout(() => {
          setShowWrong(true);
        }, 7000);
        return () => clearTimeout(timer);
      }, []);

      useEffect(() => {
        // lifeCount개의 Logo + (5-lifeCount)개의 EmptyLogo
        const newLogos = [
          ...Array(props.lifeCount).fill(null).map((_, index) => <Logo key={index} className="w-[7.6335878vw] h-[7.6335878vw]"
                                                                style={{marginRight: index < props.lifeCount ? '9.6692112vw' : '0'}}/>),
          ...Array(5 - props.lifeCount).fill(null).map((_, index) => <EmptyLogo key={props.lifeCount + index} className="w-[7.6335878vw] h-[7.6335878vw]"
                                                                    style={{marginRight: index < (4-props.lifeCount) ? '9.6692112vw' : '0'}}/>)
        ];
        setLogos(newLogos);
      }, [props.lifeCount]);
    
      useEffect(() => {
        if (wrongClicks !== 0) {
          // wrongClicks가 0이 아닐 때 마지막 Logo를 EmptyLogo로 변경
          setLogos((prevLogos) => {
            const updatedLogos = [...prevLogos];
            updatedLogos[updatedLogos.length - 1] = <EmptyLogo key={updatedLogos.length} />;
            return updatedLogos;
          });
        }
      }, [wrongClicks]);

    return (
    <div className="sm:p-4 md:p-6 lg:p-8">
        <div className='flex flex-row justify-between w-full'>
            <p className="text-lg">ROUND {round}</p>
            <p>{score}</p>
        </div>

        <div className='relative flex w-full aspect-square mt-[2vh] mb-[2vh]'>
            <img src={sample} className='w-full aspect-square' alt=''/>
            <svg className='absolute left-0 top-0 z-10' width="100%" height="100%" viewBox='0 0 100 100'>
            {props.panel.map((pan: any, index: number) => (
                <polygon
                points={pan.all_points_x.map((point: number, i: number) => 
                    `${point * 100 / 393},${pan.all_points_y[i] * 100 / 393}`
                ).join(' ')}
                fill='rgba(0, 0, 0, 0)' 
                stroke="rgb(127, 168, 255)"
                strokeWidth="1"
                onClick={handlePolygonClick}
                key={index}
                />
            ))}
            </svg>
            <ul>
                {props.marks.map((location) => (
                    <li key={location.pIndex}>
                        {!isMarkInPanel(location) && showWrong && (
                        <>
                        <Wrong
                            style={{
                            position: 'absolute',
                            left: `${(location.x * 100 / 393)-26}px`,
                            top: `${(location.y * 100 / 393)-12}px`,
                            transform: 'translate(-50%, -50%)',
                            width: '27.9px',
                            height: '29px',
                            zIndex: 20
                            }}/>
                        </>
                        )}
                    {showWrong && (
                        <svg width="100%" height="100%" style={{ position: 'absolute', left: 0, top: 0, zIndex: 10 }}>
                        <polygon points={getPanelCorners(location).map(corner => `${corner.x},${corner.y}`).join(' ')}
                            fill="rgba(0, 0, 0, 0)"
                            stroke="rgb(100, 47, 16)"
                            strokeWidth="1"
                            />
                        </svg>
                    )}
                    </li>
                ))}
            </ul>
        </div>

        {/* <div className="flex justify-center top-[69.95305vh]">
            {[...Array(props.lifeCount)].map((_, index) => (
                <Logo
                    key={index}
                    className="relative w-[7.6335878vw] h-[7.6335878vw]"
                    style={{marginRight: index < (props.lifeCount-1) ? '9.6692112vw' : '0'}}
                />
            ))}
        </div> */}

        <div className="flex justify-center top-[69.95305vh] logo-container">
            {logos.map((logo, index) => (
            <div key={index} className="logo-item">
                {logo}
            </div>
            ))}
        </div>

        <div className="flex flex-col items-center top-[76.05634vh]">
            <p>{props.panel.length}개 중 {props.marks.length}개 맞힘, {wrongClicks}개 틀림, {props.panel.length - props.marks.length}개 놓침</p>
            <p className='text-lg font-bold text-yellow'>{props.marks.length}점</p>
        </div>

        {showWrong && (
        <>
            
            <div className="flex flex-row justify-between top-[88.967136vh]">
                <button className="rounded-lg bg-[#FFA629] w-[44.2744809vw] h-[6.45533991vh]">AI의 실수 잡아내기</button>
                <button className="rounded-lg bg-[#D9D9D9] w-[44.2744809vw] h-[6.45533991vh]" onClick={() => props.setIsGameMode(true)}>다음 게임 시작하기</button>
            </div>
        </>
        )}
    </div>
    );
}

export default GameScore;