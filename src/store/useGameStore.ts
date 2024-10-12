import { create } from "zustand";
interface GameHistory {
  attempts: number;
  duration: number;
  date: string;
}
interface GameState {
  tiles: string[];
  revealedTiles: number[];
  matchedTiles: number[];
  attempts: number;
  startTime: number;
  elapsedTime: number;
  gameCompleted: boolean;
  difficulty: number;
  gameStarted: boolean;
  gameHistory: GameHistory[];
  setRevealedTile: (index: number) => void;
  startGame: (difficulty: number) => void;
  resetGame: (difficulty: number) => void;
  incrementAttempts: () => void;
  checkMatch: () => void;
  updateElapsedTime: () => void;
  saveGameHistory: (attempts: number, duration: number) => void;
  loadGameHistory: () => void;
  elapsedTimeInterval: ReturnType<typeof setInterval> | undefined;
}
const imagePaths = [
  "../../public/images/img1.jpg",
  "../../public/images/img2.jpg",
  "../../public/images/img3.jpg",
  "../../public/images/img4.jpg",
  "../../public/images/img5.jpg",
  "../../public/images/img6.jpg",
  "../../public/images/img7.jpg",
  "../../public/images/img8.jpg",
  "../../public/images/img9.jpg",
  "../../public/images/img10.jpg",
  "../../public/images/img11.jpg",
  "../../public/images/img12.jpg",
  "../../public/images/img13.jpg",
  "../../public/images/img14.jpg",
  "../../public/images/img15.jpg",
  "../../public/images/img16.jpg",
  "../../public/images/img17.jpg",
  "../../public/images/img18.jpg",
  "../../public/images/img19.jpg",
  "../../public/images/img20.jpg",
];
export const useGameStore = create<GameState>((set, get) => ({
  tiles: [],
  revealedTiles: [],
  matchedTiles: [],
  attempts: 0,
  startTime: Date.now(),
  elapsedTime: 0,
  gameCompleted: false,
  difficulty: 8,
  gameStarted: false,
  gameHistory: [],
  elapsedTimeInterval: undefined,
  setRevealedTile: (index) => {
    const { revealedTiles, matchedTiles, checkMatch } = get();
    if (revealedTiles.length < 2 && !matchedTiles.includes(index)) {
      set((state) => ({ revealedTiles: [...state.revealedTiles, index] }));
      if (revealedTiles.length === 1) {
        setTimeout(checkMatch, 1000);
      }
    }
  },
  checkMatch: () => {
    const { tiles, revealedTiles, matchedTiles, incrementAttempts } = get();
    incrementAttempts();
    if (tiles[revealedTiles[0]] === tiles[revealedTiles[1]]) {
      set((state) => ({
        matchedTiles: [...state.matchedTiles, ...revealedTiles],
        revealedTiles: [],
      }));
      if (matchedTiles.length + 2 === tiles.length) {
        set({ gameCompleted: true });
        const attempts = get().attempts;
        const duration = Math.floor((Date.now() - get().startTime) / 1000);
        get().saveGameHistory(attempts, duration);
        const intervalId = get().elapsedTimeInterval;
        if (intervalId) {
          clearInterval(intervalId);
          set({ elapsedTimeInterval: undefined });
        }
      }
    } else {
      set({ revealedTiles: [] });
    }
  },
  incrementAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),
  resetGame: (difficulty) => {
    const selectedImages = imagePaths.slice(0, difficulty / 2);
    const shuffledTiles = [...selectedImages, ...selectedImages].sort(
      () => Math.random() - 0.5
    );
    set({
      tiles: shuffledTiles,
      revealedTiles: [],
      matchedTiles: [],
      attempts: 0,
      startTime: Date.now(),
      elapsedTime: 0,
      gameCompleted: false,
      difficulty,
    });
    if (get().elapsedTimeInterval) {
      clearInterval(get().elapsedTimeInterval);
    }
    set({ elapsedTimeInterval: setInterval(get().updateElapsedTime, 1000) });
  },
  startGame: (difficulty) => {
    get().resetGame(difficulty);
    set({ gameStarted: true });
  },
  updateElapsedTime: () => {
    const { gameCompleted } = get();
    if (!gameCompleted) {
      set({ elapsedTime: Math.floor((Date.now() - get().startTime) / 1000) });
    }
  },
  saveGameHistory: (attempts, duration) => {
    const newHistoryEntry = {
      attempts,
      duration,
      date: new Date().toLocaleString(),
    };
    const currentHistory = JSON.parse(
      localStorage.getItem("gameHistory") || "[]"
    );
    currentHistory.push(newHistoryEntry);
    localStorage.setItem("gameHistory", JSON.stringify(currentHistory));
    set({ gameHistory: currentHistory });
  },
  loadGameHistory: () => {
    const history = JSON.parse(localStorage.getItem("gameHistory") || "[]");
    set({ gameHistory: history });
  },
}));
