import { motion } from "framer-motion";
import { Bell, ChevronDown, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StarWalletPill } from "./StarWalletPill";

type NavbarActionsProps = {
  onCreateRoom: () => void;
  onWalletClick: () => void;
  showCreateButton?: boolean;
};

export function NavbarActions({
  onCreateRoom,
  onWalletClick,
  showCreateButton = true,
}: NavbarActionsProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <StarWalletPill onClick={onWalletClick} className="hidden sm:inline-flex" />

      <button
        type="button"
        aria-label="Notifications"
        data-testid="navbar-notifications"
        className="relative hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#B9B9C5] transition-colors hover:border-white/20 hover:text-white sm:flex"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF2D75] px-1 text-[10px] font-bold text-white">
          3
        </span>
      </button>

      <button
        type="button"
        data-testid="navbar-profile"
        className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-2 transition-colors hover:border-white/20 sm:flex"
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gradient-to-br from-[#8B5CF6] to-[#FF2D75] text-xs font-bold text-white">
            BB
          </AvatarFallback>
        </Avatar>
        <ChevronDown className="h-3.5 w-3.5 text-[#B9B9C5]" />
      </button>

      {showCreateButton && (
        <motion.button
          type="button"
          onClick={onCreateRoom}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          data-testid="navbar-create-room"
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF2D75] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#E91E63]"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Create Room</span>
          <span className="sm:hidden">Create</span>
        </motion.button>
      )}
    </div>
  );
}
