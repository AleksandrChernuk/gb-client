import FaqSearch from '@/features/faq-search/ui/FaqSeach';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import { Container } from '@/shared/ui/Container';
import { H1 } from '@/shared/ui/H1';
import { Locale } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

// Пострінковий H1 під тему сторінки (узгоджений з Title), щоб ключі збігалися.
const HEADING_BY_SLUG: Record<string, string> = {
  'bronjuvannja-mists': 'heading_booking',
  'routes-and-buses': 'heading_routes',
  'ticket-refund': 'heading_refund',
};

export default async function FaqHero({ slug }: { slug?: string }) {
  const t = await getTranslations(MESSAGE_FILES.QUESTIONS_PAGE);
  const t_common = await getTranslations(MESSAGE_FILES.COMMON);
  const lng = (await getLocale()) as Locale;

  const headingKey = slug ? HEADING_BY_SLUG[slug] : undefined;
  const heading = headingKey ? t(headingKey) : t('title');

  return (
    <section className="py-6">
      <Container size="l">
        <div className="text-slate-700 dark:text-slate-50 mb-4">
          <BreadcrumbSimple
            linkClassName="text-slate-700 dark:text-slate-50"
            pageClassName="text-slate-700 dark:text-slate-50"
            locale={lng}
            items={[
              { label: t_common('breadcrumb_main'), href: '/' },
              { label: t_common('faq_breadcrumb'), href: '/faq/bronjuvannja-mists/' },
            ]}
          />
        </div>

        <H1 className="text-center">{heading}</H1>
        <Suspense fallback={null}>
          <FaqSearch />
        </Suspense>
      </Container>
    </section>
  );
}
