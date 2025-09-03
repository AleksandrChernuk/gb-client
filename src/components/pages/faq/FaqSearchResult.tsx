'use client';

import { Container } from '@/components/shared/Container';
import { faqConstans } from '@/constans/faq.constans';
import { Link } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import SearchCard from './components/SearchCard';
import { CustomCard } from '@/components/shared/CustomCard';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/config/message.file.constans';

export default function FaqSearchResult() {
  const params = useSearchParams();
  const searchQuery = params.get('q')?.toLowerCase() || '';
  const t = useTranslations(MESSAGE_FILES.QUESTIONS_PAGE);

  if (!searchQuery) {
    return null;
  }

  const matchedQuestions: { slug: string; id: number; title: string; text: string; textSlug: string }[] = [];

  Object.entries(faqConstans).forEach(([slug, category]) => {
    category.questions.forEach(({ id, title, text, slug: textSlug }) => {
      const translatedText = text.map((paragraph) => t(`${title}.text_${text.indexOf(paragraph) + 1}`));
      if (translatedText.some((paragraph) => paragraph.toLowerCase().includes(searchQuery))) {
        matchedQuestions.push({ textSlug, slug, id, title, text: translatedText.join(' ') });
      }
    });
  });

  if (matchedQuestions.length === 0) {
    return (
      <Container size="s" className="space-y-5 ">
        <CustomCard className="flex flex-col w-full gap-2 dark:bg-slate-800">
          <h3 className="text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
            {t('no_results_found')} <span>{`"${searchQuery}"`}</span>
          </h3>
          <Link
            prefetch={false}
            className="text-base font-bold leading-6 tracking-normal text-slate-400 dark:text-slate-200"
            href={'/faq'}
          >
            {t('go_to_section')} <span className="text-green-300 underline dark:text-green-100">«{t('title')}»</span>
          </Link>
        </CustomCard>
      </Container>
    );
  }

  return (
    <Container size="s" className="space-y-5 ">
      <h3 className="text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
        {t('results_found')}: {matchedQuestions.length}
      </h3>
      {matchedQuestions.map(({ slug, id, title, text, textSlug }) => (
        <SearchCard
          key={id}
          id={id.toString()}
          title={t(`${title}.title`)}
          text={text}
          href={`/${slug}?q=${textSlug}`}
        />
      ))}
    </Container>
  );
}
