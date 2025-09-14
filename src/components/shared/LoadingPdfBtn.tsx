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
    const cleanBase64 = base64.includes(',') ? base64.split(',')[1] : base64;

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

// Проверка на iOS Chrome
const isIOSChrome = () => {
  const userAgent = navigator.userAgent;
  return /iPhone|iPad|iPod/.test(userAgent) && /CriOS/.test(userAgent);
};

const LoadingPdfBtn = ({ pdf, orderNumber }: Props) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const downloadUrl = useMemo(() => {
    if (!pdf) return null;

    try {
      if (pdf.startsWith('http://') || pdf.startsWith('https://')) {
        return pdf;
      }

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

      // Специальная обработка для iOS Chrome
      if (isIOSChrome()) {
        e.preventDefault();

        try {
          const blob = base64ToBlob(pdf);
          const fileName = `${t('order')}-${orderNumber}.pdf`;

          // Используем современный File System Access API если доступен
          if ('showSaveFilePicker' in window) {
            (async () => {
              try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const fileHandle = await (window as any).showSaveFilePicker({
                  suggestedName: fileName,
                  types: [
                    {
                      description: 'PDF files',
                      accept: {
                        'application/pdf': ['.pdf'],
                      },
                    },
                  ],
                });
                const writable = await fileHandle.createWritable();
                await writable.write(blob);
                await writable.close();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
              } catch (err) {
                console.log('Save picker cancelled or failed');
              }
            })();
          } else {
            // Fallback: создаем временную ссылку и кликаем по ней
            const tempLink = document.createElement('a');
            tempLink.href = downloadUrl;
            tempLink.download = fileName;
            tempLink.style.display = 'none';

            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);

            // Очищаем URL через небольшую задержку
            setTimeout(() => {
              if (downloadUrl.startsWith('blob:')) {
                URL.revokeObjectURL(downloadUrl);
              }
            }, 100);
          }
        } catch (error) {
          console.error('Download failed:', error);
          alert('Ошибка при скачивании файла');
        }

        return;
      }

      // Для всех остальных браузеров - обычное поведение
      if (downloadUrl.startsWith('blob:')) {
        setTimeout(() => {
          URL.revokeObjectURL(downloadUrl);
        }, 1000);
      }
    },
    [downloadUrl, pdf, orderNumber, t],
  );

  if (!pdf || !downloadUrl) {
    return (
      <Button variant={'outline'} size={'primary'} disabled className="text-slate-400">
        <FileDown className="stroke-slate-400 size-5" />
        PDF недоступен
      </Button>
    );
  }

  return (
    <Button asChild={!isIOSChrome()} variant={'outline'} size={'primary'} className="text-slate-800 dark:text-slate-50">
      {isIOSChrome() ? (
        // Для iOS Chrome - обычная кнопка с обработчиком
        <button type="button" className="flex items-center gap-2" onClick={handleDownload}>
          <FileDown className="dark:stroke-green-100 stroke-green-300 size-5" />
          {t('download_pdf')}
        </button>
      ) : (
        // Для всех остальных - обычная ссылка
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
      )}
    </Button>
  );
};

export default LoadingPdfBtn;
