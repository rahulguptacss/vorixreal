'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheck, Mail, MapPin, Phone } from 'lucide-react';
import type { ContactSectionData } from '../../types';
import SocialIcon from '../../ui/SocialIcon';
import PrimaryButton from '../../ui/PrimaryButton';

interface ContactProps {
  data: ContactSectionData;
}

const iconMap = { map: MapPin, phone: Phone, mail: Mail } as const;
const ease = [0.22, 1, 0.36, 1] as const;

/** Underline-only fields like the screenshot */
const fieldClass =
  'peer w-full border-0 border-b border-primary-dark/20 bg-transparent px-0 py-2.5 text-[14px] text-foreground placeholder:text-muted/70 outline-none transition-colors duration-300 focus:border-primary-dark';

function Field({
  id,
  label,
  children,
  className = '',
}: {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`group relative ${className}`}>
      <label htmlFor={id} className="block text-[13px] font-medium text-primary-dark">
        {label}
        <span className="text-primary-dark">*</span>
      </label>
      {children}
      {/* Animated focus underline */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-primary-dark transition-transform duration-500 ease-out group-focus-within:scale-x-100" />
    </div>
  );
}

export default function Contact({ data }: ContactProps) {
  const { form } = data;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative w-full bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16 xl:gap-24">
          {/* ── Left: heading + form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
            className="min-w-0"
          >
            <span className="relative inline-block pb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-dark">
              {data.eyebrow}
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
                className="absolute bottom-0 left-0 h-px w-[calc(100%+1.5rem)] origin-left bg-primary-dark/50"
              />
            </span>

            <h2 className="mt-6 font-serif text-[44px] sm:text-[56px] lg:text-[64px] font-medium leading-[1.02] text-primary-dark">
              {[data.title_regular, data.title_highlight].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: '105%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, delay: i * 0.12, ease }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            <p className="mt-5 max-w-xl text-[15px] sm:text-base leading-relaxed text-muted">{data.description}</p>

            <form onSubmit={handleSubmit} className="mt-10 sm:mt-12">
              <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                <Field id="contact-name" label={form.name_label}>
                  <input id="contact-name" name="name" required placeholder={form.name_placeholder} className={fieldClass} />
                </Field>
                <Field id="contact-email" label={form.email_label}>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder={form.email_placeholder}
                    className={fieldClass}
                  />
                </Field>
                <Field id="contact-phone" label={form.phone_label}>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={15}
                    autoComplete="tel"
                    placeholder={form.phone_placeholder}
                    onKeyDown={(e) => {
                      // Block non-digit characters (allow shortcuts & navigation keys)
                      if (e.key.length === 1 && !/[0-9]/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault();
                    }}
                    onInput={(e) => {
                      // Also strips letters/symbols from paste & autofill
                      const el = e.currentTarget;
                      el.value = el.value.replace(/\D/g, '');
                    }}
                    className={fieldClass}
                  />
                </Field>
                <Field id="contact-subject" label={form.subject_label}>
                  <input id="contact-subject" name="subject" required placeholder={form.subject_placeholder} className={fieldClass} />
                </Field>
                <Field id="contact-message" label={form.message_label} className="sm:col-span-2">
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder={form.message_placeholder}
                    className={`${fieldClass} resize-y`}
                  />
                </Field>
              </div>

              <div className="mt-10">
                <PrimaryButton
                  type="submit"
                  id="contact-submit"
                  text={form.submit_text}
                />
              </div>

              <AnimatePresence>
                {submitted && form.success_message && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-600"
                    role="status"
                  >
                    <CircleCheck className="h-4 w-4" />
                    {form.success_message}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* ── Right: Contact info card ── */}
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="relative self-start overflow-hidden bg-gradient-to-b from-primary-dark to-navy px-7 py-9 sm:px-9 sm:py-11 text-white shadow-[0_30px_70px_-30px_rgba(14,11,51,0.7)]"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/40 blur-3xl" />

            <h3 className="relative font-serif text-[32px] sm:text-[36px] font-medium leading-none">{data.info_title}</h3>

            <ul className="relative mt-8">
              {data.info_cards.map((card, idx) => {
                const Icon = iconMap[card.icon as keyof typeof iconMap] ?? MapPin;
                const body = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:bg-white group-hover:text-primary-dark">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">{card.title}</span>
                      {card.lines.map((line) => (
                        <span key={line} className="mt-1 block text-[14px] leading-snug text-white break-words">
                          {line}
                        </span>
                      ))}
                      {card.note && <span className="mt-1.5 block text-[12px] text-white/55">{card.note}</span>}
                    </span>
                  </>
                );
                return (
                  <motion.li
                    key={card.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1, ease }}
                    className="border-b border-white/12 py-6 first:pt-0"
                  >
                    {card.href ? (
                      <a href={card.href} className="group flex items-start gap-4">
                        {body}
                      </a>
                    ) : (
                      <div className="group flex items-start gap-4">{body}</div>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            <div className="relative mt-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">{data.follow_title}</p>
              <div className="mt-4 flex items-center gap-3">
                {data.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.aria_label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-primary-dark"
                  >
                    <SocialIcon icon={social.icon} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        {/* ── Map ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
          className="mt-12 sm:mt-16 h-[260px] sm:h-[320px] lg:h-[360px] w-full overflow-hidden bg-lavender shadow-[0_20px_50px_-30px_rgba(27,20,96,0.45)]"
        >
          <iframe
            title={data.map.title}
            src={data.map.embed_url}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}
