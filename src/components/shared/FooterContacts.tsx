'use client';

import { supportNavlinks } from '@/constans/constans.supportNavlinks';
import useToggleOpen from '@/hooks/useToggleOpen';
import { Input } from '../ui/input';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function FooterContacts() {
  const { open, handleToggleOpen, handleSetOpen } = useToggleOpen();

  return (
    <div
      className='relative space-y-4 max-w-[231px]'
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          handleSetOpen(false);
        }
      }}
    >
      <div className='relative'>
        <div className='absolute inset-y-0 flex items-center justify-center pointer-events-none left-2 tablet:left-2 laptop:left-5'>
          <div className='w-6 h-6 '>{supportNavlinks[0].icon}</div>
        </div>
        <Input
          type='button'
          className={`text-left pl-10 w-full text-text_prymery_color secondary_text`}
          onClick={handleToggleOpen}
          value={supportNavlinks[0].title}
          onChange={() => {}}
        />
        <div className='absolute inset-y-0 flex items-center justify-center right-2'>
          <ChevronDown className={` stroke-text_prymery_color  ${open && 'rotate-180'}  `} />
        </div>
      </div>

      {open && (
        <ul className='absolute z-50 flex flex-col items-center justify-center p-4 overflow-hidden bg-white border border-black top-10 dark:border-dark_mode_main1 dark:bg-black_2_for_text rounded-2xl max-h-fit min-w-fit'>
          {supportNavlinks.map((item, idx) => (
            <li key={`${item.title}+${idx}`}>
              <Button variant={'link'} asChild>
                <Link
                  href={item.src}
                  className='flex flex-row items-center justify-start gap-2 p-1'
                >
                  <span className='w-4 h-4'>{item.icon && item.icon}</span>
                  <span className='text-black secondary_text dark:text-grayy'>{item.title}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
