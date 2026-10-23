import data from '../data/data.json';

export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

export type LinkType = NavItem;

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

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
}

export interface WhyChooseUsSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  image: string;
  image_alt: string;
  items: WhyChooseUsItem[];
}

export interface PropertyItem {
  id: string;
  category: string;
  title: string;
  image: string;
  alt: string;
  href: string;
}

export interface PaginationLabels {
  label: string;
  prev_aria_label: string;
  next_aria_label: string;
  page_aria_label: string;
  /** Supports {from}, {to} and {total} placeholders */
  showing_text?: string;
}

export interface PropertiesSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  button_text: string;
  button_link: string;
  view_aria_label?: string;
  slides_aria_label?: string;
  slide_aria_label?: string;
  items: PropertyItem[];
  /** Max items shown in the homepage slider */
  homepage_count?: number;
  /** Items per page on the full properties grid */
  per_page?: number;
  pagination?: PaginationLabels;
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
  slides_aria_label?: string;
  testimonial_aria_label?: string;
  rating_aria_label?: string;
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
  default_author?: string;
  homepage_count?: number;
  /** Posts per page on the full blog grid */
  per_page?: number;
  pagination?: PaginationLabels;
  posts: BlogPostItem[];
}

export interface BlogDetailSectionItem {
  title: string;
  paragraph: string;
}

export interface BlogDetailSectionData {
  /** Small label above the title, e.g. "Real Estate Insights" */
  eyebrow: string;
  category: string;
  date: string;
  author: string;
  read_time: string;
  title: string;
  hero_image: string;
  hero_alt: string;
  intro: string[];
  sections: BlogDetailSectionItem[];
}

export interface BlogDetailLabels {
  recent_posts_title: string;
  recent_posts_count: number;
}

export interface RecentPostItem {
  slug: string;
  title: string;
  image: string;
  alt: string;
  date: string;
}

export interface PropertyKeyDetail {
  icon: string;
  label: string;
  value: string;
}

export interface PropertyNearbyItem {
  icon: string;
  time: string;
  place: string;
}

export interface PropertyDetailData {
  title: string;
  location: string;
  hero_image: string;
  hero_alt: string;
  gallery_image: string;
  gallery_alt: string;
  overview: string[];
  key_details: PropertyKeyDetail[];
  description: string[];
  features: string[];
  location_text: string;
  map: {
    embed_url: string;
    link_url: string;
  };
  nearby: PropertyNearbyItem[];
}

export interface PropertyDetailLabels {
  key_details_title: string;
  description_title: string;
  location_title: string;
  map_link_text: string;
  map_title_prefix: string;
}

export interface ContactInfoCard {
  id: string;
  icon: string;
  title: string;
  lines: string[];
  /** Small muted line shown under the main lines, e.g. "We respond within 24 hours" */
  note?: string;
  href?: string;
}

export interface ContactFormFields {
  title?: string;
  name_label: string;
  name_placeholder: string;
  email_label: string;
  email_placeholder: string;
  phone_label: string;
  phone_placeholder: string;
  subject_label: string;
  subject_placeholder: string;
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
  info_title: string;
  info_cards: ContactInfoCard[];
  follow_title: string;
  socials: FooterSocialItem[];
  form: ContactFormFields;
  map: ContactMapData;
}

export interface EnquiryFeature {
  icon: string;
  title: string;
  description: string;
}

export interface EnquiryFormFields {
  name_label: string;
  name_placeholder: string;
  email_label: string;
  email_placeholder: string;
  phone_label: string;
  phone_placeholder: string;
  property_type_label: string;
  property_type_placeholder: string;
  property_type_options: string[];
  location_label: string;
  location_placeholder: string;
  budget_label: string;
  budget_placeholder: string;
  budget_options: string[];
  message_label: string;
  message_placeholder: string;
  submit_text: string;
  success_message?: string;
}

export interface EnquirySectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  image: string;
  image_alt: string;
  features: EnquiryFeature[];
  form: EnquiryFormFields;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  alt: string;
}

export interface TeamSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  members: TeamMember[];
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  /** Large faded word shown behind the breadcrumb title (falls back to pageName) */
  watermark?: string;
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
  why_choose_us: WhyChooseUsSectionData;
  properties: PropertiesSectionData;
  testimonials: TestimonialsSectionData;
  blog: BlogSectionData;
  blog_detail: BlogDetailLabels;
  blog_details: Record<string, BlogDetailSectionData>;
  property_detail: PropertyDetailLabels;
  property_details: Record<string, PropertyDetailData>;
  contact: ContactSectionData;
  enquiry: EnquirySectionData;
  team: TeamSectionData;
}

export interface SitePages {
  home: PageMeta;
  not_found: NotFoundData;
  about: PageMeta;
  services: PageMeta;
  properties: PageMeta;
  blog: PageMeta;
  blog_detail: PageMeta;
  property_detail: PageMeta;
  contact: PageMeta;
  enquiry: PageMeta;
  team: PageMeta;
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
