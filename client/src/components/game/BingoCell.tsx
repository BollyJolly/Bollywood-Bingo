import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { BingoCell as BingoCellType } from "@/types/bingo";

type BingoCellProps = {
  cell: BingoCellType;
  isWinning?: boolean;
  isCalled?: boolean;
  isCurrent?: boolean;
  onToggle: () => void;
};

export function BingoCell({
  cell,
  isWinning,
  isCalled,
  isCurrent,
  onToggle,
}: BingoCellProps) {
  const isFree = cell.isFree;

  return (
    <motion.button
      type="button"
      whileHover={!isFree && !cell.marked ? { scale: 1.06 } : undefined}
      whileTap={!isFree ? { scale: 0.92 } : undefined}
      onClick={onToggle}
      disabled={isFree}
      title={isFree ? "FREE" : `${cell.id} — ${cell.title}`}
      className={cn(
        "relative flex h-9 w-full items-center justify-center rounded-xl text-[11px] font-bold transition-all duration-200",
        isFree && "cursor-default bg-bb-gold text-bb-bg shadow-sm",
        !isFree &&
          !cell.marked &&
          !isCalled &&
          "border border-bb-border bg-bb-elevated text-bb-text shadow-sm hover:border-bb-primary hover:shadow-md",
        !isFree &&
          !cell.marked &&
          isCalled &&
          "border-2 border-bb-primary bg-bb-primary/10 text-bb-primary shadow-[0_0_0_2px_rgba(255,77,126,0.15)]",
        !isFree && cell.marked && "bg-bb-primary text-white shadow-md",
        isCurrent && !cell.marked && "animate-pulse",
        isWinning && "ring-2 ring-bb-success ring-offset-1",
      )}
    >
      {isFree ? (
        <span className="text-[9px] font-extrabold tracking-wide">FREE</span>
      ) : (
        cell.id
      )}
    </motion.button>
  );
}
