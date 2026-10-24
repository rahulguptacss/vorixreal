'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbData, BreadcrumbItem } from '../../types';

interface BreadcrumbProps {
  data: BreadcrumbData;
  /** Page title shown in the banner */
  currentPage: string;
  /** Large faded word behind the title — defaults to currentPage */
  watermark?: string;
  /** Custom trail (e.g. Home › Blog › Blog Detail). Defaults to data.items + currentPage */
  items?: BreadcrumbItem[];
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Shared full-width inner-page banner with an oversized watermark behind the title */
export default function Breadcrumb({ data, currentPage, watermark, items }: BreadcrumbProps) {
  const trail: BreadcrumbItem[] = items ?? [...data.items, { name: currentPage, href: '' }];
  const bgWord = watermark ?? currentPage;

  return (
    <section className="relative w-full h-[210px] sm:h-[300px] lg:h-[420px] overflow-hidden bg-navy">
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease }}
        className="absolute inset-0"
      >
        <Image src={data.background_image} alt={data.background_alt} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-navy/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/60" />

      {bgWord && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease }}
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-[62%] select-none overflow-hidden text-center font-serif text-[18vw] sm:text-[16vw] lg:text-[14vw] font-medium uppercase leading-none tracking-[0.04em] text-white/[0.14] whitespace-nowrap"
        >
          {bgWord}
        </motion.span>
      )}

      <div className="relative z-10 flex h-full flex-col items-center justify-center pt-8 sm:pt-10 lg:pt-8 px-5 sm:px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="font-serif text-3xl sm:text-5xl lg:text-[64px] font-medium tracking-tight text-white drop-shadow-[0_4px_24px_rgba(14,11,51,0.45)]"
        >
          {currentPage}
        </motion.h1>
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mt-2.5 sm:mt-4 inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white/75"
        >
          {trail.map((item, idx) => {
            const last = idx === trail.length - 1;
            return (
              <span key={`${item.name}-${idx}`} className="inline-flex items-center gap-2">
                {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/50" />}
                {last || !item.href ? (
                  <span className="font-medium text-white" aria-current={last ? 'page' : undefined}>
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.name}
                  </Link>
                )}
              </span>
            );
          })}
        </motion.nav>
      </div>
    </section>
  );
}
