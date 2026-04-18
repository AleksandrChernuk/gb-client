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
import { H2 } from '@/shared/ui/H2';

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
    <section className="py-6">
      <Container size="m">
        <H2>{t('popular_title')}</H2>

        {routes.length > 0 ? (
          <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4 mb-0 duration-300 animate-in fade-in slide-in-from-top-1">
            {routes.map((route) => {
              const fromName = extractLocationDetails(route.fromLocation, locale).locationName;
              const toName = extractLocationDetails(route.toLocation, locale).locationName;
              const fromCountry = extractLocationDetails(route.fromLocation, locale).countryName;
              const toCountry = extractLocationDetails(route.toLocation, locale).countryName;

              return (
                <RouteItem
                  key={route.id}
                  href={`/buses/?from=${route.fromLocation.id}&to=${route.toLocation.id}`}
                  fromName={fromName}
                  toName={toName}
                  fromCountry={fromCountry}
                  toCountry={toCountry}
                  price={route.price}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-white/70 text-sm">{t('popular_empty')}</p>
        )}

        <div className="flex items-center justify-end mt-4">
          <Button variant={'default'} size={'secondary'} asChild>
            <Link href="/routes/">{t('popular_button')}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
