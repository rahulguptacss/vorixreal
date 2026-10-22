'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, CalendarDays, Quote, Tag, User } from 'lucide-react';
import type { BlogDetailSectionData } from '../../types';

interface BlogDetailProps {
  data: BlogDetailSectionData;
  backHref?: string;
  backText?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function BlogDetail({ data, backHref = '/blog', backText = 'Back to Blog' }: BlogDetailProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <article className="relative w-full bg-white py-12 sm:py-16">
      {/* Reading progress bar */}
      <motion.div style={{ scaleX: progress }} className="fixed top-0 inset-x-0 z-[60] h-1 origin-left bg-primary" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-8"
        >
          <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lavender px-3 py-1 font-medium text-primary">
              <Tag className="h-3.5 w-3.5" />
              {data.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-primary" />
              {data.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4 text-primary" />
              {data.author}
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.15] tracking-tight text-primary-dark">
            {data.title}
          </h2>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, clipPath: 'inset(8% 6% 8% 6% round 24px)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-[24px] bg-lavender shadow-[0_30px_70px_-30px_rgba(27,20,96,0.5)]"
        >
          <Image src={data.hero_image} alt={data.hero_alt} fill priority sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="text-lg leading-relaxed text-foreground/80 mb-10"
        >
          {data.intro}
        </motion.p>

        <div className="space-y-9">
          {data.sections.map((section, idx) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease }}
            >
              <h3 className="mb-3 flex items-center gap-3 font-heading text-xl sm:text-2xl font-semibold text-primary-dark">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                {section.title}
              </h3>
              <p className="text-[15px] sm:text-base leading-relaxed text-muted">{section.paragraph}</p>
            </motion.section>
          ))}
        </div>

        {data.quote && (
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative mt-12 overflow-hidden rounded-[22px] bg-navy px-7 py-9 sm:px-10 text-white"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary-light/40 blur-3xl" />
            <Quote className="relative mb-4 h-8 w-8 text-white/60" />
            <p className="relative font-heading text-xl sm:text-2xl font-light leading-relaxed">{data.quote}</p>
          </motion.blockquote>
        )}

        <div className="mt-12 border-t border-primary/10 pt-8">
          <Link
            href={backHref}
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {backText}
          </Link>
        </div>
      </div>
    </article>
  );
}
