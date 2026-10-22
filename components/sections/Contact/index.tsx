'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheck, Mail, MapPin, Phone, Send } from 'lucide-react';
import type { ContactSectionData } from '../../types';
import Eyebrow from '../../ui/Eyebrow';

interface ContactProps {
  data: ContactSectionData;
}

const iconMap = { map: MapPin, phone: Phone, mail: Mail } as const;
const ease = [0.22, 1, 0.36, 1] as const;

const inputClass =
  'w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10';

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
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-5"
          >
            <Eyebrow text={data.eyebrow} />
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-[1.12] tracking-tight text-primary-dark mb-4">
              <span className="block font-light">{data.title_regular}</span>
              <span className="block font-semibold text-primary-gradient">{data.title_highlight}</span>
            </h2>
            <p className="text-[15px] leading-relaxed text-muted mb-8">{data.description}</p>

            <div className="space-y-4">
              {data.info_cards.map((card, idx) => {
                const Icon = iconMap[card.icon as keyof typeof iconMap] ?? MapPin;
                const inner = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lavender text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:rotate-[-6deg]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-heading text-base font-semibold text-primary-dark">{card.title}</p>
                      {card.lines.map((line) => (
                        <p key={line} className="text-sm text-muted">
                          {line}
                        </p>
                      ))}
                    </div>
                  </>
                );
                const cls =
                  'group flex items-start gap-4 rounded-2xl border border-primary/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_20px_40px_-24px_rgba(27,20,96,0.45)]';
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease }}
                  >
                    {card.href ? (
                      <a href={card.href} className={cls}>
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="relative rounded-[24px] bg-lavender/70 p-6 sm:p-9 border border-primary/10"
            >
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-6">{form.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-primary-dark">{form.name_label}</span>
                  <input id="contact-name" name="name" required placeholder={form.name_placeholder} className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-primary-dark">{form.email_label}</span>
                  <input id="contact-email" name="email" type="email" required placeholder={form.email_placeholder} className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-primary-dark">{form.phone_label}</span>
                  <input id="contact-phone" name="phone" type="tel" placeholder={form.phone_placeholder} className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-primary-dark">{form.subject_label}</span>
                  <select id="contact-subject" name="subject" required defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      {form.subject_placeholder}
                    </option>
                    {form.subject_options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-primary-dark">{form.message_label}</span>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder={form.message_placeholder}
                    className={`${inputClass} resize-none`}
                  />
                </label>
              </div>

              <button id="contact-submit" type="submit" className="btn-primary btn-shine mt-6 cursor-pointer">
                {form.submit_text}
                <Send className="btn-arrow" aria-hidden="true" />
              </button>

              <AnimatePresence>
                {submitted && form.success_message && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-600"
                    role="status"
                  >
                    <CircleCheck className="h-4 w-4" />
                    {form.success_message}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mt-14 h-[320px] sm:h-[400px] w-full overflow-hidden rounded-[24px] border border-primary/10 shadow-[0_20px_50px_-30px_rgba(27,20,96,0.45)]"
        >
          <iframe
            title={data.map.title}
            src={data.map.embed_url}
            className="h-full w-full grayscale-[30%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
