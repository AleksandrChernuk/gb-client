'use client';
import { uk, ru, enUS, Locale } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

export default function useDateLocale() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const localeMap: { [key: string]: Locale } = {
    uk: uk,
    ru: ru,
    en: enUS,
  };

  const current = localeMap[currentLocale as keyof typeof localeMap] || enUS;

  return { locale: current };
}
