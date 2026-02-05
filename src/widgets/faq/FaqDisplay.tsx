'use client';

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { faqConstans } from '@/shared/constans/faq.constans';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import CustomCard from '@/shared/ui/CustomCard';
import { useTranslations } from 'next-intl';

interface Props {
  slug?: keyof typeof faqConstans;
  value?: string;
}

export function FaqDisplay({ slug = '/faq/bronjuvannja-mists', value }: Props) {
  const t = useTranslations(MESSAGE_FILES.QUESTIONS_PAGE);

  return (
    <CustomCard className="w-full dark:bg-slate-800 tablet:col-span-3">
      <h2 className="mb-2 text-base font-bold leading-6 tracking-normal text-green-200 dark:text-green-100 tablet:mb-4 tablet:col-span-2">
        {t(`${faqConstans[slug].title}`)}
      </h2>
      <Accordion defaultValue={value} type="single" collapsible className="w-full ">
        {faqConstans[slug].questions.map((el) => (
          <AccordionItem value={el.slug} key={el.id}>
            <AccordionTrigger className="text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50 data-[state=open]:text-green-200 dark:data-[state=open]:text-green-200">
              {t(`${el.title}.title`)}
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 dark:text-slate-50 text-sm tablet:text-base font-normal tracking-normal leading-[21px] ">
              <ul className="space-y-2">
                {el.text.map((text, i) => (
                  <li key={i}>{t(`${el.title}.${text}`)}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </CustomCard>
  );
}
