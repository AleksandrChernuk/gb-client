'use client';

import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { MESSAGE_FILES } from '@/config/message.file.constans';

type Props = {
  href: string;
};

const TicketLinkBtn = ({ href }: Props) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <Button asChild variant={'outline'} size={'primary'} className="text-slate-800 dark:text-slate-50">
      <a href={href} target="_blank" rel="noopener noreferrer">
        {t('open_pdf_link')}
      </a>
    </Button>
  );
};

export default TicketLinkBtn;
