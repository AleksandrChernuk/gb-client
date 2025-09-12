'use client';

import { FileDown } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/config/message.file.constans';

type Props = {
  pdf: string;
  orderNumber: string;
};

const base64ToBlob = (base64: string, contentType = 'application/pdf') => {
  const byteCharacters = atob(base64.split(',')[1] || base64);
  const byteNumbers = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  return new Blob([byteNumbers], { type: contentType });
};

const LoadingPdfBtn = ({ pdf, orderNumber }: Props) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <Button asChild variant={'outline'} size={'primary'}>
      <a
        href={!pdf.startsWith('data:') ? pdf : URL.createObjectURL(typeof pdf === 'string' ? base64ToBlob(pdf) : pdf)}
        download={`${t('order')}-${orderNumber}.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
        onClick={() => {
          if (typeof pdf !== 'string') {
            setTimeout(() => URL.revokeObjectURL(pdf), 100);
          }
        }}
      >
        <FileDown className="dark:stroke-green-100 stroke-green-300 size-5" />
        {t('download_pdf')}
      </a>
    </Button>
  );
};

export default LoadingPdfBtn;
