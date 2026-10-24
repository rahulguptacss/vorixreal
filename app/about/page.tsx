import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Breadcrumb from '../../components/sections/Breadcrumb';
import About from '../../components/sections/About';
import WhyChooseUs from '../../components/sections/WhyChooseUs';
import Services from '../../components/sections/Services';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

const pageData = pages.about;

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
};

export default function AboutPage() {
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: <Breadcrumb data={sections.breadcrumb} currentPage={pageData.pageName} watermark={pageData.watermark} />,
    About: <About data={sections.about} showButton={false} showTags={false} />,
    WhyChooseUs: <WhyChooseUs data={sections.why_choose_us} />,
    Services: <Services data={sections.services} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pageData.components.map((block: PageComponent) => (
          <React.Fragment key={block.key}>{sectionMap[block.component] ?? null}</React.Fragment>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
