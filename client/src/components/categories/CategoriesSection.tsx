import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlaylists, type PlaylistApi } from "@/global/playlistsApi";
import {
  Clapperboard,
  Crown,
  Flame,
  Heart,
  Music2,
  PartyPopper,
  Drum,
  Sparkles,
  Mic2,
  Palette,
  Disc3,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { CategoriesBackground } from "./CategoriesBackground";
import { CategoryRow } from "./CategoryRow";
import { categories as defaultCategories, categoriesRowTwo as defaultCategoriesRowTwo, type Category } from "./categoriesData";

const iconMap: Record<string, LucideIcon> = {
  "diwali-hits": Flame,
  "sangeet-songs": Music2,
  "ladies-club": Crown,
  "bollywood-classics": Clapperboard,
  "dance-masala": PartyPopper,
  "punjabi-tadka": Drum,
  "romantic-hits": Heart,
  "garba-night": Sparkles,
  "kitty-party": Crown,
  "holi-colors": Palette,
  "retro-90s": Disc3,
  "wedding-antakshari": Mic2,
};

function mapPlaylistToCategory(item: PlaylistApi): Category {
  return {
    id: item.id,
    emoji: item.emoji ?? "🎵",
    name: item.name,
    songCount: item.songCount ?? "75 Songs",
    badge: item.badge ?? "Playlist Ready",
    Icon: iconMap[item.id] ?? Music2,
  };
}

export function CategoriesSection() {
  const { data: fetchedPlaylists } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

  const categories = useMemo(() => {
    if (!fetchedPlaylists || !fetchedPlaylists.length) {
      return defaultCategories;
    }
    const mapped = fetchedPlaylists.map(mapPlaylistToCategory);
    return mapped.slice(0, Math.ceil(mapped.length / 2));
  }, [fetchedPlaylists]);

  const categoriesRowTwo = useMemo(() => {
    if (!fetchedPlaylists || !fetchedPlaylists.length) {
      return defaultCategoriesRowTwo;
    }
    const mapped = fetchedPlaylists.map(mapPlaylistToCategory);
    return mapped.slice(Math.ceil(mapped.length / 2));
  }, [fetchedPlaylists]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const onViewPlaylist = () => scrollTo("live-rooms");
  const onPlayBingo = () => scrollTo("live-rooms");

  return (
    <section
      id="categories"
      className="relative overflow-hidden bg-bb-bg px-5 pb-16 pt-20 sm:px-8 lg:px-12 lg:pb-20 lg:pt-24"
      data-testid="section-categories"
    >
      <CategoriesBackground />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-bb-text sm:text-4xl">
              Choose Your Vibe
            </h2>
            <Sparkles className="h-5 w-5 fill-bb-primary text-bb-primary" />
          </div>
          <p className="mx-auto mt-3 max-w-lg text-base text-bb-muted">
            Pick your favorite theme and{" "}
            <span className="font-semibold text-bb-primary">start playing</span> in seconds.
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
            onClick={() => scrollTo("live-rooms")}
            data-testid="button-explore-all-categories"
            className="inline-flex items-center gap-1 rounded-full border border-bb-border bg-bb-elevated px-6 py-2.5 text-sm font-semibold text-bb-primary shadow-sm transition-all hover:border-bb-primary/30 hover:shadow-md"
          >
            Explore All Categories
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
