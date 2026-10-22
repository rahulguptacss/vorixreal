'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { HeroSectionData } from '../../types';
import Eyebrow from '../../ui/Eyebrow';
import PrimaryButton from '../../ui/PrimaryButton';

interface HeroProps {
  data: HeroSectionData;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ data }: HeroProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] });
  // Gentle parallax on the hero photo
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section id="home" className="relative w-full bg-white pt-6 sm:pt-10 pb-12 sm:pb-16 overflow-hidden">
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[620px] rounded-full bg-primary/[0.06] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Top row: Title left, description + CTA right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-8 sm:mb-10">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
              <Eyebrow text={data.eyebrow} />
            </motion.div>
            <h1 className="font-heading text-[44px] leading-[1.02] sm:text-6xl lg:text-[84px] font-medium tracking-tight text-primary-dark">
              {[data.title_line1, data.title_line2].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span
                    className={`block ${i === 1 ? 'font-semibold' : ''}`}
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="lg:col-span-5 lg:pb-3"
          >
            <p className="text-[15px] sm:text-base leading-relaxed text-muted max-w-md mb-6">{data.description}</p>
            <PrimaryButton href={data.cta_link} text={data.cta_text} />
          </motion.div>
        </div>

        {/* Hero image with reveal + parallax */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, clipPath: 'inset(12% 8% 0% 8%)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          className="relative w-full aspect-[16/10] sm:aspect-[16/8] lg:aspect-[16/7] overflow-hidden rounded-none bg-lavender shadow-[0_30px_80px_-30px_rgba(27,20,96,0.45)]"
        >
          <motion.div style={{ y: imageY }} className="absolute -inset-y-[8%] inset-x-0">
            <Image
              src={data.image}
              alt={data.image_alt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
