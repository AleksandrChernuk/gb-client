import MainFooter from '@/widgets/footer/MainFooter';
import { Params } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import FaqHero from '@/views/faq-page/FaqHero';

type Props = {
  params: Promise<{ lng: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };

  return await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'faq',
    path: 'faq',
  });
}

export default async function FaqLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  return (
    <>
      <main role="main" className="pb-20 pt-4 grow bg-slate-50 dark:bg-slate-900 ">
        <FaqHero />

        {children}
      </main>
      <MainFooter className="bg-white dark:bg-slate-800" />
    </>
  );
}
