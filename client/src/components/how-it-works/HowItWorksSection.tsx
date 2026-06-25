import { Sparkles } from "lucide-react";
import { HowItWorksFeatures } from "./HowItWorksFeatures";
import { HowItWorksStepCard } from "./HowItWorksStepCard";
import { howItWorksFeatures, howItWorksSteps } from "./howItWorksData";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-[#F9FAFB] px-5 py-20 sm:px-8 lg:px-12 lg:py-24"
      data-testid="section-how-it-works"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F5] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#FF2D75]">
            <Sparkles className="h-3.5 w-3.5 text-[#FFC83D]" />
            Easy to Play
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#1B1B25] sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-[#7D7D8E]">
            Start playing Bollywood Bingo in less than a minute.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-[12%] right-[12%] top-[4.5rem] hidden h-0.5 bg-[#FF2D75]/25 lg:block"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {howItWorksSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {index < howItWorksSteps.length - 1 && (
                  <span
                    className="absolute -right-3 top-[4.25rem] z-0 hidden h-2.5 w-2.5 rounded-full bg-[#FF2D75] xl:block"
                    aria-hidden="true"
                  />
                )}
                <HowItWorksStepCard step={step} index={index} />
              </div>
            ))}
          </div>
        </div>

        <HowItWorksFeatures features={howItWorksFeatures} />
      </div>
    </section>
  );
}
