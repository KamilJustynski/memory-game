import React from "react";
import { useGameStore } from "../store/useGameStore";
import "../style/StartScreen.scss";

const StartScreen: React.FC = () => {
  const { startGame } = useGameStore();
  return (
    <div className="start-screen">
      <h1>Memory Game</h1>
      <p>Select difficulty to start:</p>
      <div className="difficulty-buttons">
        <button onClick={() => startGame(10)}>Easy</button>
        <button onClick={() => startGame(15)}>Medium</button>
        <button onClick={() => startGame(20)}>Hard</button>
      </div>
    </div>
  );
};
export default StartScreen;
