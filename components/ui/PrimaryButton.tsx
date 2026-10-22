'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface PrimaryButtonProps {
  href: string;
  text: string;
  variant?: 'solid' | 'outline';
  className?: string;
  onClick?: () => void;
}

/** Site-wide CTA: rounded rectangle, indigo gradient, arrow slides on hover (styles in globals.css → .btn-primary) */
export default function PrimaryButton({ href, text, variant = 'solid', className = '', onClick }: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${variant === 'solid' ? 'btn-primary' : 'btn-outline'} btn-shine ${className}`}
    >
      <span>{text}</span>
      <ArrowRight className="btn-arrow" aria-hidden="true" />
    </Link>
  );
}
