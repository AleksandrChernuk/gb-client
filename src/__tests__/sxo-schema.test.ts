import { buildCountryDirectorySchema } from '@/shared/seo/country-directory.schema';
import { buildRouteSchema } from '@/shared/seo/route.schema';
import { ICountry } from '@/shared/types/countries.types';
import { IFavoriteRoute } from '@/shared/types/favoriteRoutes';

describe('SXO schema helpers', () => {
  it('builds an ItemList for the country directory without query URLs', () => {
    const schema = buildCountryDirectorySchema(
      [
        {
          slug: 'ukraine',
          translations: [{ language: 'uk', countryName: 'Україна', countryFullName: 'Україна' }],
        },
        {
          slug: 'germany',
          translations: [{ language: 'en', countryName: 'Germany', countryFullName: 'Federal Republic of Germany' }],
        },
      ] as ICountry[],
      'uk',
    );

    expect(schema).toMatchObject({
      '@type': 'ItemList',
      '@id': 'https://greenbus.com.ua/uk/all-countries/#country-directory',
      numberOfItems: 2,
    });
    expect(schema.itemListElement).toEqual([
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Україна',
        url: 'https://greenbus.com.ua/uk/all-countries/ukraine/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Federal Republic of Germany',
        url: 'https://greenbus.com.ua/uk/all-countries/germany/',
      },
    ]);
    expect(schema.itemListElement.some((item) => item.url.includes('?'))).toBe(false);
  });

  it('builds route schema with stable entity ids, offer seller, FAQ and breadcrumb graph', () => {
    const route = {
      slug: 'kyiv-prague',
      price: 2400,
      description: [
        {
          language: 'uk',
          description: '<p><strong>Чи є електронний квиток?</strong><br />Так, квиток приходить на email.</p>',
        },
      ],
      fromLocation: {
        lat: 50.45,
        lon: 30.52,
        country: { code: 'UA' },
        translations: [{ language: 'uk', locationName: 'Київ' }],
      },
      toLocation: {
        lat: 50.08,
        lon: 14.43,
        country: { code: 'CZ' },
        translations: [{ language: 'uk', locationName: 'Прага' }],
      },
    } as IFavoriteRoute;

    const schema = buildRouteSchema(route, 'uk');
    const graph = schema['@graph'];
    const trip = graph.find((item) => item['@type'] === 'BusTrip');
    const faq = graph.find((item) => item['@type'] === 'FAQPage');
    const breadcrumbs = graph.find((item) => item['@type'] === 'BreadcrumbList');

    expect(trip).toMatchObject({
      '@id': 'https://greenbus.com.ua/uk/routes/kyiv-prague/#bus-trip',
      name: 'Київ — Прага',
      url: 'https://greenbus.com.ua/uk/routes/kyiv-prague/',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://greenbus.com.ua/uk/routes/kyiv-prague/',
      },
      provider: { '@id': 'https://greenbus.com.ua/#organization' },
      offers: {
        '@type': 'AggregateOffer',
        '@id': 'https://greenbus.com.ua/uk/routes/kyiv-prague/#offers',
        lowPrice: 2400,
        priceCurrency: 'UAH',
        seller: { '@id': 'https://greenbus.com.ua/#organization' },
      },
    });
    expect(faq?.mainEntity).toHaveLength(1);
    expect(faq?.mainEntity?.[0]?.name).toBe('Чи є електронний квиток?');
    expect(breadcrumbs?.itemListElement?.[2]?.item).toBe('https://greenbus.com.ua/uk/routes/kyiv-prague/');
  });
});
