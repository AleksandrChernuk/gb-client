import MainFooter from '@/widgets/footer/MainFooter';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { Locale } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Params } from '@/shared/types/common.types';
import { setRequestLocale } from 'next-intl/server';
import RoutesHerow from '@/views/favorite-route/RoutesHerow';
import RoutesList from '@/views/favorite-route/RoutesList';

type Props = {
  params: Params;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props) {
  const { lng } = (await params) as { lng: Locale };
  const { page } = await searchParams;
  const isPaginated = Number(page) > 1;

  const baseMetadata = await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'routes',
    path: 'routes/',
  });

  return {
    ...baseMetadata,
    ...(isPaginated && { robots: { index: false, follow: true } }),
  };
}

export default async function Routes({ params, searchParams }: Props) {
  const { page: pageParam } = await searchParams;

  const { lng } = await params;

  setRequestLocale(lng as Locale);

  return (
    <>
      <main className="bg-slate-50 dark:bg-slate-900">
        <RoutesHerow />
        <RoutesList pageParam={pageParam} />
      </main>
      <MainFooter />
    </>
  );
}
