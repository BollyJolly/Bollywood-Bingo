const COLORS = ["#FF2D75", "#FFC83D", "#8B5CF6", "#34D399", "#F97316"];

const CONFETTI = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 4.3) % 100}%`,
  top: `${(index * 7) % 60}%`,
  width: index % 2 === 0 ? 6 : 4,
  height: index % 2 === 0 ? 4 : 6,
  color: COLORS[index % COLORS.length],
  delay: `${(index % 8) * 0.6}s`,
  duration: `${4 + (index % 5) * 0.8}s`,
}));

export function CtaConfetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {CONFETTI.map((piece) => (
        <span
          key={piece.id}
          className="absolute animate-confetti-fall rounded-sm"
          style={{
            left: piece.left,
            top: piece.top,
            width: piece.width,
            height: piece.height,
            backgroundColor: piece.color,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}
