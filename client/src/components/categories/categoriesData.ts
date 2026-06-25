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
  type LucideIcon,
} from "lucide-react";

export type Category = {
  id: string;
  emoji: string;
  name: string;
  songCount: string;
  badge: string;
  headerGradient: string;
  glowColor: string;
  Icon: LucideIcon;
};

export const categories: Category[] = [
  {
    id: "diwali-hits",
    emoji: "🪔",
    name: "Diwali Hits",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    headerGradient: "from-[#4C1D95] via-[#7C3AED] to-[#EA580C]",
    glowColor: "rgba(251,191,36,0.35)",
    Icon: Flame,
  },
  {
    id: "sangeet-songs",
    emoji: "🎵",
    name: "Sangeet Songs",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    headerGradient: "from-[#6B21A8] via-[#DB2777] to-[#FF2D75]",
    glowColor: "rgba(255,45,117,0.4)",
    Icon: Music2,
  },
  {
    id: "ladies-club",
    emoji: "👑",
    name: "Ladies Club",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    headerGradient: "from-[#FF2D75] via-[#F472B6] to-[#FDBA74]",
    glowColor: "rgba(255,200,61,0.35)",
    Icon: Crown,
  },
  {
    id: "bollywood-classics",
    emoji: "🎬",
    name: "Bollywood Classics",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    headerGradient: "from-[#1E1B4B] via-[#4338CA] to-[#7C3AED]",
    glowColor: "rgba(99,102,241,0.35)",
    Icon: Clapperboard,
  },
  {
    id: "dance-masala",
    emoji: "🕺",
    name: "Dance Masala",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    headerGradient: "from-[#2563EB] via-[#4F46E5] to-[#7C3AED]",
    glowColor: "rgba(59,130,246,0.35)",
    Icon: PartyPopper,
  },
  {
    id: "punjabi-tadka",
    emoji: "🥁",
    name: "Punjabi Tadka",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    headerGradient: "from-[#EA580C] via-[#F59E0B] to-[#FBBF24]",
    glowColor: "rgba(251,191,36,0.4)",
    Icon: Drum,
  },
];

export const categoriesRowTwo: Category[] = [
  {
    id: "romantic-hits",
    emoji: "💕",
    name: "Romantic Hits",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    headerGradient: "from-[#BE185D] via-[#EC4899] to-[#FDA4AF]",
    glowColor: "rgba(236,72,153,0.4)",
    Icon: Heart,
  },
  {
    id: "garba-night",
    emoji: "🪩",
    name: "Garba Night",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    headerGradient: "from-[#7C2D12] via-[#C2410C] to-[#F59E0B]",
    glowColor: "rgba(245,158,11,0.4)",
    Icon: Sparkles,
  },
  {
    id: "kitty-party",
    emoji: "☕",
    name: "Kitty Party",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    headerGradient: "from-[#9D174D] via-[#DB2777] to-[#F9A8D4]",
    glowColor: "rgba(219,39,119,0.35)",
    Icon: Crown,
  },
  {
    id: "holi-colors",
    emoji: "🎨",
    name: "Holi Colors",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    headerGradient: "from-[#059669] via-[#10B981] to-[#FBBF24]",
    glowColor: "rgba(16,185,129,0.35)",
    Icon: Palette,
  },
  {
    id: "retro-90s",
    emoji: "📼",
    name: "Retro 90s",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    headerGradient: "from-[#312E81] via-[#6366F1] to-[#A78BFA]",
    glowColor: "rgba(99,102,241,0.35)",
    Icon: Disc3,
  },
  {
    id: "wedding-antakshari",
    emoji: "🎤",
    name: "Wedding Antakshari",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    headerGradient: "from-[#581C87] via-[#9333EA] to-[#FF2D75]",
    glowColor: "rgba(147,51,234,0.4)",
    Icon: Mic2,
  },
];
