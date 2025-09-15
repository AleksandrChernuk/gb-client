'use client';

import { resendCode } from '@/actions/auth.service';
import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { cn } from '@/lib/utils';
import { TypeResendCode } from '@/types/auth.types';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

interface ResendCodeProps {
  email: string;
  locale: string;
  type: 'VERIFICATION' | 'TWO_FACTOR' | 'CHANGE_EMAIL' | 'RESET_PASSWORD' | 'DELETE_ACCOUNT' | 'NEW_DEVICE_LOGIN';
  loading?: boolean;
  className?: string;
}

const ResendCode = ({ email, locale, type, className, loading }: ResendCodeProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = useTranslations(MESSAGE_FILES.FORM);

  const handleSubmit = async () => {
    setIsLoading(true);
    const data: TypeResendCode = { email: decodeURIComponent(email || ''), type };
    try {
      const result = await resendCode(data, locale);

      if (result === 'Code resent') {
        toast.success(t('code_resent_success'));
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(t('code_resent_error'));
      }
      toast.error(`${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        type="button"
        variant={'outline'}
        size={'primary'}
        onClick={() => {
          handleSubmit();
        }}
        disabled={isLoading || loading}
        className={cn('text-slate-700 dark:text-slate-100', className)}
      >
        {isLoading || loading ? t('sending') : t('resend_code')}
      </Button>
    </div>
  );
};

export default ResendCode;
