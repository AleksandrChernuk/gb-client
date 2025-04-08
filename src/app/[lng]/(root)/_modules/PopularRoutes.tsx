import { Container } from '@/components/shared/Container';
import { getTranslations } from 'next-intl/server';
import { popularRoutersFakeData } from '@/constans/popular-routers.constans';
import RoutersDropdownList from './components/RoutersDropdownList';
import RoutersItem from './components/RoutersItem';

export default async function PopularRoutes() {
  const t = await getTranslations('main');
  const initialRouters = popularRoutersFakeData.slice(0, 3);

  return (
    <section className="py-6 bg-green-500 dark:bg-slate-800">
      <Container size="m" className="tablet:px-8">
        <h3 className="mb-4 text-white text-lg font-bold tracking-tighter leading-[21.6px] tablet:text-2xl ftablet:leading-[28.8px] laptop:mb-8 laptop:text-[32px] laptop:leading-[38.4px]">
          {t('popular_title')}
        </h3>
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
