import { ChevronRight, Sparkles } from "lucide-react";
import { CategoriesBackground } from "./CategoriesBackground";
import { CategoryRow } from "./CategoryRow";
import { categories, categoriesRowTwo } from "./categoriesData";

export function CategoriesSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const onViewPlaylist = () => scrollTo("featured-playlists");
  const onPlayBingo = () => scrollTo("live-rooms");

  return (
    <section
      id="categories"
      className="relative overflow-hidden bg-[#FFFBF7] px-5 pb-16 pt-20 sm:px-8 lg:px-12 lg:pb-20 lg:pt-24"
      data-testid="section-categories"
    >
      <CategoriesBackground />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-[#1B1B25] sm:text-4xl">
              Choose Your Vibe
            </h2>
            <Sparkles className="h-5 w-5 fill-[#FF2D75] text-[#FF2D75]" />
          </div>
          <p className="mx-auto mt-3 max-w-lg text-base text-[#7D7D8E]">
            Pick your favorite theme and{" "}
            <span className="font-semibold text-[#FF2D75]">start playing</span> in seconds.
          </p>
        </div>

        <div className="space-y-5">
          <CategoryRow
            categories={categories}
            onViewPlaylist={onViewPlaylist}
            onPlayBingo={onPlayBingo}
          />
          <CategoryRow
            categories={categoriesRowTwo}
            rowOffset={categories.length}
            onViewPlaylist={onViewPlaylist}
            onPlayBingo={onPlayBingo}
          />
        </div>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => scrollTo("featured-playlists")}
            data-testid="button-explore-all-categories"
            className="inline-flex items-center gap-1 rounded-full border border-[#F3E8FF] bg-white px-6 py-2.5 text-sm font-semibold text-[#FF2D75] shadow-sm transition-all hover:border-[#FF2D75]/30 hover:shadow-md"
          >
            Explore All Categories
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
