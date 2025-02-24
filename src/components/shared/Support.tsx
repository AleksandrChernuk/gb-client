'use client'

import { supportNavlinks } from '@/constans/constans.supportNavlinks'
import { Button } from '../ui/button'
import { Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Link } from '@/i18n/routing'

export const Support = () => {
  const t = useTranslations('common')

  return (
    <Popover>
      <PopoverTrigger asChild className='group'>
        <Button
          className={`flex items-center  text-black body_medium gap-1 dark:text-gray_1 hover:text-gray_3 dark:hover:text-gray_1 data-[state=open]:text-gray_2_for_body data-[state=open]:text-gray_2_for_body dark:text-grayy`}
          variant={'link'}
        >
          <div className='p-1 rounded-full bg-gray_1 dark:bg-grayy'>
            <Phone
              size={20}
              className={`stroke-black group-data-[state=open]:stroke-gray_2_for_body group-data-[state=open]:dark:stroke-dark_main  group-hover:stroke-gray_3 dark:stroke-black dark:group-hover:stroke-gray_1`}
            />
          </div>
          <div>{t('mainNavSupportLink')}</div>
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={10} side='bottom'>
        <ul className=' space-y-2'>
          {supportNavlinks.map((item, idx) => (
            <li key={`${item.title}+${idx}`}>
              <Button
                asChild
                variant={'link'}
                className='justify-start text-text_prymery addional_regular_text'
              >
                <Link href={item.src}>
                  <div className='w-4 h-4'>{item.icon}</div>
                  {item.title}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
