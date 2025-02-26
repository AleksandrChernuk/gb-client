'use client';

import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { useTranslations } from 'next-intl';
import { useTicketDetailsContext } from '../../context/TicketDetailsContext';

export default function DetailsLuggage() {
  const t = useTranslations('search');
  const { id } = useTicketDetailsContext();

  const ticketDetails = useCurrentTicketStore((state) => state.tickets[id]);

  if (!ticketDetails?.details?.luggage_rules || ticketDetails?.details?.luggage_rules.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-1`}>
      <h5 className="h6 text-text_prymery">{t('luggage')}:</h5>
      <ul className="flex flex-col gap-1">
        {ticketDetails?.details?.luggage_rules.map((el) => (
          <li key={el} className="text-wrap text-text_secondary  text-[10px] mobile:small_text">
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
