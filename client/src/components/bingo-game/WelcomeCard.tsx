import { Clock, Star, User, Users } from "lucide-react";
import { ROOM_INFO } from "./bingoGameData";

const STATS = [
  {
    label: "Players",
    value: `${ROOM_INFO.players} / ${ROOM_INFO.maxPlayers}`,
    icon: Users,
    color: "text-bb-primary",
    bg: "bg-bb-primary/10",
  },
  {
    label: "Stars Prize",
    value: String(ROOM_INFO.prizePool),
    icon: Star,
    color: "text-[#EAB308]",
    bg: "bg-[#FEFCE8]",
    fill: true,
  },
  {
    label: "Starting in",
    value: ROOM_INFO.countdown,
    icon: Clock,
    color: "text-bb-success",
    bg: "bg-[#F0FDF4]",
  },
  {
    label: "Host",
    value: ROOM_INFO.host,
    icon: User,
    color: "text-bb-primary",
    bg: "bg-bb-primary/10",
  },
] as const;

export function WelcomeCard() {
  return (
    <div className="w-full max-w-[400px] rounded-2xl border border-bb-border bg-bb-elevated p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bb-primary/10">
          <Users className="h-6 w-6 text-bb-primary" />
        </div>
        <h2 className="mt-4 text-base font-semibold text-bb-text">Welcome to the Room!</h2>
        <p className="mt-1 text-sm text-bb-muted">The host will start the game soon.</p>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center rounded-xl border border-bb-border px-1 py-3"
          >
            <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${stat.bg}`}>
              <stat.icon
                className={`h-4 w-4 ${stat.color}`}
                fill={"fill" in stat && stat.fill ? "currentColor" : "none"}
              />
            </div>
            <p className="text-[10px] leading-none text-bb-muted">{stat.label}</p>
            <p className="mt-1.5 text-[11px] font-semibold leading-tight text-bb-text">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
