import MainFooter from '@/widgets/footer/MainFooter';
import { RoutesHerow } from '@/views/favorite-route/RoutesHerow';
import { RoutesList } from '@/views/favorite-route/RoutesList';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { Locale } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Params } from '@/shared/types/common.types';

type Props = {
  params: Params;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'routes',
    path: '/routes',
  });
}

export default async function Routes({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;

  return (
    <>
      <main className="bg-slate-50 dark:bg-slate-800">
        <RoutesHerow />
        <RoutesList pageParam={pageParam} />
      </main>
      <MainFooter />
    </>
  );
}
