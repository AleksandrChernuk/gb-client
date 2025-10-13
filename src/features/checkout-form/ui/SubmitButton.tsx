'use client';

import { Button } from '@/shared/ui/button';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

const SubmitButton = memo(function SubmitButton() {
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const loadingResult = useNewOrderResult((state) => state.loadingResult);
  const form = useFormContext();

  const isLoading = useMemo(
    () => loadingResult || form.formState.isSubmitting,
    [loadingResult, form.formState.isSubmitting],
  );

  return (
    <>
      <Button variant="default" size="primary" type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <LoaderCircle className="animate-spin" /> : t('confirm')}
      </Button>
    </>
  );
});

export default SubmitButton;
