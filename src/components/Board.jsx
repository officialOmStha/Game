import { useState, useEffect } from "react";

const Board = () => {
  const [box, setBox] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState(true);
  const [running, setRunning] = useState(true);
  const [winner, setWinner] = useState(null);
  const [wcombo, setWcombo] = useState([]);

  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleReset = () =>{
    setBox(Array(9).fill(""));
    setTurn(true);
    setRunning(true);
    setWinner(null);
    setWcombo([]);
  }

  const handleClick = (index) => {
    if (!running) return;
    if (!turn) return;
    if (box[index] !== "") return;

    const newBox = [...box];
    newBox[index] = "X";
    setBox(newBox);
    setTurn(false);
  };

  const checkwinner = (board) => {
    for (let combo of wins) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWcombo(combo)
        return board[a];
      }
    }
    return null;
  };

  useEffect(() => {
    if (!turn && running) {
      const timer = setTimeout(() => {
        const empIdx = box
          .map((val, idx) => (val === "" ? idx : null))
          .filter((idx) => idx !== null);

        if (empIdx.length === 0) return;

        const botNum = empIdx[Math.floor(Math.random() * empIdx.length)];

        const newBox = [...box];
        newBox[botNum] = "O";
        setBox(newBox);
        setTurn(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [turn, box, running]);

  useEffect(() => {
    const win = checkwinner(box);

    if (win) {
      setRunning(false);
      setWinner(win);
      return;
    }

    if (box.every((cell) => cell !== "")) {
      setRunning(false);
      setWinner("Draw");
    }
  }, [box]);

  return (
    <section className="w-full h-full md:px-20 md:py-5 p-4">
      <h1 className="text-4xl text-blue-700 text-center p-4">Tic Tac Toe</h1>

      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {box.map((val, index) => (
          <div
            key={index}
            className={`aspect-square
    border border-gray-600
    flex items-center justify-center
    text-4xl font-bold
    cursor-pointer
    select-none
    ${wcombo.includes(index) ? "bg-green-300" : running ? "hover:bg-gray-200" : "bg-gray-100 cursor-not-allowed"}
  `}
            onClick={() => handleClick(index)}
          >
            {val}
          </div>
        ))}
      </div>
      <div className="text-center text-2xl px-2 py-4 flex flex-col items-center gap-4">
        {winner === "X" && (
          <span className="text-green-600">🎉 Player Wins!</span>
        )}
        {winner === "O" && <span className="text-red-600">🤖 Bot Wins!</span>}
        {winner === "Draw" && (
          <span className="text-yellow-600">🤝 It's a Draw!</span>
        )}
        {!winner &&
          (turn ? (
            <span className="text-green-500">Player's turn</span>
          ) : (
            <span className="text-red-500">Bot's turn, Thinking...</span>
          ))}

        {winner && <button
        className="w-25 px-4 text-white border-2 rounded-3xl border-gray-600 bg-green-600 hover:bg-gray-500 hover:border-green-500"
        onClick={handleReset}
        >Reset</button>}
      </div>
    </section>
  );
};

export default Board;
