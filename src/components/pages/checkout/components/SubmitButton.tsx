import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useTranslations } from 'next-intl';
import React, { memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const SubmitButton = memo(function SubmitButton({ loading }: { loading: boolean }) {
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  const { control } = useFormContext();

  const paymentType = useWatch({ control, name: 'payment' });

  return (
    <Button variant="default" className="w-full" size={'primery'} type="submit">
      {loading ? loading : paymentType === 'BOOK' ? t('pay') : t('book')}
    </Button>
  );
});

export default SubmitButton;
