import { Button } from '@/shared/ui/button';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

const SubmitButton = memo(function SubmitButton() {
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const loadingResult = useNewOrderResult((state) => state.loadingResult);
  const form = useFormContext();

  return (
    <Button variant={'default'} disabled={!form.formState.isValid} className="w-full" size={'primary'} type="submit">
      {loadingResult ? <LoaderCircle className="animate-spin" /> : t('confirm')}
    </Button>
  );
});

export default SubmitButton;
