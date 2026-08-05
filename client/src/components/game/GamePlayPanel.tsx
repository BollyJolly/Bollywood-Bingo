import { useEffect } from "react";
import { BingoBoard } from "./BingoBoard";
import { CurrentSong } from "./CurrentSong";
import { GameProgress } from "./GameProgress";
import { WinnerModal } from "./WinnerModal";
import { WinningPatternsCard } from "./WinningPatternsCard";
import { useBingoGame } from "@/hooks/useBingoGame";

type GamePlayPanelProps = {
  category?: string;
};

export function GamePlayPanel({ category = "Bollywood" }: GamePlayPanelProps) {
  const { initGame } = useBingoGame();

  useEffect(() => {
    initGame(category);
  }, [category, initGame]);

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-2xl border border-bb-border bg-bb-elevated shadow-[0_4px_24px_rgba(255,77,126,0.06)]">
        <CurrentSong />
        <div className="border-t border-bb-border px-3.5 py-3.5">
          <BingoBoard />
        </div>
        <GameProgress />
        <WinningPatternsCard />
      </div>
      <WinnerModal />
    </>
  );
}
