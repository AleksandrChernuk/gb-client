'use client'

import { useState } from 'react'
import { MobileDate } from './modules/Date/MobileDate'
import { DesktopDate } from './modules/Date/DesktopDate'
import { MobilePassengers } from './modules/Passengers/MobilePassengers'
import { DesktopPassengers } from './modules/Passengers/DesktopPassengers'
import { MobCitySeacrh } from './modules/CitySearch/MobileCitySearch'
import { DesktopCitySearch } from './modules/CitySearch/DesctopCitySearch'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSearchStore } from '@/store/useSearch'
import { useLocale, useTranslations } from 'next-intl'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

export const formSchema = z.object({
  from: z.object({}, { message: 'required' }),
  to: z.object({}, { message: 'required' }),
})

const Search = () => {
  const matches = useMediaQuery('(max-width: 767px)')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const currentLocale = useLocale()
  const route = useRouter()
  const t = useTranslations('common')

  const handleSubmit = () => {
    const { to, from, adult, children, date, setErrors } = useSearchStore.getState()

    setIsSubmitting(true)
    const validationResult = formSchema.safeParse({ from, to })

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format()

      setErrors('from', formattedErrors.from?._errors[0] || null)
      setErrors('to', formattedErrors.to?._errors[0] || null)
      setIsSubmitting(false)

      return
    }
    route.push(
      `/${currentLocale}/buses?from=${from?.id}&to=${to?.id}&date=${date}&adult=${adult}&children=${children}`
    )
    setIsSubmitting(false)
  }

  return (
    <div className='relative rounded-2xl bg-white dark:bg-dark_main shadow'>
      <div className='flex flex-col h-full tablet:flex-row'>
        <div className='items-center grid-cols-4 p-4 tablet:grid tablet:gap-4 laptop:gap-10'>
          {matches ? (
            <>
              <MobCitySeacrh name={'from'} />
              <Separator className='h-[1px] bg-gray_1 dark:bg-black_2_for_text my-2' />
              <MobCitySeacrh name={'to'} />
              <Separator className='h-[1px] bg-gray_1 dark:bg-black_2_for_text my-2' />
              <MobileDate />
              <Separator className='h-[1px] bg-gray_1 dark:bg-black_2_for_text my-2' />
              <MobilePassengers />
            </>
          ) : (
            <>
              <DesktopCitySearch name={'from'} />
              <DesktopCitySearch name={'to'} />
              <DesktopDate />
              <DesktopPassengers />
            </>
          )}
        </div>

        <Button variant={'main'} size={'mainSearch'} disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? <LoaderCircle className='animate-spin' /> : t('searchBtn')}
        </Button>
      </div>
    </div>
  )
}

export default Search
