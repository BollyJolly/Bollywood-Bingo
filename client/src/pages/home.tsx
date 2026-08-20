import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createRoom } from "@/global/roomsApi";
import { getRooms } from "@/global/roomsApi";
import { joinRoom } from "@/global/roomsApi";
import { useAuth } from "@/global/authContext";
import { getPlaylists } from "@/global/playlistsApi";
import { CategoriesSection } from "@/components/categories/CategoriesSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { GameRoomsSection } from "@/components/game-rooms/GameRoomsSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { HowItWorksSection } from "@/components/how-it-works/HowItWorksSection";
import { Navbar } from "@/components/navbar/Navbar";
import { StarWalletSection } from "@/components/star-wallet/StarWalletSection";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type GameRoom } from "@/components/game-rooms/gameRoomsData";

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

function inferEmoji(room: { title?: string; theme?: string }) {
  const text = `${room.title ?? ""} ${room.theme ?? ""}`.toLowerCase();
  if (text.includes("diwali")) return "🪔";
  if (text.includes("sangeet")) return "🎵";
  if (text.includes("punjabi")) return "🥁";
  if (text.includes("ladies")) return "👑";
  return "🎬";
}

function inferCategory(room: { title?: string; theme?: string; category?: string }): GameRoom["category"] {
  const explicit = room.category?.toLowerCase();
  if (explicit === "diwali" || explicit === "sangeet" || explicit === "punjabi" || explicit === "ladies" || explicit === "bollywood") {
    return explicit;
  }

  const text = `${room.title ?? ""} ${room.theme ?? ""}`.toLowerCase();
  if (text.includes("diwali")) return "diwali";
  if (text.includes("sangeet")) return "sangeet";
  if (text.includes("punjabi")) return "punjabi";
  if (text.includes("ladies")) return "ladies";
  return "bollywood";
}

function toGameRoom(room: Awaited<ReturnType<typeof getRooms>>[number]): GameRoom {
  const normalizedTitle = room?.title ?? (room as any)?.roomTitle ?? (room as any)?.name ?? "Live Room";
  const normalizedTheme = room?.theme ?? (room as any)?.roomTheme ?? "Bollywood Classics";
  const normalizedHost = room?.hostName ?? (room as any)?.host_name ?? (room as any)?.host ?? "Host";
  const normalizedPlayerCount = Number((room as any)?.playerCount ?? (room as any)?.player_count ?? 0);
  const normalizedMaxPlayers = Number((room as any)?.maxPlayers ?? (room as any)?.max_players ?? 0);
  const normalizedStatus = (room?.status ?? (room as any)?.roomStatus ?? "waiting") as GameRoom["status"];
  return {
    id: room?.code ?? (room as any)?.roomCode ?? `${normalizedTitle}-${Math.random().toString(36).slice(2, 8)}`,
    emoji: inferEmoji(room),
    name: normalizedTitle,
    theme: normalizedTheme,
    category: inferCategory(room),
    playerCount: Number.isFinite(normalizedPlayerCount) ? normalizedPlayerCount : 0,
    maxPlayers: Number.isFinite(normalizedMaxPlayers) ? normalizedMaxPlayers : 0,
    entryFee: 5,
    hostName: normalizedHost,
    hostInitials: normalizedHost
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "BB",
    status: normalizedStatus,
  };
}

