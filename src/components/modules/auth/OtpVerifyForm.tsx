'use client';

import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { TypeVerifyCode } from '@/types/auth.types';
import { useTotp } from '@/hooks/useTotp';

interface IOtpVerifyForm {
  length?: number;
  email: string;
  onSubmit?: (data: TypeVerifyCode) => Promise<void>;
  autoSubmit?: boolean;
}

export default function OtpVerifyForm({ length = 6, onSubmit, email, autoSubmit = false }: IOtpVerifyForm) {
  const { value, onChange, error, handleSubmit, isComplete } = useTotp({
    length,
    onSubmit,
    email,
    autoSubmit,
  });

  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <div className="space-y-3">
      <InputOTP maxLength={length} inputMode="numeric" value={value} onChange={onChange}>
        <InputOTPGroup className="justify-center w-full">
          {Array.from({ length }).map((_, idx) => (
            <InputOTPSlot index={idx} key={idx} className="size-10" />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="button" variant="default" size="primary" onClick={handleSubmit} disabled={!isComplete}>
        {t('otpVerifyCode')}
      </Button>
    </div>
  );
}
