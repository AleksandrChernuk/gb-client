'use client';

import { IconFlagEnglish } from '@/components/icons/IconFlagEnglish';
import { IconFlagRus } from '@/components/icons/IconFlagRus';
import { IconFlagUA } from '@/components/icons/IconFlagUA';
import { Button } from '@/components/ui/button';
import { supportLocalesList } from '@/constans/constans.support.locales';
import useToggleOpen from '@/hooks/useToggleOpen';
import { ChevronDown } from 'lucide-react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function MobileLanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const searchParams = useSearchParams();

  const dispalyIcon = (key: string) => {
    switch (key) {
      case 'uk':
        return { icon: <IconFlagUA />, name: 'Українська мова (UK)', shortName: 'Українська' };

      case 'en':
        return {
          icon: <IconFlagEnglish />,
          name: 'English language (EN)',
          shortName: 'English',
        };

      case 'ru':
        return { icon: <IconFlagRus />, name: 'Русский язык (RU)', shortName: 'Русский' };

      default:
        break;
    }
  };
  const { open, handleToggleOpen } = useToggleOpen();

  const handleChange = async (value: string) => {
    if (value === currentLocale) return;

    await i18n.changeLanguage(value);

    const queryString = searchParams?.toString();
    const query = queryString ? `?${queryString}` : '';

    if (currentLocale === 'uk') {
      router.push('/' + value + currentPathname + query);
      router.refresh();
    } else if (currentPathname) {
      const newPath = currentPathname.replace(`/${currentLocale}`, `/${value}`);
      router.push(newPath + query);
      router.refresh();
    }
  };
  return (
    <div>
      <Button
        className={`  w-full text-text_prymery_color justify-between`}
        variant={'link'}
        onClick={handleToggleOpen}
      >
        <div className='flex items-center gap-2 body_medium'>
          <div className='w-6 h-6'>{dispalyIcon(currentLocale)?.icon}</div>
          {dispalyIcon(currentLocale)?.name}
        </div>
        <ChevronDown
          className={`stroke-primary ${open && 'rotate-180'} transition-all duration-300 ease-in-out`}
        />
      </Button>

      <ul
        className={`transition-all duration-300 ease-in-out overflow-hidden ml-2 space-y-2 ${
          open ? 'max-h-96  pt-2 opacity-100' : 'max-h-0 pt-0 opacity-100'
        } flex flex-col gap-2 `}
      >
        {supportLocalesList.map((el) => (
          <Button
            key={el.name}
            variant={'link'}
            className='justify-start text-text_prymery_color body_medium'
            onClick={() => handleChange(el.value)}
          >
            <div className='w-6 h-6'> {el.icon} </div>
            {el.shortName}
          </Button>
        ))}
      </ul>
    </div>
  );
}
