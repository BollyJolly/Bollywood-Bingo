import { motion } from "framer-motion";
import { HeroParticles } from "./HeroParticles";
import type { HeroSlideData } from "./heroSlidesData";
import { HeroSlideVisuals } from "./HeroSlideVisuals";
import type { LiveBingoCardProps } from "./LiveBingoCard";

type HeroSlideProps = {
  slide: HeroSlideData;
  isActive: boolean;
  liveCard?: LiveBingoCardProps;
};

export function HeroSlide({ slide, isActive, liveCard }: HeroSlideProps) {
  const scrollTo = (target: string) => {
    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex h-full min-h-[90vh] items-center overflow-hidden">
      <div
        className="hero-gradient-animate absolute inset-0"
        style={{ background: slide.background }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{ background: slide.glow }}
        aria-hidden="true"
      />
      {slide.visual !== "bingo" && <HeroParticles />}

      <div className="relative mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
        <div className="order-1 lg:order-none">
          <motion.div
            initial={false}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#B9B9C5] backdrop-blur-sm">
              {slide.badge}
            </span>

            <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              {slide.headingLine1}
              <br />
              <span className="bg-gradient-to-r from-[#FF2D75] via-[#FFC83D] to-[#8B5CF6] bg-clip-text text-transparent">
                {slide.headingLine2}
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#B9B9C5] sm:text-lg">
              {slide.description}
            </p>

            {slide.bullets && (
              <ul className="mt-4 space-y-2">
                {slide.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm font-semibold text-[#FFC83D]">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            <motion.div
              initial={false}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="mt-8 flex flex-wrap gap-4"
            >
              {slide.buttons.map((button) => (
                <motion.button
                  key={button.label}
                  type="button"
                  onClick={() => scrollTo(button.target)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid={`hero-button-${slide.id}-${button.label.toLowerCase().replace(/\s/g, "-")}`}
                  className={
                    button.variant === "primary"
                      ? "inline-flex min-h-12 items-center rounded-xl bg-[#FF2D75] px-7 text-sm font-bold text-white shadow-lg shadow-[#FF2D75]/25 transition-colors hover:bg-[#E91E63]"
                      : "inline-flex min-h-12 items-center rounded-xl border border-white/30 bg-transparent px-7 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/5"
                  }
                >
                  {button.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="order-2 lg:order-none">
          <motion.div
            initial={false}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <HeroSlideVisuals visual={slide.visual} isActive={isActive} liveCard={liveCard} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
