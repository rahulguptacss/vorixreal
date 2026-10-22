'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { AboutSectionData } from '../../types';
import Eyebrow from '../../ui/Eyebrow';
import PrimaryButton from '../../ui/PrimaryButton';
import Counter from '../../ui/Counter';

interface AboutProps {
  data: AboutSectionData;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="relative w-full bg-white py-14 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* ── Left column: eyebrow + tagline + tall image ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-5 xl:col-span-4 flex flex-col"
          >
            <Eyebrow text={data.eyebrow} />
            <p className="whitespace-pre-line text-[15px] sm:text-base leading-snug text-foreground mb-8 sm:mb-10">
              {data.side_text}
            </p>

            <div className="group relative w-full flex-1 min-h-[420px] sm:min-h-[520px] overflow-hidden rounded-[4px] bg-lavender">
              <motion.div
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease }}
                className="absolute inset-0"
              >
                <Image
                  src={data.image_main}
                  alt={data.image_main_alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right column ── */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            {/* Heading */}
            <h2 className="font-heading text-[42px] leading-[1.05] sm:text-6xl lg:text-[68px] xl:text-[76px] tracking-tight text-primary-dark mb-10 sm:mb-14">
              {[data.title_regular, data.title_highlight].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: '105%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, delay: i * 0.12, ease }}
                    className={`block ${i === 0 ? 'font-normal text-foreground' : 'font-semibold'}`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 xl:gap-16 flex-1">
              {/* Stats — numbers count up when scrolled into view */}
              <div className="flex flex-col gap-7 sm:gap-9">
                {data.stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.7, delay: idx * 0.15, ease }}
                  >
                    <p className="font-heading text-[56px] sm:text-[64px] font-bold leading-none tracking-tight text-primary-dark">
                      <Counter
                        value={stat.value}
                        duration={2.2}
                        delay={0.2 + idx * 0.2}
                        suffixClassName="ml-0.5 align-top text-[0.62em] font-medium leading-none relative top-[0.12em]"
                      />
                    </p>
                    <p className="mt-3 text-xs sm:text-[13px] font-medium uppercase tracking-[0.28em] text-primary-dark/80">
                      {stat.label}
                    </p>

                    {/* Divider: thin line + short indigo accent that grows in */}
                    <div className="relative mt-6 h-px w-full max-w-[260px] bg-primary/15">
                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 + idx * 0.2, ease }}
                        className="absolute left-0 top-1/2 h-[3px] w-8 -translate-y-1/2 origin-left rounded-full bg-primary"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Copy + CTA + interior image with tags */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.15, ease }}
                className="flex flex-col"
              >
                <div className="space-y-4 text-[15px] sm:text-base leading-relaxed text-muted mb-7">
                  {data.description_paragraphs.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>

                <div className="mb-10">
                  <PrimaryButton href={data.button_link} text={data.button_text} className="px-5 py-3 text-sm" />
                </div>

                <div className="group relative mt-auto w-full aspect-[4/3] overflow-hidden rounded-[4px] bg-lavender">
                  <Image
                    src={data.image_secondary}
                    alt={data.image_secondary_alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  {data.tags && data.tags.length > 0 && (
                    <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-2 bg-primary-dark/85 px-3 py-3">
                      {data.tags.map((tag, i) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease }}
                          className="rounded-md border border-white/60 px-3 py-1 text-xs text-white transition-colors duration-300 hover:bg-white hover:text-primary-dark"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
