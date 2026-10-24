'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface PrimaryButtonProps {
  href?: string;
  text: string;
  variant?: 'solid' | 'outline';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

/** Site-wide CTA: rounded rectangle, indigo gradient, arrow slides on hover (styles in globals.css → .btn-primary) */
export default function PrimaryButton({
  href,
  text,
  variant = 'solid',
  className = '',
  onClick,
  type = 'button',
  id,
  disabled,
  'aria-label': ariaLabel,
}: PrimaryButtonProps) {
  const baseClass = `${variant === 'solid' ? 'btn-primary' : 'btn-outline'} btn-shine cursor-pointer ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={baseClass} id={id} aria-label={ariaLabel}>
        <span>{text}</span>
        <ArrowRight className="btn-arrow" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClass}
      id={id}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span>{text}</span>
      <ArrowRight className="btn-arrow" aria-hidden="true" />
    </button>
  );
}
