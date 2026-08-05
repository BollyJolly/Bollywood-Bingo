import type { PatternGrid } from "@/types/bingo";

export const WINNING_PATTERNS = [
  { id: "early-five", label: "Early Five", dots: patternEarlyFive() },
  { id: "top-line", label: "Top Line", dots: patternRow(0) },
  { id: "middle-line", label: "Middle Line", dots: patternRow(2) },
  { id: "bottom-line", label: "Bottom Line", dots: patternRow(4) },
  { id: "four-corners", label: "Four Corners", dots: patternFourCorners() },
  { id: "full-house", label: "Full House", dots: patternFullHouse() },
] as const;

function emptyGrid(): PatternGrid {
  return Array.from({ length: 5 }, () => Array(5).fill(false));
}

function patternRow(row: number): PatternGrid {
  const grid = emptyGrid();
  for (let c = 0; c < 5; c++) grid[row][c] = true;
  return grid;
}

function patternFourCorners(): PatternGrid {
  const grid = emptyGrid();
  grid[0][0] = true;
  grid[0][4] = true;
  grid[4][0] = true;
  grid[4][4] = true;
  return grid;
}

function patternFullHouse(): PatternGrid {
  return Array.from({ length: 5 }, () => Array(5).fill(true));
}

function patternEarlyFive(): PatternGrid {
  const grid = emptyGrid();
  const positions = [
    [0, 1],
    [1, 3],
    [2, 0],
    [3, 2],
    [4, 4],
  ];
  for (const [r, c] of positions) grid[r][c] = true;
  return grid;
}
