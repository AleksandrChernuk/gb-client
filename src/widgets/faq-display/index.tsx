'use client';

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { faqConstans } from '@/shared/constans/faq.constans';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import CustomCard from '@/shared/ui/CustomCard';
import { useTranslations, useMessages } from 'next-intl';
import { useEffect, useState } from 'react';
import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';
import { Link } from '@/shared/i18n/routing';
import { getInternalSeoHref } from '@/shared/seo/internal-links';

// Дозволяємо перелінковку всередині відповідей: внутрішні посилання → next-intl Link.
const parserOptions: HTMLReactParserOptions = {
  replace(domNode) {
    if (!(domNode instanceof Element)) return;
    if (domNode.name !== 'a' || !domNode.attribs?.href) return;

    const href = domNode.attribs.href;
    const internalHref = getInternalSeoHref(href);
    const children = domNode.children as DOMNode[];

    if (internalHref) {
      return (
        <Link href={internalHref} className="font-medium text-slate-800 underline underline-offset-2 dark:text-slate-100">
          {domToReact(children, parserOptions)}
        </Link>
      );
    }

    if (/^https?:\/\//i.test(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="font-medium text-slate-800 underline underline-offset-2 dark:text-slate-100"
        >
          {domToReact(children, parserOptions)}
        </a>
      );
    }

    return <a href={href}>{domToReact(children, parserOptions)}</a>;
  },
};

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

interface Props {
  slug?: keyof typeof faqConstans;
  value?: string;
}

export function FaqDisplay({ slug = '/faq/bronjuvannja-mists', value }: Props) {
  const t = useTranslations(MESSAGE_FILES.QUESTIONS_PAGE);
  // Відповіді містять HTML-посилання, тож беремо сирий рядок з messages
  // (next-intl інакше парсить <a href> як ICU-тег і кидає INVALID_TAG).
  const messages = useMessages() as Record<string, Record<string, Record<string, string>>>;
  const qp = messages?.[MESSAGE_FILES.QUESTIONS_PAGE] ?? {};
  const rawAnswer = (titleKey: string, textKey: string) => qp?.[titleKey]?.[textKey] ?? `${titleKey}.${textKey}`;
  const { title, questions } = faqConstans[slug];
  const [activeValue, setActiveValue] = useState<string | undefined>(value);

  useEffect(() => {
    setActiveValue(value);
  }, [value]);

  useEffect(() => {
    const syncHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace('#', ''));
      if (hash && questions.some((question) => question.slug === hash)) {
        setActiveValue(hash);
      }
    };

    syncHash();
    window.addEventListener('hashchange', syncHash);

    return () => {
      window.removeEventListener('hashchange', syncHash);
    };
  }, [questions]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((el) => ({
      '@type': 'Question',
      name: t(`${el.title}.title`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(el.text.map((text) => rawAnswer(el.title, text)).join(' ')),
      },
    })),
  };

  return (
    <CustomCard className="w-full dark:bg-slate-800 tablet:col-span-3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h3 className="mb-2 text-base font-bold leading-6 tracking-normal text-green-200 dark:text-green-100 tablet:mb-4">
        {t(title)}
      </h3>
      <Accordion
        value={activeValue}
        onValueChange={(nextValue) => setActiveValue(nextValue || undefined)}
        type="single"
        collapsible
        className="w-full"
      >
        {questions.map((el) => (
          <AccordionItem id={el.slug} value={el.slug} key={el.id}>
            <AccordionTrigger className="text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50 data-[state=open]:text-green-200 dark:data-[state=open]:text-green-200">
              {t(`${el.title}.title`)}
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 dark:text-slate-50 text-sm tablet:text-base font-normal tracking-normal leading-[21px]">
              <ul className="space-y-2">
                {el.text.map((text, i) => (
                  <li key={i}>{parse(rawAnswer(el.title, text), parserOptions)}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </CustomCard>
  );
}
