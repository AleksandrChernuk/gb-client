import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Container } from '@/shared/ui/Container';
import { Locale } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { getFavoriteRoutes } from '@/shared/api/favoriteRoutes.server';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { ServerPagination } from '@/shared/ui/server-pagination/ServerPagination';
import { H1 } from '@/shared/ui/H1';
import { RouteItem } from '@/shared/ui/route-item';

export default async function RoutesList({ pageParam }: { pageParam?: string }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations(MESSAGE_FILES.COMMON);

  const page = Number(pageParam) || 1;
  const perPage = 20;

  let res;
  try {
    res = await getFavoriteRoutes({ page, perPage, lang: locale });
  } catch {
    res = null;
  }

  return (
    <section className="py-5 laptop:py-10 flex-1">
      <Container size="m" className="flex flex-col">
        <H1>{t('routes_title')}</H1>

        {res && res.data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 py-4">
              {res.data.map((route) => {
                const fromName = extractLocationDetails(route.fromLocation, locale).locationName;
                const toName = extractLocationDetails(route.toLocation, locale).locationName;
                const fromCountry = extractLocationDetails(route.fromLocation, locale).countryName;
                const toCountry = extractLocationDetails(route.toLocation, locale).countryName;

                return (
                  <RouteItem
                    key={route.id}
                    href={`/routes/${route.slug}`}
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

            {res.totalPages > 1 && (
              <div className="flex justify-center mt-auto">
                <ServerPagination currentPage={page} totalPages={res.totalPages} />
              </div>
            )}
          </>
        ) : (
          <p className="text-muted-foreground text-center">{t('routes_empty')}</p>
        )}
      </Container>
    </section>
  );
}
