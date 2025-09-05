'use client';

import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useTranslations } from 'next-intl';

type Props = {
  setActiveForm: () => void;
};

const DeleteProfileAction = ({ setActiveForm }: Props) => {
  const t = useTranslations(MESSAGE_FILES.FORM);

  return (
    <div>
      <Button className="w-full bg-red-800 hover:bg-red-900" onClick={setActiveForm}>
        {t('delete_account')}
      </Button>
    </div>
  );
};

export default DeleteProfileAction;
