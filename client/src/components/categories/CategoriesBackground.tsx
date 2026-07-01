const DECORATIONS = [
  { char: "✦", left: "6%", top: "12%", size: 14, color: "#FF4D7E", delay: "0s" },
  { char: "♪", left: "14%", top: "68%", size: 18, color: "#E8B931", delay: "1.2s" },
  { char: "✦", left: "88%", top: "18%", size: 12, color: "#FF4D7E", delay: "0.6s" },
  { char: "♫", left: "92%", top: "72%", size: 16, color: "#FF4D7E", delay: "1.8s" },
  { char: "✦", left: "48%", top: "8%", size: 10, color: "#E8B931", delay: "2.4s" },
  { char: "♪", left: "72%", top: "82%", size: 14, color: "#FF4D7E", delay: "0.9s" },
];

export function CategoriesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {DECORATIONS.map((item, index) => (
        <span
          key={index}
          className="absolute animate-particle-drift opacity-20"
          style={{
            left: item.left,
            top: item.top,
            fontSize: item.size,
            color: item.color,
            animationDelay: item.delay,
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
}
