import { IFavoriteRoute } from '@/shared/types/favoriteRoutes';
import { Locale } from 'next-intl';

interface RouteSchemaProps {
  route: IFavoriteRoute;
  lng: Locale;
  host: string;
}

export function RouteSchema({ route, lng, host }: RouteSchemaProps) {
  const fromName = route.fromLocation.translations.find((t) => t.language === lng)?.locationName ?? '';
  const toName = route.toLocation.translations.find((t) => t.language === lng)?.locationName ?? '';
  const fromCountry = route.fromLocation.country.code;
  const toCountry = route.toLocation.country.code;

  const descHtml = route.description.find((d) => d.language === lng)?.description ?? '';

  // FAQ з description — витягуємо питання/відповіді.
  // Допускаємо різні інлайн-роздільники між питанням і відповіддю (<br>, </p><p> тощо),
  // щоб дрібні зміни HTML-розмітки не ламали FAQ-розмітку мовчки.
  const faqMatches = [
    ...descHtml.matchAll(
      /<strong>([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>|<\/p>\s*<p[^>]*>)?\s*([\s\S]*?)(?=<strong>|<\/p>|$)/g,
    ),
  ];
  const faqItems = faqMatches
    .map((m) => ({
      question: m[1].replace(/<[^>]+>/g, '').trim(),
      answer: m[2].replace(/<[^>]+>/g, '').trim(),
    }))
    .filter((item) => item.question.length > 0 && item.answer.length > 0);

  // Самодостатня відповідь-витяг для AI: перше речення опису без HTML,
  // інакше — згенероване речення з ключовими фактами маршруту.
  const plainDesc = descHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const priceText = route.price ? ` від ${route.price} грн` : '';
  const fallbackDesc = `Автобус ${fromName} — ${toName}: квитки${priceText}, онлайн-бронювання та електронний квиток на email. Рейси виконують перевізники-партнери GreenBus.`;
  const tripDescription = (plainDesc.split(/(?<=[.!?])\s/)[0] || fallbackDesc).slice(0, 300);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      // BusTrip
      {
        '@type': 'BusTrip',
        name: `${fromName} — ${toName}`,
        description: tripDescription,
        inLanguage: lng,
        url: `${host}/${lng}/routes/${route.slug}/`,
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
        offers: {
          '@type': 'Offer',
          price: route.price ?? 0,
          priceCurrency: 'UAH',
          availability: 'https://schema.org/InStock',
          url: `${host}/${lng}/routes/${route.slug}/`,
        },
        provider: {
          '@type': 'Organization',
          name: 'GreenBus',
          url: host,
        },
      },
      // FAQ (якщо є)
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
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'GreenBus', item: `${host}/${lng}/` },
          { '@type': 'ListItem', position: 2, name: 'Маршрути', item: `${host}/${lng}/routes/` },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${fromName} — ${toName}`,
            item: `${host}/${lng}/routes/${route.slug}/`,
          },
        ],
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
