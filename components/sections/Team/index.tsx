'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { TeamSectionData } from '../../types';

interface TeamProps {
  data: TeamSectionData;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Team({ data }: TeamProps) {
  return (
    <section id="team" className="relative w-full bg-white py-14 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* ── Heading Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-7"
          >
            {/* Eyebrow with animated underline */}
            <div className="mb-4">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-primary-dark">
                {data.eyebrow}
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                className="block h-[1.5px] w-8 origin-left bg-primary-dark/60 mt-1"
              />
            </div>

            <h2 className="font-serif text-[42px] leading-[1.05] sm:text-5xl lg:text-[58px] font-medium tracking-tight">
              <span className="block text-primary-dark">{data.title_regular}</span>
              <span className="block text-muted/75 font-normal">{data.title_highlight}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="lg:col-span-5 lg:pb-2"
          >
            <p className="text-[15px] sm:text-base leading-relaxed text-muted max-w-lg">
              {data.description}
            </p>
          </motion.div>
        </div>

        {/* ── Members Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {data.members.map((member, idx) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (idx % 4) * 0.1, ease }}
              className="group flex flex-col bg-white border border-primary/10 rounded-[4px] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(27,20,96,0.25)]"
            >
              {/* Member Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-lavender">
                <Image
                  src={member.image}
                  alt={member.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Member Details */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-serif text-[22px] sm:text-[24px] font-medium leading-tight text-primary-dark transition-colors duration-300 group-hover:text-primary">
                  {member.name}
                </h3>
                <p className="mt-1 text-[13px] font-normal text-muted/90">
                  {member.role}
                </p>

                {/* Accent line */}
                <span className="mt-4 mb-4 block h-px w-6 bg-primary/25 transition-all duration-300 group-hover:w-10 group-hover:bg-primary" />

                <p className="text-[13px] leading-relaxed text-muted/80 flex-1">
                  {member.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
