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
  Icon: LucideIcon;
};

export const categories: Category[] = [
  {
    id: "diwali-hits",
    emoji: "🪔",
    name: "Diwali Hits",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    Icon: Flame,
  },
  {
    id: "sangeet-songs",
    emoji: "🎵",
    name: "Sangeet Songs",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    Icon: Music2,
  },
  {
    id: "ladies-club",
    emoji: "👑",
    name: "Ladies Club",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    Icon: Crown,
  },
  {
    id: "bollywood-classics",
    emoji: "🎬",
    name: "Bollywood Classics",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    Icon: Clapperboard,
  },
  {
    id: "dance-masala",
    emoji: "🕺",
    name: "Dance Masala",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    Icon: PartyPopper,
  },
  {
    id: "punjabi-tadka",
    emoji: "🥁",
    name: "Punjabi Tadka",
    songCount: "75 Songs",
    badge: "Playlist Ready",
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
    Icon: Heart,
  },
  {
    id: "garba-night",
    emoji: "🪩",
    name: "Garba Night",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    Icon: Sparkles,
  },
  {
    id: "kitty-party",
    emoji: "☕",
    name: "Kitty Party",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    Icon: Crown,
  },
  {
    id: "holi-colors",
    emoji: "🎨",
    name: "Holi Colors",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    Icon: Palette,
  },
  {
    id: "retro-90s",
    emoji: "📼",
    name: "Retro 90s",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    Icon: Disc3,
  },
  {
    id: "wedding-antakshari",
    emoji: "🎤",
    name: "Wedding Antakshari",
    songCount: "75 Songs",
    badge: "Playlist Ready",
    Icon: Mic2,
  },
];
