'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { House, Handshake, KeyRound, TrendingUp, Building, ArrowUpRight, type LucideIcon } from 'lucide-react';
import type { ServicesSectionData } from '../../types';
import Eyebrow from '../../ui/Eyebrow';

interface ServicesProps {
  data: ServicesSectionData;
}

const iconMap: Record<string, LucideIcon> = {
  house: House,
  handshake: Handshake,
  key: KeyRound,
  trending: TrendingUp,
  building: Building,
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function Services({ data }: ServicesProps) {
  return (
    <section id="services" className="relative w-full bg-lavender/60 py-14 sm:py-20 overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-primary/[0.07] blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Centered heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <Eyebrow text={data.eyebrow} align="center" />
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-[1.12] tracking-tight text-primary-dark">
            <span className="block font-light">{data.title_regular}</span>
            <span className="block font-semibold text-primary-gradient">{data.title_highlight}</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{data.subtitle}</p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {data.items.map((item, idx) => {
            const Icon = iconMap[item.icon] ?? House;
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease }}
                className="group relative flex flex-col rounded-none border border-primary/10 bg-white p-6 sm:p-7 shadow-[0_10px_30px_-20px_rgba(27,20,96,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/25 hover:shadow-[0_30px_60px_-25px_rgba(27,20,96,0.45)] overflow-hidden"
              >
                {/* Fill sweep on hover */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-lavender text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-[-6deg] group-hover:scale-110">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-semibold leading-snug text-primary-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted mb-6 flex-1">{item.description}</p>
                <Link
                  href={item.href}
                  aria-label={`${data.read_more_text ?? 'Learn More'}: ${item.title}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                >
                  <span className="relative">
                    {data.read_more_text ?? 'Learn More'}
                    <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:rotate-45">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
