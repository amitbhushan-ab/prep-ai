import React, { useRef, useState } from 'react';

const SpotlightCard = ({ children, className = '', onClick }) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setCoords((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-[28px] border border-[var(--mc-hairline)] bg-[var(--mc-surface)] shadow-[var(--mc-shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--mc-hairline-strong)] hover:shadow-[var(--mc-shadow-md)] ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: coords.opacity,
          background: `radial-gradient(360px circle at ${coords.x}px ${coords.y}px, var(--mc-spotlight), transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default SpotlightCard;
