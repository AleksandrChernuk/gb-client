'use client';

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { supportNavlinks } from '@/shared/constans/support-navlinks.constans';
import { Link } from '@/shared/i18n/routing';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { ChevronUp, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { IconTelegram } from '@/assets/icons/IconTelegram';
import { IconFlagUA } from '@/assets/icons/IconFlagUA';
import { IconWhatsapp } from '@/assets/icons/IconWhatsapp';
import { IconViber } from '@/assets/icons/IconViber';

const icons = {
  IconFlagUA,
  IconTelegram,
  IconWhatsapp,
  IconViber,
};

type Props = {
  variant: 'mobile' | 'desktop' | 'footer';
};

function SupportLinksList({ className }: { className?: string }) {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <ul className="space-y-2">
      {supportNavlinks.map((item) => {
        const label = t(item.titleKey);
        const Icon = icons[item.icon];

        return (
          <li key={item.src}>
            <Button asChild variant="link" aria-label={label} title={label} className={className}>
              <Link
                href={item.src}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
                className="flex items-center gap-2"
              >
                <div className="size-5.5 shrink-0" aria-hidden="true">
                  <Icon aria-label={label} />
                </div>
                <span>{item.title}</span>
              </Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}

export default function Support({ variant }: Props) {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  if (variant === 'mobile') {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="support">
          <AccordionTrigger className="py-2" aria-label={t('mainNavSupportLink')}>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-50 text-base font-medium leading-6">
              <Phone size={24} className="stroke-primary" aria-hidden="true" />
              {t('mainNavSupportLink')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-0 pl-1">
            <SupportLinksList className="justify-start text-base font-normal text-black dark:text-slate-50" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  if (variant === 'footer') {
    const Icon = icons[supportNavlinks[0].icon];

    return (
      <Popover>
        <PopoverTrigger asChild className="group">
          <div className="relative w-fit">
            <div className="absolute size-6 -translate-y-1/2 pointer-events-none left-2 top-1/2" aria-hidden="true">
              <Icon aria-label={supportNavlinks[0].title} />
            </div>
            <Input
              defaultValue={supportNavlinks[0].title}
              type="button"
              className="w-auto px-10"
              aria-label={supportNavlinks[0].title}
            />
            <ChevronUp
              size={24}
              className="absolute -translate-y-1/2 group-data-[state=open]:rotate-180 right-2 top-1/2 stroke-black group-data-[state=open]:stroke-[#6f8b90] dark:stroke-slate-200"
              aria-hidden="true"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent side="bottom" className="w-full">
          <SupportLinksList className="justify-start text-slate-700 dark:text-slate-50 text-sm font-normal leading-5.25" />
        </PopoverContent>
      </Popover>
    );
  }

  // desktop
  return (
    <Popover>
      <PopoverTrigger asChild className="group">
        <Button
          variant="link"
          aria-label={t('mainNavSupportLink')}
          className="flex items-center text-black text-base font-medium leading-6 gap-1 hover:text-[#8e8e8e] dark:hover:text-slate-200 data-[state=open]:text-[#6f8b90] dark:text-slate-50"
        >
          <div className="p-1 rounded-full bg-slate-200 dark:bg-slate-50" aria-hidden="true">
            <Phone size={20} className="stroke-black" />
          </div>
          <span>{t('mainNavSupportLink')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={10} side="bottom">
        <SupportLinksList className="justify-start text-sm font-normal leading-4 text-slate-700 dark:text-slate-50" />
      </PopoverContent>
    </Popover>
  );
}
