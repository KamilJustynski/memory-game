import React from "react";
import { useGameStore } from "../store/useGameStore";
import "../style/DifficultySelector.scss";

const DifficultySelector: React.FC = () => {
  const { resetGame } = useGameStore();
  return (
    <div className="difficulty-selector">
      <button onClick={() => resetGame(8)}>Easy</button>
      <button onClick={() => resetGame(12)}>Medium</button>
      <button onClick={() => resetGame(16)}>Hard</button>
    </div>
  );
};
export default DifficultySelector;
