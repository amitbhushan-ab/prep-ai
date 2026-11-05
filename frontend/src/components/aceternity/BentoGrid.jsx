import React from 'react';

/**
 * Aceternity-style bento grid. Two thin primitives, zero layout magic:
 * the parent is a 12-column grid, cards claim spans via className.
 */
export const BentoGrid = ({ children, className = '' }) => (
  <div className={`grid grid-cols-1 gap-4 lg:grid-cols-12 ${className}`}>
    {children}
  </div>
);

export const BentoCard = ({ children, className = '' }) => (
  <div className={`mc-card mc-card-hover p-6 sm:p-7 ${className}`}>
    {children}
  </div>
);

export default BentoGrid;
