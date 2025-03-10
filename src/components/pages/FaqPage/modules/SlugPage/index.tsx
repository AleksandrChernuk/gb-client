'use client';

import { Container } from '@/components/shared/Container';
import { faqConstans } from '@/constans/faq.constans';
import { Link } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import SearchCard from '../../components/SearchCard';
import { CustomCard } from '@/components/shared/CustomCard';
import { useTranslations } from 'next-intl';

export default function SlugPage() {
  const params = useSearchParams();
  const searchQuery = params.get('q')?.toLowerCase() || '';
  const t = useTranslations('questions_answers');
  const t_questions = useTranslations('questions');

  if (!searchQuery) {
    return null;
  }

  const matchedQuestions: { slug: string; id: number; title: string; text: string; textSlug: string }[] = [];

  Object.entries(faqConstans).forEach(([slug, category]) => {
    category.questions.forEach(({ id, title, text, slug: textSlug }) => {
      const translatedText = text.map((paragraph) => t_questions(`${title}.text_${text.indexOf(paragraph) + 1}`));
      if (translatedText.some((paragraph) => paragraph.toLowerCase().includes(searchQuery))) {
        matchedQuestions.push({ textSlug, slug, id, title, text: translatedText.join(' ') });
      }
    });
  });

  if (matchedQuestions.length === 0) {
    return (
      <Container size="s" className="space-y-5 ">
        <CustomCard className="flex flex-col w-full gap-2 dark:bg-dark_main">
          <h3 className="h5 text-text_prymery">
            {t('no_results_found')} <span>{`"${searchQuery}"`}</span>
          </h3>
          <Link className=" h5 text-text_secondary" href={'/faq'}>
            {t('go_to_section')} <span className="underline text-primary_1 dark:text-primary_2">«{t('title')}»</span>
          </Link>
        </CustomCard>
      </Container>
    );
  }

  return (
    <Container size="s" className="space-y-5 ">
      <h3 className="h5 text-text_prymery">
        {t('results_found')}: {matchedQuestions.length}
      </h3>
      {matchedQuestions.map(({ slug, id, title, text, textSlug }) => (
        <SearchCard
          key={id}
          id={id.toString()}
          title={t_questions(`${title}.title`)}
          text={text}
          href={`/${slug}?q=${textSlug}`}
        />
      ))}
    </Container>
  );
}
