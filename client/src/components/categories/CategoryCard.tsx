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
  const { emoji, name, songCount, badge, Icon } = category;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      className="group min-w-[200px]"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-bb-border bg-bb-elevated shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(255,77,126,0.08)]">
        <div className="relative h-40 overflow-hidden border-b border-bb-border bg-bb-surface">
          <div className="absolute inset-0 bg-bb-primary/[0.06]" aria-hidden="true" />
          <span className="absolute left-3 top-3 text-lg text-bb-muted/40">✦</span>
          <span className="absolute bottom-4 right-6 text-sm text-bb-muted/30">♪</span>

          <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-bb-border bg-bb-elevated">
            <Icon className="h-4 w-4 text-bb-primary" strokeWidth={2.25} />
          </div>

          <div className="relative flex h-full items-center justify-center">
            <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
              {emoji}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
          <h3 className="text-base font-bold text-bb-text">{name}</h3>
          <p className="mt-0.5 text-sm text-bb-muted">{songCount}</p>

          <span className="mt-2.5 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-bb-success">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-bb-success">
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
              className="bb-btn-primary flex w-full gap-2 py-2.5 text-sm"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              View Playlist
            </motion.button>

            <button
              type="button"
              onClick={onPlayBingo}
              data-testid={`button-play-bingo-${category.id}`}
              className="w-full text-center text-sm font-semibold text-bb-primary transition-colors hover:text-bb-primary-hover"
            >
              Play Bingo →
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
