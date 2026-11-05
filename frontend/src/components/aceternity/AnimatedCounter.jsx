import React, { useEffect, useRef, useState } from 'react';

/**
 * Aceternity-style count-up number that animates once when scrolled into view.
 */
const AnimatedCounter = ({
  value = 0,
  duration = 1300,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const ref = useRef(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(value);
      return undefined;
    }

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(value * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === 'undefined') {
      run();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
