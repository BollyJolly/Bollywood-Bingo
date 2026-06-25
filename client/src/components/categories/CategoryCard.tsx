import { motion } from "framer-motion";
import { Check, Play } from "lucide-react";
import type { Category } from "./categoriesData";

type CategoryCardProps = {
  category: Category;
  index: number;
  onViewPlaylist: () => void;
  onPlayBingo: () => void;
};

export function CategoryCard({ category, index, onViewPlaylist, onPlayBingo }: CategoryCardProps) {
  const { emoji, name, songCount, badge, headerGradient, glowColor, Icon } = category;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      className="group min-w-[200px]"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#F3E8FF]/60 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_40px_rgba(255,45,117,0.12)]">
        <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${headerGradient}`}>
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `radial-gradient(circle at 50% 55%, ${glowColor}, transparent 65%)`,
            }}
          />
          <span className="absolute left-3 top-3 text-lg opacity-40">✦</span>
          <span className="absolute bottom-4 right-6 text-sm opacity-30">♪</span>

          <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
            <Icon className="h-4 w-4 text-[#FF2D75]" strokeWidth={2.25} />
          </div>

          <div className="relative flex h-full items-center justify-center">
            <span className="text-6xl drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110">
              {emoji}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
          <h3 className="text-base font-bold text-[#1B1B25]">{name}</h3>
          <p className="mt-0.5 text-sm text-[#9CA3AF]">{songCount}</p>

          <span className="mt-2.5 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-[#22C55E]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#22C55E]">
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            </span>
            {badge}
          </span>

          <div className="mt-auto space-y-2.5 pt-4">
            <motion.button
              type="button"
              onClick={onViewPlaylist}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid={`button-view-playlist-${category.id}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF2D75] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E91E63]"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              View Playlist
            </motion.button>

            <button
              type="button"
              onClick={onPlayBingo}
              data-testid={`button-play-bingo-${category.id}`}
              className="w-full text-center text-sm font-semibold text-[#FF2D75] transition-colors hover:text-[#E91E63]"
            >
              Play Bingo →
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
