'use client';

import { Check, ChevronUp } from 'lucide-react';
import { useLocale } from 'next-intl';
import { startTransition, useState } from 'react';
import { Locale } from '@/shared/i18n/locales';
import { supportLocalesList } from '@/shared/constans/support-locales.constans';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { usePathname, useRouter } from '@/shared/i18n/routing';
import { useSearchParams } from 'next/navigation';

type Props = {
  variant: 'mobile' | 'desktop';
};

export default function SelectLocale({ variant }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  function changeLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      setIsOpen(false);
      return;
    }
    const params = searchParams.toString();
    const url = params ? `${pathname}?${params}` : pathname;

    startTransition(() => {
      router.replace(url, { locale: nextLocale });
    });
    setIsOpen(false);
  }

  const currentLocale = supportLocalesList.find((el) => el.value === locale);

  const LocaleList = () => (
    <ul className="space-y-2">
      {supportLocalesList.map((el) => {
        const active = el.value === locale;

        return (
          <li key={el.value}>
            <Button
              type="button"
              variant="link"
              onClick={() => changeLocale(el.value as Locale)}
              className="justify-start text-slate-700 dark:text-slate-50 text-base font-medium tracking-normal leading-[24px]"
              aria-current={active ? 'true' : undefined}
            >
              <div className="w-6 h-6"> {el.icon} </div>
              {el.shortName}
              {active && <Check size={16} />}
            </Button>
          </li>
        );
      })}
    </ul>
  );

  if (variant === 'desktop') {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="link">
            <span className="w-6">{currentLocale?.icon}</span>
            <ChevronUp
              size={24}
              className={`stroke-black group-data-[state=open]:stroke-[#6f8b90] group-data-[state=open]:dark:stroke-dark_grayy  group-hover:stroke-[#8e8e8e] dark:stroke-slate-200 dark:group-hover:stroke-slate-200 group-data-[state=open]:rotate-180`}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={10} side="bottom">
          <LocaleList />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="lang">
        <AccordionTrigger className="py-2">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-50 text-base font-medium tracking-normal leading-[24px]">
            <div className="w-7 h-7">{supportLocalesList.find((item) => item.value === locale)?.icon}</div>
            {supportLocalesList.find((item) => item.value === locale)?.name}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <LocaleList />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
