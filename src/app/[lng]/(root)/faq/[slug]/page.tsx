import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { navItems } from '@/shared/constans/faq.nav.items';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import FaqContent from '@/views/faq-page/FaqContent';
import FaqSearchResult from '@/widgets/faq-search-result/FaqSearchResult';
import { Locale } from 'next-intl';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ lng: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const FAQ_PAGES: Record<string, { metaSlug: string; navIndex: number; titleKey: string }> = {
  'bronjuvannja-mists': { metaSlug: 'faq_booking', navIndex: 0, titleKey: 'booking_title' },
  'routes-and-buses': { metaSlug: 'faq_routes_buses', navIndex: 1, titleKey: 'routes_title' },
  'ticket-refund': { metaSlug: 'faq_ticket_refund', navIndex: 2, titleKey: 'refund_title' },
  search: { metaSlug: 'faq_search', navIndex: -1, titleKey: 'search_title' },
};

export async function generateMetadata({ params }: Props) {
  const { lng, slug } = (await params) as { lng: Locale; slug: string };
  const page = FAQ_PAGES[slug];
  if (!page) return {};

  return await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: page.metaSlug,
    path: `/faq/${slug}`,
  });
}

export default async function FaqPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const search = await searchParams;

  if (slug === 'search') {
    return <FaqSearchResult />;
  }

  const page = FAQ_PAGES[slug];
  if (!page) notFound();

  const searchQuery = search.q as string | undefined;
  const href = navItems[page.navIndex].href;

  return <FaqContent slug={href} searchQuery={searchQuery} />;
}
