import { ChevronDown } from "lucide-react";
import type { PatternGrid } from "@/types/bingo";
import { WINNING_PATTERNS } from "@/data/winningPatterns";
import { cn } from "@/lib/utils";

function PatternMiniGrid({ dots }: { dots: PatternGrid }) {
  return (
    <div className="grid grid-cols-5 gap-[2px]">
      {dots.map((row, r) =>
        row.map((active, c) => (
          <span
            key={`${r}-${c}`}
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              active ? "bg-bb-primary" : "bg-bb-border",
            )}
          />
        )),
      )}
    </div>
  );
}

export function WinningPatternsCard() {
  return (
    <details className="group border-t border-bb-border">
      <summary className="flex cursor-pointer list-none items-center justify-between px-3.5 py-2.5 marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="text-xs font-semibold text-bb-text">Winning Patterns</span>
        <span className="flex items-center gap-0.5 text-[10px] font-medium text-bb-muted">
          <span className="group-open:hidden">View</span>
          <span className="hidden group-open:inline">Hide</span>
          <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
        </span>
      </summary>

      <div className="grid grid-cols-3 gap-1.5 px-3.5 pb-3">
        {WINNING_PATTERNS.map((pattern) => (
          <div
            key={pattern.id}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-bb-border bg-bb-surface py-2"
          >
            <PatternMiniGrid dots={pattern.dots} />
            <span className="px-1 text-center text-[9px] font-medium leading-tight text-bb-muted">
              {pattern.label}
            </span>
          </div>
        ))}
      </div>
    </details>
  );
}
