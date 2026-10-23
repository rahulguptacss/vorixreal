'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CalendarDays, Clock, Folder, User } from 'lucide-react';
import type { BlogDetailLabels, BlogDetailSectionData, RecentPostItem } from '../../types';

interface BlogDetailProps {
  data: BlogDetailSectionData;
  labels: BlogDetailLabels;
  recentPosts: RecentPostItem[];
  authorPrefix?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function BlogDetail({ data, labels, recentPosts, authorPrefix = 'By' }: BlogDetailProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const meta = [
    { icon: CalendarDays, text: data.date },
    { icon: User, text: `${authorPrefix} ${data.author}` },
    { icon: Folder, text: data.category },
    { icon: Clock, text: data.read_time },
  ];

  return (
    <section className="relative w-full bg-white py-14 sm:py-20">
      {/* Reading progress bar */}
      <motion.div style={{ scaleX: progress }} className="fixed top-0 inset-x-0 z-[60] h-1 origin-left bg-primary" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-16">
        {/* ── Article ── */}
        <article className="min-w-0">
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="inline-block border-b border-primary-dark/40 pb-0.5 text-[12px] font-medium tracking-wide text-primary-dark">
              {data.eyebrow}
            </span>
            <h2 className="mt-5 max-w-[15em] font-serif text-[36px] sm:text-[46px] lg:text-[52px] font-medium leading-[1.08] text-primary-dark">
              {data.title}
            </h2>

            <ul className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2 text-[13px] text-muted">
              {meta.map(({ icon: Icon, text }) => (
                <li key={text} className="inline-flex items-center gap-2">
                  <Icon className="h-[15px] w-[15px] text-primary-dark" strokeWidth={1.7} />
                  {text}
                </li>
              ))}
            </ul>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(6% 4% 6% 4%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="group relative mt-8 aspect-[16/10] sm:aspect-[13/5] w-full overflow-hidden bg-lavender"
          >
            <Image
              src={data.hero_image}
              alt={data.hero_alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 860px"
              className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-8 space-y-5"
          >
            {data.intro.map((para) => (
              <p key={para.slice(0, 32)} className="text-[15px] sm:text-base leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </motion.div>

          <div className="mt-10">
            {data.sections.map((section) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease }}
                className="border-b border-primary/12 py-8 first:pt-2"
              >
                <h3 className="font-serif text-[28px] sm:text-[34px] font-medium leading-[1.15] text-primary-dark">
                  {section.title}
                </h3>
                <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-muted">{section.paragraph}</p>
              </motion.section>
            ))}
          </div>
        </article>

        {/* ── Sidebar: Recent posts ── */}
        {recentPosts.length > 0 && (
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="self-start bg-lavender px-6 py-7 sm:px-7 lg:sticky lg:top-28"
          >
            <h3 className="font-serif text-[26px] sm:text-[28px] font-medium leading-none text-primary-dark">
              {labels.recent_posts_title}
            </h3>
            <ul className="mt-7 space-y-6">
              {recentPosts.map((post, idx) => (
                <motion.li
                  key={post.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1, ease }}
                >
                  <Link href={`/blog/${post.slug}`} className="group flex items-center gap-4">
                    <span className="relative h-[76px] w-[76px] shrink-0 overflow-hidden bg-white">
                      <Image
                        src={post.image}
                        alt={post.alt}
                        fill
                        sizes="76px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-heading text-[14px] font-medium leading-snug text-primary-dark line-clamp-3 transition-colors duration-300 group-hover:text-primary">
                        {post.title}
                      </span>
                      <span className="mt-1.5 block text-[12px] text-muted">{post.date}</span>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.aside>
        )}
      </div>
    </section>
  );
}
