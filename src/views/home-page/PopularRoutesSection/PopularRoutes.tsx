import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/Container';
import { Link } from '@/shared/i18n/routing';
import { getLocale, getTranslations } from 'next-intl/server';
import { Locale } from 'next-intl';
import { IFavoriteRoute } from '@/shared/types/favoriteRoutes';
import { getFavoriteRoutes } from '@/shared/api/favoriteRoutes.server';
import { RouteItem } from '@/shared/ui/route-item';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';

export default async function PopularRoutes() {
  const t = await getTranslations(MESSAGE_FILES.MAIN_PAGE);
  const locale = (await getLocale()) as Locale;

  let routes: IFavoriteRoute[] = [];

  try {
    const res = await getFavoriteRoutes({ page: 1, perPage: 10, lang: locale });
    routes = res.data;
  } catch {
    routes = [];
  }

  return (
    <section className="py-6 bg-green-500 dark:bg-slate-800">
      <Container size="m" className="tablet:px-8">
        <h2 className="mb-4 text-white text-lg font-bold tracking-tighter leading-[21.6px] tablet:text-2xl tablet:leading-[28.8px] laptop:mb-8 laptop:text-[32px] laptop:leading-[38.4px]">
          {t('popular_title')}
        </h2>

        {routes.length > 0 ? (
          <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4 mb-0 duration-300 animate-in fade-in slide-in-from-top-1">
            {routes.map((route) => {
              const fromName = extractLocationDetails(route.fromLocation, locale).locationName;
              const toName = extractLocationDetails(route.toLocation, locale).locationName;
              const fromCountry = extractLocationDetails(route.fromLocation, locale).countryName;
              const toCountry = extractLocationDetails(route.toLocation, locale).countryName;
              const enSlug = route.slug ?? '';

              return (
                <RouteItem
                  key={route.id}
                  href={`/routes/${enSlug}`}
                  fromName={fromName}
                  toName={toName}
                  fromCountry={fromCountry}
                  toCountry={toCountry}
                  price={route.price}
                  fromId={route.fromLocation?.id ? String(route.fromLocation.id) : undefined}
                  toId={route.toLocation?.id ? String(route.toLocation.id) : undefined}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-white/70 text-sm">{t('popular_empty')}</p>
        )}

        <div className="text-right laptop:text-center">
          <Button variant="link" className="h-auto p-0 mt-4 text-base font-normal text-white" asChild>
            <Link href="/routes">{t('popular_button')}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
