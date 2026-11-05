import React from 'react';

/**
 * Aceternity-style aurora backdrop, warmed for the cream canvas.
 * Pure CSS: soft drifting radial washes + optional dot field.
 */
const AuroraBackground = ({ children, className = '', showGrid = true }) => (
  <div className={`relative isolate overflow-hidden ${className}`}>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 mc-aurora" />
    {showGrid ? (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 mc-dots opacity-60" />
    ) : null}
    {children}
  </div>
);

export default AuroraBackground;
