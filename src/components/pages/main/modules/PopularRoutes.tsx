import { Container } from '@/components/shared/Container';
import { getTranslations } from 'next-intl/server';
import RoutersDropdownList from '../components/RoutersDropdownList';
import RoutersItem from '../components/RoutersItem';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { getLocations } from '@/actions/location.actions';
import { ILocation } from '@/types/location.types';

function buildRoutes(locations: ILocation[]) {
  const fromUA = locations.filter((loc) => loc.country.code === 'UA');
  const toNotUA = locations.filter((loc) => loc.country.code !== 'UA');

  const minLength = Math.min(fromUA.length, toNotUA.length);
  const evenLength = minLength % 2 === 0 ? minLength : minLength - 1;

  const routes: { from: ILocation; to: ILocation }[] = [];

  for (let i = 0; i < evenLength; i++) {
    routes.push({ from: fromUA[i], to: toNotUA[i] });
  }

  return routes;
}

export default async function PopularRoutes() {
  const data = await getLocations({ query: '', perPage: 99 });
  const allRoutes = buildRoutes(data.data);

  const initialRouters = allRoutes.slice(0, 4);
  const dropdownRouters = allRoutes.slice(4);

  const t = await getTranslations(MESSAGE_FILES.MAIN_PAGE);

  return (
    <section className="py-6 bg-green-500 dark:bg-slate-800">
      <Container size="m" className="tablet:px-8">
        <h3 className="mb-4 text-white text-lg font-bold tracking-tighter leading-[21.6px] tablet:text-2xl ftablet:leading-[28.8px] laptop:mb-8 laptop:text-[32px] laptop:leading-[38.4px]">
          {t('popular_title')}
        </h3>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 mb-4 laptop:grid-cols-3 laptop:gap-8 laptop:mb-8">
          {initialRouters.map((router, i) => (
            <div className="w-full" key={i + 1}>
              <RoutersItem from={router?.from} to={router?.to} />
            </div>
          ))}
        </div>
        <RoutersDropdownList list={dropdownRouters} />
      </Container>
    </section>
  );
}
