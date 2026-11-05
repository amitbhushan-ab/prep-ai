import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`mc-card mc-card-hover p-6 sm:p-7 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
