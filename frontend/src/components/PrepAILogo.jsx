import React from 'react';

/**
 * PrepAI Iconic Brand Logo
 * Features:
 * - Scalable geometric 'P' emblem fused with an ascent pathway
 * - Intelligent AI Spark with a delicate Misty Rose highlight
 * - Crisp, theme-aware typographic wordmark
 */
const PrepAILogo = ({ 
  size = 'md', 
  showWordmark = true, 
  animated = false,
  className = '' 
}) => {
  // Dimensions map
  const sizeMap = {
    sm: { icon: 24, font: 'text-sm', badge: 'text-[9px] px-1 py-0.2' },
    md: { icon: 30, font: 'text-[15px]', badge: 'text-[10px] px-1.5 py-0.2' },
    lg: { icon: 38, font: 'text-xl', badge: 'text-xs px-2 py-0.5' },
    xl: { icon: 48, font: 'text-2xl', badge: 'text-xs px-2.5 py-0.5' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const iconPx = currentSize.icon;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon Symbol */}
      <div 
        className={`relative flex items-center justify-center shrink-0 ${animated ? 'hover:scale-105 transition-transform duration-200' : ''}`}
        style={{ width: iconPx, height: iconPx }}
      >
        <svg 
          viewBox="0 0 36 36" 
          width={iconPx} 
          height={iconPx} 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xs"
        >
          <defs>
            {/* Primary gradient: Deep Indigo to Electric Blue */}
            <linearGradient id="prepaiBrandGrad" x1="3" y1="3" x2="33" y2="33" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4338CA" /> {/* Indigo 700 */}
              <stop offset="0.45" stopColor="#3B82F6" /> {/* Blue 500 */}
              <stop offset="1" stopColor="#0ea5e9" /> {/* Sky 500 */}
            </linearGradient>

            {/* Spark gradient: Delicate Misty Rose to Soft Peach */}
            <linearGradient id="prepaiMistySpark" x1="18" y1="5" x2="28" y2="15" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFE4E1" /> {/* Misty Rose */}
              <stop offset="0.6" stopColor="#FCA5A5" />
              <stop offset="1" stopColor="#F472B6" />
            </linearGradient>

            {/* Inner top glow reflection */}
            <linearGradient id="prepaiSheen" x1="18" y1="2" x2="18" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Squircle base */}
          <rect 
            x="2" 
            y="2" 
            width="32" 
            height="32" 
            rx="9.5" 
            fill="url(#prepaiBrandGrad)" 
          />

          {/* Top glass sheen */}
          <rect 
            x="2.5" 
            y="2.5" 
            width="31" 
            height="16" 
            rx="9" 
            fill="url(#prepaiSheen)" 
          />

          {/* Delicate border hairline */}
          <rect 
            x="2.5" 
            y="2.5" 
            width="31" 
            height="31" 
            rx="9" 
            stroke="rgba(255,255,255,0.2)" 
            strokeWidth="1" 
          />

          {/* Stylized 'P' Monogram */}
          {/* Vertical Stem */}
          <rect 
            x="9" 
            y="9" 
            width="3.5" 
            height="18" 
            rx="1.75" 
            fill="#FFFFFF" 
          />

          {/* P Loop with aerodynamic curve */}
          <path 
            d="M10.5 9.5H18C21.0376 9.5 23.5 11.9624 23.5 15C23.5 18.0376 21.0376 20.5 18 20.5H10.5" 
            stroke="#FFFFFF" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* AI Spark Star (Top right intersection) */}
          <path 
            d="M24 5.5L25.1 8.5L28 9.6L25.1 10.7L24 13.8L22.9 10.7L20 9.6L22.9 8.5L24 5.5Z" 
            fill="url(#prepaiMistySpark)" 
          />

          {/* Tiny accent sparklet */}
          <circle cx="28.5" cy="5" r="1.2" fill="#FFE4E1" />
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex items-center gap-1.5 font-sans leading-none tracking-tight">
          <span className={`${currentSize.font} font-bold text-[var(--mc-ink)] tracking-[-0.03em]`}>
            Prep<span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-400 bg-clip-text text-transparent font-extrabold">AI</span>
          </span>
          <span className="hidden sm:inline-flex items-center font-mono font-medium rounded-full bg-[var(--mc-misty-rose-soft)] border border-[var(--mc-misty-rose-border)] text-[var(--mc-ink)] text-[9px] px-1.5 py-0.5 tracking-wider uppercase">
            Platform
          </span>
        </div>
      )}
    </div>
  );
};

export default PrepAILogo;
