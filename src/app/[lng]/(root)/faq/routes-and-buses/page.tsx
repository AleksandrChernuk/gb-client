import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { navItems } from '@/shared/constans/faq.nav.items';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { Container } from '@/shared/ui/Container';
import { FaqDisplay } from '@/widgets/faq/FaqDisplay';
import FaqNav from '@/widgets/faq/FaqNav';
import { Locale } from 'next-intl';

type Props = {
  params: Promise<{ lng: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'faq_routes_buses',
    path: '/faq/routes-and-buses',
  });
}

export default async function RoutesAndBuses({ searchParams }: Props) {
  const search = await searchParams;
  const searchQuery = search.q as string | undefined;

  return (
    <Container size="l">
      <div className="grid grid-cols-1 tablet:grid-cols-4 gap-2">
        <FaqNav slug={navItems[1].href} />
        <FaqDisplay slug={navItems[1].href} value={searchQuery ? searchQuery : undefined} />
      </div>
    </Container>
  );
}
