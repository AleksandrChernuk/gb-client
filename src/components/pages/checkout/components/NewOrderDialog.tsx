'use client';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LoaderCircle, TicketX } from 'lucide-react';
import { useNewOrderResult } from '@/store/useOrderResult';
import { useFormContext, useWatch } from 'react-hook-form';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useTranslations } from 'next-intl';
import { usePaymantConfirm } from '../hooks/usePaymantConfirm';

export const NewOrderDialog = () => {
  const initiateNewOrder = useNewOrderResult((s) => s.initiateNewOrder);
  const { handleCancelOrder, payLoading, handlePayOrder, handleConfirmlOrder } = usePaymantConfirm();
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const { control } = useFormContext();
  const paymentType = useWatch({ control, name: 'payment' });

  const isError = initiateNewOrder?.status === 'error';
  const alert = initiateNewOrder?.alertMessage;
  const title = isError ? t('payment_confirm_error_title') : t('payment_confirm_title');

  const description = isError ? (
    <p>{initiateNewOrder?.message || t('payment_confirm_error_description')}</p>
  ) : (
    <div className="text-center space-y-2">
      <p className="text-base">{t('payment_confirm_final_amount')}</p>
      <p className="font-bold text-xl">
        {Math.floor(Number(initiateNewOrder?.amount || 0))} {initiateNewOrder?.currency}
      </p>

      {paymentType === 'PAYMENT_AT_BOARDING' && (
        <p className="text-xs text-green-300 text-left">
          <span className="text-red-600 text-lg">*</span>Система може надіслати підтвердження через SMS
        </p>
      )}
      <>
        {alert && (
          <>
            {!!initiateNewOrder?.alertMessage.title && (
              <p className="text-sm">{initiateNewOrder?.alertMessage.title}</p>
            )}
            {!!initiateNewOrder?.alertMessage.description && (
              <p className="text-sm">{initiateNewOrder?.alertMessage.description}</p>
            )}
          </>
        )}
      </>
    </div>
  );

  return (
    <>
      <DialogHeader className="gap-2">
        <DialogTitle className="tablet:text-2xl text-slate-700 dark:text-slate-50">{title}</DialogTitle>
        <DialogDescription asChild className="text-base tablet:text-lg text-slate-700 dark:text-slate-200">
          {description}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className={`grid grid-cols-2 gap-4 ${!!isError ? 'md:grid-cols-1' : ''}`}>
        {!isError && (
          <Button
            variant="outline"
            size="primary"
            onClick={handleCancelOrder}
            disabled={payLoading}
            className="text-slate-800"
          >
            {t('payment_confirm_cancel')} <TicketX />
          </Button>
        )}
        {!isError && paymentType !== 'BOOK' ? (
          <Button size="primary" variant={'default'} className="text-white" onClick={handleConfirmlOrder}>
            {payLoading ? <LoaderCircle className="animate-spin" /> : t('payment_confirm_book')}
          </Button>
        ) : (
          <Button size="primary" variant={'default'} className="text-white" onClick={handlePayOrder}>
            {payLoading ? <LoaderCircle className="animate-spin" /> : t('payment_confirm_pay')}
          </Button>
        )}
      </DialogFooter>
    </>
  );
};
