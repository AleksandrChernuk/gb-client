'use client';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/shared/ui/dialog';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { LoaderCircle, TicketX } from 'lucide-react';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { usePaymentConfirm } from '@/shared/hooks/usePaymentConfirm';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { Button } from '@/shared/ui/button';

export const OtpDialog = () => {
  const [pin, setPin] = useState('');
  const { handleCancelOrder, smsValidationLoading, handleSMSValidation } = usePaymentConfirm();
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  const initiateNewOrder = useNewOrderResult((s) => s.initiateNewOrder);

  return (
    <>
      <DialogHeader className="gap-2">
        <DialogTitle className="tablet:text-2xl text-slate-700 dark:text-slate-50">
          {t('enter_confirmation_code')}
        </DialogTitle>

        <DialogDescription className="sr-only" />

        <InputOTP
          value={pin}
          onChange={setPin}
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          containerClassName="justify-center mb-4"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <DialogFooter className={`grid grid-cols-1 gap-4 ${!!initiateNewOrder ? 'md:grid-cols-2' : ''}`}>
          <Button variant="outline" size="primary" onClick={handleCancelOrder} type="button" className="text-slate-800">
            {t('payment_confirm_cancel')} <TicketX />
          </Button>

          <Button variant={'default'} size={'primary'} onClick={() => handleSMSValidation(pin)}>
            {smsValidationLoading ? <LoaderCircle className="animate-spin" /> : t('payment_confirm_book')}
          </Button>
        </DialogFooter>
      </DialogHeader>
    </>
  );
};
