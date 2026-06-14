import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Container } from '@/shared/ui/Container';
import { getTranslations } from 'next-intl/server';

export async function SeoSectionAllCountries() {
  const t = await getTranslations(MESSAGE_FILES.ALL_COUNTRIES);

  const faqItems = [
    { q: t('seo_text.faq.q1'), a: t('seo_text.faq.a1') },
    { q: t('seo_text.faq.q2'), a: t('seo_text.faq.a2') },
    { q: t('seo_text.faq.q3'), a: t('seo_text.faq.a3') },
    { q: t('seo_text.faq.q4'), a: t('seo_text.faq.a4') },
    { q: t('seo_text.faq.q5'), a: t('seo_text.faq.a5') },
    { q: t('seo_text.faq.q6'), a: t('seo_text.faq.a6') },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <section className="py-12">
      <Container size="l">
        <div className="prose dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-4 rounded-2xl mb-8 shadow-sm">
          <h2>{t('seo_text.how.title')}</h2>
          <p>{t('seo_text.how.text')}</p>

          <h3>{t('seo_text.popular.title')}</h3>
          <ul>
            {(['item1', 'item2', 'item3', 'item4'] as const).map((key) => (
              <li key={key}>{t(`seo_text.popular.${key}`)}</li>
            ))}
          </ul>

          <h3>{t('seo_text.countries.title')}</h3>
          <p>{t('seo_text.countries.text')}</p>

          <h3>{t('seo_text.benefits.title')}</h3>
          <p>{t('seo_text.benefits.text')}</p>
        </div>

        <div className="mt-10 bg-white dark:bg-slate-900 p-4 rounded-2xl mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">{t('seo_text.faq.title')}</h2>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {faqItems.map(({ q, a }) => (
              <details key={q} className="group py-4">
                <summary className="flex justify-between items-center cursor-pointer list-none text-slate-900 dark:text-white font-medium text-base">
                  {q}
                  <span className="ml-4 shrink-0 text-green-500 group-open:rotate-180 transition-transform duration-200">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
