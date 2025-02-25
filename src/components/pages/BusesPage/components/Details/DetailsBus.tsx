'use client';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { useTranslations } from 'next-intl';

export default function DetailsBus() {
  const сurrentTicket = useCurrentTicketStore((state) => state.сurrentTicket);

  const t = useTranslations('search');

  if (!сurrentTicket?.details?.bus_name) {
    return null;
  }

  return (
    <div className={`space-y-1`}>
      <h5 className="h6 text-text_prymery">{t('bus')}:</h5>
      <div className="flex flex-row flex-wrap gap-0.5">
        <p className="text-wrap text-text_secondary text-[10px] mobile:small_text">
          {сurrentTicket?.details?.bus_name}
          {сurrentTicket?.details?.bus_number}
        </p>
      </div>
      <div>{сurrentTicket?.details?.bus_pictures}</div>
    </div>
  );
}
