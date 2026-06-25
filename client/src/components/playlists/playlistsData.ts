export type Playlist = {
  id: string;
  emoji: string;
  name: string;
  songCount: number;
  duration: string;
  coverGradient: string;
};

export const featuredPlaylists: Playlist[] = [
  {
    id: "diwali-hits",
    emoji: "🎉",
    name: "Diwali Hits",
    songCount: 75,
    duration: "3h 45m",
    coverGradient: "from-[#FF2D75] via-[#F97316] to-[#FFC83D]",
  },
  {
    id: "sangeet-special",
    emoji: "🎵",
    name: "Sangeet Special",
    songCount: 75,
    duration: "4h 10m",
    coverGradient: "from-[#8B5CF6] via-[#FF2D75] to-[#EC4899]",
  },
  {
    id: "dance-party",
    emoji: "🕺",
    name: "Dance Party",
    songCount: 75,
    duration: "3h 30m",
    coverGradient: "from-[#3B82F6] via-[#8B5CF6] to-[#6366F1]",
  },
  {
    id: "bollywood-classics",
    emoji: "🎬",
    name: "Bollywood Classics",
    songCount: 75,
    duration: "4h 25m",
    coverGradient: "from-[#7C3AED] via-[#8B5CF6] to-[#A855F7]",
  },
  {
    id: "punjabi-beats",
    emoji: "🥁",
    name: "Punjabi Beats",
    songCount: 75,
    duration: "3h 55m",
    coverGradient: "from-[#F97316] via-[#FFC83D] to-[#FBBF24]",
  },
  {
    id: "romantic-collection",
    emoji: "💕",
    name: "Romantic Collection",
    songCount: 75,
    duration: "4h 05m",
    coverGradient: "from-[#F43F5E] via-[#FF2D75] to-[#FB7185]",
  },
];
