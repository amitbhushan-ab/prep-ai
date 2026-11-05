import React from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * Mastercard's signature service card: a circular portrait with traced
 * orange orbit arcs and a white satellite CTA docked to its edge.
 */
const OrbitalPortrait = ({ icon: Icon, eyebrow, title, description, badge, onClick }) => {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className="group relative flex w-full flex-col items-center bg-transparent text-center"
    >
      <span className="relative mb-6 block">
        <span className="mc-orbit" aria-hidden="true" />
        <span className="mc-orbit mc-orbit-flip" aria-hidden="true" />

        <span className="relative flex h-[158px] w-[158px] items-center justify-center overflow-hidden rounded-full border border-[var(--mc-hairline)] bg-[var(--mc-surface)] shadow-[var(--mc-shadow-md)] transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:h-[172px] sm:w-[172px]">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(70%_70%_at_30%_18%,rgba(243,115,56,0.16),transparent_70%)]"
          />
          {Icon ? <Icon className="relative h-11 w-11 text-[var(--mc-ink)]" strokeWidth={1.35} /> : null}
        </span>

        <span className="absolute -bottom-1 -right-1 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--mc-hairline)] bg-[var(--mc-surface)] text-[var(--mc-ink)] shadow-[0_10px_24px_-12px_rgba(20,20,19,0.45)] transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </span>
      </span>

      {badge ? <span className="mc-keycap mb-3 text-[10px]">{badge}</span> : null}
      {eyebrow ? <span className="mc-eyebrow">{eyebrow}</span> : null}
      <span className="mt-2 text-[21px] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--mc-ink)]">
        {title}
      </span>
      {description ? (
        <span className="mt-2 max-w-[240px] text-[13.5px] leading-relaxed text-[var(--mc-mute)]">
          {description}
        </span>
      ) : null}
    </Tag>
  );
};

export default OrbitalPortrait;
