'use client';

import { Button } from '@/shared/ui/button';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
// import { Dialog, DialogContent } from '@/shared/ui/dialog';
// import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
// import {  useState } from 'react';

const SubmitButton = memo(function SubmitButton() {
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const loadingResult = useNewOrderResult((state) => state.loadingResult);
  const form = useFormContext();

  // const [open, setOpen] = useState(false);

  const isLoading = useMemo(
    () => loadingResult || form.formState.isSubmitting,
    [loadingResult, form.formState.isSubmitting],
  );

  return (
    <>
      <Button
        variant="default"
        size="primary"
        type="submit"
        className="w-full"
        // onClick={() => setOpen((p) => !p)}
        disabled={isLoading}
      >
        {isLoading ? <LoaderCircle className="animate-spin" /> : t('confirm')}
      </Button>
      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-center">
          <DialogTitle className="font-bold">{t('service_unavailable_title')}</DialogTitle>
          <DialogDescription className="dark:text-slate-200">{t('service_unavailable_desc')}</DialogDescription>
        </DialogContent>
      </Dialog> */}
    </>
  );
});

export default SubmitButton;
