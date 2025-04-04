'use client';

import { ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';
import { supportLocalesList } from '@/constans/support-locales.constans';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { Locale } from '@/i18n/locales';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

type Props = {
  type: 'mobile' | 'desctop';
};

export default function SelectLocale({ type }: Props) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();

  if (pathname === '/checkout') {
    return null;
  }

  if (type === 'mobile') {
    return (
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger className="py-0 ">
            <div className="flex items-center gap-2 text-text_prymery body_medium">
              <div className="w-7 h-7">{supportLocalesList.find((item) => item.value === locale)?.icon}</div>
              {supportLocalesList.find((item) => item.value === locale)?.name}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0 pt-4 pl-1">
            <ul className=" space-y-2">
              {supportLocalesList.map((el) => (
                <li key={el.value}>
                  <Button
                    key={el.value}
                    variant={'link'}
                    asChild
                    className="justify-start text-text_prymery body_medium"
                  >
                    <Link prefetch={false} href={`${pathname}?${searchParams}`} locale={el.value as Locale}>
                      <div className="w-6 h-6"> {el.icon} </div>
                      {el.shortName}
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
          <Button className={`flex items-center justify-center  gap-0.5`} variant={'link'}>
            <div className="w-7 h-7">{supportLocalesList.find((item) => item.value === locale)?.icon}</div>
            <ChevronUp
              size={24}
              className={`stroke-black group-data-[state=open]:stroke-gray_2_for_body group-data-[state=open]:dark:stroke-dark_grayy  group-hover:stroke-gray_3 dark:stroke-gray_1 dark:group-hover:stroke-gray_1 group-data-[state=open]:rotate-180`}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={10} side="bottom">
          <ul className="space-y-2 ">
            {supportLocalesList.map((el) => (
              <li key={el.value}>
                <Button key={el.value} variant={'link'} asChild className="justify-start text-text_prymery body_medium">
                  <Link prefetch={false} href={`${pathname}?${searchParams}`} locale={el.value as Locale}>
                    <div className="w-6 h-6"> {el.icon} </div>
                    {el.shortName}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    );
  }
}
