import React from "react";
import { useGameStore } from "../store/useGameStore";
import "../style/Tile.scss";

interface TileProps {
  index: number;
}

const Tile: React.FC<TileProps> = ({ index }) => {
  const { tiles, revealedTiles, matchedTiles, setRevealedTile } =
    useGameStore();
  const isRevealed = revealedTiles.includes(index);
  const isMatched = matchedTiles.includes(index);
  const handleClick = () => {
    if (!isRevealed && !isMatched) {
      setRevealedTile(index);
    }
  };
  return (
    <div
      className={`tile ${isRevealed || isMatched ? "revealed" : ""}`}
      onClick={handleClick}
    >
      <div className="tile-inner">
        <div className="tile-front">
          ?<div className="tile-back"></div>
        </div>
        <div className="tile-back">
          <img src={tiles[index]} alt="Memory Tile" className="tile-image" />
        </div>
      </div>
    </div>
  );
};
export default Tile;
