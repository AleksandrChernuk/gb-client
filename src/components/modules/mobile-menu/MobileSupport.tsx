'use client';

import { Button } from '@/components/ui/button';
import { supportNavlinks } from '@/constans/support-navlinks.constans';
import { Phone } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function MobileSupport() {
  const t = useTranslations('common');

  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value="item-1">
        <AccordionTrigger className="py-0 ">
          <div className="flex items-center gap-2 text-text_prymery body_medium">
            <Phone size={24} className="stroke-primary" />
            {t('mainNavSupportLink')}
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-0 pt-2 pl-1">
          <ul>
            {supportNavlinks.map((item, idx) => (
              <li key={`${item.title}+${idx}`}>
                <Button asChild variant={'link'}>
                  <Link href={item.src} className="flex flex-row items-center justify-start gap-2 p-1 body_medium">
                    <span className="w-[22.5px] h-[22.5px]">{item.icon && item.icon}</span>
                    <span className="text-base font-normal text-black dark:text-grayy">{item.title}</span>
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
