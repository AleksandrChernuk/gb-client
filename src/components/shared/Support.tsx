'use client' 

import { supportNavlinks } from '@/constans/constans.supportNavlinks';
import { useTranslation } from 'react-i18next';
import useToggleOpen from '@/hooks/useToggleOpen';
import { Button } from '../ui/button';
import { Phone } from 'lucide-react';
import Link from 'next/link';

export const Support = () => {
  const { open, handleToggleOpen, handleSetOpen } = useToggleOpen();
  const { t } = useTranslation(['common']);

  return (
    <div
      className='relative flex items-center justify-center'
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          handleSetOpen(false);
        }
      }}
    >
      <Button
        className={`group text-black body_medium gap-1 dark:text-gray_1 hover:text-gray_3 dark:hover:text-gray_1 ${open && 'text-gray_2_for_body  dark:text-grayy'}`}
        variant={'link'}
        onClick={handleToggleOpen}
      >
        <div className='p-1 rounded-full bg-gray_1 dark:bg-grayy'>
          <Phone
            size={20}
            className={`stroke-black group-hover:stroke-gray_3 ${open && 'stroke-gray_2_for_body dark:stroke-dark_mode_main1'}  dark:stroke-black dark:group-hover:stroke-gray_1`}
          />
        </div>
        <div>{t('mainNavSupportLink')}</div>
      </Button>

      {open && (
        <ul
          className={`absolute top-10  z-50 p-4 border border-black dark:border-dark_mode_main1 dark:bg-black_2_for_text  rounded-2xl   bg-white  overflow-hidden max-h-fit min-w-fit space-y-2 `}
        >
          {supportNavlinks.map((item, idx) => (
            <li key={`${item.title}+${idx}`}>
              <Button
                asChild
                variant={'link'}
                className='justify-start text-text_prymery_color secondary_text'
                onClick={() => {
                  handleSetOpen(false);
                }}
              >
                <Link href={item.src}>
                  <div className='w-4 h-4'>{item.icon}</div>
                  {item.title}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
