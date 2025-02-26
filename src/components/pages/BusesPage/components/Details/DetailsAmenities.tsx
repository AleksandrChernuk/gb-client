'use client';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { useTranslations } from 'next-intl';
import { useTicketDetailsContext } from '../../context/TicketDetailsContext';

export default function DetailsAmenities() {
  const { id } = useTicketDetailsContext();

  const ticketDetails = useCurrentTicketStore((state) => state.tickets[id]);
  const t = useTranslations('search');

  if (!ticketDetails?.details?.amenities || ticketDetails.details?.amenities.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-1`}>
      <h5 className="h6 text-text_prymery">{t('amenities')}:</h5>
      <ul className="flex flex-row flex-wrap gap-2">
        {ticketDetails.details?.amenities.map((el) => (
          <li key={el} className="text-wrap text-text_secondary  text-[10px] mobile:small_text">
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
