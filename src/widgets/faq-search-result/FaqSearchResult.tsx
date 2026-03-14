'use client';

import { useSearchParams } from 'next/navigation';
import SearchCard from './SearchCard';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { faqConstans } from '@/shared/constans/faq.constans';
import { Container } from '@/shared/ui/Container';
import CustomCard from '@/shared/ui/CustomCard';
import { Link } from '@/shared/i18n/routing';
import { useMemo } from 'react';

export default function FaqSearchResult() {
  const params = useSearchParams();
  const searchQuery = params?.get('q')?.toLowerCase() || '';
  const t = useTranslations(MESSAGE_FILES.QUESTIONS_PAGE);

  const matchedQuestions = useMemo(() => {
    if (!searchQuery) return [];

    const results: { slug: string; id: number; title: string; text: string; textSlug: string }[] = [];

    Object.entries(faqConstans).forEach(([slug, category]) => {
      category.questions.forEach(({ id, title, text, slug: textSlug }) => {
        const translatedText = text.map((_, i) => t(`${title}.text_${i + 1}`));
        if (translatedText.some((p) => p.toLowerCase().includes(searchQuery))) {
          results.push({ textSlug, slug, id, title, text: translatedText.join(' ') });
        }
      });
    });

    return results;
  }, [searchQuery, t]);

  if (!searchQuery) return null;

  if (matchedQuestions.length === 0) {
    return (
      <Container size="m" className="space-y-5">
        <CustomCard className="flex flex-col w-full gap-2 dark:bg-slate-800">
          <h3 className="text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
            {t('no_results_found')} <span>&laquo;{searchQuery}&raquo;</span>
          </h3>
          <Link
            prefetch={false}
            className="text-base font-bold leading-6 tracking-normal text-slate-400 dark:text-slate-200 hover:underline"
            href="/faq"
          >
            {t('go_to_section')} <span className="text-green-200 dark:text-green-100">&laquo;{t('title')}&raquo;</span>
          </Link>
        </CustomCard>
      </Container>
    );
  }

  return (
    <Container size="m" className="space-y-5">
      <h3 className="text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
        {t('results_found')}: {matchedQuestions.length}
      </h3>
      {matchedQuestions.map(({ slug, id, title, text, textSlug }) => (
        <SearchCard key={id} title={t(`${title}.title`)} text={text} href={`/${slug}?q=${textSlug}`} />
      ))}
    </Container>
  );
}
