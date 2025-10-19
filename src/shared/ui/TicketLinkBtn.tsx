'use client';

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Button } from '@/shared/ui/button';
import { useTranslations } from 'next-intl';

type Props = {
  href: string;
  textBtn?: string;
};

const TicketLinkBtn = ({ href, textBtn = 'open_pdf_link' }: Props) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <Button asChild variant={'outline'} size={'primary'} className="text-slate-800 dark:text-slate-50">
      <a href={href} rel="noopener noreferrer" target="_blank">
        {t(textBtn)}
      </a>
    </Button>
  );
};

export default TicketLinkBtn;
