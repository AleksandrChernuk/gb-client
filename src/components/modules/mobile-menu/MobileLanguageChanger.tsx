'use client'

import { Button } from '@/components/ui/button'
import { supportLocalesList } from '@/constans/constans.support.locales'
import { useLocale } from 'next-intl'
import { Locale } from '@/i18n/locales'
import { Link, usePathname } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function MobileLanguageChanger() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const searchParams = useSearchParams().toString()

  if (pathname === '/checkout') {
    return null
  }

  return (
    <Accordion type='single' collapsible className=''>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='py-0 '>
          <div className='flex items-center gap-2 text-text_prymery body_medium'>
            <div className='w-7 h-7'>
              {supportLocalesList.find((item) => item.value === locale)?.icon}
            </div>
            {supportLocalesList.find((item) => item.value === locale)?.name}
          </div>
        </AccordionTrigger>
        <AccordionContent className='pb-0 pt-4 pl-1'>
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
