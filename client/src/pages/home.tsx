import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  BadgeIndianRupee,
  Crown,
  Dices,
  Film,
  Globe2,
  LockKeyhole,
  Moon,
  Play,
  Plus,
  Radio,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Trophy,
  Users,
  Wand2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

type Room = {
  id: number;
  code: string;
  title: string;
  theme: string;
  visibility: "public" | "private";
  hostName: string;
  hostMode: "random" | "manual";
  status: "waiting" | "live";
  maxPlayers: number;
  playerCount: number;
  calledNumbers: number[];
};

type Player = {
  id: number;
  handle: string;
  city: string;
  country: string;
  level: number;
  points: number;
  wins: number;
  gamesPlayed: number;
  unlockTier: string;
};

type Plan = {
  id: number;
  key: string;
  name: string;
  durationDays: number;
  gamesUnlocked: number;
  priceLabel: string;
  benefits: string[];
};

const variants = [
  { name: "Classic 90", badge: "Free first play", unlocked: true },
  { name: "Shaadi Sangeet", badge: "30-day unlock", unlocked: true },
  { name: "Antakshari Bingo", badge: "VIP", unlocked: false },
  { name: "Cricket Interval", badge: "VIP", unlocked: false },
  { name: "Founder Premieres", badge: "Founder", unlocked: false },
];

const lobbyTabs = [
  { label: "Play", target: "game" },
  { label: "Private Parties", target: "game" },
  { label: "Sangeet Tables", target: "game" },
  { label: "Diwali Tables", target: "game" },
  { label: "Rewards", target: "passes" },
  { label: "VIP", target: "passes" },
];

const promoTiles = [
  { title: "First Kitty Free", body: "Open one public or private table without payment.", badge: "Free" },
  { title: "VIP Party Pass", body: "Unlock three or five premium themes for six months.", badge: "VIP" },
  { title: "Founder Host", body: "Lifetime access plus every future release.", badge: "Lifetime" },
];

const fallbackTablePlayers = [
  { handle: "Asha", city: "Mumbai", country: "India", level: 8, points: 8200 },
  { handle: "Meera", city: "Dubai", country: "UAE", level: 7, points: 7600 },
  { handle: "Ritu", city: "London", country: "UK", level: 6, points: 6400 },
  { handle: "Neha", city: "Toronto", country: "Canada", level: 5, points: 5200 },
  { handle: "Pooja", city: "Singapore", country: "SG", level: 4, points: 4100 },
  { handle: "Anika", city: "Delhi", country: "India", level: 3, points: 3100 },
];

const prizeLanes = [
  { label: "Early Five", progress: 60, reward: "+120" },
  { label: "Corners", progress: 42, reward: "+160" },
  { label: "Full House", progress: 27, reward: "+500" },
];

const cornerNumbers = [4, 77, 2, 88];

const achievements = [
  { icon: Trophy, label: "Full House", value: "+500 pts" },
  { icon: Sparkles, label: "Early Five", value: "+120 pts" },
  { icon: Star, label: "Weekend Streak", value: "2x bonus" },
  { icon: Crown, label: "Host Hero", value: "+80 pts" },
];

const bollywoodCallerLines: Record<number, string> = {
  4: "Chaar kadam bas chaar kadam, number four is on the floor.",
  9: "Navratri ka glow, number nine bolo.",
  16: "Sweet sixteen, Sangeet queen.",
  22: "Do aur do ka jadoo, twenty two.",
  31: "Tees ke baad ek, thirty one takes the cake.",
  39: "Thirty nine, dance line.",
  44: "Double chaar, filmi pyaar.",
  58: "Pachpan ke baad style, fifty eight with a smile.",
  63: "Sixty three, taaliyan please.",
  77: "Double seven, Diwali heaven.",
  88: "Double eight, kitty party great.",
};

function callerLineFor(number?: number) {
  if (!number) return "Waiting for the host to announce the next filmi number.";
  return bollywoodCallerLines[number] ?? `Filmi call for number ${number}. Mark it if it is on your ticket.`;
}

function playGameTone(kind: "mark" | "blocked" | "win" | "call", enabled: boolean) {
  if (!enabled || typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const ctx = new AudioContextClass();
  const gain = ctx.createGain();
  const osc = ctx.createOscillator();
  const tone = kind === "win" ? 660 : kind === "blocked" ? 160 : kind === "call" ? 440 : 520;
  osc.type = kind === "blocked" ? "sawtooth" : "sine";
  osc.frequency.setValueAtTime(tone, ctx.currentTime);
  if (kind === "win") osc.frequency.exponentialRampToValueAtTime(990, ctx.currentTime + 0.16);
  gain.gain.setValueAtTime(kind === "blocked" ? 0.04 : 0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (kind === "win" ? 0.42 : 0.16));
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + (kind === "win" ? 0.42 : 0.16));
  window.setTimeout(() => ctx.close().catch(() => undefined), 520);
}

