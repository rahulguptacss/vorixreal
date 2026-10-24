'use client';

import { useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CircleCheck,
  Headset,
  House,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  User,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { EnquirySectionData } from '../../types';
import Select from '../../ui/Select';
import PrimaryButton from '../../ui/PrimaryButton';

interface EnquiryProps {
  data: EnquirySectionData;
}

const ease = [0.22, 1, 0.36, 1] as const;

const featureIcons: Record<string, LucideIcon> = {
  home: House,
  users: Users,
  shield: ShieldCheck,
  headset: Headset,
};

const boxClass =
  'w-full rounded-[3px] border border-primary/15 bg-white pl-3.5 pr-10 text-[13px] text-foreground placeholder:text-muted/70 outline-none transition-all duration-300 hover:border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10';

/** Digits-only phone input handlers (blocks typing + strips paste/autofill) */
const blockNonDigits = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key.length === 1 && !/[0-9]/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault();
};
const stripNonDigits = (e: FormEvent<HTMLInputElement>) => {
  const el = e.currentTarget;
  el.value = el.value.replace(/\D/g, '');
};

function Field({
  id,
  label,
  required = false,
  icon: Icon,
  iconPosition = 'center',
  className = '',
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  /** Optional trailing icon (custom Select renders its own chevron) */
  icon?: LucideIcon;
  iconPosition?: 'center' | 'bottom';
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[12px] font-medium text-primary-dark">
        {label}
        {required && <span>*</span>}
      </label>
      <div className="group relative">
        {children}
        {Icon && (
          <Icon
            className={`pointer-events-none absolute right-3.5 h-4 w-4 text-muted/70 transition-colors duration-300 group-focus-within:text-primary ${
              iconPosition === 'bottom' ? 'bottom-3.5' : 'top-1/2 -translate-y-1/2'
            }`}
            strokeWidth={1.7}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}

export default function Enquiry({ data }: EnquiryProps) {
  const { form } = data;
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
    setPropertyType('');
    setBudget('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="enquiry" className="relative w-full overflow-x-clip bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 shadow-[0_30px_80px_-50px_rgba(27,20,96,0.45)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* ── Left: heading + form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
            className="relative bg-gradient-to-br from-lavender via-[#faf9fe] to-white px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-dark">{data.eyebrow}</span>

            <h2 className="mt-5 font-heading text-[40px] sm:text-[52px] lg:text-[58px] font-semibold leading-[1.04] tracking-tight">
              {[data.title_regular, data.title_highlight].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: '105%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, delay: i * 0.12, ease }}
                    className={`block ${i === 0 ? 'text-primary-dark' : 'text-primary'}`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">{data.description}</p>

            <form onSubmit={handleSubmit} className="mt-9">
              <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                <Field id="enquiry-name" label={form.name_label} required icon={User}>
                  <input id="enquiry-name" name="name" required autoComplete="name" placeholder={form.name_placeholder} className={`${boxClass} h-11`} />
                </Field>

                <Field id="enquiry-email" label={form.email_label} required icon={Mail}>
                  <input
                    id="enquiry-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={form.email_placeholder}
                    className={`${boxClass} h-11`}
                  />
                </Field>

                <Field id="enquiry-phone" label={form.phone_label} required icon={Phone}>
                  <input
                    id="enquiry-phone"
                    name="phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={15}
                    autoComplete="tel"
                    placeholder={form.phone_placeholder}
                    onKeyDown={blockNonDigits}
                    onInput={stripNonDigits}
                    className={`${boxClass} h-11`}
                  />
                </Field>

                <Field id="enquiry-property-type" label={form.property_type_label} required>
                  <Select
                    id="enquiry-property-type"
                    name="property_type"
                    required
                    value={propertyType}
                    onChange={setPropertyType}
                    options={form.property_type_options}
                    placeholder={form.property_type_placeholder}
                  />
                </Field>

                <Field id="enquiry-location" label={form.location_label} required icon={MapPin}>
                  <input id="enquiry-location" name="location" required placeholder={form.location_placeholder} className={`${boxClass} h-11`} />
                </Field>

                <Field id="enquiry-budget" label={form.budget_label}>
                  <Select
                    id="enquiry-budget"
                    name="budget"
                    value={budget}
                    onChange={setBudget}
                    options={form.budget_options}
                    placeholder={form.budget_placeholder}
                  />
                </Field>

                <Field
                  id="enquiry-message"
                  label={form.message_label}
                  required
                  icon={MessageSquare}
                  iconPosition="bottom"
                  className="sm:col-span-2"
                >
                  <textarea
                    id="enquiry-message"
                    name="message"
                    required
                    rows={4}
                    placeholder={form.message_placeholder}
                    className={`${boxClass} resize-none py-3`}
                  />
                </Field>
              </div>

              <div className="mt-8">
                <PrimaryButton
                  type="submit"
                  id="enquiry-submit"
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

          {/* ── Right: image + feature panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="flex flex-col"
          >
            <div className="group relative aspect-[4/3] w-full overflow-hidden bg-lavender lg:aspect-auto lg:min-h-[360px] lg:flex-[1.1]">
              <Image
                src={data.image}
                alt={data.image_alt}
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary-dark/70 to-transparent" />
            </div>

            <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-navy px-7 py-10 sm:px-10">
              {/* Decorative diagonal light planes */}
              <div className="pointer-events-none absolute -right-16 -top-10 h-[140%] w-40 rotate-[24deg] bg-white/[0.05]" />
              <div className="pointer-events-none absolute right-16 -top-10 h-[140%] w-16 rotate-[24deg] bg-white/[0.04]" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-primary-light/30 blur-3xl" />

              <ul className="relative space-y-6">
                {data.features.map((feature, idx) => {
                  const Icon = featureIcons[feature.icon] ?? House;
                  return (
                    <motion.li
                      key={feature.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + idx * 0.1, ease }}
                      className="group flex items-start gap-4"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-primary-dark">
                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <span className="pt-0.5">
                        <span className="block text-[14px] font-semibold text-white">{feature.title}</span>
                        <span className="mt-1 block max-w-[17rem] text-[12.5px] leading-relaxed text-white/70">
                          {feature.description}
                        </span>
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
