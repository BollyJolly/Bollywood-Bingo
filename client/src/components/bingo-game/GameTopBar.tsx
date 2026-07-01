import { ArrowLeft, Music2 } from "lucide-react";
import { useLocation } from "wouter";
import { CURRENT_CALL } from "./bingoGameData";

export function GameTopBar() {
  const [, setLocation] = useLocation();

  return (
    <header className="flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={() => setLocation("/")}
        className="inline-flex items-center gap-2 rounded-xl border border-bb-border bg-bb-elevated px-4 py-2.5 text-sm font-medium text-bb-text transition-colors hover:bg-bb-surface"
      >
        <ArrowLeft className="h-4 w-4 text-bb-muted" />
        Leave Room
      </button>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-bb-border bg-bb-elevated px-4 py-2 text-sm font-medium text-bb-text">
          <Music2 className="h-4 w-4 text-bb-primary" />
          <span className="hidden sm:inline">{CURRENT_CALL.song}</span>
          <span className="sm:hidden">Now Playing</span>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-bb-primary bg-bb-elevated text-base font-bold text-bb-primary">
          {CURRENT_CALL.number}
        </div>
      </div>
    </header>
  );
}
