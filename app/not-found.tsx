import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import { common, pages } from '../components/types';

const notFoundData = pages.not_found;

export const metadata: Metadata = {
  title: `${notFoundData.code} - ${notFoundData.title}`,
  description: notFoundData.description,
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[110px]" aria-hidden="true" />
        <section className="relative z-10 flex max-w-xl flex-col items-center text-center">
          <p
            className="font-heading text-[120px] sm:text-[180px] font-semibold leading-none tracking-tight text-primary-gradient select-none"
            aria-hidden="true"
          >
            {notFoundData.code}
          </p>
          <span className="mt-2 rounded-full bg-lavender px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {notFoundData.badge}
          </span>
          <h1 className="mt-5 font-heading text-3xl sm:text-4xl font-medium text-primary-dark">{notFoundData.title}</h1>
          <p className="mt-3 text-[15px] text-muted">{notFoundData.description}</p>
          <Link href={notFoundData.back_home.href} className="btn-primary btn-shine mt-8">
            <ArrowLeft className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} aria-hidden="true" />
            {notFoundData.back_home.text}
          </Link>
        </section>
      </main>
      <Footer data={common.Footer} />
    </div>
  );
}
