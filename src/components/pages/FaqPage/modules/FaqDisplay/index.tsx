'use client';

import { CustomCard } from '@/components/shared/CustomCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqConstans } from '@/constans/faq.constans';
import { useTranslations } from 'next-intl';

interface Props {
  slug?: keyof typeof faqConstans;
  value?: string;
}

export function FaqDisplay({ slug = '/faq/bronjuvannja-mists', value }: Props) {
  const t = useTranslations();
  const t_questions = useTranslations('questions');

  return (
    <CustomCard className="w-full dark:bg-dark_main">
      <h3 className="mb-4 text-text_prymery h5 tablet:h3 tablet:mb-6">
        {t(`questions_answers.${faqConstans[slug].title}`)}
      </h3>
      <Accordion defaultValue={value} type="single" collapsible className="w-full ">
        {faqConstans[slug].questions.map((el) => (
          <AccordionItem
            value={el.slug}
            key={el.id}
            className="border-b-[1px] border-b-grayy dark:border-b-black_2_for_text"
          >
            <AccordionTrigger className="h5 text-text_prymery data-[state=open]:text-primary_1">
              {t_questions(`${el.title}.title`)}
            </AccordionTrigger>
            <AccordionContent className="text-text_prymery secondary_text ">
              <ul className="space-y-2">
                {el.text.map((text, i) => (
                  <li key={i}>{t_questions(`${el.title}.${text}`)}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </CustomCard>
  );
}
