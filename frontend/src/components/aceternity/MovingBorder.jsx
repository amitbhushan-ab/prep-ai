import React from 'react';

/**
 * Aceternity-style moving border button: a slow conic gradient traces the pill.
 */
const MovingBorder = ({
  children,
  className = '',
  innerClassName = '',
  type = 'button',
  ...props
}) => (
  <button type={type} className={`mc-moving-border ${className}`} {...props}>
    <span className={`mc-moving-border-inner ${innerClassName}`}>{children}</span>
  </button>
);

export default MovingBorder;
