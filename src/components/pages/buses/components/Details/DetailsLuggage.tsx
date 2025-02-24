'use client'

import { useCurrentTicketStore } from '@/store/useCurrentTicket'
import { useTranslations } from 'next-intl'

export default function DetailsLuggage() {
  const t = useTranslations('search')
  const сurrentTicket = useCurrentTicketStore((state) => state.сurrentTicket)

  if (
    !сurrentTicket?.details?.luggage_rules ||
    сurrentTicket?.details?.luggage_rules.length === 0
  ) {
    return null
  }

  return (
    <div className={`space-y-1`}>
      <h5 className='h6 text-text_prymery'>{t('luggage')}:</h5>
      <ul className='flex flex-col gap-1'>
        {сurrentTicket?.details?.luggage_rules.map((el) => (
          <li key={el} className='text-wrap text-text_secondary  text-[10px] mobile:small_text'>
            {el}
          </li>
        ))}
      </ul>
    </div>
  )
}
