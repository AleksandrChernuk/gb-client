'use client';

import { Button } from '@/shared/ui/button';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { memo, useState } from 'react';
// import { useFormContext } from 'react-hook-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import CustomDialog from '@/shared/ui/CustomDialog';

const SubmitButton = memo(function SubmitButton() {
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const loadingResult = useNewOrderResult((state) => state.loadingResult);
  // const form = useFormContext();

  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant={'default'} className="w-full" size={'primary'} type="button" onClick={() => setOpen((p) => !p)}>
        {loadingResult ? <LoaderCircle className="animate-spin" /> : t('confirm')}
      </Button>
      <CustomDialog isOpen={open} title="Тимчасово не працює" onOpenChange={setOpen} />
    </>
  );
});

export default SubmitButton;
