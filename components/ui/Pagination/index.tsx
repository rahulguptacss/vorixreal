'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { PaginationLabels } from '../../types';

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageStart: number;
  pageCount: number;
  onChange: (page: number) => void;
  labels?: PaginationLabels;
  /** Unique id so the animated active pill doesn't jump between multiple paginations */
  layoutId: string;
}

const arrowBtn =
  'flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 text-primary-dark transition-all duration-300 hover:border-primary-dark hover:bg-primary-dark hover:text-white disabled:pointer-events-none disabled:opacity-35 cursor-pointer';

/** Shared numbered pagination (used on Properties and Blog grids) */
export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageStart,
  pageCount,
  onChange,
  labels,
  layoutId,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const showingText = labels?.showing_text
    ?.replace('{from}', String(pageStart + 1))
    .replace('{to}', String(pageStart + pageCount))
    .replace('{total}', String(totalItems));

  return (
    <div className="mt-12 sm:mt-14 flex flex-col items-center gap-5 sm:flex-row sm:justify-between border-t border-primary/10 pt-8">
      {showingText && (
        <p className="text-sm text-muted" aria-live="polite">
          {showingText}
        </p>
      )}

      <nav aria-label={labels?.label ?? 'Pagination'} className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          aria-label={labels?.prev_aria_label ?? 'Previous page'}
          className={arrowBtn}
        >
          <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </button>

        <ul className="flex items-center gap-1.5 sm:gap-2">
          {Array.from({ length: totalPages }, (_, i) => {
            const n = i + 1;
            const current = n === page;
            return (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => onChange(n)}
                  aria-label={`${labels?.page_aria_label ?? 'Go to page'} ${n}`}
                  aria-current={current ? 'page' : undefined}
                  className={`relative flex h-11 w-11 items-center justify-center rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                    current ? 'text-white' : 'text-primary-dark hover:bg-lavender'
                  }`}
                >
                  {current && (
                    <motion.span
                      layoutId={layoutId}
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-dark to-primary shadow-[0_10px_24px_-10px_rgba(27,20,96,0.7)]"
                    />
                  )}
                  <span className="relative">{String(n).padStart(2, '0')}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          aria-label={labels?.next_aria_label ?? 'Next page'}
          className={arrowBtn}
        >
          <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </button>
      </nav>
    </div>
  );
}
