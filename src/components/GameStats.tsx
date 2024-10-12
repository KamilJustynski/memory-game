import React, { useEffect } from "react";
import { useGameStore } from "../store/useGameStore";
import "../style/GameStats.scss";

const GameStats: React.FC = () => {
  const { attempts, elapsedTime, gameCompleted, updateElapsedTime } =
    useGameStore();
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameCompleted) {
        updateElapsedTime();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [gameCompleted, updateElapsedTime]);
  return (
    <div className="game-stats">
      <h2>Game Statistics</h2>
      <div>
        <p>Attempts: {attempts}</p>
        <p>Time Elapsed: {elapsedTime}s</p>
      </div>
    </div>
  );
};
export default GameStats;
