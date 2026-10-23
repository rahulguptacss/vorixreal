'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import type { FooterData } from '../../types';
import SocialIcon from '../../ui/SocialIcon';

interface FooterProps {
  data: FooterData;
}

const contactIcon = { map: MapPin, phone: Phone, mail: Mail } as const;
const ease = [0.22, 1, 0.36, 1] as const;

/** Column heading with the short lavender underline bar */
function ColumnTitle({ text }: { text: string }) {
  return (
    <div className="mb-4 sm:mb-5">
      <h3 className="font-heading text-lg sm:text-xl font-semibold text-white">{text}</h3>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease }}
        className="mt-2 block h-[2px] w-7 origin-left rounded-full bg-[#a9a3f0]"
      />
    </div>
  );
}

export default function Footer({ data }: FooterProps) {
  const linkColumns = [
    { title: data.pages_title, links: data.pages_links },
    { title: data.properties_title, links: data.properties_links },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-[#13132f] text-white">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-0 py-10 sm:py-12"
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-3 lg:pr-8 lg:border-r border-white/15">
            <Link href="/" className="relative block w-56 h-[62px] sm:w-60 sm:h-[66px] mb-4" aria-label={data.logo_text}>
              <Image src={data.logo} alt={data.logo_text} fill sizes="256px" className="object-contain object-left" />
            </Link>
            <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#b9b6dc] max-w-sm">{data.description}</p>
          </div>

          {/* Link columns */}
          {linkColumns.map((col, i) => (
            <div
              key={col.title}
              className={
                i === 0
                  ? 'lg:col-span-2 lg:pl-8'
                  : 'lg:col-span-3 lg:pl-6 lg:pr-8 lg:border-r border-white/15'
              }
            >
              <ColumnTitle text={col.title} />
              <ul className="space-y-2.5 sm:space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] text-white/90 transition-colors duration-300 hover:text-[#c9c4ff]"
                    >
                      {link.name}
                      <ChevronRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={2}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-4 lg:pl-8">
            <ColumnTitle text={data.contact_title} />
            <ul className="space-y-4 sm:space-y-4.5">
              {data.contact_items.map((item) => {
                const Icon = contactIcon[item.icon as keyof typeof contactIcon] ?? MapPin;
                const content = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#a9a3f0]/50 bg-white/5 text-white transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-primary-dark">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      {item.label && <span className="block text-[14px] font-medium text-white">{item.label}</span>}
                      <span className="mt-0.5 block whitespace-pre-line text-xs sm:text-[13px] leading-relaxed text-[#b9b6dc] transition-colors duration-300 group-hover:text-white break-words">
                        {item.text}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={item.text}>
                    {item.href ? (
                      <a href={item.href} className="group flex items-start gap-4">
                        {content}
                      </a>
                    ) : (
                      <div className="group flex items-start gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#a9a3f0]/35">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 sm:py-5 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-sm text-white/85">{data.copyright}</p>
          <div className="flex items-center gap-3 sm:mr-16">
            {data.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.aria_label}
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-primary-dark"
              >
                <SocialIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
