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
    <div className="flex items-center gap-2">
      <StarWalletPill onClick={onWalletClick} className="hidden sm:inline-flex" />

      <button
        type="button"
        aria-label="Notifications"
        data-testid="navbar-notifications"
        className="relative hidden h-9 w-9 items-center justify-center rounded-lg border border-bb-border text-bb-muted transition-colors hover:bg-bb-surface hover:text-bb-text md:flex"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-bb-primary px-1 text-[10px] font-semibold text-white">
          3
        </span>
      </button>

      <button
        type="button"
        data-testid="navbar-profile"
        className="hidden h-9 items-center gap-1 rounded-lg border border-bb-border py-1 pl-1 pr-1.5 transition-colors hover:bg-bb-surface md:flex"
      >
        <Avatar className="h-7 w-7">
          <AvatarFallback className="bg-bb-primary text-[10px] font-semibold text-white">
            BB
          </AvatarFallback>
        </Avatar>
        <ChevronDown className="h-3.5 w-3.5 text-bb-muted" />
      </button>

      {showCreateButton && (
        <button
          type="button"
          onClick={onCreateRoom}
          data-testid="navbar-create-room"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-bb-primary px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-bb-primary-hover"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Create Room</span>
          <span className="sm:hidden">Create</span>
        </button>
      )}
    </div>
  );
}
