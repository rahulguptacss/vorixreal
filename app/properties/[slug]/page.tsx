import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import PropertyDetail from '../../../components/sections/PropertyDetail';
import Footer from '../../../components/sections/Footer';
import BackToTop from '../../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../../components/types';

type Params = Promise<{ slug: string }>;

const pageData = pages.property_detail;

export function generateStaticParams() {
  return sections.properties.items
    .filter((item) => sections.property_details[item.id])
    .map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const detail = sections.property_details[slug];
  if (!detail) return { title: pageData.metadata.title, description: pageData.metadata.description };
  return {
    title: `${detail.title} | ${common.Header.logo_text} ${common.Header.logo_subtext}`,
    description: detail.overview[0] ?? pageData.metadata.description,
  };
}

/** Reads the dynamic slug inside a Suspense boundary (required for instant navigation with Cache Components) */
async function PropertyDetailContent({ params }: { params: Params }) {
  const { slug } = await params;
  const detail = sections.property_details[slug];
  if (!detail) notFound();

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        currentPage={pageData.pageName}
        watermark={pageData.watermark}
        items={[...sections.breadcrumb.items, { name: pages.properties.pageName, href: '/properties' }, { name: pageData.pageName, href: '' }]}
      />
    ),
    PropertyDetail: <PropertyDetail data={detail} labels={sections.property_detail} />,
  };

  return (
    <>
      {pageData.components.map((block: PageComponent) => (
        <React.Fragment key={block.key}>{sectionMap[block.component] ?? null}</React.Fragment>
      ))}
    </>
  );
}

function PropertyDetailFallback() {
  return (
    <div className="animate-pulse">
      <div className="h-[300px] sm:h-[380px] lg:h-[440px] w-full bg-lavender" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="aspect-[5/2] w-full bg-lavender mb-10" />
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="h-10 w-2/3 rounded bg-lavender mb-5" />
            <div className="h-4 w-full rounded bg-lavender mb-2" />
            <div className="h-4 w-5/6 rounded bg-lavender" />
          </div>
          <div className="h-72 bg-lavender" />
        </div>
      </div>
    </div>
  );
}

export default function PropertyDetailPage({ params }: { params: Params }) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Suspense fallback={<PropertyDetailFallback />}>
          <PropertyDetailContent params={params} />
        </Suspense>
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
