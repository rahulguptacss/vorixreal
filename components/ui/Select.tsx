'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

interface SelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
  className?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Custom, fully styled dropdown (native <select> popups can't be styled). Keyboard + screen-reader friendly. */
export default function Select({ id, name, value, onChange, options, placeholder, required = false, className = '' }: SelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  // Keep the highlighted option in view
  useEffect(() => {
    if (!open || active < 0) return;
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const openList = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };

  const choose = (opt: string) => {
    onChange(opt);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive((i) => Math.min(options.length - 1, i + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
        break;
      case 'Home':
        e.preventDefault();
        setActive(0);
        break;
      case 'End':
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (active >= 0) choose(options[active]);
        break;
      case 'Escape':
      case 'Tab':
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex h-11 w-full items-center justify-between gap-3 rounded-[3px] border bg-white pl-3.5 pr-3 text-left text-[13px] outline-none transition-all duration-300 cursor-pointer ${
          open
            ? 'border-primary ring-4 ring-primary/10'
            : 'border-primary/15 hover:border-primary/30 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10'
        }`}
      >
        <span className={`truncate ${value ? 'text-foreground' : 'text-muted/70'}`}>{value || placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-all duration-300 ${open ? 'rotate-180 text-primary' : 'text-muted/70'}`}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </button>

      {/* Hidden field so the value submits with the form and `required` validation still works */}
      <input
        tabIndex={-1}
        aria-hidden="true"
        name={name}
        value={value}
        required={required}
        onChange={() => {}}
        onInvalid={() => buttonRef.current?.focus()}
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-px opacity-0"
      />

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={id}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22, ease }}
            className="absolute left-0 right-0 top-full z-40 mt-2 max-h-64 origin-top overflow-auto rounded-md border border-primary/10 bg-white p-1.5 shadow-[0_24px_50px_-20px_rgba(27,20,96,0.35)]"
          >
            {options.map((opt, idx) => {
              const selected = opt === value;
              const highlighted = idx === active;
              return (
                <li
                  key={opt}
                  id={`${listId}-${idx}`}
                  role="option"
                  aria-selected={selected}
                  onPointerEnter={() => setActive(idx)}
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => choose(opt)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-[4px] px-3 py-2.5 text-[13px] transition-colors duration-150 ${
                    highlighted ? 'bg-lavender text-primary' : 'text-foreground/85'
                  } ${selected ? 'font-medium text-primary' : ''}`}
                >
                  <span className="truncate">{opt}</span>
                  {selected && <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} aria-hidden="true" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
