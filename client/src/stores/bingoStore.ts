import { create } from "zustand";
import { SONGS, getSongById } from "@/data/songs";
import type { GameState, PlayerCard, WinResult } from "@/types/bingo";
import {
  callNextSong as callNextSongEngine,
  checkWinner,
  createInitialGameState,
  getWinningCellIndices,
  startGame as startGameEngine,
  toggleCellMark,
} from "@/utils/bingoEngine";
import { generateBingoCard } from "@/utils/generateBingoCard";
import { getRoomByCode, nextSong, startRoomGame } from "@/global/roomsApi";
import { ROOM_INFO } from "@/components/bingo-game/bingoGameData";

function getRoomCodeFromUrl(): string {
  try {
    const hash = window.location.hash || "";
    const parts = hash.replace(/^#/, "").split("/").filter(Boolean);
    if ((parts[0] === "bingo-game" || parts[0] === "room") && parts[1]) {
      return parts[1];
    }
  } catch {
    // ignore
  }
  return ROOM_INFO.roomCode;
}

const DEFAULT_CATEGORY = "Bollywood";
const STORAGE_PREFIX = "bollywood_bingo_room_";

function buildSongPool(category: string): number[] {
  const filtered = SONGS.filter((s) => s.category === category);
  return (filtered.length >= 24 ? filtered : SONGS).map((s) => s.id);
}

function createFreshState(category: string = DEFAULT_CATEGORY) {
  const songIds = buildSongPool(category);
  return {
    gameState: createInitialGameState(category, songIds),
    playerCard: generateBingoCard(SONGS.filter((s) => songIds.includes(s.id))),
    winner: null as WinResult | null,
    winningCellIndices: [] as number[],
  };
}

function loadStateFromStorage(roomCode: string, category: string = DEFAULT_CATEGORY) {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${roomCode}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.playerCard && parsed.gameState) {
        return {
          gameState: parsed.gameState,
          playerCard: parsed.playerCard,
          winner: parsed.winner ?? null,
          winningCellIndices: parsed.winningCellIndices ?? [],
        };
      }
    }
  } catch {
    // fallback
  }
  return createFreshState(category);
}

