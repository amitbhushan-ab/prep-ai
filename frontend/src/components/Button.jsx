import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'mc-btn-primary',
    secondary: 'mc-btn-outline',
    danger: 'mc-btn-signal',
    ghost: 'mc-btn-ghost',
  };

  return (
    <button
      className={`mc-btn ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
