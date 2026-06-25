import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { StarWalletItem } from "./starWalletData";

type StarWalletCardProps = {
  item: StarWalletItem;
  index: number;
};

export function StarWalletCard({ item, index }: StarWalletCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className={`group relative ${item.glow}`}
    >
      <div
        className={`absolute -inset-[1px] rounded-[20px] bg-gradient-to-br ${item.gradient} opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/20 bg-white/70 p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-3xl shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <span aria-hidden="true">{item.emoji}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-[#FF2D75]/10 px-3 py-1.5">
            <Star className="h-3.5 w-3.5 fill-[#FFC83D] text-[#FFC83D]" />
            <span className="text-xs font-bold uppercase tracking-wide text-[#FF2D75]">Stars</span>
          </div>
        </div>

        <h3 className="mt-6 text-lg font-bold text-[#1B1B25]">{item.title}</h3>

        <p className="mt-3 flex items-baseline gap-1.5">
          <span className="text-4xl font-black tabular-nums text-[#1B1B25]">{item.stars}</span>
          <span className="text-sm font-semibold text-[#7D7D8E]">Stars</span>
        </p>

        <p className="mt-4 text-sm leading-relaxed text-[#7D7D8E]">{item.description}</p>
      </div>
    </motion.article>
  );
}
