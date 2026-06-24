import { BASE_URL, ORG_ID } from '@/shared/configs/constants';
import { IFavoriteRoute } from '@/shared/types/favoriteRoutes';
import { Locale } from 'next-intl';

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function buildRouteSchema(route: IFavoriteRoute, lng: Locale, host = BASE_URL) {
  const fromName = route.fromLocation.translations.find((t) => t.language === lng)?.locationName ?? '';
  const toName = route.toLocation.translations.find((t) => t.language === lng)?.locationName ?? '';
  const fromCountry = route.fromLocation.country.code;
  const toCountry = route.toLocation.country.code;
  const routeUrl = `${host}/${lng}/routes/${route.slug}/`;
  const busTripId = `${routeUrl}#bus-trip`;

  const descHtml = route.description.find((d) => d.language === lng)?.description ?? '';
  const plainDesc = stripHtml(descHtml);
  const priceText = route.price ? ` від ${route.price} грн` : '';
  const fallbackDesc = `Автобус ${fromName} — ${toName}: квитки${priceText}, онлайн-бронювання та електронний квиток на email. Рейси виконують перевізники-партнери GreenBus.`;
  const tripDescription = (plainDesc.split(/(?<=[.!?])\s/)[0] || fallbackDesc).slice(0, 300);

  const faqItems = [
    ...descHtml.matchAll(
      /<strong>([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>|<\/p>\s*<p[^>]*>)?\s*([\s\S]*?)(?=<strong>|<\/p>|$)/g,
    ),
  ]
    .map((match) => ({
      question: stripHtml(match[1]),
      answer: stripHtml(match[2]),
    }))
    .filter((item) => item.question.length > 0 && item.answer.length > 0);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BusTrip',
        '@id': busTripId,
        name: `${fromName} — ${toName}`,
        description: tripDescription,
        inLanguage: lng,
        url: routeUrl,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': routeUrl,
        },
        departureBusStop: {
          '@type': 'BusStation',
          name: fromName,
          address: { '@type': 'PostalAddress', addressCountry: fromCountry },
          geo: { '@type': 'GeoCoordinates', latitude: route.fromLocation.lat, longitude: route.fromLocation.lon },
        },
        arrivalBusStop: {
          '@type': 'BusStation',
          name: toName,
          address: { '@type': 'PostalAddress', addressCountry: toCountry },
          geo: { '@type': 'GeoCoordinates', latitude: route.toLocation.lat, longitude: route.toLocation.lon },
        },
        ...(route.price
          ? {
              offers: {
                '@type': 'AggregateOffer',
                '@id': `${routeUrl}#offers`,
                lowPrice: route.price,
                priceCurrency: 'UAH',
                availability: 'https://schema.org/InStock',
                url: routeUrl,
                priceValidUntil: new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10),
                seller: { '@id': ORG_ID },
              },
            }
          : {}),
        provider: { '@id': ORG_ID },
      },
      ...(faqItems.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: faqItems.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
              })),
            },
          ]
        : []),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'GreenBus', item: `${host}/${lng}/` },
          { '@type': 'ListItem', position: 2, name: 'Маршрути', item: `${host}/${lng}/routes/` },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${fromName} — ${toName}`,
            item: routeUrl,
          },
        ],
      },
    ],
  };
}
