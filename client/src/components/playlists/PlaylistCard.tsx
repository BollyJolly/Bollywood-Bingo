import { motion } from "framer-motion";
import { Clock, Music2, Play } from "lucide-react";
import type { Playlist } from "./playlistsData";

type PlaylistCardProps = {
  playlist: Playlist;
  index: number;
  onPlay: (id: string) => void;
  onPreview: (id: string) => void;
};

export function PlaylistCard({ playlist, index, onPlay, onPreview }: PlaylistCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group"
    >
      <div className="overflow-hidden rounded-2xl border border-[#F2F2F5] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_16px_44px_rgba(0,0,0,0.12)]">
        <div
          className={`relative aspect-square bg-gradient-to-br ${playlist.coverGradient} p-6`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <span className="text-5xl drop-shadow-md" aria-hidden="true">
              {playlist.emoji}
            </span>
            <div className="flex items-end justify-between gap-2">
              <p className="text-lg font-black leading-tight text-white drop-shadow-sm">
                {playlist.name}
              </p>
              <motion.button
                type="button"
                onClick={() => onPlay(playlist.id)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Play ${playlist.name}`}
                data-testid={`button-play-playlist-${playlist.id}`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#FF2D75] shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <Play className="h-5 w-5 fill-current" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#7D7D8E]">
            <span className="inline-flex items-center gap-1.5">
              <Music2 className="h-3.5 w-3.5 text-[#8B5CF6]" />
              {playlist.songCount} Songs
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#FF2D75]" />
              {playlist.duration}
            </span>
          </div>

          <div className="mt-4 flex gap-2">
            <motion.button
              type="button"
              onClick={() => onPlay(playlist.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              data-testid={`button-play-playlist-main-${playlist.id}`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#FF2D75] px-3 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#E81E63]"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Play Playlist
            </motion.button>
            <motion.button
              type="button"
              onClick={() => onPreview(playlist.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              data-testid={`button-preview-playlist-${playlist.id}`}
              className="flex-1 rounded-xl border border-[#ECECEC] px-3 py-2.5 text-sm font-bold text-[#1B1B25] transition-all hover:border-[#FF2D75] hover:text-[#FF2D75]"
            >
              Preview
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
