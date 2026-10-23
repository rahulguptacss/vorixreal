'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Anchor,
  Bath,
  BadgeCheck,
  BedDouble,
  Briefcase,
  Building2,
  Car,
  CircleCheck,
  ExternalLink,
  GraduationCap,
  House,
  Landmark,
  LandPlot,
  MapPin,
  Plane,
  ShoppingBag,
  TrainFront,
  Trees,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import type { PropertyDetailData, PropertyDetailLabels } from '../../types';

interface PropertyDetailProps {
  data: PropertyDetailData;
  labels: PropertyDetailLabels;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Icon keys used in data.json → lucide icons */
const iconMap: Record<string, LucideIcon> = {
  home: House,
  bed: BedDouble,
  bath: Bath,
  land: LandPlot,
  building: Building2,
  car: Car,
  map: MapPin,
  status: BadgeCheck,
  briefcase: Briefcase,
  anchor: Anchor,
  plane: Plane,
  shopping: ShoppingBag,
  train: TrainFront,
  park: Trees,
  beach: Waves,
  school: GraduationCap,
  landmark: Landmark,
};

const getIcon = (key: string): LucideIcon => iconMap[key] ?? MapPin;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function PropertyDetail({ data, labels }: PropertyDetailProps) {
  return (
    <section className="relative w-full overflow-hidden bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, clipPath: 'inset(6% 4% 6% 4%)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.1, ease }}
          className="group relative aspect-[16/10] sm:aspect-[2/1] lg:aspect-[5/2] w-full overflow-hidden bg-lavender"
        >
          <Image
            src={data.hero_image}
            alt={data.hero_alt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
          />
        </motion.div>

        {/* Overview + Key details */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <span className="inline-block border-b border-primary-dark/70 pb-1 text-[11px] font-medium uppercase tracking-[0.22em] text-primary-dark">
              {data.location}
            </span>
            <h2 className="mt-5 font-serif text-[40px] sm:text-5xl lg:text-[60px] font-medium leading-[1.05] text-primary-dark">
              {data.title}
            </h2>
            <div className="mt-6 space-y-5">
              {data.overview.map((para) => (
                <p key={para.slice(0, 32)} className="text-[15px] sm:text-base leading-relaxed text-muted">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
            className="relative self-start overflow-hidden bg-navy px-7 py-8 sm:px-9 sm:py-10 text-white shadow-[0_30px_70px_-30px_rgba(14,11,51,0.6)]"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/40 blur-3xl" />
            <h3 className="relative font-serif text-3xl sm:text-[34px] font-medium leading-none">
              {labels.key_details_title}
            </h3>
            <ul className="relative mt-7 space-y-4">
              {data.key_details.map((item, idx) => {
                const Icon = getIcon(item.icon);
                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + idx * 0.06, ease }}
                    className="flex items-center gap-4 text-[14px] sm:text-[15px]"
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0 text-white" strokeWidth={1.8} />
                    <span className="text-white/85">
                      <span className="font-medium text-white">{item.label}:</span> {item.value}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.aside>
        </div>

        {/* Gallery image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="group relative mt-14 sm:mt-20 aspect-[16/10] sm:aspect-[2/1] lg:aspect-[3/1] w-full overflow-hidden bg-lavender"
        >
          <Image
            src={data.gallery_image}
            alt={data.gallery_alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
          />
        </motion.div>

        {/* Description + Features */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <h3 className="font-serif text-4xl sm:text-[44px] font-medium leading-[1.1] text-primary-dark">
              {labels.description_title}
            </h3>
            <div className="mt-5 space-y-5">
              {data.description.map((para) => (
                <p key={para.slice(0, 32)} className="text-[15px] sm:text-base leading-relaxed text-muted">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          <ul className="grid grid-cols-1 gap-x-8 gap-y-4 self-center sm:grid-cols-2">
            {data.features.map((feature, idx) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease }}
                className="group flex items-center gap-3 text-[14px] sm:text-[15px] text-foreground/80"
              >
                <CircleCheck
                  className="h-5 w-5 shrink-0 text-primary-dark transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.8}
                />
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Map + Location insight */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
            className="relative aspect-[16/10] w-full overflow-hidden bg-lavender shadow-[0_20px_50px_-30px_rgba(27,20,96,0.45)]"
          >
            <iframe
              src={data.map.embed_url}
              title={`${labels.map_title_prefix} ${data.title}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
            />
            <a
              href={data.map.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-[3px] bg-white px-3 py-2 text-[12px] font-medium text-[#1a73e8] shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              {labels.map_link_text}
              <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <h3 className="font-serif text-4xl sm:text-[44px] font-medium leading-[1.1] text-primary-dark">
              {labels.location_title}
            </h3>
            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-muted">{data.location_text}</p>

            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-primary/15">
              {data.nearby.map((item, idx) => {
                const Icon = getIcon(item.icon);
                return (
                  <motion.li
                    key={item.place}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + idx * 0.1, ease }}
                    className="group flex items-center gap-3 sm:px-5 first:sm:pl-0 last:sm:pr-0"
                  >
                    <Icon
                      className="h-8 w-8 shrink-0 text-primary-dark transition-transform duration-300 group-hover:-translate-y-0.5"
                      strokeWidth={1.4}
                    />
                    <div className="leading-tight">
                      <p className="font-heading text-[15px] font-semibold text-primary-dark">{item.time}</p>
                      <p className="mt-0.5 text-[12px] text-muted">{item.place}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
