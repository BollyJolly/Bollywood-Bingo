import { motion } from "framer-motion";
import { Play, SkipForward } from "lucide-react";
import { useBingoGame } from "@/hooks/useBingoGame";

export function CurrentSong() {
  const { gameState, isPlaying, isWaiting, isFinished, startGame, callNextSong } =
    useBingoGame();

  const { currentSong } = gameState;
  const canCallNext = isPlaying && gameState.remainingSongs.length > 0;

  return (
    <div className="border-b border-bb-border bg-bb-surface p-3.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isPlaying && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bb-primary opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-bb-primary" />
            </span>
          )}
          <p className="text-[11px] font-bold uppercase tracking-wider text-bb-primary">
            Now Playing
          </p>
        </div>
        {isWaiting && (
          <button
            type="button"
            onClick={startGame}
            className="inline-flex items-center gap-1 rounded-full bg-bb-primary px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition-all hover:bg-bb-primary-hover hover:shadow-md"
          >
            <Play className="h-3 w-3 fill-white" />
            Start
          </button>
        )}
      </div>

      {currentSong ? (
        <div className="mt-2.5 flex items-center gap-3">
          <motion.div
            animate={{ boxShadow: ["0 0 0 0 rgba(255,77,126,0.3)", "0 0 0 8px rgba(255,77,126,0)", "0 0 0 0 rgba(255,77,126,0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-bb-primary text-lg font-bold text-white shadow-md"
          >
            {currentSong.id}
          </motion.div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-bb-text">{currentSong.title}</p>
            {currentSong.artist && (
              <p className="truncate text-xs text-bb-muted">{currentSong.artist}</p>
            )}
          </div>
        </div>
      ) : (
        <p className="mt-2.5 text-xs leading-relaxed text-bb-muted">
          {isWaiting
            ? "Hit Start, then call songs and mark your ticket."
            : isFinished
              ? "All 75 songs have been called."
              : "Ready for the next song…"}
        </p>
      )}

      <button
        type="button"
        onClick={callNextSong}
        disabled={!canCallNext}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-bb-primary py-2.5 text-xs font-bold text-white shadow-[0_2px_12px_rgba(255,77,126,0.35)] transition-all hover:bg-bb-primary-hover hover:shadow-[0_4px_16px_rgba(255,77,126,0.4)] disabled:bg-[#FFD6E5] disabled:text-bb-primary/60 disabled:shadow-none"
      >
        <SkipForward className="h-4 w-4" />
        Next Song
      </button>
    </div>
  );
}
