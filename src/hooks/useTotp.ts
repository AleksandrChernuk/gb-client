import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { TypeVerifyCode } from '@/types/auth.types';

interface UseOtpProps {
  length?: number;
  email: string;
  onSubmit?: (data: TypeVerifyCode) => Promise<void>;
  autoSubmit?: boolean;
}

export const useTotp = ({ length = 6, onSubmit, email, autoSubmit = false }: UseOtpProps) => {
  const t = useTranslations('AuthForm');
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onChange = useCallback(
    (next: string) => {
      if (!/^\d*$/.test(next)) {
        setError(t('totp_verify_code_error'));
        return;
      }
      setError(null);
      setValue(next.slice(0, length));

      // Автоотправка
      if (autoSubmit && next.length === length) {
        onSubmit?.({ email, code: next });
      }
    },
    [length, autoSubmit, onSubmit, email, t],
  );

  const handleSubmit = useCallback(() => {
    if (value.length === length) {
      onSubmit?.({ email, code: value });
    } else {
      setError(t('totp_verify_code_error'));
    }
  }, [value, length, onSubmit, email, t]);

  const reset = useCallback(() => {
    setValue('');
    setError(null);
  }, []);

  return { value, onChange, error, handleSubmit, reset, isComplete: value.length === length };
};
