import {
  Gift,
  Home,
  Music2,
  Shield,
  Star,
  Trophy,
  User,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type StepBadge =
  | { type: "stars"; label: string }
  | { type: "pricing"; create: number; join: number }
  | { type: "rewards"; label: string };

export type HowItWorksStep = {
  id: string;
  step: string;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  Icon: LucideIcon;
  badge?: StepBadge;
};

export type HowItWorksFeature = {
  id: string;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  Icon: LucideIcon;
};

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: "create-account",
    step: "01",
    title: "Create Account",
    description: "Sign up in seconds and get 30 free stars instantly.",
    iconBg: "bg-bb-primary/10",
    iconColor: "text-bb-primary",
    Icon: User,
    badge: { type: "stars", label: "+30 Stars" },
  },
  {
    id: "create-join-room",
    step: "02",
    title: "Create or Join Room",
    description: "Create a room for 10 stars or join any live room for just 5 stars.",
    iconBg: "bg-bb-gold/15",
    iconColor: "text-bb-gold",
    Icon: Star,
    badge: { type: "pricing", create: 10, join: 5 },
  },
  {
    id: "listen-mark",
    step: "03",
    title: "Listen & Mark",
    description: "Songs are played live. Listen carefully and mark them on your Bingo card.",
    iconBg: "bg-bb-primary/10",
    iconColor: "text-bb-primary",
    Icon: Music2,
  },
  {
    id: "win-bingo",
    step: "04",
    title: "Win Bingo",
    description: "Complete a row or pattern before others and win exciting rewards.",
    iconBg: "bg-bb-gold/15",
    iconColor: "text-bb-gold",
    Icon: Trophy,
    badge: { type: "rewards", label: "Win Rewards" },
  },
];

export const howItWorksFeatures: HowItWorksFeature[] = [
  {
    id: "secure",
    title: "100% Secure",
    description: "Safe & fair gameplay guaranteed.",
    iconBg: "bg-bb-primary/10",
    iconColor: "text-bb-primary",
    Icon: Shield,
  },
  {
    id: "friends",
    title: "Play With Friends",
    description: "Invite friends or play with new opponents.",
    iconBg: "bg-bb-primary/10",
    iconColor: "text-bb-primary",
    Icon: Users,
  },
  {
    id: "realtime",
    title: "Real-Time Fun",
    description: "Live caller, real players, real excitement!",
    iconBg: "bg-bb-primary/10",
    iconColor: "text-bb-primary",
    Icon: Zap,
  },
  {
    id: "rewards",
    title: "Win Rewards",
    description: "Top players win stars & special prizes.",
    iconBg: "bg-bb-gold/15",
    iconColor: "text-bb-gold",
    Icon: Gift,
  },
];
