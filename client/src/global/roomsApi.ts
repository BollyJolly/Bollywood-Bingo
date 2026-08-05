import { apiClient } from "./apiClient";

export type LiveRoomApi = {
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

export type CreateRoomInput = {
  code?: string;
  title: string;
  theme: string;
  visibility: "public" | "private";
  hostName: string;
  hostMode?: "random" | "manual";
  maxPlayers?: number;
};

export async function createRoom(input: CreateRoomInput) {
  const response = await apiClient.post("/api/v1/rooms", input);

  return response.data;
}

export async function getRooms() {
  const response = await apiClient.get<LiveRoomApi[]>("/api/v1/rooms");
  return response.data;
}

export async function joinRoom(roomCode: string) {
  const response = await apiClient.post(`/api/v1/rooms/${roomCode}/join`);
  return response.data;
}
