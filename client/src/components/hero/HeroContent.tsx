import { Play, Radio } from "lucide-react";
import { motion } from "framer-motion";
import { HeroFeatures } from "./HeroFeatures";

type HeroContentProps = {
  onPlayClick: () => void;
  onWatchClick: () => void;
};

export function HeroContent({ onPlayClick, onWatchClick }: HeroContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-xl"
    >
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#B9B9C5] backdrop-blur-md">
        <span aria-hidden="true">🎵</span>
        First Multiplayer Bollywood Bingo
      </div>

      <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
        Play Bollywood Bingo
        <br />
        <span className="bg-gradient-to-r from-[#FF2D75] via-[#FFC83D] to-[#8B5CF6] bg-clip-text text-transparent">
          Live. Fun. Anywhere.
        </span>
      </h1>

      <p className="mt-5 max-w-md text-base leading-relaxed text-[#B9B9C5] sm:text-lg">
        Play Bollywood, Sangeet, Diwali and Kitty Party Bingo with friends across the world.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <motion.button
          type="button"
          onClick={onPlayClick}
          data-testid="button-hero-play"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#FF2D75] px-7 text-sm font-bold text-white shadow-lg shadow-[#FF2D75]/25 transition-colors hover:bg-[#E81E63]"
        >
          <Play className="h-4 w-4 fill-current" />
          Play Free
        </motion.button>

        <motion.button
          type="button"
          onClick={onWatchClick}
          data-testid="button-hero-preview"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-white/30 bg-transparent px-7 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/5"
        >
          <Radio className="h-4 w-4" />
          Watch Live Rooms
        </motion.button>
      </div>

      <HeroFeatures />
    </motion.div>
  );
}
