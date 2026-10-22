'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CircleUser, Folder } from 'lucide-react';
import type { BlogSectionData } from '../../types';
import Eyebrow from '../../ui/Eyebrow';
import PrimaryButton from '../../ui/PrimaryButton';

interface BlogProps {
  data: BlogSectionData;
  /** Number of posts to show (homepage uses data.homepage_count) — omit to show all */
  limit?: number;
  showButton?: boolean;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** "Oct 12, 2026" → { day: "12", month: "OCT" } for the date badge */
function splitDate(date: string) {
  const [month = '', day = ''] = date.replace(',', '').split(' ');
  return { day, month: month.toUpperCase() };
}

export default function Blog({ data, limit, showButton = true }: BlogProps) {
  const posts = typeof limit === 'number' ? data.posts.slice(0, limit) : data.posts;
  const readMore = data.read_more_text ?? 'Read More';
  const authorPrefix = data.author_prefix ?? 'By';

  return (
    <section id="blog" className="relative w-full bg-white py-14 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* ── Heading row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-7"
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
            className="lg:col-span-5 lg:pl-6 lg:pb-2"
          >
            <p className="text-[15px] leading-relaxed text-muted mb-6 max-w-md">{data.description}</p>
            {showButton && (
              <PrimaryButton
                href={data.button_link}
                text={data.button_text}
                className="px-6 py-3.5 text-xs uppercase tracking-[0.18em]"
              />
            )}
          </motion.div>
        </div>

        {/* ── Posts grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-4 lg:gap-4">
          {posts.map((post, idx) => {
            const { day, month } = splitDate(post.date);
            const href = `/blog/${post.slug}`;
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: (idx % 3) * 0.12, ease }}
                className="group flex flex-col rounded-[6px] border border-primary/10 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-30px_rgba(27,20,96,0.4)]"
              >
                {/* Image + date badge */}
                <div className="relative">
                  <Link
                    href={href}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="relative block aspect-[3/2] overflow-hidden rounded-t-[6px] bg-lavender"
                  >
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                  </Link>
                  <div className="absolute right-3 bottom-0 translate-y-[18%] flex h-[58px] w-[46px] flex-col items-center justify-center rounded-[4px] bg-lavender text-primary-dark shadow-[0_6px_16px_-10px_rgba(27,20,96,0.4)] transition-colors duration-300 group-hover:bg-primary-dark group-hover:text-white">
                    <span className="font-heading text-xl leading-none">{day}</span>
                    <span className="mt-1 text-[9px] font-medium tracking-[0.18em]">{month}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-5 pt-5 pb-6">
                  <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-primary-dark/80">
                    <span className="inline-flex items-center gap-2">
                      <CircleUser className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {authorPrefix} {post.author ?? 'Admin'}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Folder className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {post.category}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-medium leading-snug text-primary-dark mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-primary">
                    <Link href={href}>{post.title}</Link>
                  </h3>

                  <p className="text-sm leading-relaxed text-muted line-clamp-3 mb-6 flex-1">{post.excerpt}</p>

                  <Link
                    href={href}
                    aria-label={`${readMore}: ${post.title}`}
                    className="inline-flex items-center gap-4 self-start text-xs font-medium uppercase tracking-[0.22em] text-primary-dark"
                  >
                    {readMore}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-dark text-white transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
