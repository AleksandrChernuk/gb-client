'use client'

import { useTranslations } from 'next-intl'

type Props = {
  count: number
}

export default function TicketPlaces({ count }: Props) {
  const t = useTranslations('search')

  return (
    <div className='hidden justify-self-center tablet:flex items-start gap-0.5 tablet:order-3 tablet:justify-self-end'>
      <span className='break-all small_text text-text_prymery'>
        <span className='text-text_secondary'>{t('places')}:</span>
        {count}
      </span>
    </div>
  )
}
