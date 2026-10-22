import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import BlogDetail from '../../../components/sections/BlogDetail';
import Footer from '../../../components/sections/Footer';
import BackToTop from '../../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../../components/types';

type Params = Promise<{ slug: string }>;

const pageData = pages.blog_detail;

export function generateStaticParams() {
  return sections.blog.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const detail = sections.blog_details[slug];
  if (!detail) return { title: pageData.metadata.title, description: pageData.metadata.description };
  return {
    title: `${detail.title} | Vorix Real Estate`,
    description: detail.intro,
  };
}

/** Reads the dynamic slug inside a Suspense boundary (required for instant navigation with Cache Components) */
async function BlogDetailContent({ params }: { params: Params }) {
  const { slug } = await params;
  const detail = sections.blog_details[slug];
  if (!detail) notFound();

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        currentPage={pageData.pageName}
        items={[...sections.breadcrumb.items, { name: pages.blog.pageName, href: '/blog' }, { name: pageData.pageName, href: '' }]}
      />
    ),
    BlogDetail: <BlogDetail data={detail} />,
  };

  return (
    <>
      {pageData.components.map((block: PageComponent) => (
        <React.Fragment key={block.key}>{sectionMap[block.component] ?? null}</React.Fragment>
      ))}
    </>
  );
}

function BlogDetailFallback() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 animate-pulse">
      <div className="h-[240px] sm:h-[300px] rounded-[24px] bg-lavender mb-10" />
      <div className="h-8 w-3/4 rounded bg-lavender mb-4" />
      <div className="h-4 w-full rounded bg-lavender mb-2" />
      <div className="h-4 w-5/6 rounded bg-lavender" />
    </div>
  );
}

export default function BlogDetailPage({ params }: { params: Params }) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Suspense fallback={<BlogDetailFallback />}>
          <BlogDetailContent params={params} />
        </Suspense>
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
