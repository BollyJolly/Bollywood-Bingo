import type { Express, Request, Response } from "express";
import type { Server } from "node:http";
import { z, ZodError } from "zod";
import {
  callNumberSchema,
  createRoomSchema,
  roomCodeSchema,
  TAMBOLA_MAX,
  TAMBOLA_MIN,
} from "@shared/schema";
import {
  generateUniqueRoomCode,
  parseCalledNumbers,
  serializeRoom,
  storage,
} from "./storage";

type FieldError = { field: string; message: string };

function flattenZodErrors(error: ZodError): FieldError[] {
  return error.issues.map((issue) => ({
    field: issue.path.length ? issue.path.join(".") : "(root)",
    message: issue.message,
  }));
}

function sendValidationError(res: Response, error: ZodError, message = "Invalid request") {
  res.status(400).json({ message, errors: flattenZodErrors(error) });
}

function parseRoomCodeParam(value: unknown) {
  return roomCodeSchema.safeParse(typeof value === "string" ? value : "");
}

export async function registerRoutes(
  _httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, time: new Date().toISOString() });
  });

  app.get("/api/rooms", async (_req, res) => {
    const rooms = await storage.listRooms();
    res.json(rooms.map(serializeRoom));
  });

  app.get("/api/rooms/:code", async (req: Request, res) => {
    const codeParse = parseRoomCodeParam(req.params.code);
    if (!codeParse.success) {
      return sendValidationError(res, codeParse.error, "Invalid room code");
    }
    const room = await storage.getRoom(codeParse.data);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }
    res.json(serializeRoom(room));
  });

  app.post("/api/rooms", async (req, res) => {
    const parsed = createRoomSchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      return sendValidationError(res, parsed.error, "Could not create room");
    }
    const code = parsed.data.code ?? (await generateUniqueRoomCode());
    if (parsed.data.code) {
      const existing = await storage.getRoom(code);
      if (existing) {
        res.status(409).json({ message: "That room code is already taken" });
        return;
      }
    }
    try {
      const room = await storage.createRoom({
        code,
        title: parsed.data.title,
        theme: parsed.data.theme,
        visibility: parsed.data.visibility,
        hostName: parsed.data.hostName,
        hostMode: parsed.data.hostMode,
        status: "waiting",
        maxPlayers: parsed.data.maxPlayers ?? (parsed.data.visibility === "public" ? 100 : 40),
        playerCount: 1,
        calledNumbers: "[]",
      });
      res.status(201).json(serializeRoom(room));
    } catch (err: unknown) {
      // Most likely a UNIQUE constraint race with a concurrent create.
      const message = err instanceof Error ? err.message : "";
      if (/UNIQUE/i.test(message)) {
        res.status(409).json({ message: "That room code is already taken" });
        return;
      }
      throw err;
    }
  });

  app.post("/api/rooms/:code/call", async (req, res) => {
    const codeParse = parseRoomCodeParam(req.params.code);
    if (!codeParse.success) {
      return sendValidationError(res, codeParse.error, "Invalid room code");
    }
    const room = await storage.getRoom(codeParse.data);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }
    const parsed = callNumberSchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      return sendValidationError(res, parsed.error, "Invalid call request");
    }

    const calledNumbers = parseCalledNumbers(room.calledNumbers);

    if (calledNumbers.length >= TAMBOLA_MAX) {
      res.status(409).json({ message: "All 90 numbers have already been called" });
      return;
    }

    let nextNumber: number | undefined;
    if (parsed.data.mode === "random") {
      const remaining: number[] = [];
      for (let n = TAMBOLA_MIN; n <= TAMBOLA_MAX; n++) {
        if (!calledNumbers.includes(n)) remaining.push(n);
      }
      if (!remaining.length) {
        res.status(409).json({ message: "All 90 numbers have already been called" });
        return;
      }
      nextNumber = remaining[Math.floor(Math.random() * remaining.length)];
    } else {
      nextNumber = parsed.data.number;
    }

    if (nextNumber === undefined) {
      // Defensive: schema enforces this, but keep a clear message.
      res.status(400).json({
        message: "Invalid call request",
        errors: [{ field: "number", message: `Provide a number between ${TAMBOLA_MIN} and ${TAMBOLA_MAX}` }],
      });
      return;
    }
    if (calledNumbers.includes(nextNumber)) {
      res.status(409).json({
        message: "That number has already been called",
        errors: [{ field: "number", message: `Number ${nextNumber} was already called` }],
      });
      return;
    }

    const updated = await storage.updateRoomCalls(room.code, [...calledNumbers, nextNumber], parsed.data.mode);
    if (!updated) {
      res.status(500).json({ message: "Failed to update room" });
      return;
    }
    res.json(serializeRoom(updated));
  });

  app.get("/api/leaderboard", async (_req, res) => {
    const players = await storage.listPlayers();
    res.json([...players].sort((a, b) => b.points - a.points));
  });

  app.get("/api/players", async (_req, res) => {
    const players = await storage.listPlayers();
    res.json(players);
  });

  app.get("/api/plans", async (_req, res) => {
    const plans = await storage.listPlans();
    res.json(
      plans.map((plan) => ({
        ...plan,
        benefits: parseBenefits(plan.benefits),
      }))
    );
  });

  return _httpServer;
}

function parseBenefits(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((b): b is string => typeof b === "string");
  } catch {
    return [];
  }
}

// Re-export for tests.
export { z };
