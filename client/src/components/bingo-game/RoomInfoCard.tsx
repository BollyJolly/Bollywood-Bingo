import { Copy, Users } from "lucide-react";
import { ROOM_INFO } from "./bingoGameData";

export function RoomInfoCard() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-bb-border px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-bb-success" />
        <span className="text-xs font-semibold uppercase tracking-wide text-bb-success">
          Live
        </span>
      </div>

      <h1 className="text-[15px] font-semibold text-bb-text">{ROOM_INFO.name}</h1>

      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-lg bg-bb-surface px-2.5 py-1 text-xs font-medium text-bb-muted transition-colors hover:bg-[#EBEBEB]"
      >
        {ROOM_INFO.roomCode}
        <Copy className="h-3 w-3" />
      </button>

      <div className="ml-auto flex items-center gap-1.5 text-sm text-bb-muted">
        <Users className="h-4 w-4" />
        <span>
          <span className="font-semibold text-bb-text">{ROOM_INFO.players}</span>
          {" / "}
          {ROOM_INFO.maxPlayers}
        </span>
      </div>
    </div>
  );
}