function saveStateToStorage(
  roomCode: string,
  state: {
    gameState: GameState;
    playerCard: PlayerCard;
    winner: WinResult | null;
    winningCellIndices: number[];
  }
) {
  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}${roomCode}`,
      JSON.stringify({
        gameState: state.gameState,
        playerCard: state.playerCard,
        winner: state.winner,
        winningCellIndices: state.winningCellIndices,
      })
    );
  } catch {
    // ignore quota errors
  }
}

let currentAudio: HTMLAudioElement | null = null;

function playSongAudio(audioUrl: string) {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {
      // ignore
    }
    currentAudio = null;
  }

  if (audioUrl) {
    const audio = new Audio(audioUrl);
    currentAudio = audio;
    audio.play().catch((err) => {
      console.log("Audio play note:", err);
    });
  }
}

interface BingoStore {
  gameState: GameState;
  playerCard: PlayerCard;
  winner: WinResult | null;
  winningCellIndices: number[];

  initGame: (category?: string) => void;
  fetchRoom: (roomCode?: string) => Promise<void>;
  startGame: (roomCode?: string) => void;
  callNextSong: (roomCode?: string) => void;
  toggleCell: (cellIndex: number) => void;
  regenerateCard: () => void;
  dismissWinner: () => void;
  resetGame: () => void;
}

export const useBingoStore = create<BingoStore>((set, get) => ({
  ...createFreshState(),

  initGame: (category = DEFAULT_CATEGORY) => {
    const code = getRoomCodeFromUrl();
    const loaded = loadStateFromStorage(code, category);
    set(loaded);
  },

  fetchRoom: async (roomCode?: string) => {
    const code = roomCode || getRoomCodeFromUrl();
    try {
      const room = await getRoomByCode(code);
      if (room && typeof room === "object") {
        const rawCalled = room.calledNumbers ?? (room as any).data?.calledNumbers;
        const calledNumbers: number[] = Array.isArray(rawCalled) ? rawCalled : [];
        const roomStatus = String(room.status ?? (room as any).data?.status ?? "waiting");
        const mappedStatus: GameState["status"] = roomStatus === "live" || roomStatus === "playing" ? "playing" : "waiting";

        const { gameState, playerCard, winner, winningCellIndices } = get();
        const lastCalledId = calledNumbers.length > 0 ? calledNumbers[calledNumbers.length - 1] : null;
        const currentSong = lastCalledId ? getSongById(lastCalledId) ?? null : null;
        const songPool = buildSongPool(gameState.category);
        const remainingSongs = songPool.filter((id) => !calledNumbers.includes(id));

        const updatedStore = {
          gameState: {
            ...gameState,
            calledSongs: calledNumbers,
            currentSong: currentSong ?? gameState.currentSong,
            remainingSongs,
            status: mappedStatus,
          },
          playerCard,
          winner,
          winningCellIndices,
        };

        set(updatedStore);
        saveStateToStorage(code, updatedStore);
      }
    } catch (err: any) {
      console.error(`Failed to fetch room data for room ${code}:`, err);
    }
  },

  startGame: async (roomCode?: string) => {
    const code = roomCode || getRoomCodeFromUrl();
    try {
      const res = await startRoomGame(code);
      if (res && typeof res === "object") {
        const audioUrl = res.url || (res as any).data?.url;
        const songNumber = res.number ?? (res as any).data?.number;

        if (audioUrl) {
          playSongAudio(audioUrl);
        }

        const { gameState, playerCard } = get();
        const startedState = startGameEngine(gameState);

        if (typeof songNumber === "number") {
          const song = getSongById(songNumber);
          if (song) {
            const remainingSongs = startedState.remainingSongs.filter((id) => id !== song.id);
            const calledSongs = [song.id];

            const newState = {
              gameState: {
                ...startedState,
                currentSong: song,
                calledSongs,
                remainingSongs,
                status: "playing" as const,
              },
              playerCard,
              winner: null,
              winningCellIndices: [],
            };

            set(newState);
            saveStateToStorage(code, newState);
            return;
          }
        }

        const newState = {
          gameState: startedState,
          playerCard,
          winner: null,
          winningCellIndices: [],
        };
        set(newState);
        saveStateToStorage(code, newState);
      }
    } catch (err: any) {
      console.error(`Failed to call start game endpoint for room ${code}:`, err);
    }
  },

  callNextSong: async (roomCode?: string) => {
    const code = roomCode || getRoomCodeFromUrl();
    try {
      const res = await nextSong(code);
      if (res && typeof res === "object") {
        const audioUrl = res.url || (res as any).data?.url;
        const songNumber = res.number ?? (res as any).data?.number;

        if (audioUrl) {
          playSongAudio(audioUrl);
        }

        if (typeof songNumber === "number") {
          const song = getSongById(songNumber);
          if (song) {
            const { gameState, playerCard, winner, winningCellIndices } = get();
            let currentGameState = gameState;
            if (currentGameState.status === "waiting") {
              currentGameState = startGameEngine(currentGameState);
            }
            const remainingSongs = currentGameState.remainingSongs.filter((id) => id !== song.id);
            const calledSongs = currentGameState.calledSongs.includes(song.id)
              ? currentGameState.calledSongs
              : [...currentGameState.calledSongs, song.id];

            const newState = {
              gameState: {
                ...currentGameState,
                currentSong: song,
                calledSongs,
                remainingSongs,
                status: (remainingSongs.length === 0 ? "finished" : "playing") as GameState["status"],
              },
              playerCard,
              winner,
              winningCellIndices,
            };

            set(newState);
            saveStateToStorage(code, newState);
          }
        }
      }
    } catch (err: any) {
      console.error(`Failed to call next song endpoint for room ${code}:`, err);
    }
  },

  toggleCell: (cellIndex: number) => {
    const { playerCard, winner, gameState } = get();
    if (winner) return;

    const cell = playerCard.cells[cellIndex];
    if (!cell || cell.isFree) return;

    if (!cell.marked && !gameState.calledSongs.includes(cell.id)) {
      return;
    }

    const updatedCard = toggleCellMark(playerCard, cellIndex, gameState.calledSongs);
    const win = checkWinner(updatedCard);
    const code = getRoomCodeFromUrl();

    const newState = {
      playerCard: updatedCard,
      winner: win,
      winningCellIndices: win ? getWinningCellIndices(win) : [],
      gameState:
        win && gameState.status === "playing"
          ? { ...gameState, status: "finished" as const }
          : gameState,
    };

    set(newState);
    saveStateToStorage(code, newState);
  },

  regenerateCard: () => {
    const { gameState, winner } = get();
    if (winner) return;

    const songIds = buildSongPool(gameState.category);
    const code = getRoomCodeFromUrl();
    const newState = {
      gameState,
      playerCard: generateBingoCard(SONGS.filter((s) => songIds.includes(s.id))),
      winner: null,
      winningCellIndices: [],
    };

    set(newState);
    saveStateToStorage(code, newState);
  },

  dismissWinner: () => {
    const code = getRoomCodeFromUrl();
    const newState = { ...get(), winner: null, winningCellIndices: [] };
    set(newState);
    saveStateToStorage(code, newState);
  },

  resetGame: () => {
    const { gameState } = get();
    const fresh = createFreshState(gameState.category);
    const code = getRoomCodeFromUrl();
    set(fresh);
    saveStateToStorage(code, fresh);
  },
}));
