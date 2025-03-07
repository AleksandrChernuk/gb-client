'use client';

import { Container } from '@/components/shared/Container';
import { faqConstans } from '@/constans/faq.constans';
import { Link } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import PrewAccordion from '../../components/PrewAccordion';

export default function SlugPage() {
  const params = useSearchParams();
  const searchQuery = params.get('q')?.toLowerCase() || '';

  if (!searchQuery) {
    return null;
  }

  const matchedQuestions: { slug: string; id: number; title: string; text: string; textSlug: string }[] = [];

  Object.entries(faqConstans).forEach(([slug, category]) => {
    category.questions.forEach(({ id, title, text, slug: textSlug }) => {
      if (text.some((paragraph) => paragraph.toLowerCase().includes(searchQuery))) {
        matchedQuestions.push({ textSlug, slug, id, title, text: text.join(' ') });
      }
    });
  });

  if (matchedQuestions.length === 0) {
    return (
      <Container size="l">
        <h3>Немає результатів за запитом {searchQuery}.</h3>
        <Link href={'/faq'}>Перейти у розділ «Питання та відповіді».</Link>
      </Container>
    );
  }
  console.log(matchedQuestions);
  return (
    <Container size="s" className="space-y-5 ">
      <h3 className="h5 text-text_prymery">Знайдені результати: {matchedQuestions.length}</h3>
      {matchedQuestions.map(({ slug, id, title, text, textSlug }) => (
        <PrewAccordion key={id} id={id.toString()} title={title} text={text} href={`/${slug}?q=${textSlug}`} />
      ))}
    </Container>
  );
}
