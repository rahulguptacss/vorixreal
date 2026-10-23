'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { WhyChooseUsSectionData } from '../../types';

interface WhyChooseUsProps {
  data: WhyChooseUsSectionData;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function WhyChooseUs({ data }: WhyChooseUsProps) {
  return (
    <section id="why-choose-us" className="relative w-full bg-[#f8f7fc] py-14 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* ── Header row: eyebrow | heading | divider + description ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Eyebrow with two-tone underline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-2"
          >
            <p className="text-[15px] font-semibold text-primary-dark">{data.eyebrow}</p>
            <div className="relative mt-2.5 h-px w-36 bg-primary/15">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                className="absolute left-0 top-1/2 h-[2px] w-12 -translate-y-1/2 origin-left bg-primary-dark"
              />
            </div>
          </motion.div>

          {/* Heading — "Where Expertise Meets" dark, "Exceptional Results" muted, flowing inline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-5 lg:col-start-4 font-serif font-semibold text-[36px] leading-[1.08] sm:text-[44px] lg:text-[50px] xl:text-[56px] tracking-[-0.005em] max-w-[8.6em]"
          >
            <span className="text-primary-dark">{data.title_regular}</span>{' '}
            <span className="text-[#6e6b8f]">{data.title_highlight}</span>
          </motion.h2>

          {/* Vertical divider + description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="lg:col-span-4 lg:col-start-9 flex self-stretch items-center lg:border-l border-primary/15 lg:pl-10"
          >
            <p className="max-w-[300px] text-[15px] leading-[1.75] text-muted">{data.description}</p>
          </motion.div>
        </div>

        {/* Full-width rule under the header */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease }}
          className="mt-10 sm:mt-12 mb-6 sm:mb-7 h-px w-full origin-left bg-primary/10"
        />

        {/* ── Body: numbered rows | image ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,46%)_minmax(0,1fr)] gap-8 lg:gap-7 items-stretch">
          <ul className="flex flex-col">
            {data.items.map((item, idx) => {
              const last = idx === data.items.length - 1;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease }}
                  className={`group flex flex-1 items-start gap-6 sm:gap-8 py-6 sm:py-7 ${
                    idx === 0 ? 'pt-3 sm:pt-4' : ''
                  } ${last ? 'pb-0' : 'border-b border-primary/10'}`}
                >
                  <span className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-[#e8e6f2] text-[13px] font-semibold text-primary-dark transition-all duration-500 group-hover:bg-primary-dark group-hover:text-white group-hover:scale-105">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="flex-1">
                    <h3 className="font-serif text-[22px] sm:text-[25px] font-semibold leading-tight text-primary-dark mb-2 transition-colors duration-300 group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="max-w-[340px] text-[15px] leading-[1.6] text-muted">{item.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="group relative min-h-[420px] sm:min-h-[560px] w-full overflow-hidden bg-lavender"
          >
            <motion.div
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease }}
              className="absolute inset-0"
            >
              <Image
                src={data.image}
                alt={data.image_alt}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
