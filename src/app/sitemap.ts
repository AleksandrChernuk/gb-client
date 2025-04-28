import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://greenbus.com.ua',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://greenbus.com.ua/en',
          uk: 'https://greenbus.com.ua/uk',
          ru: 'https://greenbus.com.ua/ru',
        },
      },
    },
  ];
}
