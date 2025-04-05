// import { Noto_Sans, Mulish } from 'next/font/google';

import '@/styles/global.css';

import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/locales';
import { Params } from '@/types/common.types';
import { ThemeProvider } from 'next-themes';
import ReactQueryContext from '@/providers/ReactQueryProvider';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';
import { fontVariables } from '@/lib/fonts';
import { ActiveThemeProvider } from '@/providers/active-theme';

export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Params;
}>) {
  const { lng } = await params;

  if (!routing.locales.includes(lng as Locale)) {
    return notFound();
  }
  setRequestLocale(lng as Locale);
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('active_theme')?.value;
  const isScaled = activeThemeValue?.endsWith('-scaled');

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={lng as Locale}>
      <html lang={lng} suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', 'dark')
                }
              } catch (_) {}
            `,
            }}
          />
        </head>
        <body
          className={cn(
            'bg-background overscroll-none font-sans antialiased',
            activeThemeValue ? `theme-${activeThemeValue}` : '',
            isScaled ? 'theme-scaled' : '',
            fontVariables,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <ActiveThemeProvider initialTheme={activeThemeValue}>
              <ReactQueryContext>{children}</ReactQueryContext>
            </ActiveThemeProvider>
          </ThemeProvider>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
