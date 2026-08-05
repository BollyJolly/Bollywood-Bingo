import { Bell, ChevronDown, LogIn, Plus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StarWalletPill } from "./StarWalletPill";

type NavbarActionsProps = {
  onCreateRoom: () => void;
  onWalletClick: () => void;
  onAuthClick: () => void;
  onLogout: () => void;
  isLoggedIn?: boolean;
  userName?: string | null;
  showCreateButton?: boolean;
};

function getInitials(name?: string | null) {
  if (!name) return "BB";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "BB";
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("").slice(0, 2);
}

export function NavbarActions({
  onCreateRoom,
  onWalletClick,
  onAuthClick,
  onLogout,
  isLoggedIn = false,
  userName,
  showCreateButton = true,
}: NavbarActionsProps) {

  return (
    <div className="flex items-center gap-2">
      <StarWalletPill onClick={onWalletClick} className="hidden sm:inline-flex" />

      {isLoggedIn && (
        <button
          type="button"
          onClick={onLogout}
          data-testid="navbar-logout-compact"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50"
        >
          <LogOut className="h-4 w-4 text-gray-700" />
        </button>
      )}

      {isLoggedIn ? (
        <div
          data-testid="navbar-user"
          className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-900 sm:inline-flex"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-to-br from-[#8B5CF6] to-[#FF2D75] text-xs font-bold text-white">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-900">{userName}</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={onAuthClick}
          data-testid="navbar-auth"
          className="hidden items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:border-gray-300 hover:bg-gray-50 sm:inline-flex"
        >
          <LogIn className="h-4 w-4 text-[#FF2D75]" />
          <span>Login / Register</span>
        </button>
      )}

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
