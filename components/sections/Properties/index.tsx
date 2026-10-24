'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { PropertiesSectionData, PropertyItem } from '../../types';
import Eyebrow from '../../ui/Eyebrow';
import PrimaryButton from '../../ui/PrimaryButton';
import Pagination from '../../ui/Pagination';

interface PropertiesProps {
  data: PropertiesSectionData;
  /** "slider" for homepage carousel, "grid" for the full properties page */
  variant?: 'slider' | 'grid';
  showButton?: boolean;
}

const ease = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 3500;

function PropertyCard({ item, ariaLabel, priority = false }: { item: PropertyItem; ariaLabel: string; priority?: boolean }) {
  return (
    <Link
      href={item.href}
      aria-label={`${ariaLabel}: ${item.title}`}
      className="group relative block aspect-[12/13] w-full overflow-hidden rounded-[4px] bg-lavender"
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
      />

      {/* Dark indigo gradient for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-dark/95 via-primary-dark/55 to-transparent transition-all duration-500 group-hover:h-[62%]" />

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] text-white/85">
            {item.category}
          </p>
          <span className="mt-2 mb-2.5 block h-px w-5 bg-white/80 transition-all duration-500 group-hover:w-12" />
          <h3 className="font-heading text-xl sm:text-[22px] font-normal leading-tight text-white truncate">
            {item.title}
          </h3>
        </div>

        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white text-white transition-all duration-300 group-hover:bg-white group-hover:text-primary-dark">
          <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-rotate-45" strokeWidth={1.75} />
        </span>
      </div>
    </Link>
  );
}

export default function Properties({ data, variant = 'slider', showButton = true }: PropertiesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const stepsRef = useRef(1);
  const draggingRef = useRef(false);
  const [active, setActive] = useState(0);
  const [steps, setSteps] = useState(1);
  const [timerKey, setTimerKey] = useState(0);
  const viewLabel = data.view_aria_label ?? 'View property';
  const slidesAriaLabel = data.slides_aria_label ?? 'Property slides';
  const slideAriaLabel = data.slide_aria_label ?? 'Go to slide';

  /* ── Slider shows a capped set; grid paginates the full list ── */
  const sliderItems = data.items.slice(0, data.homepage_count ?? data.items.length);
  const perPage = Math.max(1, data.per_page ?? data.items.length);
  const totalPages = Math.max(1, Math.ceil(data.items.length / perPage));
  const [page, setPage] = useState(1);
  const pageStart = (page - 1) * perPage;
  const pageItems = data.items.slice(pageStart, pageStart + perPage);
  const labels = data.pagination;

  const changePage = (next: number) => {
    if (next < 1 || next > totalPages || next === page) return;
    setPage(next);
    // Bring the top of the grid back into view so the new page is visible
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /** One dot per scroll position (items − visible cards + 1), like the screenshot */
  const measure = useCallback(() => {
    const el = trackRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const cardW = first.offsetWidth;
    const count = Math.max(1, Math.round((el.scrollWidth - el.clientWidth) / cardW) + 1);
    const current = Math.min(count - 1, Math.round(el.scrollLeft / cardW));
    stepsRef.current = count;
    activeRef.current = current;
    setSteps(count);
    setActive(current);
  }, []);

  const goTo = useCallback((index: number) => {
    const el = trackRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    el.scrollTo({ left: index * first.offsetWidth, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (variant !== 'slider') return;
    measure();
    const el = trackRef.current;
    el?.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el?.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [variant, measure]);

  // Continuous autoplay — loops back to the first slide; skips while dragging or tab hidden
  useEffect(() => {
    if (variant !== 'slider' || steps <= 1) return;
    const id = setInterval(() => {
      if (draggingRef.current || document.hidden) return;
      goTo((activeRef.current + 1) % stepsRef.current);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [variant, steps, goTo, timerKey]);

  /** Manual navigation restarts the autoplay timer so it doesn't jump immediately */
  const handleDot = (i: number) => {
    goTo(i);
    setTimerKey((k) => k + 1);
  };

  const startDrag = () => {
    draggingRef.current = true;
  };
  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setTimerKey((k) => k + 1);
  };

  return (
    <section ref={sectionRef} id="properties" className="relative w-full bg-white py-14 sm:py-20 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Heading row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-8"
          >
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="lg:col-span-4 lg:pb-2"
          >
            <p className="text-[15px] leading-relaxed text-muted mb-6 max-w-sm">{data.description}</p>
            {showButton && (
              <PrimaryButton
                href={data.button_link}
                text={data.button_text}
                className="px-6 py-3.5 text-xs uppercase tracking-[0.18em]"
              />
            )}
          </motion.div>
        </div>

        {variant === 'slider' ? (
          <div>
            <div
              ref={trackRef}
              onPointerDown={startDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onPointerLeave={endDrag}
              onTouchStart={startDrag}
              onTouchEnd={endDrag}
              className="no-scrollbar -mx-1.5 flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
            >
              {sliderItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: (idx % 3) * 0.12, ease }}
                  className="snap-start shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 px-1.5"
                >
                  <PropertyCard item={item} ariaLabel={viewLabel} priority={idx < 3} />
                </motion.div>
              ))}
            </div>

            {/* Pagination dots */}
            <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label={slidesAriaLabel}>
              {Array.from({ length: steps }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  onClick={() => handleDot(i)}
                  aria-label={`${slideAriaLabel} ${i + 1}`}
                  aria-selected={active === i}
                  className="flex h-6 w-6 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 cursor-pointer"
                >
                  <motion.span
                    animate={{ width: active === i ? 22 : 8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className={`block h-[7px] rounded-full transition-colors duration-300 ${
                      active === i ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                {pageItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.7, delay: (idx % 3) * 0.12, ease }}
                  >
                    <PropertyCard item={item} ariaLabel={viewLabel} priority={page === 1 && idx < 3} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <Pagination
              page={page}
              totalPages={totalPages}
              totalItems={data.items.length}
              pageStart={pageStart}
              pageCount={pageItems.length}
              onChange={changePage}
              labels={labels}
              layoutId="properties-page-indicator"
            />
          </div>
        )}
      </div>
    </section>
  );
}
