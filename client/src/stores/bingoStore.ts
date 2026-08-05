import { create } from "zustand";
import { SONGS } from "@/data/songs";
import type { GameState, PlayerCard, WinResult } from "@/types/bingo";
import {
  callNextSong,
  checkWinner,
  createInitialGameState,
  getWinningCellIndices,
  startGame,
  toggleCellMark,
} from "@/utils/bingoEngine";
import { generateBingoCard } from "@/utils/generateBingoCard";

const DEFAULT_CATEGORY = "Bollywood";

function buildSongPool(category: string): number[] {
  const filtered = SONGS.filter((s) => s.category === category);
  return (filtered.length >= 24 ? filtered : SONGS).map((s) => s.id);
}

interface BingoStore {
  gameState: GameState;
  playerCard: PlayerCard;
  winner: WinResult | null;
  winningCellIndices: number[];

  initGame: (category?: string) => void;
  startGame: () => void;
  callNextSong: () => void;
  toggleCell: (cellIndex: number) => void;
  regenerateCard: () => void;
  dismissWinner: () => void;
  resetGame: () => void;
}

function createFreshState(category: string = DEFAULT_CATEGORY) {
  const songIds = buildSongPool(category);
  return {
    gameState: createInitialGameState(category, songIds),
    playerCard: generateBingoCard(SONGS.filter((s) => songIds.includes(s.id))),
    winner: null as WinResult | null,
    winningCellIndices: [] as number[],
  };
}

export const useBingoStore = create<BingoStore>((set, get) => ({
  ...createFreshState(),

  initGame: (category = DEFAULT_CATEGORY) => {
    set(createFreshState(category));
  },

  startGame: () => {
    set((state) => ({
      gameState: startGame(state.gameState),
      winner: null,
      winningCellIndices: [],
    }));
  },

  callNextSong: () => {
    const { gameState } = get();
    const result = callNextSong(gameState);
    if (!result) return;

    set({ gameState: result.state });
  },

  toggleCell: (cellIndex: number) => {
    const { playerCard, winner } = get();
    if (winner) return;

    const updatedCard = toggleCellMark(playerCard, cellIndex);
    const win = checkWinner(updatedCard);

    set({
      playerCard: updatedCard,
      winner: win,
      winningCellIndices: win ? getWinningCellIndices(win) : [],
      gameState:
        win && get().gameState.status === "playing"
          ? { ...get().gameState, status: "finished" }
          : get().gameState,
    });
  },

  regenerateCard: () => {
    const { gameState, winner } = get();
    if (winner) return;

    const songIds = buildSongPool(gameState.category);
    set({
      playerCard: generateBingoCard(SONGS.filter((s) => songIds.includes(s.id))),
      winner: null,
      winningCellIndices: [],
    });
  },

  dismissWinner: () => {
    set({ winner: null, winningCellIndices: [] });
  },

  resetGame: () => {
    const { gameState } = get();
    set(createFreshState(gameState.category));
  },
}));
