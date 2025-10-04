'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { LoaderCircle, TicketX } from 'lucide-react';
import { useRouter } from '@/shared/i18n/routing';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { usePaymentConfirm } from '@/shared/hooks/usePaymentConfirm';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

export const NewOrderDialog = () => {
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const router = useRouter();

  const { control } = useFormContext();
  const paymentType = useWatch({ control, name: 'payment', exact: true });

  const initiateNewOrder = useNewOrderResult((s) => s.initiateNewOrder);
  const { handleCancelOrder, payLoading, handlePayOrder, handleConfirmOrder } = usePaymentConfirm();

  const isError = initiateNewOrder?.status === 'error';
  const alert = initiateNewOrder?.alertMessage;
  const amount = Math.floor(Number(initiateNewOrder?.amount ?? 0));
  const currency = initiateNewOrder?.currency ?? 'UAH';

  const showBookButton = !isError && paymentType !== 'BOOK';
  const showCancelButton = !isError;
  const title = isError ? t('payment_confirm_error_title') : t('payment_confirm_title');

  const renderAlertMessage = () => {
    if (!alert || typeof alert !== 'object') return null;
    return (
      <div className="space-y-1">
        {alert.title && <p className="text-sm">{alert.title}</p>}
        {alert.description && <p className="text-sm">{alert.description}</p>}
      </div>
    );
  };

  const renderDescription = () => (
    <div className="text-center space-y-2">
      {isError ? (
        <p>{initiateNewOrder?.message || t('payment_confirm_error_description')}</p>
      ) : (
        <>
          <p className="text-base">{t('payment_confirm_final_amount')}</p>
          <p className="font-bold text-xl">
            {amount} {currency}
          </p>
          {paymentType === 'PAYMENT_AT_BOARDING' && (
            <p className="text-xs text-green-300 text-left">
              <span className="text-red-600 text-lg">*</span>
              {t('sms_confirmation_notice')}
            </p>
          )}
          {renderAlertMessage()}
        </>
      )}
    </div>
  );

  const renderActionButtons = () => {
    if (isError)
      return (
        <Button size="primary" variant="default" onClick={() => router.back()} className="text-white">
          {t('payment_confirm_to_search')}
        </Button>
      );

    if (showBookButton)
      return (
        <Button
          size="primary"
          variant="default"
          className="text-white"
          onClick={handleConfirmOrder}
          disabled={payLoading}
        >
          {payLoading ? <LoaderCircle className="animate-spin" /> : t('payment_confirm_book')}
        </Button>
      );

    return (
      <Button size="primary" variant="default" className="text-white" onClick={handlePayOrder} disabled={payLoading}>
        {payLoading ? <LoaderCircle className="animate-spin" /> : t('payment_confirm_pay')}
      </Button>
    );
  };

  return (
    <>
      <DialogHeader className="gap-2">
        <DialogTitle className="tablet:text-2xl text-slate-700 dark:text-slate-50">{title}</DialogTitle>
        <DialogDescription asChild className="text-base tablet:text-lg text-slate-700 dark:text-slate-200">
          {renderDescription()}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className={`grid gap-4 ${isError ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-2'}`}>
        {showCancelButton && (
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
        {renderActionButtons()}
      </DialogFooter>
    </>
  );
};
