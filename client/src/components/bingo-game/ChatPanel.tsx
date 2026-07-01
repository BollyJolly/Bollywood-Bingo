import { useState } from "react";
import { Send, Smile } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ROOM_INFO, type ChatMessage } from "./bingoGameData";
import { WelcomeCard } from "./WelcomeCard";

type Tab = "chat" | "players" | "info";

const TABS: { id: Tab; label: string }[] = [
  { id: "chat", label: "Chat" },
  { id: "players", label: `Players (${ROOM_INFO.players})` },
  { id: "info", label: "Info" },
];

export function ChatPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = () => {
    const text = message.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: "You",
        initials: "Y",
        isHost: false,
        message: text,
        time: "now",
        avatarClass: "bg-bb-primary",
      },
    ]);
    setMessage("");
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <nav className="flex shrink-0 gap-1 border-b border-bb-border px-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-4 py-3.5 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-bb-primary"
                : "text-bb-muted hover:text-bb-text",
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-bb-primary" />
            )}
          </button>
        ))}
      </nav>

      {activeTab === "chat" && (
        <>
          <div className="flex min-h-[440px] flex-1 flex-col">
            {messages.length === 0 ? (
              <div className="flex flex-1 items-center justify-center px-6 py-8">
                <WelcomeCard />
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <ChatMessageItem key={msg.id} {...msg} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-bb-border px-6 py-4">
            <div className="flex items-center gap-2 rounded-full border border-bb-border bg-bb-surface py-1.5 pl-4 pr-1.5">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm text-bb-text placeholder:text-bb-muted focus:outline-none"
              />
              <button
                type="button"
                className="p-2 text-bb-muted transition-colors hover:text-bb-muted"
                aria-label="Add emoji"
              >
                <Smile className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={sendMessage}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-bb-primary text-white transition-colors hover:bg-bb-primary-hover"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            {messages.length === 0 && (
              <p className="mt-3 text-center text-xs text-bb-muted">
                Game will start automatically when the timer ends.
              </p>
            )}
          </div>
        </>
      )}

      {activeTab === "players" && (
        <div className="flex flex-1 items-center justify-center p-12 text-sm text-bb-muted">
          {ROOM_INFO.players} players in the room
        </div>
      )}

      {activeTab === "info" && (
        <div className="space-y-4 p-6 text-sm">
          <InfoRow label="Category" value={ROOM_INFO.category} />
          <InfoRow label="Host" value={ROOM_INFO.host} />
          <InfoRow label="Prize Pool" value={`${ROOM_INFO.prizePool} Stars`} />
          <InfoRow label="Room Code" value={ROOM_INFO.roomCode} />
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-bb-border pb-3">
      <span className="text-bb-muted">{label}</span>
      <span className="font-medium text-bb-text">{value}</span>
    </div>
  );
}

function ChatMessageItem({
  name,
  initials,
  isHost,
  message,
  time,
  avatarClass,
}: ChatMessage) {
  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback className={cn("text-[11px] font-semibold text-white", avatarClass)}>
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-bb-text">{name}</span>
          {isHost && (
            <span className="rounded bg-bb-primary px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
              Host
            </span>
          )}
          <span className="text-xs text-bb-muted">{time}</span>
        </div>
        <p className="mt-1 inline-block max-w-sm rounded-2xl rounded-tl-sm bg-bb-surface px-3.5 py-2 text-sm leading-relaxed text-bb-text">
          {message}
        </p>
      </div>
    </div>
  );
}
