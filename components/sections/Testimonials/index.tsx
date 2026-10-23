'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import type { TestimonialsSectionData } from '../../types';
import Eyebrow from '../../ui/Eyebrow';

interface TestimonialsProps {
  data: TestimonialsSectionData;
}

const ease = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 6000;

function QuoteMark() {
  return (
    <svg viewBox="0 0 64 48" className="h-11 w-14 sm:h-12 sm:w-16 text-primary/20" fill="currentColor" aria-hidden="true">
      <path d="M0 26C0 12 7 3 21 0l3 6c-7 2-11 7-11 13h10v29H0V26zm38 0c0-14 7-23 21-26l3 6c-7 2-11 7-11 13h10v29H38V26z" />
    </svg>
  );
}

export default function Testimonials({ data }: TestimonialsProps) {
  const total = data.items.length;
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [timerKey, setTimerKey] = useState(0);
  const slidesLabel = data.slides_aria_label ?? 'Testimonials';
  const testimonialLabel = data.testimonial_aria_label ?? 'Show testimonial from';
  const ratingLabel = data.rating_aria_label ?? 'out of 5 stars';

  const goTo = useCallback(
    (next: number, dir: number) => setState([(next + total) % total, dir]),
    [total],
  );

  const manual = (next: number, dir: number) => {
    goTo(next, dir);
    setTimerKey((k) => k + 1); // restart autoplay after user interaction
  };

  // Auto-advance testimonial + image together
  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setState(([i]) => [(i + 1) % total, 1]);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [total, timerKey]);

  return (
    <section id="testimonials" className="relative w-full bg-lavender py-14 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* ── Top row: intro (left) | divider | heading (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="order-2 lg:order-1 flex flex-col items-start lg:items-end justify-center lg:text-right lg:pr-12 lg:border-r border-primary/15"
          >
            <p className="max-w-md text-[15px] sm:text-base leading-relaxed text-muted mb-5">{data.intro}</p>
            <Link
              href={data.more_link}
              className="group inline-flex items-center gap-4 text-xs sm:text-[13px] font-medium uppercase tracking-[0.22em] text-primary-dark"
            >
              {data.more_text}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-dark text-white transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </Link>
          </motion.div>

          <div className="order-1 lg:order-2 lg:pl-12">
            <Eyebrow text={data.eyebrow} />
            <h2 className="font-heading text-[40px] leading-[1.05] sm:text-6xl lg:text-[64px] tracking-tight">
              {[data.title_regular, data.title_highlight].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: '105%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, delay: i * 0.12, ease }}
                    className={`block ${i === 0 ? 'font-normal text-foreground' : 'font-semibold text-primary'}`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* ── Bottom row: changing property image | quote ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease }}
            className="relative aspect-[4/3] lg:aspect-[7/5] w-full overflow-hidden rounded-[4px] bg-lavender"
          >
            {/* All images stay mounted so the crossfade never flashes while loading */}
            {data.items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={false}
                animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1 : 1.08 }}
                transition={{ opacity: { duration: 0.8, ease }, scale: { duration: 1.6, ease } }}
                className="absolute inset-0"
                aria-hidden={i !== index}
              >
                <Image
                  src={item.image}
                  alt={item.image_alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="flex flex-col justify-between"
          >
            <div>
              <QuoteMark />
              {/* All slides share one grid cell → height = tallest slide, no empty gap */}
              <div className="relative mt-4 grid">
                {data.items.map((item, i) => {
                  const active = i === index;
                  return (
                    <motion.div
                      key={item.id}
                      initial={false}
                      animate={{ opacity: active ? 1 : 0, x: active ? 0 : direction * -40 }}
                      transition={{ duration: 0.45, ease, delay: active ? 0.2 : 0 }}
                      className={`[grid-area:1/1] ${active ? '' : 'pointer-events-none'}`}
                      aria-hidden={!active}
                    >
                      <blockquote className="text-lg sm:text-xl lg:text-[22px] leading-[1.6] text-foreground/85">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>

                      <div className="mt-6 flex items-center gap-5">
                        <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-full bg-lavender">
                          <Image src={item.avatar} alt={item.author} fill sizes="76px" className="object-cover" />
                        </div>
                        <div>
                          <p className="font-heading text-lg font-semibold text-foreground">{item.author}</p>
                          <p className="text-sm text-primary/80">{item.role}</p>
                          <div className="mt-1.5 flex gap-1" aria-label={`${item.rating} ${ratingLabel}`}>
                            {Array.from({ length: item.rating }, (_, s) => (
                              <Star key={s} className="h-4 w-4 fill-primary-dark text-primary-dark" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Dots + arrows */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5" role="tablist" aria-label={slidesLabel}>
                {data.items.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`${testimonialLabel} ${item.author}`}
                    onClick={() => manual(i, i > index ? 1 : -1)}
                    className="flex h-4 w-4 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer"
                  >
                    <motion.span
                      animate={{ scale: i === index ? 1.15 : 1 }}
                      className={`block h-2 w-2 rounded-full transition-colors duration-300 ${
                        i === index ? 'bg-primary-dark' : 'bg-primary/20 hover:bg-primary/40'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => manual(index - 1, -1)}
                  aria-label={data.prev_aria_label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 text-primary-dark transition-all duration-300 hover:border-primary-dark hover:bg-primary-dark hover:text-white cursor-pointer"
                >
                  <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => manual(index + 1, 1)}
                  aria-label={data.next_aria_label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 text-primary-dark transition-all duration-300 hover:border-primary-dark hover:bg-primary-dark hover:text-white cursor-pointer"
                >
                  <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
