import { useEffect, useState } from "react";
import sample from "../assets/image_4_2 1.jpg";
import GameButton from "../components/GameButton";
import { MarkerType } from "../types/interface";
import GamePlay from "../components/GamePlay";

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
    
  return (
    <div className='static'>
      <p>태양광 패널 찾기</p>
      <GameButton />
      <GamePlay />
    </div>
  );
}

export default GamePage;
