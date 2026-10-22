'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbData, BreadcrumbItem } from '../../types';

interface BreadcrumbProps {
  data: BreadcrumbData;
  currentPage: string;
  items?: BreadcrumbItem[];
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Breadcrumb({ data, currentPage, items }: BreadcrumbProps) {
  const trail: BreadcrumbItem[] = items ?? [...data.items, { name: currentPage, href: '' }];

  return (
    <section className="relative w-full px-5 sm:px-8 pt-2">
      <div className="relative max-w-7xl mx-auto h-[240px] sm:h-[300px] overflow-hidden rounded-[24px] sm:rounded-[28px] bg-navy">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease }}
          className="absolute inset-0"
        >
          <Image src={data.background_image} alt={data.background_alt} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/25" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white"
          >
            {currentPage}
          </motion.h1>
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-white/80 backdrop-blur-sm"
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
      </div>
    </section>
  );
}
