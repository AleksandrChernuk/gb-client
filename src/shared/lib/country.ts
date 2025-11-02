import { ICountry, ICountryTranslations } from '@/shared/types/location.types';

export interface ICountryDetails {
  countryName: string;
  countryFullName: string;
  code: string;
}

export function extractCountryDetails(country: ICountry, language: string): ICountryDetails {
  const fallbackMessages: Record<string, string> = {
    uk: `Опис країни тимчасово недоступний. Незабаром тут з’явиться детальна інформація про напрямки, маршрути, міста відправлення та особливості подорожей. Ми працюємо над оновленням розділу!`,
    ru: `Описание страны временно недоступно. Скоро здесь появится подробная информация о направлениях, маршрутах, городах отправления и особенностях путешествий. Мы работаем над обновлением раздела!`,
    en: `Country description is temporarily unavailable. Detailed information about routes, departure cities and travel specifics will appear here soon. We are working on updating this section!`,
  };

  const getTranslation = <T extends { language: string }>(translations: T[], fieldName: keyof T): string => {
    if (!translations || !Array.isArray(translations)) {
      return fallbackMessages[language] ?? fallbackMessages['en'];
    }

    const translation = translations.find((item) => item.language === language);

    return translation && translation[fieldName]
      ? String(translation[fieldName])
      : (fallbackMessages[language] ?? fallbackMessages['en']);
  };

  const translations = country.translations ?? [];

  const countryName = getTranslation<ICountryTranslations>(translations, 'countryName');
  const countryFullName = getTranslation<ICountryTranslations>(translations, 'countryFullName');

  return {
    countryName,
    countryFullName,
    code: country.code,
  };
}
