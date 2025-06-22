import { Container } from '@/components/shared/Container';
import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import PopularRoutesList from '../components/PopularRoutesList';

export default async function PopularRoutes() {
  const t = await getTranslations(MESSAGE_FILES.MAIN_PAGE);

  return (
    <section className="py-6 bg-green-500 dark:bg-slate-800">
      <Container size="m" className="tablet:px-8">
        <h3 className="mb-4 text-white text-lg font-bold tracking-tighter leading-[21.6px] tablet:text-2xl ftablet:leading-[28.8px] laptop:mb-8 laptop:text-[32px] laptop:leading-[38.4px]">
          {t('popular_title')}
        </h3>
        <PopularRoutesList />
      </Container>
    </section>
  );
}
