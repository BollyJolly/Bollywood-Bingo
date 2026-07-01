import { useQuery } from "@tanstack/react-query";
import { CategoriesSection } from "@/components/categories/CategoriesSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { GameRoomsSection } from "@/components/game-rooms/GameRoomsSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { HowItWorksSection } from "@/components/how-it-works/HowItWorksSection";
import { Navbar } from "@/components/navbar/Navbar";
import { FeaturedPlaylistsSection } from "@/components/playlists/FeaturedPlaylistsSection";
import { StarWalletSection } from "@/components/star-wallet/StarWalletSection";

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

function useRoomData() {
  return useQuery<Room[]>({ queryKey: ["/api/rooms"], refetchInterval: 3500 });
}

function Home() {
  const { data: rooms = [] } = useRoomData();
  const activeRoom = rooms[0];
  const lastCall = activeRoom?.calledNumbers.at(-1);
  const recentCalls = activeRoom?.calledNumbers.slice(-10).reverse() ?? [];
  const visibleCallerLine = callerLineFor(lastCall);

  return (
    <main className="min-h-screen bg-bb-bg text-bb-text">
      <Navbar />

      <HeroSection
        liveCard={{
          roomTitle: activeRoom?.title ?? "Diwali Night",
          playerCount: activeRoom?.playerCount ?? 48,
          maxPlayers: activeRoom?.maxPlayers ?? 120,
          currentNumber: lastCall ?? 77,
          recentNumbers: recentCalls.length ? recentCalls.slice(0, 5) : [77, 63, 58, 44, 39],
          callerLine: visibleCallerLine,
        }}
      />

      <CategoriesSection />

      <GameRoomsSection />

      <HowItWorksSection />

      <StarWalletSection />

      <FeaturedPlaylistsSection />

      <FaqSection />

      <CtaSection />

      <SiteFooter />
    </main>
  );
}

export default Home;
