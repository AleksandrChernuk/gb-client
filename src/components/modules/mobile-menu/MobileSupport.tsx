'use client';

import { Button } from '@/components/ui/button';
import { supportNavlinks } from '@/constans/constans.supportNavlinks';
import useToggleOpen from '@/hooks/useToggleOpen';
import { ChevronDown, Phone } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function MobileSupport() {
  const { open, handleToggleOpen } = useToggleOpen();
  const { t } = useTranslation(['common']);

  return (
    <div>
      <Button
        className={`justify-between w-full text-text_prymery_color body_medium`}
        variant={'link'}
        onClick={handleToggleOpen}
      >
        <div className='flex items-center gap-2'>
          <Phone size={24} className='stroke-primary' />
          {t('mainNavSupportLink')}
        </div>
        <ChevronDown
          className={`stroke-primary ${open && 'rotate-180'} transition-all duration-300 ease-in-out`}
        />
      </Button>

      <ul
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-96  pt-2 opacity-100' : 'max-h-0 pt-0 opacity-100'
        } flex flex-col gap-2 `}
      >
        {supportNavlinks.map((item, idx) => (
          <li key={`${item.title}+${idx}`}>
            <Link
              href={item.src}
              className='flex flex-row items-center justify-start gap-2 p-1 body_medium'
            >
              <span className='w-[22.5px] h-[22.5px]'>{item.icon && item.icon}</span>
              <span className='text-base font-normal text-black dark:text-grayy'>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
