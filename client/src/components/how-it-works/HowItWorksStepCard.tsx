import { motion } from "framer-motion";
import { Gift, Home, Star, Users } from "lucide-react";
import type { HowItWorksStep } from "./howItWorksData";

type HowItWorksStepCardProps = {
  step: HowItWorksStep;
  index: number;
};

function StepBadge({ badge }: { badge: NonNullable<HowItWorksStep["badge"]> }) {
  if (badge.type === "stars") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-bb-primary/10 px-3 py-1.5 text-xs font-semibold text-bb-primary">
        <Star className="h-3.5 w-3.5 fill-bb-gold text-bb-gold" />
        {badge.label}
      </span>
    );
  }

  if (badge.type === "pricing") {
    return (
      <span className="inline-flex flex-wrap items-center gap-2 rounded-full bg-[#FFF8E7] px-3 py-1.5 text-xs font-semibold text-[#92400E]">
        <span className="inline-flex items-center gap-1">
          <Home className="h-3.5 w-3.5" />
          Create: {badge.create}
          <Star className="h-3 w-3 fill-bb-gold text-bb-gold" />
        </span>
        <span className="inline-flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          Join: {badge.join}
          <Star className="h-3 w-3 fill-bb-gold text-bb-gold" />
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF1F0] px-3 py-1.5 text-xs font-semibold text-[#DC2626]">
      <Gift className="h-3.5 w-3.5" />
      {badge.label}
    </span>
  );
}

export function HowItWorksStepCard({ step, index }: HowItWorksStepCardProps) {
  const { step: stepNum, title, description, iconBg, iconColor, Icon, badge } = step;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="relative z-10 flex h-full flex-col"
    >
      <div className="flex h-full flex-col rounded-2xl border border-bb-border bg-bb-elevated p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-bb-primary/10 text-xs font-bold text-bb-primary">
          {stepNum}
        </span>

        <div className="mt-6 flex flex-1 flex-col items-center text-center">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-full ${iconBg}`}
          >
            <Icon className={`h-9 w-9 ${iconColor}`} strokeWidth={1.75} />
          </div>

          <h3 className="mt-5 text-base font-bold text-bb-text">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-bb-muted">{description}</p>
        </div>

        {badge && (
          <div className="mt-5 flex justify-center">
            <StepBadge badge={badge} />
          </div>
        )}
      </div>
    </motion.article>
  );
}
