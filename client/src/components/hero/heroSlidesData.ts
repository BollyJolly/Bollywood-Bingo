export type HeroSlideVisual = "bingo" | "playlist" | "wallet" | "lobby";

export type HeroSlideButton = {
  label: string;
  target: string;
  variant: "primary" | "secondary";
};

export type HeroSlideData = {
  id: string;
  badge: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  bullets?: string[];
  buttons: [HeroSlideButton, HeroSlideButton];
  background: string;
  glow: string;
  visual: HeroSlideVisual;
};

export const heroSlides: HeroSlideData[] = [
  {
    id: "multiplayer",
    badge: "🎮 Multiplayer Bollywood Bingo",
    headingLine1: "Play Bollywood Bingo",
    headingLine2: "With Friends Anywhere",
    description:
      "Create rooms, invite friends or join live public games from anywhere in the world.",
    buttons: [
      { label: "Play Now", target: "live-rooms", variant: "primary" },
      { label: "Browse Rooms", target: "live-rooms", variant: "secondary" },
    ],
    background: "linear-gradient(135deg, #0D0B16 0%, #25103A 45%, #4A114B 100%)",
    glow: "radial-gradient(ellipse 70% 60% at 75% 40%, rgba(255,45,117,0.22), transparent)",
    visual: "bingo",
  },
  {
    id: "playlists",
    badge: "🎵 75 Songs Per Playlist",
    headingLine1: "Every Party",
    headingLine2: "Has Its Own Playlist",
    description: "Play Sangeet, Diwali, Bollywood Classics, Punjabi Hits and more.",
    buttons: [
      { label: "Explore Categories", target: "categories", variant: "primary" },
      { label: "View Playlist", target: "featured-playlists", variant: "secondary" },
    ],
    background: "linear-gradient(135deg, #0D0B16 0%, #3B0764 35%, #7C2D12 100%)",
    glow: "radial-gradient(ellipse 70% 60% at 72% 42%, rgba(255,45,117,0.28), transparent)",
    visual: "playlist",
  },
  {
    id: "stars",
    badge: "⭐ Earn & Spend Stars",
    headingLine1: "Create Rooms",
    headingLine2: "Win More Stars",
    description: "Every new player receives 30 stars.",
    bullets: ["Create Room: 10 Stars", "Join Room: 5 Stars"],
    buttons: [
      { label: "Create Room", target: "live-rooms", variant: "primary" },
      { label: "Learn More", target: "star-wallet", variant: "secondary" },
    ],
    background: "linear-gradient(135deg, #0D0B16 0%, #422006 40%, #78350F 100%)",
    glow: "radial-gradient(ellipse 68% 58% at 74% 40%, rgba(255,200,61,0.35), transparent)",
    visual: "wallet",
  },
  {
    id: "live",
    badge: "🏆 Real-Time Multiplayer",
    headingLine1: "Play Live",
    headingLine2: "Compete Together",
    description:
      "Play in real-time with friends and family. Mark your card faster than everyone else.",
    buttons: [
      { label: "Join Live Game", target: "live-rooms", variant: "primary" },
      { label: "Watch Demo", target: "cta", variant: "secondary" },
    ],
    background: "linear-gradient(135deg, #0D0B16 0%, #1E1B4B 40%, #4C1D95 100%)",
    glow: "radial-gradient(ellipse 70% 60% at 70% 45%, rgba(139,92,246,0.32), transparent)",
    visual: "lobby",
  },
];
