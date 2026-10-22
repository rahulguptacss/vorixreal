'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import type { FooterData } from '../../types';

interface FooterProps {
  data: FooterData;
}

function SocialIcon({ icon }: { icon: string }) {
  const cls = 'h-[18px] w-[18px]';
  switch (icon) {
    case 'facebook':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'x':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3V9.75zm7 0h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4V9.75z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
        </svg>
      );
    default:
      return null;
  }
}

const contactIcon = { map: MapPin, phone: Phone, mail: Mail } as const;
const ease = [0.22, 1, 0.36, 1] as const;

/** Column heading with the short lavender underline bar */
function ColumnTitle({ text }: { text: string }) {
  return (
    <div className="mb-7">
      <h3 className="font-heading text-xl font-semibold text-white">{text}</h3>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease }}
        className="mt-3 block h-[2px] w-7 origin-left rounded-full bg-[#a9a3f0]"
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-0 py-14 sm:py-16"
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-3 lg:pr-10 lg:border-r border-white/15">
            <Link href="/" className="relative block w-60 h-[68px] sm:w-64 sm:h-[72px] mb-6" aria-label={data.logo_text}>
              <Image src={data.logo} alt={data.logo_text} fill sizes="256px" className="object-contain object-left" />
            </Link>
            <p className="text-[15px] leading-relaxed text-[#b9b6dc] max-w-xs">{data.description}</p>
          </div>

          {/* Link columns */}
          {linkColumns.map((col, i) => (
            <div
              key={col.title}
              className={
                i === 0
                  ? 'lg:col-span-2 lg:pl-10'
                  : 'lg:col-span-3 lg:pl-6 lg:pr-10 lg:border-r border-white/15'
              }
            >
              <ColumnTitle text={col.title} />
              <ul className="space-y-[18px]">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-[15px] text-white/90 transition-colors duration-300 hover:text-[#c9c4ff]"
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
          <div className="sm:col-span-2 lg:col-span-4 lg:pl-10">
            <ColumnTitle text={data.contact_title} />
            <ul className="space-y-7">
              {data.contact_items.map((item) => {
                const Icon = contactIcon[item.icon as keyof typeof contactIcon] ?? MapPin;
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#a9a3f0]/50 bg-white/5 text-white transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-primary-dark">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      {item.label && <span className="block text-[15px] font-medium text-white">{item.label}</span>}
                      <span className="mt-1 block whitespace-pre-line text-sm leading-relaxed text-[#b9b6dc] transition-colors duration-300 group-hover:text-white break-words">
                        {item.text}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={item.text}>
                    {item.href ? (
                      <a href={item.href} className="group flex items-start gap-5">
                        {content}
                      </a>
                    ) : (
                      <div className="group flex items-start gap-5">{content}</div>
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
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/85">{data.copyright}</p>
          <div className="flex items-center gap-3 sm:mr-16">
            {data.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.aria_label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-primary-dark"
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
