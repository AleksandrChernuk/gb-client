'use client';

import { FileDown } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useCallback, useMemo } from 'react';

type Props = {
  pdf: string;
  orderNumber: string;
};

const base64ToBlob = (base64: string, contentType = 'application/pdf'): Blob => {
  try {
    // Убираем префикс data:application/pdf;base64, если есть
    const cleanBase64 = base64.includes(',') ? base64.split(',')[1] : base64;

    // Проверяем валидность base64
    if (!cleanBase64 || cleanBase64.length === 0) {
      throw new Error('Empty base64 string');
    }

    const byteCharacters = atob(cleanBase64);
    const byteNumbers = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    return new Blob([byteNumbers], { type: contentType });
  } catch (error) {
    console.error('Error converting base64 to blob:', error);
    throw new Error('Invalid PDF data');
  }
};

const LoadingPdfBtn = ({ pdf, orderNumber }: Props) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  // Мемоизируем создание blob URL чтобы избежать пересоздания
  const downloadUrl = useMemo(() => {
    if (!pdf) return null;

    try {
      // Если это уже готовый URL
      if (pdf.startsWith('http://') || pdf.startsWith('https://')) {
        return pdf;
      }

      // Если это base64 данные
      if (pdf.startsWith('data:') || pdf.length > 100) {
        const blob = base64ToBlob(pdf);
        return URL.createObjectURL(blob);
      }

      return null;
    } catch (error) {
      console.error('Error creating download URL:', error);
      return null;
    }
  }, [pdf]);

  const handleDownload = useCallback(
    (e: React.MouseEvent) => {
      if (!downloadUrl) {
        e.preventDefault();
        alert('PDF недоступен для скачивания');
        return;
      }

      // Очищаем blob URL после небольшой задержки
      if (downloadUrl.startsWith('blob:')) {
        setTimeout(() => {
          URL.revokeObjectURL(downloadUrl);
        }, 1000);
      }
    },
    [downloadUrl],
  );

  // Если нет PDF данных
  if (!pdf || !downloadUrl) {
    return (
      <Button variant={'outline'} size={'primary'} disabled className="text-slate-400">
        <FileDown className="stroke-slate-400 size-5" />
        PDF недоступен
      </Button>
    );
  }

  return (
    <Button asChild variant={'outline'} size={'primary'} className="text-slate-800 dark:text-slate-50">
      <a
        href={downloadUrl}
        download={`${t('order')}-${orderNumber}.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
        onClick={handleDownload}
      >
        <FileDown className="dark:stroke-green-100 stroke-green-300 size-5" />
        {t('download_pdf')}
      </a>
    </Button>
  );
};

export default LoadingPdfBtn;
