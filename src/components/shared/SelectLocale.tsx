'use client';

import { ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';
import { supportLocalesList } from '@/constans/support-locales.constans';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Locale } from '@/i18n/locales';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

type Props = {
  variant: 'mobile' | 'desktop';
};

const SelectLocale = ({ variant }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const searchParams = useSearchParams()?.toString();

  if (pathname === '/checkout') {
    return null;
  }

  switch (variant) {
    case 'desktop':
      return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild className="group">
            <Button className={`flex items-center justify-center  gap-0.5`} variant={'link'}>
              <div className="w-7 h-7">{supportLocalesList.find((item) => item.value === locale)?.icon}</div>
              <ChevronUp
                size={24}
                className={`stroke-black group-data-[state=open]:stroke-[#6f8b90] group-data-[state=open]:dark:stroke-dark_grayy  group-hover:stroke-[#8e8e8e] dark:stroke-slate-200 dark:group-hover:stroke-slate-200 group-data-[state=open]:rotate-180`}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent sideOffset={10} side="bottom">
            <ul className="space-y-2 ">
              {supportLocalesList.map((el) => (
                <li key={el.value}>
                  <Button
                    key={el.value}
                    variant={'link'}
                    asChild
                    className="justify-start text-slate-700 dark:text-slate-50 text-base font-medium tracking-normal leading-[24px]"
                  >
                    <Link
                      prefetch={false}
                      href={`${pathname}?${searchParams}`}
                      locale={el.value as Locale}
                      onClick={() => {
                        if (locale === el.value) {
                          setIsOpen(false);
                        }
                      }}
                    >
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

    case 'mobile':
      return (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="py-2">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-50 text-base font-medium tracking-normal leading-[24px]">
                <div className="w-7 h-7">{supportLocalesList.find((item) => item.value === locale)?.icon}</div>
                {supportLocalesList.find((item) => item.value === locale)?.name}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-0 pl-1">
              <ul className="space-y-2 ">
                {supportLocalesList.map((el) => (
                  <li key={el.value}>
                    <Button
                      key={el.value}
                      variant={'link'}
                      asChild
                      className="justify-start text-slate-700 dark:text-slate-50 text-base font-medium tracking-normal leading-[24px]"
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

    default:
      return null;
  }
};

export default SelectLocale;
