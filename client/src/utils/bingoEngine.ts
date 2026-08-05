import { getSongById } from "@/data/songs";
import type {
  GameState,
  PlayerCard,
  Song,
  WinPattern,
  WinResult,
} from "@/types/bingo";
import { CENTER_INDEX, GRID_SIZE } from "@/types/bingo";
import { positionToCellIndex } from "@/utils/generateBingoCard";

export function createInitialGameState(category: string, songIds: number[]): GameState {
  return {
    category,
    calledSongs: [],
    remainingSongs: [...songIds],
    currentSong: null,
    status: "waiting",
  };
}

export function startGame(state: GameState): GameState {
  return {
    ...state,
    status: "playing",
    calledSongs: [],
    remainingSongs: [...state.remainingSongs],
    currentSong: null,
  };
}

export function callNextSong(state: GameState): { state: GameState; song: Song } | null {
  if (state.status !== "playing" || state.remainingSongs.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * state.remainingSongs.length);
  const songId = state.remainingSongs[randomIndex];
  const song = getSongById(songId);

  if (!song) return null;

  const remainingSongs = state.remainingSongs.filter((id) => id !== songId);
  const calledSongs = [...state.calledSongs, songId];

  return {
    song,
    state: {
      ...state,
      currentSong: song,
      calledSongs,
      remainingSongs,
      status: remainingSongs.length === 0 ? "finished" : "playing",
    },
  };
}

export function markSong(card: PlayerCard, songId: number): PlayerCard {
  return {
    cells: card.cells.map((cell) =>
      cell.id === songId && !cell.isFree ? { ...cell, marked: true } : cell,
    ),
  };
}

export function toggleCellMark(card: PlayerCard, cellIndex: number): PlayerCard {
  const cell = card.cells[cellIndex];
  if (!cell || cell.isFree) return card;

  return {
    cells: card.cells.map((c, i) =>
      i === cellIndex ? { ...c, marked: !c.marked } : c,
    ),
  };
}

function isCellMarked(card: PlayerCard, index: number): boolean {
  return card.cells[index]?.marked ?? false;
}

export function checkHorizontal(card: PlayerCard, row: number): boolean {
  for (let col = 0; col < GRID_SIZE; col++) {
    if (!isCellMarked(card, positionToCellIndex(row, col))) return false;
  }
  return true;
}

export function checkVertical(card: PlayerCard, col: number): boolean {
  for (let row = 0; row < GRID_SIZE; row++) {
    if (!isCellMarked(card, positionToCellIndex(row, col))) return false;
  }
  return true;
}

export function checkDiagonal(card: PlayerCard, diagonal: "main" | "anti"): boolean {
  if (diagonal === "main") {
    for (let i = 0; i < GRID_SIZE; i++) {
      if (!isCellMarked(card, positionToCellIndex(i, i))) return false;
    }
    return true;
  }

  for (let i = 0; i < GRID_SIZE; i++) {
    if (!isCellMarked(card, positionToCellIndex(i, GRID_SIZE - 1 - i))) return false;
  }
  return true;
}

export function checkFullHouse(card: PlayerCard): boolean {
  return card.cells.every((cell) => cell.marked);
}

export function checkWinner(card: PlayerCard): WinResult | null {
  for (let row = 0; row < GRID_SIZE; row++) {
    if (checkHorizontal(card, row)) {
      return { pattern: "horizontal", lineIndex: row };
    }
  }

  for (let col = 0; col < GRID_SIZE; col++) {
    if (checkVertical(card, col)) {
      return { pattern: "vertical", lineIndex: col };
    }
  }

  if (checkDiagonal(card, "main")) {
    return { pattern: "diagonal", diagonal: "main" };
  }

  if (checkDiagonal(card, "anti")) {
    return { pattern: "diagonal", diagonal: "anti" };
  }

  if (checkFullHouse(card)) {
    return { pattern: "full-house" };
  }

  return null;
}

export function getMarkedCount(card: PlayerCard): number {
  return card.cells.filter((cell) => cell.marked).length;
}

export function getProgressPercent(card: PlayerCard): number {
  return Math.round((getMarkedCount(card) / card.cells.length) * 100);
}

export function formatWinPattern(result: WinResult): string {
  const labels: Record<WinPattern, string> = {
    horizontal: `Row ${(result.lineIndex ?? 0) + 1}`,
    vertical: `Column ${(result.lineIndex ?? 0) + 1}`,
    diagonal: result.diagonal === "main" ? "Main Diagonal" : "Anti Diagonal",
    "full-house": "Full House",
  };
  return labels[result.pattern];
}

/** Returns cell indices that form the winning line (for UI highlighting). */
export function getWinningCellIndices(result: WinResult): number[] {
  const indices: number[] = [];

  if (result.pattern === "horizontal" && result.lineIndex !== undefined) {
    for (let col = 0; col < GRID_SIZE; col++) {
      indices.push(positionToCellIndex(result.lineIndex, col));
    }
  } else if (result.pattern === "vertical" && result.lineIndex !== undefined) {
    for (let row = 0; row < GRID_SIZE; row++) {
      indices.push(positionToCellIndex(row, result.lineIndex));
    }
  } else if (result.pattern === "diagonal") {
    for (let i = 0; i < GRID_SIZE; i++) {
      indices.push(
        result.diagonal === "main"
          ? positionToCellIndex(i, i)
          : positionToCellIndex(i, GRID_SIZE - 1 - i),
      );
    }
  } else if (result.pattern === "full-house") {
    return Array.from({ length: 25 }, (_, i) => i);
  }

  return indices;
}

export function isCenterCell(index: number): boolean {
  return index === CENTER_INDEX;
}
