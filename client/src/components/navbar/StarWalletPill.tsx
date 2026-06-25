import { Star } from "lucide-react";

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
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#FFF4D6] px-3.5 py-2 text-sm font-semibold text-[#A16207] shadow-[0_0_20px_rgba(255,200,61,0.25)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(255,200,61,0.4)] ${className}`}
    >
      <Star className="h-3.5 w-3.5 fill-[#FFC83D] text-[#FFC83D]" />
      {stars} Stars
    </button>
  );
}
