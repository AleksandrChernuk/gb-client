// import ThirdFooter from '@/components/modules/footer/ThirdFooter';
// import AuthHeader from '@/components/modules/header/AuthHeader';

// export default async function AuthLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex flex-col h-screen">
//       <AuthHeader />
//       {children}
//       <ThirdFooter />
//     </div>
//   );
// }

import { Noto_Sans, Mulish } from 'next/font/google';

import '@/styles/global.css';

import Provider from '@/providers/Provider';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/locales';
import { Params } from '@/types/common.types';
import AuthHeader from '@/components/modules/header/AuthHeader';
import ThirdFooter from '@/components/modules/footer/ThirdFooter';

const noto_sans = Noto_Sans({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const mulish = Mulish({
  variable: '--font-mulish',
  subsets: ['latin'],
  weight: '800',
  display: 'swap',
});

export default async function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { lng } = await params;

  if (!routing.locales.includes(lng as Locale)) {
    return notFound();
  }
  const messages = await getMessages();
  setRequestLocale(lng);

  return (
    <html lang={lng} suppressHydrationWarning>
      <body className={`${noto_sans.variable} ${mulish.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Provider>
            <div className="flex flex-col h-screen">
              <AuthHeader />
              {children}
              <ThirdFooter />
            </div>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
