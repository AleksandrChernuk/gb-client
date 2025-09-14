'use client';

import { supportNavlinks } from '@/constans/support-navlinks.constans';
import { Button } from '../ui/button';
import { ChevronUp, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Link } from '@/i18n/routing';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '../ui/input';
import { MESSAGE_FILES } from '@/config/message.file.constans';

type Props = {
  variant: 'mobile' | 'desktop' | 'footer';
};

const Support = ({ variant }: Props) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  switch (variant) {
    case 'desktop':
      return (
        <Popover>
          <PopoverTrigger asChild className="group">
            <Button
              className="flex items-center text-black text-base font-medium tracking-normal leading-[24px] gap-1 hover:text-[#8e8e8e] dark:hover:text-slate-200 data-[state=open]:text-[#6f8b90] dark:text-slate-50"
              variant={'link'}
              aria-label={t('mainNavSupportLink')}
              title={t('mainNavSupportLink')}
            >
              <div className="p-1 rounded-full bg-slate-200 dark:bg-slate-50">
                <Phone
                  size={20}
                  className="stroke-black group-data-[state=open]:stroke-[#6f8b90] group-data-[state=open]:dark:stroke-slate-800 group-hover:stroke-[#8e8e8e] dark:stroke-black dark:group-hover:stroke-slate-200 transition-all"
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
                    className="justify-start text-sm font-normal leading-4 tracking-normal text-slate-700 dark:text-slate-50"
                    aria-label={item.title}
                    title={item.title}
                  >
                    <Link prefetch={false} href={item.src} target="_blank">
                      <div className="size-6">{item.icon}</div>
                      {item.title}
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
            <AccordionTrigger className="py-2" aria-label={t('mainNavSupportLink')}>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-50 text-base font-medium tracking-normal leading-[24px] ">
                <Phone size={24} className="stroke-primary" />
                {t('mainNavSupportLink')}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-0 pl-1">
              <ul className="space-y-2">
                {supportNavlinks.map((item, idx) => (
                  <li key={`${item.title}+${idx}`}>
                    <Button asChild variant={'link'} aria-label={item.title} title={item.title}>
                      <Link
                        prefetch={false}
                        href={item.src}
                        target="_blank"
                        className="flex flex-row items-center justify-start gap-2 p-1 text-base font-medium tracking-normal leading-[24px]"
                      >
                        <span className="w-[22.5px] h-[22.5px]">{item.icon && item.icon}</span>
                        <span className="text-base font-normal text-black dark:text-slate-50">{item.title}</span>
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    case 'footer':
      return (
        <Popover>
          <PopoverTrigger asChild className="group">
            <div className="relative w-fit" aria-label={supportNavlinks[0].title} title={supportNavlinks[0].title}>
              <div className="absolute w-6 h-6 transform -translate-y-1/2 pointer-events-none left-2 top-1/2">
                {supportNavlinks[0].icon}
              </div>
              <Input defaultValue={supportNavlinks[0].title} type="button" className="w-auto px-10" />
              <ChevronUp
                size={24}
                className="absolute -translate-y-1/2 group-data-[state=open]:rotate-180 right-2 top-1/2 stroke-black group-data-[state=open]:stroke-[#6f8b90] group-data-[state=open]:dark:stroke-slate-50 group-hover:stroke-[#8e8e8e] dark:stroke-slate-200 dark:group-hover:stroke-slate-200"
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
                    className="justify-start text-slate-700 dark:text-slate-50 text-sm font-normal tracking-normal leading-[21px]"
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

    default:
      return null;
  }
};

export default Support;
