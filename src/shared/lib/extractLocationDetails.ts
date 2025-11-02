import {
  ICountryTranslations,
  ILocation,
  ILocationDescription,
  ILocationDetails,
  ILocationTranslations,
  ILocationTypeTranslations,
  IRegionTranslations,
} from '@/shared/types/location.types';

export function extractLocationDetails(response: ILocation, language: string): ILocationDetails {
  // ====== fallback-тексты для description (city/location) ======
  const fallbackDescriptions: Record<string, string> = {
    uk: `Незабаром тут з’явиться інформація про напрямки, маршрути, зручні пункти відправлення та корисні поради для мандрівників.`,
    ru: `Скоро здесь появится информация о направлениях, маршрутах, удобных пунктах отправления и полезных советах для путешественников.`,
    en: `Soon you will find detailed information about routes, departure points and useful travel tips here.`,
  };

  // =============== Функция для получения перевода ================
  const getTranslation = <T extends { language: string }>(translations: T[], fieldName: keyof T): string => {
    if (!translations || !Array.isArray(translations)) {
      return fallbackDescriptions[language] ?? fallbackDescriptions.en;
    }
    const translation = translations.find((item) => item.language === language);
    return translation && translation[fieldName]
      ? String(translation[fieldName])
      : (fallbackDescriptions[language] ?? fallbackDescriptions.en);
  };

  // ================= Извлечение имени локации ===================
  const locationName = getTranslation<ILocationTranslations>(response.translations, 'locationName');

  // ================== Извлечение типа локации ===================
  const locationTypeTranslations = response.locationType?.translations || [];
  const locationType = getTranslation<ILocationTypeTranslations>(locationTypeTranslations, 'typeName');

  // ================ Извлечение названия страны ==================
  const countryTranslations = response.country?.translations || [];
  const countryName = getTranslation<ICountryTranslations>(countryTranslations, 'countryName');

  // =============== Извлечение названия региона ==================
  const regionTranslations = response.region?.translations || [];
  const regionName = getTranslation<IRegionTranslations>(regionTranslations, 'regionName');

  // =============== Извлечение дескрипшинов ==================
  const descriptionTranslations = response.description || [];
  const description = getTranslation<ILocationDescription>(descriptionTranslations, 'description');

  return { locationName, locationType, countryName, regionName, description };
}
