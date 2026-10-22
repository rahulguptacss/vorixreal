'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
  /** Optional styling for the trailing suffix, e.g. a lighter "+" */
  suffixClassName?: string;
}

/** Count-up number that animates once when scrolled into view (supports "25+", "$1.5M" etc.) */
export default function Counter({ value, duration = 2, delay = 0, className = '', suffixClassName = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [count, setCount] = useState(0);

  const { prefix, target, suffix, isNumber, decimals } = useMemo(() => {
    const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) return { prefix: '', target: 0, suffix: value, isNumber: false, decimals: 0 };
    const parts = match[2].split('.');
    return {
      prefix: match[1] || '',
      target: parseFloat(match[2]),
      suffix: match[3] || '',
      isNumber: true,
      decimals: parts.length > 1 ? parts[1].length : 0,
    };
  }, [value]);

  useEffect(() => {
    if (!isInView || !isNumber) return;
    let frame = 0;
    const timeout = setTimeout(() => {
      let start: number | null = null;
      const tick = (now: number) => {
        if (start === null) start = now;
        const progress = Math.min((now - start) / 1000 / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(parseFloat((eased * target).toFixed(decimals)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [isInView, isNumber, target, duration, delay, decimals]);

  if (!isNumber) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </span>
  );
}
