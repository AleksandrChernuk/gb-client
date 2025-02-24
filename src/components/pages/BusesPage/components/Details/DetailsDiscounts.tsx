'use client'

import { useCurrentTicketStore } from '@/store/useCurrentTicket'
import { useTranslations } from 'next-intl'

export default function DetailsDiscounts() {
  const сurrentTicket = useCurrentTicketStore((state) => state.сurrentTicket)
  const t = useTranslations('search')
  if (
    !сurrentTicket?.details?.discounts ||
    сurrentTicket.details.discounts.length === 0 ||
    !сurrentTicket?.details?.discounts[0].description
  ) {
    return null
  }

  return (
    <div className={`space-y-1`}>
      <h5 className='h6 text-text_prymery'>{t('discounts')}:</h5>
      <ul className='flex flex-row flex-wrap gap-0.5'>
        {сurrentTicket?.details?.discounts.map((el) => (
          <li key={el.id} className='text-wrap text-text_secondary  text-[10px] mobile:small_text'>
            {el.description}
          </li>
        ))}
      </ul>
    </div>
  )
}
