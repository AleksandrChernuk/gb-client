import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function NotFound({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = (await params) as { lng: Locale };
  const t = await getTranslations({ locale: lng, namespace: MESSAGE_FILES.COMMON });

  return (
    <html>
      <body className="flex items-center justify-center h-screen bg-slate-500/20">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md">
          <div className="flex flex-col items-center justify-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{t('error.title')}</h1>
          </div>
          <p className="text-gray-600 text-lg mb-8 text-center">{t('error.description')}</p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-200 ease-in-out hover:scale-105"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
