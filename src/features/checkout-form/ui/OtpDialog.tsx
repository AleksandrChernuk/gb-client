'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LoaderCircle, TicketX } from 'lucide-react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/shared/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { Button } from '@/shared/ui/button';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { usePaymentConfirm } from '@/features/checkout-form/hooks';

const OtpDialog = () => {
  const [pin, setPin] = useState('');
  const { handleCancelOrder, smsValidationLoading, handleSMSValidation } = usePaymentConfirm();
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const initiateNewOrder = useNewOrderResult((s) => s.initiateNewOrder);

  const handleSubmitPin = () => {
    if (pin.length < 6) return;
    handleSMSValidation(pin);
  };

  return (
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
        autoFocus
      >
        <InputOTPGroup>
          {[...Array(6)].map((_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <DialogFooter className={`grid grid-cols-1 gap-4 ${!!initiateNewOrder ? 'md:grid-cols-2' : ''}`}>
        <Button variant="outline" size="primary" onClick={handleCancelOrder} type="button" className="text-slate-800">
          {t('payment_confirm_cancel')} <TicketX />
        </Button>

        <Button
          disabled={smsValidationLoading || pin.length < 6}
          variant="default"
          size="primary"
          onClick={handleSubmitPin}
        >
          {smsValidationLoading ? <LoaderCircle className="animate-spin" /> : t('payment_confirm_book')}
        </Button>
      </DialogFooter>
    </DialogHeader>
  );
};

export default OtpDialog;
