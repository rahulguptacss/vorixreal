'use client';

import { motion } from 'framer-motion';

interface EyebrowProps {
  text: string;
  align?: 'left' | 'center';
  light?: boolean;
}

/** Small uppercase section label with animated accent line(s), e.g. "— OUR SERVICES —" */
export default function Eyebrow({ text, align = 'left', light = false }: EyebrowProps) {
  const lineClass = `h-px w-8 sm:w-10 ${light ? 'bg-white/60' : 'bg-primary/60'}`;

  return (
    <div className={`flex items-center gap-3 mb-3 ${align === 'center' ? 'justify-center' : ''}`}>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`${lineClass} origin-right`}
      />
      <span
        className={`text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] ${
          light ? 'text-white/80' : 'text-primary'
        }`}
      >
        {text}
      </span>
      {align === 'center' && (
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`${lineClass} origin-left`}
        />
      )}
    </div>
  );
}
