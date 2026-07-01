import { motion } from "framer-motion";
import { Users } from "lucide-react";

export type LiveBingoCardProps = {
  roomTitle?: string;
  playerCount?: number;
  maxPlayers?: number;
  currentNumber?: number;
  recentNumbers?: number[];
  callerLine?: string;
};

const DEFAULT_RECENT = [77, 63, 58, 44, 39];

const MINI_GRID = [
  [4, null, 16, null, 31, null, 58, null, 77],
  [null, 9, null, 22, 39, 44, null, 63, null],
  [2, null, 19, null, 36, null, 61, null, 88],
];

const CALLED_NUMBERS = new Set([4, 9, 16, 22, 31, 39, 44, 58, 63, 77]);

export function LiveBingoCard({
  roomTitle = "Diwali Night",
  playerCount = 48,
  maxPlayers = 120,
  currentNumber = 77,
  recentNumbers = DEFAULT_RECENT,
  callerLine = "Double seven, Diwali heaven.",
}: LiveBingoCardProps) {
  const fillPercent = Math.min(100, Math.round((playerCount / maxPlayers) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
    >
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(255,77,126,0.08)_0%,transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="animate-hero-float relative">
        <div className="relative overflow-hidden rounded-[20px] border border-bb-border bg-bb-elevated p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_8px_32px_rgba(0,0,0,0.06)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-bb-primary/20 bg-bb-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-bb-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bb-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-bb-primary" />
              </span>
              Live Now
            </div>
            <div className="flex items-center gap-1.5 text-xs text-bb-muted">
              <Users className="h-3.5 w-3.5 text-bb-primary" />
              {playerCount}/{maxPlayers}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bb-muted">Room</p>
            <p className="mt-1 text-xl font-black text-bb-text">{roomTitle}</p>
          </div>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-bb-surface">
            <div
              className="h-full rounded-full bg-bb-primary transition-all duration-500"
              style={{ width: `${fillPercent}%` }}
            />
          </div>

          <div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bb-muted">Current Number</p>
              <p className="mt-2 text-sm text-bb-gold">Players seated · {playerCount}</p>
            </div>
            <div
              className="flex h-24 w-24 animate-hero-pulse-number items-center justify-center rounded-[18px] bg-bb-primary text-4xl font-black text-white shadow-[0_4px_20px_rgba(255,77,126,0.25)]"
              data-testid="hero-last-call"
            >
              {currentNumber}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-bb-muted">Last 5 Numbers</p>
            <div className="grid grid-cols-5 gap-2">
              {recentNumbers.slice(0, 5).map((number, index) => (
                <span
                  key={`hero-${number}-${index}`}
                  className={`rounded-xl py-2 text-center text-sm font-bold ${
                    index === 0
                      ? "border border-bb-primary/25 bg-bb-primary/5 text-bb-primary"
                      : "border border-bb-border bg-bb-surface text-bb-muted"
                  }`}
                >
                  {number}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-bb-border bg-bb-surface p-3">
            <div className="grid grid-cols-9 gap-1">
              {MINI_GRID.flat().map((cell, index) => {
                const isCalled = cell !== null && CALLED_NUMBERS.has(cell);
                const isCurrent = cell === currentNumber;
                return (
                  <span
                    key={`cell-${index}`}
                    className={`flex aspect-square items-center justify-center rounded-md text-[9px] font-bold sm:text-[10px] ${
                      isCurrent
                        ? "bg-bb-primary text-white shadow-sm"
                        : isCalled
                          ? "bg-bb-primary/10 text-bb-primary"
                          : cell === null
                            ? "bg-transparent"
                            : "border border-bb-border bg-bb-elevated text-bb-muted"
                    }`}
                  >
                    {cell ?? ""}
                  </span>
                );
              })}
            </div>
          </div>

          <p className="mt-5 rounded-2xl border border-bb-gold/25 bg-bb-gold/5 px-4 py-3 text-center text-sm font-semibold italic text-bb-text">
            &ldquo;{callerLine}&rdquo;
          </p>
        </div>
      </div>
    </motion.div>
  );
}