const ticketRows = [
  [4, null, 16, null, 31, null, 58, null, 77],
  [null, 9, null, 22, 39, 44, null, 63, null],
  [2, null, 19, null, 36, null, 61, null, 88],
];

function Logo() {
  return (
    <svg aria-label="BollyBingo logo" viewBox="0 0 48 48" className="h-10 w-10 text-primary" fill="none">
      <path d="M10 15.5 24 7l14 8.5v17L24 41l-14-8.5v-17Z" stroke="currentColor" strokeWidth="2.5" />
      <path d="M17 18h10.2c3.7 0 6.1 2 6.1 5.1 0 3.2-2.3 5-6.2 5H17V18Z" stroke="currentColor" strokeWidth="2.5" />
      <path d="M18 18v10M25 18v10M32 20.5l6-3.5v14l-6-3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 10.5 11.5 6M34 10.5 36.5 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    setDark(document.documentElement.classList.contains("dark"));
  };
  return (
    <Button variant="outline" size="icon" onClick={toggle} data-testid="button-toggle-theme" aria-label="Toggle color theme">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

function useRoomData() {
  return useQuery<Room[]>({ queryKey: ["/api/rooms"], refetchInterval: 3500 });
}

function useLeaderboard() {
  return useQuery<Player[]>({ queryKey: ["/api/leaderboard"] });
}

function usePlans() {
  return useQuery<Plan[]>({ queryKey: ["/api/plans"] });
}

function Home() {
  const { toast } = useToast();
  const { data: rooms = [], isLoading: roomsLoading } = useRoomData();
  const { data: players = [] } = useLeaderboard();
  const { data: plans = [] } = usePlans();
  const [activeRoomCode, setActiveRoomCode] = useState("BOLLY90");
  const [joinCode, setJoinCode] = useState("DIWALI");
  const [manualNumber, setManualNumber] = useState("45");
  const [hostMode, setHostMode] = useState<"random" | "manual">("random");
  const [audioCaller, setAudioCaller] = useState(true);
  const [gameSounds, setGameSounds] = useState(true);
  const [callerLine, setCallerLine] = useState(callerLineFor(77));
  const [selectedPlan, setSelectedPlan] = useState("first_free");
  const [userMarks, setUserMarks] = useState<number[]>([]);
  const [milestones, setMilestones] = useState<string[]>([]);
  const [celebration, setCelebration] = useState<{ title: string; body: string } | null>(null);
  const [createState, setCreateState] = useState({
    title: "Friday Filmy Adda",
    theme: "Retro songs and dialogue prompts",
    visibility: "private" as "public" | "private",
    hostName: "You",
  });

  const activeRoom = rooms.find((room) => room.code === activeRoomCode) ?? rooms[0];
  const lastCall = activeRoom?.calledNumbers.at(-1);
  const visibleCallerLine = callerLine || callerLineFor(lastCall);

  const callMutation = useMutation({
    mutationFn: async () => {
      if (!activeRoom) throw new Error("Pick a room first");
      const response = await apiRequest("POST", `/api/rooms/${activeRoom.code}/call`, {
        mode: hostMode,
        number: hostMode === "manual" ? Number(manualNumber) : undefined,
      });
      return response.json();
    },
    onSuccess: (room: Room) => {
      const called = room.calledNumbers.at(-1);
      const line = callerLineFor(called);
      setCallerLine(line);
      if (audioCaller && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(line);
        utterance.rate = 0.92;
        utterance.pitch = 1.08;
        window.speechSynthesis.speak(utterance);
      }
      playGameTone("call", gameSounds);
      queryClient.invalidateQueries({ queryKey: ["/api/rooms"] });
      setActiveRoomCode(room.code);
      toast({ title: `Number ${room.calledNumbers.at(-1)} called`, description: `${room.title} board updated for everyone.` });
    },
    onError: (error: Error) => toast({ title: "Could not call that number", description: error.message, variant: "destructive" }),
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/rooms", {
        ...createState,
        code: createState.title.split(" ").map((word) => word[0]).join("").slice(0, 6).toUpperCase() + Math.floor(Math.random() * 10),
        hostMode,
        maxPlayers: createState.visibility === "public" ? 100 : 40,
      });
      return response.json();
    },
    onSuccess: (room: Room) => {
      queryClient.invalidateQueries({ queryKey: ["/api/rooms"] });
      setActiveRoomCode(room.code);
      toast({ title: "Room created", description: `${room.code} is ready to invite players.` });
    },
  });

  useEffect(() => {
    setUserMarks([]);
    setMilestones([]);
    setCelebration(null);
  }, [activeRoomCode]);

  const ticketNumbers = useMemo(() => ticketRows.flat().filter((n): n is number => typeof n === "number"), []);
  const calledTicketNumbers = useMemo(() => ticketNumbers.filter((number) => activeRoom?.calledNumbers.includes(number)), [activeRoom?.calledNumbers, ticketNumbers]);
  const markedCount = userMarks.length;
  const cornersMarked = cornerNumbers.every((number) => userMarks.includes(number));

  useEffect(() => {
    const next =
      markedCount >= 15 && !milestones.includes("full-house")
        ? { key: "full-house", title: "Full House!", body: "You cleared the ticket. Time for the loudest taali in the room." }
        : cornersMarked && !milestones.includes("corners")
          ? { key: "corners", title: "Corners!", body: "All four corners are marked. Kitty party momentum is yours." }
          : markedCount >= 5 && !milestones.includes("early-five")
            ? { key: "early-five", title: "Early Five!", body: "Five marks are in. You are officially on the prize board." }
            : null;
    if (!next) return;
    setMilestones((current) => [...current, next.key]);
    setCelebration({ title: next.title, body: next.body });
    playGameTone("win", gameSounds);
  }, [cornersMarked, gameSounds, markedCount, milestones]);

  const toggleTicketMark = (number: number) => {
    if (!activeRoom?.calledNumbers.includes(number)) {
      playGameTone("blocked", gameSounds);
      toast({ title: "Number not called yet", description: `Wait for the host to call ${number} before marking it.` });
      return;
    }
    setUserMarks((current) => {
      const marked = current.includes(number);
      return marked ? current.filter((item) => item !== number) : [...current, number];
    });
    playGameTone("mark", gameSounds);
  };

  const levelProgress = selectedPlan === "founder" ? 100 : selectedPlan.startsWith("vip") ? 76 : selectedPlan === "monthly" ? 44 : 18;
  const tablePlayers = [...players, ...fallbackTablePlayers].slice(0, 6);
  const recentCalls = activeRoom?.calledNumbers.slice(-10).reverse() ?? [];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_18%_0%,hsl(var(--primary)/0.18),transparent_26rem),radial-gradient(circle_at_84%_8%,hsl(39_96%_51%/0.34),transparent_30rem),linear-gradient(135deg,hsl(var(--background)),hsl(34_100%_91%))] text-foreground">
      {celebration && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-foreground/35 p-4 backdrop-blur-sm"
          data-testid="overlay-win-celebration"
        >
          <div className="celebration-burst relative w-full max-w-md overflow-hidden rounded-3xl border border-primary/30 bg-card p-6 text-center shadow-2xl">
            {Array.from({ length: 18 }, (_, index) => (
              <span key={index} className="confetti-bit" style={{ left: `${8 + index * 5}%`, animationDelay: `${index * 60}ms` }} />
            ))}
            <Badge className="mb-3">Prize unlocked</Badge>
            <h2 className="text-xl font-black">{celebration.title}</h2>
            <p className="mx-auto mt-2 text-sm text-muted-foreground">{celebration.body}</p>
            <Button className="mt-5" onClick={() => setCelebration(null)} data-testid="button-close-celebration">
              Continue playing
            </Button>
          </div>
        </motion.div>
      )}
      <header className="sticky top-0 z-50 border-b border-black/70 bg-black text-white shadow-xl shadow-black/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white">BollyBingo</p>
              <p className="text-sm text-white/65">Diwali, Sangeet and kitty party Tambola tables</p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex" aria-label="Lobby navigation">
            {lobbyTabs.map((tab) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => document.getElementById(tab.target)?.scrollIntoView({ behavior: "smooth" })}
                className={`relative rounded-full px-3 py-2 text-sm font-semibold transition ${
                  tab.label === "Play"
                    ? "text-white after:absolute after:-bottom-1 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-primary"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                data-testid={`button-nav-${tab.label.replace(/\s/g, "-").toLowerCase()}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:inline-flex" data-testid="badge-global-online">
              <Globe2 className="mr-1 h-3 w-3" /> 23 countries online
            </Badge>
            <Badge variant="outline" className="hidden border-white/20 bg-white/10 text-white md:inline-flex" data-testid="badge-player-wallet">
              <BadgeIndianRupee className="mr-1 h-3 w-3" /> 1 free kitty ticket
            </Badge>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,hsl(var(--primary)/0.62),transparent_18rem),radial-gradient(circle_at_82%_12%,hsl(39_96%_51%/0.48),transparent_22rem),linear-gradient(120deg,rgba(0,0,0,0.98),rgba(0,0,0,0.72))]" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:py-16">
          <div className="max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Badge className="bg-primary text-primary-foreground">First game free</Badge>
              <Badge variant="outline" className="border-white/25 bg-white/10 text-white">Private codes</Badge>
              <Badge variant="outline" className="border-white/25 bg-white/10 text-white">Bollywood caller audio</Badge>
            </div>
            <h1 className="text-xl font-black leading-tight tracking-tight sm:text-[2rem]">
              Bollywood Bingo tables for Diwali, Sangeet and kitty party players worldwide.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/72">
              Join a festive live table, mark your ticket as filmi calls drop, unlock VIP themes and climb the kitty leaderboard.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button onClick={() => document.getElementById("game")?.scrollIntoView({ behavior: "smooth" })} data-testid="button-hero-play">
                <Play className="mr-2 h-4 w-4" /> Play free table
              </Button>
              <Button variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/15" onClick={() => document.getElementById("table-preview")?.scrollIntoView({ behavior: "smooth" })} data-testid="button-hero-preview">
                Watch game room
              </Button>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl shadow-primary/20 backdrop-blur">
            <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(39_96%_51%))] p-1">
              <div className="rounded-[1.35rem] bg-black/90 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/55">Live now</p>
                <div className="mt-4 grid grid-cols-[1fr_auto] gap-4">
                  <div>
                    <p className="text-lg font-black">{activeRoom?.title ?? "Diwali Kitty Brunch"}</p>
                    <p className="mt-1 text-sm text-white/60">{activeRoom?.playerCount ?? 48}/{activeRoom?.maxPlayers ?? 120} players seated</p>
                  </div>
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-2xl font-black text-black shadow-lg" data-testid="hero-last-call">
                    {lastCall ?? "—"}
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-5 gap-2">
                  {recentCalls.slice(0, 5).map((number) => (
                    <span key={`hero-${number}`} className="rounded-full bg-white/10 px-2 py-1 text-center text-sm font-bold">
                      {number}
                    </span>
                  ))}
                </div>
                <p className="mt-5 rounded-2xl bg-white/10 p-3 text-sm font-semibold text-white/86">{visibleCallerLine}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="game" className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:py-7">
        <div className="grid gap-4 lg:grid-cols-[16rem_1fr_22rem]">
          <Card className="order-2 border-card-border bg-card/95 shadow-xl shadow-primary/5 lg:order-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Game lobby</CardTitle>
              <p className="text-sm text-muted-foreground">Pick a format like a poker room, but dressed for a daytime kitty party.</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {variants.map((variant) => (
                <button
                  key={variant.name}
                  type="button"
                  onClick={() => variant.unlocked && document.getElementById("table-preview")?.scrollIntoView({ behavior: "smooth" })}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left ${
                    variant.unlocked ? "border-border bg-background/75 hover-elevate active-elevate-2" : "border-border bg-muted/55 text-muted-foreground"
                  }`}
                  data-testid={`button-variant-${variant.name.replace(/\s/g, "-").toLowerCase()}`}
                >
                  <span>
                    <span className="block text-sm font-bold">{variant.name}</span>
                    <span className="block text-xs text-muted-foreground">{variant.badge}</span>
                  </span>
                  {variant.unlocked ? <Play className="h-4 w-4 text-primary" /> : <LockKeyhole className="h-4 w-4" />}
                </button>
              ))}
              <Separator />
              <div className="rounded-xl bg-[hsl(39_96%_51%/0.2)] p-3" data-testid="panel-lobby-wallet">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Wallet</p>
                <p className="mt-1 text-lg font-black">1 free game</p>
                <p className="text-xs text-muted-foreground">VIP and Founder unlocks appear here.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="order-1 overflow-hidden border-card-border bg-card/95 shadow-2xl shadow-primary/10 lg:order-2">
            <div className="flex h-5 items-center gap-1 bg-gradient-to-r from-primary via-[hsl(39_96%_51%)] to-accent px-4" aria-hidden="true">
              {Array.from({ length: 24 }, (_, index) => (
                <span key={index} className="h-2.5 w-2.5 rounded-full bg-white/70" />
              ))}
            </div>
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge data-testid="badge-lobby-free">First game free</Badge>
                    <Badge variant="outline">Public and private tables</Badge>
                    <Badge variant="outline">Bollywood caller audio</Badge>
                  </div>
                  <h1 className="max-w-2xl text-xl font-black leading-tight tracking-tight sm:text-[2rem]">
                    Choose a Diwali or Sangeet table and start playing in seconds.
                  </h1>
                </div>
                <Button onClick={() => document.getElementById("host")?.scrollIntoView({ behavior: "smooth" })} data-testid="button-lobby-host">
                  <Radio className="mr-2 h-4 w-4" /> Host table
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 rounded-2xl border border-border bg-background/65 p-3 sm:grid-cols-[1fr_auto]">
                <div className="space-y-2">
                  <Label htmlFor="lobby-join-code">Quick join private code</Label>
                  <Input id="lobby-join-code" value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} data-testid="input-lobby-join-code" />
                </div>
                <Button className="self-end" onClick={() => setActiveRoomCode(joinCode)} data-testid="button-lobby-join-room">
                  Join now
                </Button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {(roomsLoading ? [] : rooms).slice(0, 3).map((room) => {
                  const occupancy = Math.round((room.playerCount / room.maxPlayers) * 100);
                  return (
                    <button
                      key={room.code}
                      type="button"
                      onClick={() => setActiveRoomCode(room.code)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        activeRoomCode === room.code ? "border-primary bg-primary/12 shadow-lg shadow-primary/10" : "border-border bg-card/70"
                      } hover-elevate active-elevate-2`}
                      data-testid={`button-lobby-room-${room.code}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-black">{room.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{room.theme}</p>
                        </div>
                        <Badge variant={room.status === "live" ? "default" : "secondary"}>{room.status}</Badge>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          {room.visibility === "private" ? <LockKeyhole className="h-3.5 w-3.5" /> : <Users className="h-3.5 w-3.5" />}
                          {room.playerCount}/{room.maxPlayers} seated
                        </span>
                        <span className="font-semibold text-primary">Code {room.code}</span>
                      </div>
                      <Progress value={occupancy} className="mt-3" />
                    </button>
                  );
                })}
                {!roomsLoading && rooms.length === 0 && (
                  <div className="rounded-2xl border border-border bg-background/70 p-5 text-sm text-muted-foreground" data-testid="empty-lobby-rooms">
                    No tables are open yet. Host your first kitty table to get started.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <aside className="order-3 space-y-4">
            <Card className="border-card-border bg-card/95 shadow-xl shadow-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Player room</CardTitle>
                <p className="text-sm text-muted-foreground">Your stats, unlocks and live caller preview.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-border bg-background/70 p-4" data-testid="panel-lobby-player-rank">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Kitty rank</p>
                      <p className="mt-1 text-lg font-black">Tambola Queen</p>
                    </div>
                    <Crown className="h-5 w-5 text-primary" />
                  </div>
                  <Progress value={68} className="mt-3" />
                </div>
                <div className="rounded-xl border border-primary/25 bg-primary/10 p-4" data-testid="panel-lobby-caller-line">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Caller preview</p>
                  <p className="mt-2 text-sm font-semibold">{visibleCallerLine}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setGameSounds((value) => !value)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left ${gameSounds ? "border-primary bg-primary/10" : "border-border bg-background/70"} hover-elevate active-elevate-2`}
                  data-testid="button-toggle-game-sounds"
                >
                  <span>
                    <span className="block text-sm font-bold">Game sounds</span>
                    <span className="block text-xs text-muted-foreground">Mark taps, blocked taps and prize wins.</span>
                  </span>
                  <Badge variant={gameSounds ? "default" : "secondary"}>{gameSounds ? "On" : "Off"}</Badge>
                </button>
                <Button className="w-full" onClick={() => document.getElementById("table-preview")?.scrollIntoView({ behavior: "smooth" })} data-testid="button-lobby-open-ticket">
                  <Play className="mr-2 h-4 w-4" /> Open my ticket
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-3">
              {promoTiles.map((promo) => (
                <Card key={promo.title} className="border-card-border bg-card/90" data-testid={`card-promo-${promo.title.replace(/\s/g, "-").toLowerCase()}`}>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-black">{promo.title}</p>
                      <Badge variant="secondary">{promo.badge}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{promo.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-black">What&apos;s on</h2>
          <p className="mt-2 text-sm text-muted-foreground">Free entry, VIP passes, Founder tables and Bollywood caller flair.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {promoTiles.map((promo) => (
            <Card key={`whats-${promo.title}`} className="overflow-hidden border-card-border bg-card/95" data-testid={`card-whats-on-${promo.title.replace(/\s/g, "-").toLowerCase()}`}>
              <div className="h-20 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.72),transparent_8rem),linear-gradient(135deg,hsl(39_96%_51%/0.65),hsl(var(--accent)/0.4))]" />
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-sm font-black">{promo.title}</p>
                  <Badge variant="secondary">{promo.badge}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{promo.body}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="overflow-hidden border-card-border bg-card/95" data-testid="card-whats-on-caller">
            <div className="h-20 bg-[radial-gradient(circle_at_70%_20%,hsl(var(--primary)/0.72),transparent_8rem),linear-gradient(135deg,hsl(var(--accent)/0.45),hsl(39_96%_51%/0.55))]" />
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-sm font-black">Filmi Calls</p>
                <Badge variant="secondary">Audio</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Opt into Bollywood-style caller lines and later attach your own audio clips.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="space-y-6">
          <Card className="overflow-hidden border-card-border bg-card/95 shadow-2xl shadow-primary/10">
            <div className="flex h-5 items-center gap-1 bg-gradient-to-r from-primary via-[hsl(39_96%_51%)] to-accent px-4" aria-hidden="true">
              {Array.from({ length: 18 }, (_, index) => (
                <span key={index} className="h-2.5 w-2.5 rounded-full bg-white/70" />
              ))}
            </div>
            <CardContent className="p-6 sm:p-8">
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <Badge data-testid="badge-free-first-game">Game HUD</Badge>
                <Badge variant="outline" data-testid="badge-private-public">Live table perks</Badge>
                <Badge variant="outline" data-testid="badge-founder-life">XP and unlocks</Badge>
              </div>
              <h1 className="max-w-3xl text-xl font-black leading-tight tracking-tight sm:text-[2rem]">
                Your player dashboard before the next Bollywood call drops.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground">
                Track your rank, party pot, unlock status and prize targets while the host controls the live game room.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-background/70 p-4" data-testid="panel-player-level">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Kitty rank</p>
                  <p className="mt-1 text-lg font-black">Tambola Queen</p>
                  <Progress value={68} className="mt-3" />
                </div>
                <div className="rounded-xl border border-border bg-background/70 p-4" data-testid="panel-table-pot">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Party pot</p>
                  <p className="mt-1 text-lg font-black">12,900 pts</p>
                  <p className="mt-1 text-xs text-muted-foreground">Full House wins bragging rights</p>
                </div>
                <div className="rounded-xl border border-border bg-[hsl(39_96%_51%/0.22)] p-4" data-testid="panel-free-ticket">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Unlock status</p>
                  <p className="mt-1 text-lg font-black">1 free game</p>
                  <p className="mt-1 text-xs text-muted-foreground">Upgrade for next kitty</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {prizeLanes.map((prize) => (
                  <div key={`hud-${prize.label}`} className="rounded-xl border border-border bg-background/70 p-4" data-testid={`panel-hud-prize-${prize.label.replace(/\s/g, "-").toLowerCase()}`}>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-bold">{prize.label}</p>
                      <span className="text-xs font-black text-primary">{prize.reward} pts</span>
                    </div>
                    <Progress value={prize.progress} />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => document.getElementById("game")?.scrollIntoView({ behavior: "smooth" })} data-testid="button-start-playing">
                  <Play className="mr-2 h-4 w-4" /> Back to table lobby
                </Button>
                <Button variant="outline" onClick={() => document.getElementById("host")?.scrollIntoView({ behavior: "smooth" })} data-testid="button-host-game">
                  <Radio className="mr-2 h-4 w-4" /> Host my kitty
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-4">
            {achievements.map((item) => (
              <Card key={item.label} className="border-card-border bg-card/90" data-testid={`card-achievement-${item.label.replace(/\s/g, "-").toLowerCase()}`}>
                <CardContent className="flex items-center gap-3 p-4">
                  <item.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <Card id="table-preview" className="overflow-hidden border-card-border bg-card/95 shadow-2xl shadow-black/20">
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
            <div>
              <CardTitle className="text-lg">Live game room</CardTitle>
              <p className="text-sm text-muted-foreground">A festive multiplayer table with caller stage, player seats, prizes and your active ticket.</p>
            </div>
            <Badge variant={activeRoom?.status === "live" ? "default" : "secondary"} data-testid="status-active-room">
              {activeRoom?.status ?? "loading"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="space-y-2">
                <Label htmlFor="join-code">Private kitty code</Label>
                <Input id="join-code" value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} data-testid="input-join-code" />
              </div>
              <Button className="self-end" onClick={() => setActiveRoomCode(joinCode)} data-testid="button-join-room">
                Join party
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {(roomsLoading ? [] : rooms).map((room) => (
                <button
                  key={room.code}
                  className={`rounded-xl border p-3 text-left transition ${activeRoomCode === room.code ? "border-primary bg-primary/15 shadow-lg shadow-primary/10" : "border-border bg-background/70"} hover-elevate active-elevate-2`}
                  onClick={() => setActiveRoomCode(room.code)}
                  data-testid={`button-room-${room.code}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold">{room.title}</p>
                    {room.visibility === "private" ? <LockKeyhole className="h-4 w-4 text-muted-foreground" /> : <Users className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">{room.playerCount}/{room.maxPlayers} seated</p>
                    <Badge variant={room.status === "live" ? "default" : "secondary"}>{room.status}</Badge>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-primary">Party code {room.code}</p>
                </button>
              ))}
            </div>

            <div className="game-room rounded-3xl border border-border bg-[radial-gradient(circle_at_50%_8%,hsl(39_96%_51%/0.3),transparent_18rem),linear-gradient(145deg,hsl(var(--card)),hsl(var(--background)/0.86))] p-4">
              <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_auto]">
                <div className="rounded-2xl border border-border bg-card/75 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black" data-testid="text-active-room-title">{activeRoom?.title}</p>
                      <p className="text-xs text-muted-foreground">{activeRoom?.theme} · Hosted by {activeRoom?.hostName}</p>
                    </div>
                    <Badge variant="outline">{activeRoom?.visibility === "private" ? "Private party" : "Public table"}</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {recentCalls.length ? (
                      recentCalls.map((number) => (
                        <span key={`${activeRoom?.code}-${number}`} className="rounded-full bg-primary/12 px-2 py-1 text-center text-xs font-black text-primary" data-testid={`chip-recent-call-${number}`}>
                          {number}
                        </span>
                      ))
                    ) : (
                      <span className="col-span-5 rounded-full bg-muted px-3 py-2 text-center text-xs text-muted-foreground">Waiting for first call</span>
                    )}
                  </div>
                </div>

                <div className="bingo-call-pop grid min-w-36 place-items-center rounded-3xl bg-primary p-5 text-primary-foreground shadow-2xl shadow-primary/30">
                  <p className="text-xs font-bold uppercase tracking-[0.22em]">Last call</p>
                  <p className="text-[3rem] font-black leading-none tabular-nums" data-testid="text-last-call">{lastCall ?? "—"}</p>
                </div>
              </div>

              <div className="mb-4 rounded-2xl border border-primary/25 bg-card/85 p-4" data-testid="panel-caller-line">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Bollywood caller stage</p>
                  <Badge variant="secondary">Free audio opt-in</Badge>
                </div>
                <p className="text-base font-black">{visibleCallerLine}</p>
              </div>

              <div className="grid gap-4 xl:grid-cols-[11rem_1fr]">
                <div className="grid grid-cols-2 gap-2 xl:grid-cols-1">
                  {tablePlayers.map((player, index) => (
                    <div
                      key={`${player.handle}-${index}`}
                      className="seat-pulse rounded-2xl border border-border bg-card/80 p-3"
                      style={{ animationDelay: `${index * 130}ms` }}
                      data-testid={`seat-player-${index}`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="avatar-glow grid h-10 w-10 place-items-center rounded-full bg-secondary text-sm font-black text-secondary-foreground">
                          {player.handle.slice(0, 1)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold">{player.handle}</p>
                          <p className="truncate text-xs text-muted-foreground">Lv {player.level} · {player.city}, {player.country}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2 text-xs">
                        <span className="text-muted-foreground">{player.points.toLocaleString()} pts</span>
                        <span className="rounded-full bg-accent/12 px-2 py-0.5 font-bold text-accent">Ready</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-[1.75rem] border border-primary/25 bg-[linear-gradient(135deg,hsl(var(--accent)/0.18),hsl(39_96%_51%/0.2))] p-4 shadow-inner">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">My ticket</p>
                      <p className="text-sm font-bold">Tap called numbers as the host announces them.</p>
                    </div>
                    <Badge>{markedCount}/15 marked</Badge>
                  </div>
                  <div className="mb-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">{calledTicketNumbers.length} called on ticket</span>
                    <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">Tap called numbers to mark</span>
                  </div>
                  <div className="grid grid-cols-9 gap-1.5 rounded-2xl bg-card/80 p-3">
                    {ticketRows.flatMap((row, rowIndex) =>
                      row.map((number, colIndex) => {
                        const called = number !== null && activeRoom?.calledNumbers.includes(number);
                        const marked = number !== null && userMarks.includes(number);
                        return (
                          <button
                            type="button"
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => typeof number === "number" && toggleTicketMark(number)}
                            disabled={number === null}
                            aria-pressed={marked}
                            className={`flex aspect-square items-center justify-center rounded-lg border text-sm font-black transition ${
                              number === null
                                ? "border-transparent bg-muted/35"
                                : marked
                                  ? "ticket-marked border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                  : called
                                    ? "ticket-callable border-primary/50 bg-primary/10 text-primary hover:bg-primary/15"
                                    : "border-border bg-card hover:border-primary/30"
                            }`}
                            data-testid={`cell-ticket-${rowIndex}-${colIndex}`}
                          >
                            {number ?? ""}
                          </button>
                        );
                      })
                    )}
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between gap-3 text-sm">
                      <span>Ticket progress</span>
                      <span>Early Five, Lines, Corners, Full House</span>
                    </div>
                    <Progress value={(markedCount / 15) * 100} data-testid="progress-ticket-marked" />
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {prizeLanes.map((prize) => (
                  <div key={prize.label} className="rounded-2xl border border-border bg-card/80 p-3" data-testid={`panel-prize-${prize.label.replace(/\s/g, "-").toLowerCase()}`}>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-bold">{prize.label}</p>
                      <Badge variant="outline">{prize.reward} pts</Badge>
                    </div>
                    <Progress value={prize.progress} />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card id="host" className="bg-card/95">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Wand2 className="h-5 w-5 text-primary" /> Host console for the kitty captain</CardTitle>
            <p className="text-sm text-muted-foreground">Let the app call fairly at random, or manually pick a special number during dance, snacks or prize rounds.</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-2">
              <Button variant={hostMode === "random" ? "default" : "outline"} onClick={() => setHostMode("random")} data-testid="button-random-mode">
                <Dices className="mr-2 h-4 w-4" /> Auto caller
              </Button>
              <Button variant={hostMode === "manual" ? "default" : "outline"} onClick={() => setHostMode("manual")} data-testid="button-manual-mode">
                <Film className="mr-2 h-4 w-4" /> Pick number
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="space-y-2">
                <Label htmlFor="manual-number">Pick any uncalled number, 1-90</Label>
                <Input id="manual-number" type="number" min="1" max="90" value={manualNumber} onChange={(e) => setManualNumber(e.target.value)} data-testid="input-manual-number" />
              </div>
              <Button className="self-end" onClick={() => callMutation.mutate()} disabled={callMutation.isPending || !activeRoom} data-testid="button-call-number">
                Announce number
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setAudioCaller((value) => !value)}
              className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left ${audioCaller ? "border-primary bg-primary/10" : "border-border bg-background/70"} hover-elevate active-elevate-2`}
              data-testid="button-toggle-audio-caller"
            >
              <span>
                <span className="block text-sm font-bold">Bollywood flair audio</span>
                <span className="block text-xs text-muted-foreground">Free opt-in caller voice for filmi number lines. Later, this can use your uploaded audio clips.</span>
              </span>
              <Badge variant={audioCaller ? "default" : "secondary"}>{audioCaller ? "On" : "Off"}</Badge>
            </button>
            <div className="rounded-lg border border-border bg-background/70 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Tambola board</p>
              <div className="mt-3 grid grid-cols-10 gap-1">
                {Array.from({ length: 90 }, (_, index) => index + 1).map((n) => (
                  <span
                    key={n}
                    className={`rounded px-1.5 py-1 text-center text-xs ${activeRoom?.calledNumbers.includes(n) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                    data-testid={`number-board-${n}`}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/95">
          <CardHeader>
            <CardTitle className="text-lg">Create your kitty or Sangeet table</CardTitle>
            <p className="text-sm text-muted-foreground">Hosts can make a private party code, invite friends on WhatsApp, and unlock premium table themes.</p>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="room-title">Party name</Label>
              <Input id="room-title" value={createState.title} onChange={(e) => setCreateState({ ...createState, title: e.target.value })} data-testid="input-room-title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="host-name">Host name</Label>
              <Input id="host-name" value={createState.hostName} onChange={(e) => setCreateState({ ...createState, hostName: e.target.value })} data-testid="input-host-name" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="room-theme">Decor or party theme</Label>
              <Input id="room-theme" value={createState.theme} onChange={(e) => setCreateState({ ...createState, theme: e.target.value })} data-testid="input-room-theme" />
            </div>
            <div className="grid grid-cols-2 gap-2 md:col-span-2">
              <Button variant={createState.visibility === "private" ? "default" : "outline"} onClick={() => setCreateState({ ...createState, visibility: "private" })} data-testid="button-private-room">Private</Button>
              <Button variant={createState.visibility === "public" ? "default" : "outline"} onClick={() => setCreateState({ ...createState, visibility: "public" })} data-testid="button-public-room">Public</Button>
            </div>
            <Button className="md:col-span-2" onClick={() => createMutation.mutate()} disabled={createMutation.isPending} data-testid="button-create-room">
              <Plus className="mr-2 h-4 w-4" /> Create party table
            </Button>
          </CardContent>
        </Card>
      </section>

      <section id="passes" className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="bg-card/95">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><BadgeIndianRupee className="h-5 w-5 text-primary" /> Premium party passes</CardTitle>
            <p className="text-sm text-muted-foreground">First kitty game is free. Unlock more Diwali, Sangeet and festival tables for 30 days, six months or lifetime founder access.</p>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedPlan} onValueChange={setSelectedPlan}>
              <TabsList className="grid h-auto grid-cols-2 gap-1 md:grid-cols-5" data-testid="tabs-pricing">
                {plans.map((plan) => (
                  <TabsTrigger key={plan.key} value={plan.key} data-testid={`tab-plan-${plan.key}`}>{plan.name.split(" ")[0]}</TabsTrigger>
                ))}
              </TabsList>
              {plans.map((plan) => (
                <TabsContent key={plan.key} value={plan.key} className="mt-4">
                  <div className="rounded-xl border border-border bg-background/70 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-black">{plan.name}</h2>
                        <p className="text-sm text-muted-foreground">{plan.gamesUnlocked >= 999 ? "All games forever" : `${plan.gamesUnlocked} game unlock${plan.gamesUnlocked > 1 ? "s" : ""} · ${plan.durationDays} days`}</p>
                      </div>
                      <Badge data-testid="badge-plan-price">{plan.priceLabel}</Badge>
                    </div>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {plan.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm">
                          <ShieldCheck className="h-4 w-4 text-primary" /> {benefit}
                        </li>
                      ))}
                    </ul>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <div className="flex justify-between gap-3 text-sm">
                        <span>Unlock strength</span>
                        <span>{levelProgress}%</span>
                      </div>
                      <Progress value={levelProgress} data-testid="progress-unlock-strength" />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-card/95">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Trophy className="h-5 w-5 text-primary" /> Kitty leaderboard</CardTitle>
            <p className="text-sm text-muted-foreground">Friendly bragging rights for regular players across Diwali parties, ladies clubs and family events.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {players.map((player, index) => (
              <div key={player.id} className="rounded-lg border border-border bg-background/70 p-3" data-testid={`row-player-${player.id}`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold">{index + 1}. {player.handle}</p>
                    <p className="text-xs text-muted-foreground">{player.city}, {player.country} · Level {player.level}</p>
                  </div>
                  <Badge variant={player.unlockTier === "founder" ? "default" : "secondary"}>{player.unlockTier.replace("_", " ")}</Badge>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <span>{player.points.toLocaleString()} pts</span>
                  <span>{player.wins} wins</span>
                  <span>{player.gamesPlayed} games</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default Home;
