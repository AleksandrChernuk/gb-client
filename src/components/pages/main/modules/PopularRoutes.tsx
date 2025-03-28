import { Container } from '@/components/shared/Container';
import RoutersDropdownList from '../components/RoutersDropdownList';
import { getTranslations } from 'next-intl/server';
import { popularRoutersFakeData } from '@/constans/popular-routers.constans';
import RoutersItem from '../components/RoutersItem';

export default async function PopularRoutes() {
  const t = await getTranslations('main');
  const initialRouters = popularRoutersFakeData.slice(0, 3);

  return (
    <section className="py-6 bg-background_card dark:bg-dark_main">
      <Container size="m" className="tablet:px-8">
        <h3 className="mb-4 text-white button_large_text tablet:h3 laptop:mb-8 laptop:h1">{t('popular_title')}</h3>
        <div className="grid grid-cols-1 gap-4 mb-4 laptop:grid-cols-3 laptop:gap-8 laptop:mb-8">
          {initialRouters.map((router) => (
            <div className="w-full" key={router.id}>
              <RoutersItem from={router?.from} to={router?.to} />
            </div>
          ))}
        </div>
        <RoutersDropdownList />
      </Container>
    </section>
  );
}
