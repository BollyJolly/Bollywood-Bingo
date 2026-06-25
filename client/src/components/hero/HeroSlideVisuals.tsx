import { motion } from "framer-motion";
import { Check, Clock, Music2, Play, Users, Zap } from "lucide-react";
import type { HeroSlideVisual } from "./heroSlidesData";
import { LiveBingoCard, type LiveBingoCardProps } from "./LiveBingoCard";

const PLAYLISTS = [
  { emoji: "🪔", name: "Diwali Hits", songs: 75, gradient: "from-[#7C3AED] to-[#EA580C]", rotate: -8, x: -20 },
  { emoji: "🎵", name: "Sangeet Special", songs: 75, gradient: "from-[#DB2777] to-[#8B5CF6]", rotate: 0, x: 0 },
  { emoji: "🥁", name: "Punjabi Beats", songs: 75, gradient: "from-[#F97316] to-[#FBBF24]", rotate: 8, x: 20 },
];

const CHAT_MESSAGES = [
  { user: "Asha", color: "#FFC83D", text: "Ready for number 77! 🎉" },
  { user: "Meera", color: "#FF2D75", text: "Almost got a full house!" },
  { user: "Ritu", color: "#8B5CF6", text: "This room is so fun 🔥" },
];

function HeroPlaylistVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className="pointer-events-none absolute -inset-10 rounded-[2rem] bg-[radial-gradient(circle,rgba(255,45,117,0.2)_0%,rgba(249,115,22,0.12)_50%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div className="animate-hero-float relative">
        <div
          className="absolute -inset-[1px] animate-hero-glow-border rounded-[22px] bg-gradient-to-br from-[#FF2D75] via-[#F97316] to-[#FFC83D] opacity-80"
          aria-hidden="true"
        />
        <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0D0B16]/75 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF2D75]">Featured Playlists</span>
            <span className="flex items-center gap-1 rounded-full bg-[#FF2D75]/15 px-2.5 py-1 text-[10px] font-bold text-[#FF2D75]">
              <Music2 className="h-3 w-3" /> 75 Songs Each
            </span>
          </div>

          <div className="relative mx-auto mb-6 flex h-44 items-end justify-center">
            {PLAYLISTS.map((pl, index) => (
              <motion.div
                key={pl.name}
                animate={isActive ? { y: [0, -8, 0], rotate: pl.rotate } : { rotate: pl.rotate }}
                transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                className={`absolute bottom-0 w-28 overflow-hidden rounded-2xl border border-white/20 shadow-2xl sm:w-32`}
                style={{ x: pl.x, zIndex: index === 1 ? 3 : index === 0 ? 2 : 1 }}
              >
                <div className={`flex h-32 flex-col items-center justify-center bg-gradient-to-br ${pl.gradient} p-3`}>
                  <span className="text-4xl drop-shadow-lg">{pl.emoji}</span>
                  <p className="mt-2 text-center text-[10px] font-bold text-white">{pl.name}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF2D75] to-[#8B5CF6] text-xl shadow-lg">
                🎵
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Sangeet Special</p>
                <p className="text-xs text-[#B9B9C5]">Now playing · Track 42</p>
              </div>
              <motion.button
                animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF2D75] shadow-lg shadow-[#FF2D75]/40"
              >
                <Play className="h-4 w-4 fill-white text-white" />
              </motion.button>
            </div>
            <div className="mt-3 flex h-8 items-end justify-center gap-1">
              {Array.from({ length: 24 }, (_, i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded-full bg-gradient-to-t from-[#FF2D75] to-[#FFC83D]"
                  animate={isActive ? { height: [6, 12 + (i % 5) * 4, 6] } : { height: 6 }}
                  transition={{ duration: 0.8 + (i % 4) * 0.1, repeat: Infinity, delay: i * 0.04 }}
                />
              ))}
            </div>
          </div>

          {["♪", "♫", "♬"].map((note, i) => (
            <motion.span
              key={note}
              className="pointer-events-none absolute text-xl text-[#FFC83D]/30"
              style={{ right: `${8 + i * 12}%`, top: `${15 + i * 8}%` }}
              animate={isActive ? { y: [0, -16, 0], opacity: [0.2, 0.6, 0.2] } : {}}
              transition={{ duration: 2.5 + i, repeat: Infinity }}
              aria-hidden="true"
            >
              {note}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroWalletVisual({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className="pointer-events-none absolute -inset-10 rounded-[2rem] bg-[radial-gradient(circle,rgba(255,200,61,0.25)_0%,rgba(255,45,117,0.1)_50%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div className="animate-hero-float relative">
        <div
          className="absolute -inset-[1px] animate-hero-glow-border rounded-[22px] bg-gradient-to-br from-[#FFC83D] via-[#FF2D75] to-[#F59E0B] opacity-90"
          aria-hidden="true"
        />
        <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0D0B16]/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFC83D]">Star Wallet</p>
              <p className="mt-1 text-xs text-[#B9B9C5]">Your party currency</p>
            </div>
            <span className="rounded-full bg-[#34D399]/15 px-2.5 py-1 text-[10px] font-bold text-[#34D399]">
              +30 Bonus
            </span>
          </div>

          <div className="relative mt-6 text-center">
            <motion.div
              animate={isActive ? { scale: [1, 1.04, 1] } : {}}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="inline-flex items-baseline gap-2"
            >
              <span className="text-6xl font-black tabular-nums text-white">30</span>
              <span className="text-lg font-semibold text-[#FFC83D]">Stars</span>
            </motion.div>
            <p className="mt-1 text-xs text-[#B9B9C5]">Welcome bonus unlocked</p>
          </div>

          <div className="mt-6 grid gap-2.5">
            {[
              { label: "Welcome Bonus", value: "+30", icon: "🎁", highlight: true },
              { label: "Create Room", value: "10 ★", icon: "🏠", highlight: false },
              { label: "Join Room", value: "5 ★", icon: "🚪", highlight: false },
            ].map((row, i) => (
              <motion.div
                key={row.label}
                initial={false}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 8 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                  row.highlight ? "border border-[#FFC83D]/30 bg-[#FFC83D]/10" : "bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2 text-sm text-[#B9B9C5]">
                  <span>{row.icon}</span> {row.label}
                </span>
                <span className={`text-sm font-bold ${row.highlight ? "text-[#FFC83D]" : "text-white"}`}>
                  {row.value}
                </span>
              </motion.div>
            ))}
          </div>

          {[0, 1, 2, 3, 4].map((coin) => (
            <motion.span
              key={coin}
              className="pointer-events-none absolute text-base"
              style={{ left: `${10 + coin * 16}%`, bottom: "8%" }}
              animate={isActive ? { y: [0, -60, -120], opacity: [0, 0.9, 0], scale: [0.8, 1.1, 0.6] } : {}}
              transition={{ duration: 3, repeat: Infinity, delay: coin * 0.5, ease: "easeOut" }}
              aria-hidden="true"
            >
              ⭐
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroLobbyVisual({ isActive }: { isActive: boolean }) {
  const fillPercent = 40;

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className="pointer-events-none absolute -inset-10 rounded-[2rem] bg-[radial-gradient(circle,rgba(139,92,246,0.22)_0%,rgba(255,45,117,0.1)_50%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div className="animate-hero-float relative">
        <div
          className="absolute -inset-[1px] animate-hero-glow-border rounded-[22px] bg-gradient-to-br from-[#8B5CF6] via-[#FF2D75] to-[#6366F1] opacity-85"
          aria-hidden="true"
        />
        <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0D0B16]/75 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10B981]/40 bg-[#10B981]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#34D399]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34D399] opacity-75" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#34D399]" />
              </span>
              Live Now
            </span>
            <motion.span
              animate={isActive ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex items-center gap-1 text-xs font-bold text-[#FF2D75]"
            >
              <Clock className="h-3.5 w-3.5" /> Starting in 0:42
            </motion.span>
          </div>

          <p className="mt-4 text-xl font-black text-white">Diwali Kitty Brunch</p>
          <p className="mt-1 text-xs text-[#B9B9C5]">48 / 120 players · Sangeet theme</p>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#FF2D75] to-[#8B5CF6]"
              animate={isActive ? { width: [`${fillPercent}%`, `${fillPercent + 5}%`, `${fillPercent}%`] } : { width: `${fillPercent}%` }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex -space-x-2">
              {["A", "M", "R", "P", "N"].map((initial, i) => (
                <motion.span
                  key={initial}
                  initial={false}
                  animate={isActive ? { scale: [0, 1], opacity: [0, 1] } : {}}
                  transition={{ delay: i * 0.15, duration: 0.3 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0D0B16] bg-gradient-to-br from-[#8B5CF6] to-[#FF2D75] text-xs font-bold text-white shadow-md"
                >
                  {initial}
                </motion.span>
              ))}
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0D0B16] bg-white/10 text-[10px] font-bold text-[#B9B9C5]">
                +43
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#B9B9C5]">
              <Users className="h-3.5 w-3.5 text-[#8B5CF6]" />
              Joining live
            </div>
          </div>

          <div className="mt-5 space-y-2 rounded-2xl border border-white/10 bg-black/30 p-3">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#B9B9C5]">
              <Zap className="h-3 w-3 text-[#FFC83D]" /> Party Chat
            </p>
            {CHAT_MESSAGES.map((msg, i) => (
              <motion.p
                key={msg.user}
                initial={false}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                transition={{ delay: 0.3 + i * 0.2 }}
                className="text-xs text-white/90"
              >
                <span className="font-bold" style={{ color: msg.color }}>{msg.user}:</span> {msg.text}
              </motion.p>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#FF2D75]/10 py-2.5">
            <Check className="h-4 w-4 text-[#FF2D75]" />
            <span className="text-xs font-semibold text-white">3 friends already in this room</span>
          </div>
        </div>
      </div>
    </div>
  );
}

type HeroSlideVisualsProps = {
  visual: HeroSlideVisual;
  isActive: boolean;
  liveCard?: LiveBingoCardProps;
};

export function HeroSlideVisuals({ visual, isActive, liveCard }: HeroSlideVisualsProps) {
  if (visual === "bingo") {
    return <LiveBingoCard {...liveCard} />;
  }
  if (visual === "playlist") {
    return <HeroPlaylistVisual isActive={isActive} />;
  }
  if (visual === "wallet") {
    return <HeroWalletVisual isActive={isActive} />;
  }
  return <HeroLobbyVisual isActive={isActive} />;
}
