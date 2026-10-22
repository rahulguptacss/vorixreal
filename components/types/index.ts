import data from '../data/data.json';

export interface LinkType {
  name: string;
  href: string;
}

export interface HeaderData {
  logo: string;
  logo_text: string;
  logo_subtext: string;
  links: LinkType[];
  button_text?: string;
  button_link?: string;
  menu_aria_label: string;
  close_aria_label: string;
}

export interface FooterSocialItem {
  name: string;
  href: string;
  icon: string;
  aria_label: string;
}

export interface FooterContactItem {
  icon: string;
  label?: string;
  text: string;
  href?: string;
}

export interface FooterData {
  logo: string;
  logo_text: string;
  description: string;
  socials: FooterSocialItem[];
  pages_title: string;
  pages_links: LinkType[];
  properties_title: string;
  properties_links: LinkType[];
  contact_title: string;
  contact_items: FooterContactItem[];
  copyright: string;
  bottom_links?: LinkType[];
}

export interface BackToTopData {
  aria_label: string;
}

export interface HeroSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  description: string;
  cta_text: string;
  cta_link: string;
  image: string;
  image_alt: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbSectionData {
  background_image: string;
  background_alt: string;
  items: BreadcrumbItem[];
}
export type BreadcrumbData = BreadcrumbSectionData;

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutSectionData {
  eyebrow: string;
  side_text: string;
  title_regular: string;
  title_highlight: string;
  description_paragraphs: string[];
  button_text: string;
  button_link: string;
  image_main: string;
  image_main_alt: string;
  image_secondary: string;
  image_secondary_alt: string;
  tags?: string[];
  stats: StatItem[];
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface ServicesSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  subtitle: string;
  read_more_text?: string;
  items: ServiceItem[];
}

export interface PropertyItem {
  id: string;
  category: string;
  title: string;
  image: string;
  alt: string;
  href: string;
}

export interface PropertiesSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  button_text: string;
  button_link: string;
  view_aria_label?: string;
  items: PropertyItem[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  /** Property photo shown alongside this testimonial */
  image: string;
  image_alt: string;
}

export interface TestimonialsSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  intro: string;
  more_text: string;
  more_link: string;
  prev_aria_label: string;
  next_aria_label: string;
  items: TestimonialItem[];
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  alt: string;
  excerpt: string;
  author?: string;
}

export interface BlogSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  button_text: string;
  button_link: string;
  read_more_text?: string;
  author_prefix?: string;
  homepage_count?: number;
  posts: BlogPostItem[];
}

export interface BlogDetailSectionItem {
  title: string;
  paragraph: string;
}

export interface BlogDetailSectionData {
  category: string;
  date: string;
  author: string;
  title: string;
  hero_image: string;
  hero_alt: string;
  intro: string;
  quote?: string;
  sections: BlogDetailSectionItem[];
}

export interface ContactInfoCard {
  id: string;
  icon: string;
  title: string;
  lines: string[];
  href?: string;
}

export interface ContactFormFields {
  title: string;
  name_label: string;
  name_placeholder: string;
  email_label: string;
  email_placeholder: string;
  phone_label: string;
  phone_placeholder: string;
  subject_label: string;
  subject_placeholder: string;
  subject_options: string[];
  message_label: string;
  message_placeholder: string;
  submit_text: string;
  success_message?: string;
}

export interface ContactMapData {
  title: string;
  embed_url: string;
}

export interface ContactSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  info_cards: ContactInfoCard[];
  form: ContactFormFields;
  map: ContactMapData;
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: {
    title: string;
    description: string;
  };
  components: PageComponent[];
}

export interface NotFoundData {
  code: string;
  badge: string;
  title: string;
  description: string;
  back_home: {
    text: string;
    href: string;
  };
}

export interface SiteSections {
  breadcrumb: BreadcrumbSectionData;
  hero: HeroSectionData;
  about: AboutSectionData;
  services: ServicesSectionData;
  properties: PropertiesSectionData;
  testimonials: TestimonialsSectionData;
  blog: BlogSectionData;
  blog_details: Record<string, BlogDetailSectionData>;
  contact: ContactSectionData;
}

export interface SitePages {
  home: PageMeta;
  not_found: NotFoundData;
  about: PageMeta;
  services: PageMeta;
  properties: PageMeta;
  blog: PageMeta;
  blog_detail: PageMeta;
  contact: PageMeta;
}

export interface TemplateComponents {
  pages: SitePages;
  sections: SiteSections;
}

export interface SiteData {
  common: {
    Header: HeaderData;
    Footer: FooterData;
    BackToTop: BackToTopData;
  };
  categories: {
    RealEstate: {
      templateComponents: {
        'template-1': TemplateComponents;
      };
    };
  };
}

export const siteJson: SiteData = data;
export const common = siteJson.common;
export const template = siteJson.categories.RealEstate.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
