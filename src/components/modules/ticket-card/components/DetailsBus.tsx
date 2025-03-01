'use client';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { useTranslations } from 'next-intl';
import { useTicketDetailsContext } from '../context/TicketDetailsContext';

export default function DetailsBus() {
  const { id } = useTicketDetailsContext();

  const ticketDetails = useCurrentTicketStore((state) => state.tickets[id]);

  const t = useTranslations('search');

  if (!ticketDetails?.details?.bus_name) {
    return null;
  }

  return (
    <div className={`space-y-1`}>
      <h5 className="h6 text-text_prymery">{t('bus')}:</h5>
      <div className="flex flex-row flex-wrap gap-0.5">
        <p className="text-wrap text-text_secondary text-[10px] mobile:small_text">
          {ticketDetails?.details?.bus_name}
          {ticketDetails?.details?.bus_number}
        </p>
      </div>
      <div>{ticketDetails?.details?.bus_pictures}</div>
    </div>
  );
}
