'use client';

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Button } from '@/shared/ui/button';
import { useTranslations } from 'next-intl';

type Props = {
  setActiveForm: () => void;
};

const DeleteProfileAction = ({ setActiveForm }: Props) => {
  const t = useTranslations(MESSAGE_FILES.FORM);

  return (
    <div>
      <Button size={'primary'} className="w-full bg-red-800 hover:bg-red-900" onClick={setActiveForm}>
        {t('delete_account')}
      </Button>
    </div>
  );
};

export default DeleteProfileAction;
