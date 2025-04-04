'use client';

import { supportNavlinks } from '@/constans/support-navlinks.constans';
import { Button } from '../ui/button';
import { ChevronUp, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Link } from '@/i18n/routing';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '../ui/input';

type Props = {
  type: 'mobile' | 'desctop' | 'footer';
};

export const Support = ({ type }: Props) => {
  const t = useTranslations('common');

  if (type === 'mobile') {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="py-0 " aria-label={t('mainNavSupportLink')}>
            <div className="flex items-center gap-2 text-text_prymery body_medium">
              <Phone size={24} className="stroke-primary" />
              {t('mainNavSupportLink')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0 pt-2 pl-1">
            <ul>
              {supportNavlinks.map((item, idx) => (
                <li key={`${item.title}+${idx}`}>
                  <Button asChild variant={'link'} aria-label={item.title} title={item.title}>
                    <Link
                      prefetch={false}
                      href={item.src}
                      className="flex flex-row items-center justify-start gap-2 p-1 body_medium"
                    >
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

  if (type === 'desctop') {
    return (
      <Popover>
        <PopoverTrigger asChild className="group">
          <Button
            className="flex items-center text-black body_medium gap-1 hover:text-gray_3 dark:hover:text-gray_1 data-[state=open]:text-gray_2_for_body dark:text-grayy"
            variant={'link'}
            aria-label={t('mainNavSupportLink')}
            title={t('mainNavSupportLink')}
          >
            <div className="p-1 rounded-full bg-gray_1 dark:bg-grayy">
              <Phone
                size={20}
                className="stroke-black group-data-[state=open]:stroke-gray_2_for_body group-data-[state=open]:dark:stroke-dark_main group-hover:stroke-gray_3 dark:stroke-black dark:group-hover:stroke-gray_1"
              />
            </div>
            <div>{t('mainNavSupportLink')}</div>
          </Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={10} side="bottom">
          <ul className="space-y-2">
            {supportNavlinks.map((item, idx) => (
              <li key={`${item.title}+${idx}`}>
                <Button
                  asChild
                  variant={'link'}
                  className="justify-start text-text_prymery addional_regular_text"
                  aria-label={item.title}
                  title={item.title}
                >
                  <Link prefetch={false} href={item.src}>
                    <div className="w-4 h-4">{item.icon}</div>
                    {item.title}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    );
  }

  if (type === 'footer') {
    return (
      <Popover>
        <PopoverTrigger asChild className="group">
          <div className="relative w-fit" aria-label={supportNavlinks[0].title} title={supportNavlinks[0].title}>
            <div className="absolute transform -translate-y-1/2 pointer-events-none left-2 top-1/2 w-6 h-6">
              {supportNavlinks[0].icon}
            </div>
            <Input defaultValue={supportNavlinks[0].title} type="button" className="w-auto px-10" />
            <ChevronUp
              size={24}
              className="absolute -translate-y-1/2 group-data-[state=open]:rotate-180 right-2 top-1/2 stroke-black group-data-[state=open]:stroke-gray_2_for_body group-data-[state=open]:dark:stroke-grayy group-hover:stroke-gray_3 dark:stroke-gray_1 dark:group-hover:stroke-gray_1"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent side="bottom" className="w-full">
          <ul className="space-y-2">
            {supportNavlinks.map((item, idx) => (
              <li key={`${item.title}+${idx}`}>
                <Button
                  asChild
                  variant={'link'}
                  className="justify-start text-text_prymery secondary_text"
                  aria-label={item.title}
                  title={item.title}
                >
                  <Link prefetch={false} href={item.src}>
                    <div className="w-4 h-4">{item.icon}</div>
                    {item.title}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    );
  }
};
