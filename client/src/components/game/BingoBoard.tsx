import { RefreshCw, Ticket } from "lucide-react";
import { useBingoGame } from "@/hooks/useBingoGame";
import { BingoCell } from "./BingoCell";

const COLUMNS = ["B", "I", "N", "G", "O"] as const;

export function BingoBoard() {
  const {
    playerCard,
    gameState,
    winningCellIndices,
    isWaiting,
    toggleCell,
    regenerateCard,
  } = useBingoGame();

  const winningSet = new Set(winningCellIndices);
  const calledSet = new Set(gameState.calledSongs);
  const currentId = gameState.currentSong?.id;

  return (
    <div>
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-bb-primary/10">
            <Ticket className="h-3.5 w-3.5 text-bb-primary" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-bb-text">Your Bingo Ticket</h2>
            <p className="text-[11px] text-bb-muted">Tap numbers when they&apos;re called</p>
          </div>
        </div>
        {isWaiting && (
          <button
            type="button"
            onClick={regenerateCard}
            className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-bb-border bg-bb-elevated px-2 py-1 text-[10px] font-semibold text-bb-muted shadow-sm transition-all hover:border-bb-primary/30 hover:text-bb-primary"
            title="Generate new card"
          >
            <RefreshCw className="h-3 w-3" />
            New Card
          </button>
        )}
      </div>

      <div className="rounded-xl bg-bb-surface p-2">
        <div className="mb-1.5 grid grid-cols-5 gap-1.5">
          {COLUMNS.map((letter) => (
            <div
              key={letter}
              className="flex h-6 items-center justify-center rounded-md bg-bb-primary text-xs font-extrabold text-white shadow-sm"
            >
              {letter}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {playerCard.cells.map((cell, index) => (
            <BingoCell
              key={`${index}-${cell.id}`}
              cell={cell}
              isWinning={winningSet.has(index)}
              isCalled={!cell.isFree && calledSet.has(cell.id)}
              isCurrent={!cell.isFree && cell.id === currentId}
              onToggle={() => toggleCell(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
