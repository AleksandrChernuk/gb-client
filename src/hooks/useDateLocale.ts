'use client';
import { uk, ru, enUS, Locale } from 'date-fns/locale';
import { useLocale } from 'next-intl';

export default function useDateLocale() {
  const locale = useLocale();

  const localeMap: { [key: string]: Locale } = {
    uk: uk,
    ru: ru,
    en: enUS,
  };

  const current = localeMap[locale as keyof typeof localeMap] || enUS;

  return { locale: current };
}
