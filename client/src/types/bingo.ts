export interface Song {
  id: number; // 1-75
  title: string;
  artist?: string;
  category: string;
}

export interface BingoCell {
  id: number;
  title: string;
  marked: boolean;
  isFree?: boolean;
}

export interface PlayerCard {
  cells: BingoCell[];
}

export type GameStatus = "waiting" | "playing" | "finished";

export interface GameState {
  category: string;
  calledSongs: number[];
  remainingSongs: number[];
  currentSong: Song | null;
  status: GameStatus;
}

export type WinPattern = "horizontal" | "vertical" | "diagonal" | "full-house";

export interface WinResult {
  pattern: WinPattern;
  /** Row index for horizontal, column index for vertical */
  lineIndex?: number;
  /** Which diagonal for diagonal wins */
  diagonal?: "main" | "anti";
}

export const GRID_SIZE = 5;
export const CENTER_INDEX = 12;
export const TOTAL_CELLS = 25;

export type PatternGrid = boolean[][];
