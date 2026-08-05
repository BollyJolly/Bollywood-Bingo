import { PlaylistCard } from "./PlaylistCard";
import { featuredPlaylists } from "./playlistsData";

export function FeaturedPlaylistsSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="featured-playlists"
      className="bg-bb-bg px-5 py-24 sm:px-8 lg:px-12 lg:py-28"
      data-testid="section-featured-playlists"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-black tracking-tight text-bb-text sm:text-4xl">
            Featured Playlists
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-bb-muted">
            Choose your favorite playlist and start the fun.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPlaylists.map((playlist, index) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              index={index}
              onPlay={() => scrollTo("live-rooms")}
              onPreview={() => scrollTo("live-rooms")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
