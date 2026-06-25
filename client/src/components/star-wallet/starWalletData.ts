export type StarWalletItem = {
  id: string;
  emoji: string;
  title: string;
  stars: number;
  description: string;
  gradient: string;
  glow: string;
};

export const starWalletItems: StarWalletItem[] = [
  {
    id: "welcome-bonus",
    emoji: "⭐",
    title: "Welcome Bonus",
    stars: 30,
    description: "Every new player receives 30 free stars.",
    gradient: "from-[#FF2D75] via-[#FFC83D] to-[#FF2D75]",
    glow: "group-hover:shadow-[0_20px_50px_rgba(255,45,117,0.25)]",
  },
  {
    id: "create-room",
    emoji: "🏠",
    title: "Create Room",
    stars: 10,
    description: "Host your own private or public Bingo room.",
    gradient: "from-[#8B5CF6] via-[#FF2D75] to-[#8B5CF6]",
    glow: "group-hover:shadow-[0_20px_50px_rgba(139,92,246,0.25)]",
  },
  {
    id: "join-room",
    emoji: "🚪",
    title: "Join Room",
    stars: 5,
    description: "Join any live room and start playing instantly.",
    gradient: "from-[#FFC83D] via-[#FF2D75] to-[#FFC83D]",
    glow: "group-hover:shadow-[0_20px_50px_rgba(255,200,61,0.2)]",
  },
];

export const starWalletFooterNote =
  "Earn more stars by winning games and participating in events.";
