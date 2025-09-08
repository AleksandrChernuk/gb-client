import { MESSAGE_FILES } from '@/config/message.file.constans';
import { TicketType } from '@/types/payments.Info.types';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

type Props = {
  ticket: TicketType;
};

const labelStyle = 'text-sm font-bold tracking-normal leading-4 text-slate-500 dark:text-slate-300';
const valueStyle =
  'text-sm leading-[18px] tablet:text-base font-normal tablet:leading-4 tracking-normal text-slate-700 dark:text-slate-50 text-wrap';

const OrderTicket = ({ ticket }: Props) => {
  const t = useTranslations(MESSAGE_FILES.PROFILE);

  return (
    <li key={ticket.ticketNumber} className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900  border border-green-300">
      <ul className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
        {ticket.ticketNumber && (
          <li className={valueStyle}>
            <span className={labelStyle}>№</span> {`${ticket.ticketNumber}`.padStart(9, '0')}
          </li>
        )}

        {ticket.firstName && ticket.lastName && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('passenger')}:</span> {ticket.firstName} {ticket.lastName}
          </li>
        )}

        {ticket.middlename && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('middlename')}:</span> {ticket.middlename}
          </li>
        )}

        {ticket.phone && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('phone')}:</span> {ticket.phone}
          </li>
        )}

        {ticket.email && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('email')}:</span> {ticket.email}
          </li>
        )}

        {ticket.gender && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('gender')}:</span> {ticket.gender}
          </li>
        )}

        {ticket.birthdate && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('birthdate')}:</span> {ticket.birthdate}
          </li>
        )}

        {ticket.citizenship && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('citizenship')}:</span> {ticket.citizenship}
          </li>
        )}

        {ticket.documentType && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('document_type')}:</span> {ticket.documentType}
          </li>
        )}

        {ticket.documentNumber && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('document_number')}:</span> {ticket.documentNumber}
          </li>
        )}

        {ticket.documentExpirationDate && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('document_expiration_date')}:</span> {ticket.documentExpirationDate}
          </li>
        )}

        {ticket.seatNumber ? (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('seat_number')}:</span> {ticket.seatNumber}
          </li>
        ) : (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('seat_number')}:</span> {t('free_seat')}
          </li>
        )}

        {ticket.discountDescription && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('discount')}:</span> {ticket.discountDescription}{' '}
            {ticket.discountPercent && `(${ticket.discountPercent}%)`}
          </li>
        )}

        {ticket.ticketPrice && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('price')}:</span> {ticket.ticketPrice} UAH
          </li>
        )}

        {ticket.ticketType && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('type')}:</span> {ticket.ticketType}
          </li>
        )}

        {ticket.ticketId && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('id')}:</span> {ticket.ticketId}
          </li>
        )}

        {ticket.ticketLink && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('link')}:</span> {ticket.ticketLink}
          </li>
        )}

        {ticket.createdAt && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('created_at')}:</span>{' '}
            {format(new Date(ticket.createdAt), 'HH:mm dd.MM.yyyy')}
          </li>
        )}

        {ticket.updatedAt && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('updated_at')}:</span>{' '}
            {format(new Date(ticket.updatedAt), 'HH:mm dd.MM.yyyy')}
          </li>
        )}

        {ticket.refundAmount && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('refund_amount')}:</span> {ticket.refundAmount}
          </li>
        )}

        {ticket.refundPercent && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('refund_percent')}:</span> {ticket.refundPercent}%
          </li>
        )}

        {ticket.refundDate && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('refund_date')}:</span>{' '}
            {format(new Date(ticket.refundDate), 'HH:mm dd.MM.yyyy')}
          </li>
        )}

        {ticket.refundDescription && (
          <li className={valueStyle}>
            <span className={labelStyle}>{t('refund_description')}:</span> {ticket.refundDescription}
          </li>
        )}
      </ul>
    </li>
  );
};

export default OrderTicket;
