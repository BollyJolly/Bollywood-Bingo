import { motion } from "framer-motion";
import { Gamepad2, Star } from "lucide-react";
import { CtaBingoBalls } from "./CtaBingoBalls";
import { CtaConfetti } from "./CtaConfetti";

export function CtaSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-[#0D0B16] px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
      data-testid="section-cta"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(135deg,#0D0B16_0%,#25103A_50%,#1a0a28_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(255,45,117,0.2),transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,rgba(255,200,61,0.15),transparent)]"
        aria-hidden="true"
      />

      <CtaBingoBalls />
      <CtaConfetti />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to Play{" "}
          <span className="bg-gradient-to-r from-[#FF2D75] via-[#FFC83D] to-[#FF2D75] bg-clip-text text-transparent">
            Bollywood Bingo?
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-md text-base text-[#B9B9C5] sm:text-lg">
          Create a room or join thousands of players online.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.button
            type="button"
            onClick={() => scrollTo("live-rooms")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            data-testid="button-cta-create-room"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#FF2D75] px-8 text-sm font-bold text-white shadow-lg shadow-[#FF2D75]/30 transition-colors hover:bg-[#E81E63] sm:w-auto"
          >
            <Star className="h-4 w-4 fill-current" />
            Create Room
          </motion.button>

          <motion.button
            type="button"
            onClick={() => scrollTo("live-rooms")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            data-testid="button-cta-join-room"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-8 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-[#FFC83D]/50 hover:bg-white/10 sm:w-auto"
          >
            <Gamepad2 className="h-4 w-4" />
            Join Live Room
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
