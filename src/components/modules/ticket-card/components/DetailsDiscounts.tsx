'use client';

import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { useTranslations } from 'next-intl';
import { useTicketDetailsContext } from '../context/TicketDetailsContext';

export default function DetailsDiscounts() {
  const { id } = useTicketDetailsContext();

  const ticketDetails = useCurrentTicketStore((state) => state.tickets[id]);
  const t = useTranslations('search');
  if (
    !ticketDetails?.details?.discounts ||
    ticketDetails.details.discounts.length === 0 ||
    !ticketDetails?.details?.discounts[0].description
  ) {
    return null;
  }
  return (
    <div className={`space-y-1`}>
      <h5 className="h6 text-text_prymery">{t('discounts')}:</h5>
      <ul className="flex flex-row flex-wrap gap-0.5">
        {ticketDetails?.details?.discounts.map((el) => (
          <li key={el.id} className="text-wrap text-text_secondary  text-[10px] mobile:small_text">
            {el.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
