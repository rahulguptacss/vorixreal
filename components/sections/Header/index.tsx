'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData, NavItem } from '../../types';
import PrimaryButton from '../../ui/PrimaryButton';

interface HeaderProps {
  data: HeaderData;
}

/** Desktop Navigation Item — handles standard link, Level 1 dropdown, and Level 2 nested dropdown flyouts */
function DesktopNavItem({
  item,
  active,
  isActive,
}: {
  item: NavItem;
  active: boolean;
  isActive: (href: string) => boolean;
}) {
  const hasChildren = Boolean(item.children && item.children.length > 0);

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={`relative px-3.5 py-2 text-[14.5px] font-medium transition-colors duration-200 ${
          active ? 'text-primary' : 'text-foreground/75 hover:text-primary'
        }`}
      >
        {item.name}
        {active && (
          <motion.span
            layoutId="nav-active-pill"
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-primary"
          />
        )}
      </Link>
    );
  }

  return (
    <div className="group/nav relative inline-block">
      <Link
        href={item.href}
        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-[14.5px] font-medium transition-colors duration-200 ${
          active ? 'text-primary' : 'text-foreground/75 hover:text-primary'
        }`}
      >
        <span>{item.name}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover/nav:rotate-180" />
        {active && (
          <motion.span
            layoutId="nav-active-pill"
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-primary"
          />
        )}
      </Link>

      {/* Level 1 Dropdown */}
      <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 translate-y-1.5 transition-all duration-200 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100 group-hover/nav:translate-y-0 focus-within:pointer-events-auto focus-within:opacity-100 focus-within:translate-y-0 z-50">
        <div className="min-w-[220px] rounded-xl border border-primary/10 bg-white p-2 shadow-[0_16px_36px_-12px_rgba(27,20,96,0.22)] backdrop-blur-md">
          <ul className="space-y-0.5">
            {item.children?.map((sub) => {
              const hasSubChildren = Boolean(sub.children && sub.children.length > 0);
              const isSubActive = isActive(sub.href);

              if (!hasSubChildren) {
                return (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      className={`block rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                        isSubActive ? 'bg-lavender text-primary' : 'text-foreground/80 hover:bg-lavender hover:text-primary'
                      }`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                );
              }

              // Level 2: Nested dropdown flyout (dropdown inside dropdown)
              return (
                <li key={sub.name} className="group/sub relative">
                  <Link
                    href={sub.href}
                    className={`flex items-center justify-between rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                      isSubActive ? 'bg-lavender text-primary' : 'text-foreground/80 hover:bg-lavender hover:text-primary'
                    }`}
                  >
                    <span>{sub.name}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover/sub:translate-x-0.5" />
                  </Link>

                  {/* Level 2 Sub-Dropdown Card */}
                  <div className="pointer-events-none absolute left-full top-0 pl-2 opacity-0 translate-x-1.5 transition-all duration-200 group-hover/sub:pointer-events-auto group-hover/sub:opacity-100 group-hover/sub:translate-x-0 focus-within:pointer-events-auto focus-within:opacity-100 focus-within:translate-x-0 z-50">
                    <div className="min-w-[200px] rounded-xl border border-primary/10 bg-white p-2 shadow-[0_16px_36px_-12px_rgba(27,20,96,0.25)]">
                      <ul className="space-y-0.5">
                        {sub.children?.map((nested) => (
                          <li key={nested.name}>
                            <Link
                              href={nested.href}
                              className={`block rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                                isActive(nested.href) ? 'bg-lavender text-primary' : 'text-foreground/80 hover:bg-lavender hover:text-primary'
                              }`}
                            >
                              {nested.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Mobile Drawer Nav Item — handles standard link and multi-level accordions */
function MobileNavItem({
  item,
  isActive,
  onClose,
}: {
  item: NavItem;
  isActive: (href: string) => boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [subExpanded, setSubExpanded] = useState<Record<string, boolean>>({});
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const active = isActive(item.href);

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className={`group flex items-center justify-between rounded-xl px-4 py-3.5 font-heading text-lg transition-colors ${
          active ? 'bg-lavender text-primary' : 'text-foreground hover:bg-lavender hover:text-primary'
        }`}
      >
        {item.name}
        <ArrowUpRight className="h-4 w-4 opacity-40 transition-all group-hover:opacity-100 group-hover:rotate-45" />
      </Link>
    );
  }

  const toggleSub = (name: string) => {
    setSubExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="flex flex-col">
      <div
        className={`group flex items-center justify-between rounded-xl px-4 py-3 font-heading text-lg transition-colors ${
          active ? 'bg-lavender text-primary' : 'text-foreground hover:bg-lavender hover:text-primary'
        }`}
      >
        <Link href={item.href} onClick={onClose} className="flex-1">
          {item.name}
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((prev) => !prev);
          }}
          aria-label={`Toggle ${item.name} sub-menu`}
          aria-expanded={expanded}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-primary/70 hover:bg-primary/10 cursor-pointer"
        >
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pl-4 pr-1 pt-1 pb-2 space-y-1"
          >
            {item.children?.map((sub) => {
              const hasSubChildren = Boolean(sub.children && sub.children.length > 0);
              const isSubOpen = Boolean(subExpanded[sub.name]);

              if (!hasSubChildren) {
                return (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      onClick={onClose}
                      className="block rounded-lg px-3.5 py-2 text-[15px] font-medium text-foreground/80 hover:bg-lavender hover:text-primary transition-colors"
                    >
                      {sub.name}
                    </Link>
                  </li>
                );
              }

              // Level 2 inside mobile accordion
              return (
                <li key={sub.name} className="flex flex-col">
                  <div className="flex items-center justify-between rounded-lg px-3.5 py-2 text-[15px] font-medium text-foreground/80 hover:bg-lavender hover:text-primary transition-colors">
                    <Link href={sub.href} onClick={onClose} className="flex-1">
                      {sub.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleSub(sub.name)}
                      aria-label={`Toggle ${sub.name} nested menu`}
                      className="p-1 text-primary/70 cursor-pointer"
                    >
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${isSubOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                  <AnimatePresence initial={false}>
                    {isSubOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-4 space-y-0.5"
                      >
                        {sub.children?.map((nested) => (
                          <li key={nested.name}>
                            <Link
                              href={nested.href}
                              onClick={onClose}
                              className="block rounded-lg px-3 py-1.5 text-[14px] text-muted hover:text-primary transition-colors"
                            >
                              {nested.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(27,20,96,0.18)] py-2.5'
            : 'bg-white py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" aria-label={`${data.logo_text} ${data.logo_subtext}`} className="shrink-0">
            <div
              className={`relative transition-all duration-300 ${
                isScrolled
                  ? 'w-40 h-11 sm:w-48 sm:h-14'
                  : 'w-48 h-[52px] sm:w-60 sm:h-[68px] lg:w-52 lg:h-[60px] xl:w-60 xl:h-[68px]'
              }`}
            >
              <Image
                src={data.logo}
                alt={`${data.logo_text} ${data.logo_subtext}`}
                fill
                priority
                sizes="240px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop navigation with multi-level dropdown support */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {data.links.map((link) => (
              <DesktopNavItem
                key={link.name}
                item={link}
                active={isActive(link.href)}
                isActive={isActive}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {data.button_text && data.button_link && (
              <PrimaryButton
                href={data.button_link}
                text={data.button_text}
                className="hidden sm:inline-flex px-5 py-3 text-sm"
              />
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label={data.menu_aria_label}
              aria-expanded={isOpen}
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary transition-colors hover:bg-lavender cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Spacer so fixed header doesn't overlap content */}
      <div aria-hidden="true" className="h-[84px] sm:h-[100px]" />

      {/* Mobile drawer with multi-level accordion support */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-navy/50 lg:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[86%] max-w-sm bg-white shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-primary/10">
                <div className="relative w-44 h-12">
                  <Image src={data.logo} alt={data.logo_text} fill sizes="176px" className="object-contain object-left" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={data.close_aria_label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender text-primary transition-transform hover:rotate-90 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1">
                {data.links.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <MobileNavItem
                      item={link}
                      isActive={isActive}
                      onClose={() => setIsOpen(false)}
                    />
                  </motion.div>
                ))}
              </nav>

              {data.button_text && data.button_link && (
                <div className="p-6 border-t border-primary/10">
                  <PrimaryButton
                    href={data.button_link}
                    text={data.button_text}
                    onClick={() => setIsOpen(false)}
                    className="w-full"
                  />
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
