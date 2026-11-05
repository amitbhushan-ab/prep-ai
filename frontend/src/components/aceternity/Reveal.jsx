import React, { useEffect, useRef, useState } from 'react';

/**
 * Aceternity-style scroll reveal: fades and lifts content into place once.
 */
const Reveal = ({ children, delay = 0, className = '', as = 'div' }) => {
  const Tag = as;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={`mc-reveal ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
