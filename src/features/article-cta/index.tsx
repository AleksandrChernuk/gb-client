import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { getTranslations } from 'next-intl/server';

const EXPERT_CONTACT_URL = 'https://t.me/+380987446419';

export async function ArticleCta() {
  const t = await getTranslations(MESSAGE_FILES.COMMON);

  return (
    <section className="mt-16 flex flex-col items-start justify-between gap-4 rounded-2xl bg-gradient-to-r from-green-700 to-green-500 p-6 tablet:flex-row tablet:items-center tablet:p-8">
      <div className="text-white">
        <p className="text-xl font-bold tablet:text-2xl">{t('article_cta_title')}</p>
        <p className="mt-1 max-w-xl text-green-50">{t('article_cta_text')}</p>
      </div>
      <a
        href={EXPERT_CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-xl bg-white px-6 py-3 font-semibold text-green-700 transition-colors hover:bg-green-50"
      >
        {t('article_cta_button')}
      </a>
    </section>
  );
}
