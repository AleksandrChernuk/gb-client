export const dynamic = 'force-dynamic';
export const revalidate = 0;

import AuthHeader from '@/widgets/header/AuthHeader';
import ThirdFooter from '@/widgets/footer/ThirdFooter';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from 'next-intl';
import { Params } from '@/shared/types/common.types';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePrivatePageMetadata } from '@/shared/lib/metadata';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'auth',
    path: '/auth',
  });
}

export default async function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return (
    <div className="flex flex-col h-dvh">
      <AuthHeader />

      <main role="main" className="flex items-center justify-center grow bg-slate-50 dark:bg-slate-900">
        {children}
      </main>

      <ThirdFooter />
    </div>
  );
}
