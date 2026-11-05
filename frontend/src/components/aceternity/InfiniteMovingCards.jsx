import React from 'react';

/**
 * Aceternity-style infinite marquee. Items are duplicated for a seamless loop
 * and the strip pauses on hover.
 */
const InfiniteMovingCards = ({ items = [], speed = 34, className = '' }) => (
  <div
    className={`mc-marquee-wrap relative overflow-hidden ${className}`}
    style={{ '--mc-marquee-duration': `${speed}s` }}
  >
    <div className="mc-marquee flex w-max">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex gap-3 pr-3" aria-hidden={copy === 1}>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`${copy}-${index}`}
                className="flex items-center gap-2.5 rounded-full border border-[var(--mc-hairline)] bg-[var(--mc-surface)] px-5 py-2.5"
              >
                {Icon ? <Icon className="h-4 w-4 text-[var(--mc-accent)]" strokeWidth={1.8} /> : null}
                <span className="text-[13px] font-medium text-[var(--mc-ink)]">{item.title}</span>
                {item.meta ? (
                  <span className="text-[12px] text-[var(--mc-mute)]">{item.meta}</span>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  </div>
);

export default InfiniteMovingCards;
