'use client'
import { useCurrentTicketStore } from '@/store/useCurrentTicket'
import { useTranslations } from 'next-intl'

export default function DetailsAmenities() {
  const сurrentTicket = useCurrentTicketStore((state) => state.сurrentTicket)
  const t = useTranslations('search')

  if (!сurrentTicket?.details?.amenities || сurrentTicket?.details?.amenities.length === 0) {
    return null
  }

  return (
    <div className={`space-y-1`}>
      <h5 className='h6 text-text_prymery'>{t('amenities')}:</h5>
      <ul className='flex flex-row flex-wrap gap-2'>
        {сurrentTicket?.details?.amenities.map((el) => (
          <li key={el} className='text-wrap text-text_secondary  text-[10px] mobile:small_text'>
            {el}
          </li>
        ))}
      </ul>
    </div>
  )
}