function Home() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("bollywood-classics");
  const [roomVisibility, setRoomVisibility] = useState<"public" | "private">("public");
  const [hostName, setHostName] = useState(user?.name ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createRoomError, setCreateRoomError] = useState<string | null>(null);

  const { data: rawPlaylists } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

  const { data: rawLiveRooms } = useQuery({
    queryKey: ["live-rooms"],
    queryFn: getRooms,
  });

  const playlists = useMemo(() => (Array.isArray(rawPlaylists) ? rawPlaylists : []), [rawPlaylists]);
  const liveRooms = useMemo(() => (Array.isArray(rawLiveRooms) ? rawLiveRooms : []), [rawLiveRooms]);

  const rooms = useMemo(() => liveRooms.map(toGameRoom), [liveRooms]);
  const activeRoom = rooms[0];
  const lastCall = activeRoom?.status === "live" ? 77 : undefined;
  const recentCalls = activeRoom ? [77, 63, 58, 44, 39] : [];
  const visibleCallerLine = callerLineFor(lastCall);

  const openCreateRoom = () => {
    setHostName(user?.name ?? "");
    setCreateRoomError(null);
    setCreateRoomOpen(true);
  };

  const handleJoinRoom = async (roomCode: string) => {
    try {
      await joinRoom(roomCode);
      window.location.hash = `#/bingo-game/${roomCode}`;
    } catch (error) {
      setCreateRoomError(error instanceof Error ? error.message : "Could not join room.");
    }
  };

  const handleCreateRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreateRoomError(null);

    const availablePlaylists = playlists.length ? playlists : [
      { id: "diwali-hits", name: "Diwali Hits", emoji: "🪔" },
      { id: "sangeet-songs", name: "Sangeet Songs", emoji: "🎵" },
      { id: "ladies-club", name: "Ladies Club", emoji: "👑" },
      { id: "bollywood-classics", name: "Bollywood Classics", emoji: "🎬" },
      { id: "dance-masala", name: "Dance Masala", emoji: "🕺" },
      { id: "punjabi-tadka", name: "Punjabi Tadka", emoji: "🥁" },
      { id: "romantic-hits", name: "Romantic Hits", emoji: "💕" },
      { id: "garba-night", name: "Garba Night", emoji: "🪩" },
      { id: "kitty-party", name: "Kitty Party", emoji: "☕" },
      { id: "holi-colors", name: "Holi Colors", emoji: "🎨" },
      { id: "retro-90s", name: "Retro 90s", emoji: "📼" },
      { id: "wedding-antakshari", name: "Wedding Antakshari", emoji: "🎤" },
    ];

    const playlistId = selectedPlaylistId || availablePlaylists[0]?.id || "bollywood-classics";
    const matchedPlaylist = availablePlaylists.find((p) => p.id === playlistId) ?? availablePlaylists[0];
    const themeName = matchedPlaylist?.name || "Bollywood Classics";

    if (!roomTitle.trim() || !hostName.trim()) {
      setCreateRoomError("Title and host name are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createRoom({
        title: roomTitle.trim(),
        theme: themeName,
        playlistId: playlistId,
        visibility: roomVisibility,
        hostName: hostName.trim(),
        hostMode: "random",
      });

      setCreateRoomOpen(false);
      setRoomTitle("");
      setSelectedPlaylistId("bollywood-classics");
      setRoomVisibility("public");
      setCreateRoomError(null);

      await queryClient.invalidateQueries({ queryKey: ["live-rooms"] });

      // If the server returned a room code or id, navigate to the room page.
      // Prefer `code` then `id`.
      const roomCode = created?.code ?? created?.data?.code ?? undefined;
      const roomId = created?.id ?? created?.data?.id ?? undefined;
      if (roomCode) {
        window.location.hash = `#/bingo-game/${roomCode}`;
      } else if (roomId) {
        window.location.hash = `#/bingo-game/${roomId}`;
      }
    } catch (error) {
      setCreateRoomError(error instanceof Error ? error.message : "Could not create room.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-bb-bg text-bb-text">
      <Navbar onCreateRoom={openCreateRoom} />

      <HeroSection
        liveCard={{
          roomTitle: activeRoom?.name ?? "Diwali Night",
          playerCount: activeRoom?.playerCount ?? 48,
          maxPlayers: activeRoom?.maxPlayers ?? 120,
          currentNumber: lastCall ?? 77,
          recentNumbers: recentCalls.length ? recentCalls.slice(0, 5) : [77, 63, 58, 44, 39],
          callerLine: visibleCallerLine,
        }}
      />

      <CategoriesSection />

      <GameRoomsSection onCreateRoom={openCreateRoom} onJoinRoom={handleJoinRoom} rooms={rooms} />

      <HowItWorksSection />

      <StarWalletSection />

      <FaqSection />

      <CtaSection onCreateRoom={openCreateRoom} />

      <SiteFooter />

      <Dialog open={createRoomOpen} onOpenChange={setCreateRoomOpen}>
        <DialogContent className="border-white/10 bg-[#1B1330] text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create room</DialogTitle>
            <DialogDescription className="text-[#C9C3D7]">
              Create a new game room. The request will be sent only when you submit this form.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleCreateRoom}>
            <div className="space-y-2">
              <Label htmlFor="room-title">Room title</Label>
              <Input
                id="room-title"
                value={roomTitle}
                onChange={(event) => setRoomTitle(event.target.value)}
                placeholder="Diwali Night"
                className="border-white/10 bg-white/5 text-white placeholder:text-[#8F879E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="room-theme">Theme</Label>
              <select
                id="room-theme"
                value={selectedPlaylistId}
                onChange={(event) => setSelectedPlaylistId(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#1B1330] px-3.5 py-2.5 text-sm text-white focus:border-[#C81D4A] focus:outline-none"
              >
                {(playlists.length ? playlists : [
                  { id: "diwali-hits", name: "Diwali Hits", emoji: "🪔" },
                  { id: "sangeet-songs", name: "Sangeet Songs", emoji: "🎵" },
                  { id: "ladies-club", name: "Ladies Club", emoji: "👑" },
                  { id: "bollywood-classics", name: "Bollywood Classics", emoji: "🎬" },
                  { id: "dance-masala", name: "Dance Masala", emoji: "🕺" },
                  { id: "punjabi-tadka", name: "Punjabi Tadka", emoji: "🥁" },
                  { id: "romantic-hits", name: "Romantic Hits", emoji: "💕" },
                  { id: "garba-night", name: "Garba Night", emoji: "🪩" },
                  { id: "kitty-party", name: "Kitty Party", emoji: "☕" },
                  { id: "holi-colors", name: "Holi Colors", emoji: "🎨" },
                  { id: "retro-90s", name: "Retro 90s", emoji: "📼" },
                  { id: "wedding-antakshari", name: "Wedding Antakshari", emoji: "🎤" },
                ]).map((playlist) => (
                  <option key={playlist.id} value={playlist.id} className="bg-[#1B1330] text-white">
                    {playlist.emoji ? `${playlist.emoji} ${playlist.name}` : playlist.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="host-name">Host name</Label>
              <Input
                id="host-name"
                value={hostName}
                onChange={(event) => setHostName(event.target.value)}
                placeholder="Your name"
                className="border-white/10 bg-white/5 text-white placeholder:text-[#8F879E]"
              />
            </div>

            <div className="space-y-2">
              <Label>Visibility</Label>
              <div className="flex gap-3">
                {(["public", "private"] as const).map((visibility) => (
                  <button
                    key={visibility}
                    type="button"
                    onClick={() => setRoomVisibility(visibility)}
                    className={`rounded-xl border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                      roomVisibility === visibility
                        ? "border-[#C81D4A] bg-[#C81D4A]/15 text-white"
                        : "border-white/10 bg-white/5 text-[#C9C3D7]"
                    }`}
                  >
                    {visibility}
                  </button>
                ))}
              </div>
            </div>

            {createRoomError ? (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {createRoomError}
              </p>
            ) : null}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreateRoomOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-[#C81D4A] hover:bg-[#A6153B]">
                {isSubmitting ? "Creating..." : "Create room"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default Home;
