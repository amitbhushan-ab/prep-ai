import React from 'react';

/**
 * Aceternity-style text generate effect: words fade in, staggered.
 */
const TextGenerate = ({ text = '', className = '', delay = 0, stagger = 55 }) => {
  const words = String(text).split(' ').filter(Boolean);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mc-word"
          style={{ '--mc-delay': `${delay + index * stagger}ms` }}
        >
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  );
};

export default TextGenerate;
