import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useNewOrderResult } from '@/store/useOrderResult';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { memo } from 'react';

const SubmitButton = memo(function SubmitButton() {
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const loadingResult = useNewOrderResult((state) => state.loadingResult);

  return (
    <Button variant={'default'} className="w-full" size={'primary'} type="submit">
      {loadingResult ? <LoaderCircle className="animate-spin" /> : t('confirm')}
    </Button>
  );
});

export default SubmitButton;
