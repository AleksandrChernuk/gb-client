'sr-only';

import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { MESSAGE_FILES } from '@/config/message.file.constans';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages = {
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.COMMON}.json`)).default,
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.IMG_ALTS}.json`)).default,
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.METADATA}.json`)).default,
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.MAIN_PAGE}.json`)),
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.OFERTA_PAGE}.json`)),
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.QUESTIONS_PAGE}.json`)),
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.BUSES_PAGE}.json`)),
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.ABOUT_PAGE}.json`)),
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.CHECKOUT_PAGE}.json`)),
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.FORAGENTS_PAGE}.json`)),
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.FORCARRIERS_PAGE}.json`)),
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.FORM}.json`)),
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.PROFILE}.json`)),
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.PRIVACY_POLICY}.json`)),
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.ALL_COUNTRIES}.json`)),
    ...(await import(`../../messages/${locale}/${MESSAGE_FILES.PAYMENT_RESULT_PAGE}.json`)),
  };

  return {
    locale,
    messages,
  };
});
