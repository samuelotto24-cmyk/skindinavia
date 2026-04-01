"use client";

export function MorphingBlob({
  color = "rgba(236,72,153,0.12)",
  size = 400,
  className = "",
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
        borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
        animation: "morphBlob 10s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes morphBlob {
          0%, 100% { border-radius: 60% 40% 50% 50% / 50% 60% 40% 50%; transform: rotate(0deg) scale(1); }
          25% { border-radius: 40% 60% 50% 50% / 60% 40% 50% 50%; transform: rotate(5deg) scale(1.05); }
          50% { border-radius: 50% 50% 40% 60% / 40% 50% 60% 50%; transform: rotate(-3deg) scale(0.97); }
          75% { border-radius: 45% 55% 60% 40% / 55% 45% 45% 55%; transform: rotate(4deg) scale(1.03); }
        }
      `}</style>
    </div>
  );
}
