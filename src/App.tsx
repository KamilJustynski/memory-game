import React from "react";
import Game from "./components/Game";
import GameStats from "./components/GameStats";
import StartScreen from "./components/StartScreen";
import GameHistory from "./components/GameHistory";
import { useGameStore } from "./store/useGameStore";
import "./index.scss";

const App: React.FC = () => {
  const { gameStarted } = useGameStore();
  return (
    <div className="App">
      {gameStarted ? (
        <>
          <GameStats />
          <Game />
          <GameHistory />
        </>
      ) : (
        <StartScreen />
      )}
    </div>
  );
};
export default App;
