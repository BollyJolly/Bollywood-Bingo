import type { HowItWorksFeature } from "./howItWorksData";

type HowItWorksFeaturesProps = {
  features: HowItWorksFeature[];
};

export function HowItWorksFeatures({ features }: HowItWorksFeaturesProps) {
  return (
    <div className="mt-12 rounded-2xl border border-[#F0F0F3] bg-[#F3F4F6]/60 p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {features.map((feature) => (
          <div key={feature.id} className="flex gap-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${feature.iconBg}`}
            >
              <feature.Icon className={`h-5 w-5 ${feature.iconColor}`} strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1B1B25]">{feature.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-[#7D7D8E]">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
