import React, { useEffect } from "react";
import { useGameStore } from "../store/useGameStore";
import "../style/Game.scss";
import Tile from "./Tile";

const Game: React.FC = () => {
  const { tiles, resetGame, difficulty, updateElapsedTime, gameCompleted } =
    useGameStore();
  useEffect(() => {
    const timer = setInterval(() => updateElapsedTime(), 1000);
    return () => clearInterval(timer);
  }, [updateElapsedTime]);
  useEffect(() => {
    resetGame(difficulty);
  }, [difficulty, resetGame]);
  return (
    <>
      <div className="game-container">
        {tiles.map((_, index) => (
          <Tile key={index} index={index} />
        ))}
      </div>
      <div className="game-container__info">
        {gameCompleted && <p>Game Completed! 🎉</p>}
      </div>
    </>
  );
};
export default Game;
