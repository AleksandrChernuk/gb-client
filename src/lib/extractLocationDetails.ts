import {
  ICountryTranslations,
  ILocation,
  ILocationDetails,
  ILocationTranslations,
  ILocationTypeTranslations,
  IRegionTranslations,
} from "@/types/location.types";

export function extractLocationDetails(response: ILocation, language: string): ILocationDetails {
  // =============== Функция для получения перевода ================
  const getTranslation = <T extends { language: string }>(translations: T[], fieldName: keyof T): string => {
    if (!translations || !Array.isArray(translations)) {
      return "Translation not available";
    }
    const translation = translations.find((item) => item.language === language);
    return translation && translation[fieldName] ? String(translation[fieldName]) : "Translation not available";
  };

  // ================= Извлечение имени локации ===================
  const locationName = getTranslation<ILocationTranslations>(response.translations, "locationName");

  // ================== Извлечение типа локации ===================
  const locationTypeTranslations = response.locationType?.translations || [];
  const locationType = getTranslation<ILocationTypeTranslations>(locationTypeTranslations, "typeName");

  // ================ Извлечение названия страны ==================
  const countryTranslations = response.country?.translations || [];
  const countryName = getTranslation<ICountryTranslations>(countryTranslations, "countryName");

  // =============== Извлечение названия региона ==================
  const regionTranslations = response.region?.translations || [];
  const regionName = getTranslation<IRegionTranslations>(regionTranslations, "regionName");

  return { locationName, locationType, countryName, regionName };
}
