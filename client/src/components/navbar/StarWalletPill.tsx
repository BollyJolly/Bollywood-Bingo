import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarWalletPillProps = {
  stars?: number;
  onClick?: () => void;
  className?: string;
};

export function StarWalletPill({ stars = 30, onClick, className = "" }: StarWalletPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="navbar-star-wallet"
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-lg border border-bb-border bg-bb-elevated px-3 text-[13px] font-medium text-bb-text transition-colors hover:bg-bb-surface",
        className,
      )}
    >
      <Star className="h-3.5 w-3.5 fill-bb-gold text-bb-gold" />
      {stars} Stars
    </button>
  );
}
