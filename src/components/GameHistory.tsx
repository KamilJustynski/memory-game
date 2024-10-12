import React, { useEffect } from "react";
import { useGameStore } from "../store/useGameStore";
import "../style/GameHistory.scss";

const GameHistory: React.FC = () => {
  const { gameHistory, loadGameHistory } = useGameStore();
  useEffect(() => {
    loadGameHistory();
  }, [loadGameHistory]);
  return (
    <div className="game-history">
      <h2>Game History</h2>
      <ul>
        {gameHistory.map((game, index) => (
          <li key={index}>
            {`Date: ${game.date}, Attempts: ${game.attempts}, Duration: ${game.duration}s`}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default GameHistory;
