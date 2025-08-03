'use client';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Button } from '@/components/ui/button';
import { LoaderCircle, TicketX } from 'lucide-react';
import { usePaymantConfirm } from '../hooks/usePaymantConfirm';
import { useNewOrderResult } from '@/store/useOrderResult';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useState } from 'react';

export const OtpDialog = () => {
  const [pin, setPin] = useState('');
  const { handleCancelOrder, smsValidationoading, handleSMSValidation } = usePaymantConfirm();
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
          <Button variant="outline" size="primery" onClick={handleCancelOrder} type="button" className="text-slate-800">
            {t('payment_confirm_cancel')} <TicketX />
          </Button>

          <Button variant={'default'} size={'primery'} onClick={() => handleSMSValidation(pin)}>
            {smsValidationoading ? <LoaderCircle className="animate-spin" /> : t('payment_confirm_book')}
          </Button>
        </DialogFooter>
      </DialogHeader>
    </>
  );
};
