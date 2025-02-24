'use client'

import { ChevronUp } from 'lucide-react'
import { Button } from '../ui/button'
import { supportLocalesList } from '@/constans/constans.support.locales'
import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { Locale } from '@/i18n/locales'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function SelectLocale() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const searchParams = useSearchParams().toString()

  if (pathname === '/checkout') {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger asChild className='group'>
        <Button className={`flex items-center justify-center  gap-0.5`} variant={'link'}>
          <div className='w-7 h-7'>
            {supportLocalesList.find((item) => item.value === locale)?.icon}
          </div>
          <ChevronUp
            size={24}
            className={`stroke-black group-data-[state=open]:stroke-gray_2_for_body group-data-[state=open]:dark:stroke-dark_grayy  group-hover:stroke-gray_3 dark:stroke-gray_1 dark:group-hover:stroke-gray_1 group-data-[state=open]:rotate-180`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={10} side='bottom'>
        <ul className=' space-y-2'>
          {supportLocalesList.map((el) => (
            <li key={el.value}>
              <Button
                key={el.value}
                variant={'link'}
                asChild
                className='justify-start text-text_prymery body_medium'
              >
                <Link href={`${pathname}?${searchParams}`} locale={el.value}>
                  <div className='w-6 h-6'> {el.icon} </div>
                  {el.shortName}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
