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
    <CustomCard className="w-full dark:bg-slate-800">
      <h3 className="mb-4 text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50 tablet:h3 tablet:mb-6">
        {t(`questions_answers.${faqConstans[slug].title}`)}
      </h3>
      <Accordion defaultValue={value} type="single" collapsible className="w-full ">
        {faqConstans[slug].questions.map((el) => (
          <AccordionItem
            value={el.slug}
            key={el.id}
            className="border-b-[1px] border-b-slate-50 dark:border-b-slate-700"
          >
            <AccordionTrigger className="text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50 data-[state=open]:text-green-300">
              {t_questions(`${el.title}.title`)}
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 dark:text-slate-50 text-sm font-normal tracking-normal leading-[21px] ">
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
