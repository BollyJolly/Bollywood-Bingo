const PARTICLES = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 17) % 84)}%`,
  top: `${12 + ((index * 23) % 76)}%`,
  size: index % 3 === 0 ? 4 : index % 3 === 1 ? 3 : 2,
  delay: `${(index % 6) * 1.2}s`,
  duration: `${8 + (index % 5) * 1.5}s`,
  color: index % 3 === 0 ? "#FF2D75" : index % 3 === 1 ? "#FFC83D" : "#8B5CF6",
}));

export function HeroParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PARTICLES.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full opacity-40 animate-particle-drift"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}
