'use client';

import { FileDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

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
  if (typeof navigator === 'undefined') return false;
  const userAgent = navigator.userAgent;
  return /iPhone|iPad|iPod/.test(userAgent) && /CriOS/.test(userAgent);
};

const LoadingPdfBtn = ({ pdf, orderNumber }: Props) => {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // 🔥 Генерация blob URL только на клиенте
  useEffect(() => {
    if (!pdf) {
      setDownloadUrl(null);
      return;
    }

    try {
      if (pdf.startsWith('http://') || pdf.startsWith('https://')) {
        setDownloadUrl(pdf);
      } else if (pdf.startsWith('data:') || pdf.length > 100) {
        const blob = base64ToBlob(pdf);
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);

        return () => URL.revokeObjectURL(url);
      } else {
        setDownloadUrl(null);
      }
    } catch (error) {
      console.error('Error creating download URL:', error);
      setDownloadUrl(null);
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
            const tempLink = document.createElement('a');
            tempLink.href = downloadUrl;
            tempLink.download = fileName;
            tempLink.style.display = 'none';

            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);

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
        PDF ...
      </Button>
    );
  }

  return (
    <Button asChild={!isIOSChrome()} variant={'outline'} size={'primary'} className="text-slate-800 dark:text-slate-50">
      {isIOSChrome() ? (
        <button type="button" className="flex items-center gap-2" onClick={handleDownload}>
          <FileDown className="dark:stroke-green-100 stroke-green-300 size-5" />
          {t('download_pdf')}
        </button>
      ) : (
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
