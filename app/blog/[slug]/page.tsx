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
    title: `${detail.title} | ${common.Header.logo_text} ${common.Header.logo_subtext}`,
    description: detail.intro[0] ?? pageData.metadata.description,
  };
}

/** Reads the dynamic slug inside a Suspense boundary (required for instant navigation with Cache Components) */
async function BlogDetailContent({ params }: { params: Params }) {
  const { slug } = await params;
  const detail = sections.blog_details[slug];
  if (!detail) notFound();

  // Latest posts (excluding the current one) for the "Recent Posts" sidebar
  const recentPosts = sections.blog.posts
    .filter((post) => post.slug !== slug)
    .slice(0, sections.blog_detail.recent_posts_count)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      image: post.image,
      alt: post.alt,
      date: sections.blog_details[post.slug]?.date ?? post.date,
    }));

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        currentPage={pageData.pageName}
        watermark={pageData.watermark}
        items={[...sections.breadcrumb.items, { name: pages.blog.pageName, href: '/blog' }, { name: pageData.pageName, href: '' }]}
      />
    ),
    BlogDetail: (
      <BlogDetail
        data={detail}
        labels={sections.blog_detail}
        recentPosts={recentPosts}
        authorPrefix={sections.blog.author_prefix}
      />
    ),
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
    <div className="animate-pulse">
      <div className="h-[300px] sm:h-[380px] lg:h-[440px] w-full bg-lavender" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid gap-12 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="h-10 w-3/4 rounded bg-lavender mb-6" />
          <div className="aspect-[13/5] w-full bg-lavender mb-6" />
          <div className="h-4 w-full rounded bg-lavender mb-2" />
          <div className="h-4 w-5/6 rounded bg-lavender" />
        </div>
        <div className="h-80 bg-lavender" />
      </div>
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
