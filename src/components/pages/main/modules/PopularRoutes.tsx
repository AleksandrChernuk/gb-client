import { Container } from '@/components/shared/Container';
import { RoutersList } from '../components/RoutersList';
import { getTranslations } from 'next-intl/server';

export default async function PopularRoutes() {
  const t = await getTranslations('main');

  return (
    <section className="py-6 bg-background_card dark:bg-dark_main">
      <Container size="m" className="tablet:px-8">
        <h3 className="mb-4 text-white button_large_text tablet:h3 laptop:mb-8 laptop:h1">{t('popular_title')}</h3>
        <RoutersList buttonText={t('popular_button')} />
      </Container>
    </section>
  );
}
