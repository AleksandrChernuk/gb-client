import { Noto_Sans, Mulish } from "next/font/google";

import "@/styles/globals.css";
import Provider from "@/providers/Provider";
import { NextIntlClientProvider } from "next-intl";
import { Params } from "@/types/common.types";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { Locale } from "@/i18n/locales";

const noto_sans = Noto_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: "800",
  display: "swap",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { lng } = await params;

  if (!routing.locales.includes(lng as Locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={lng} suppressHydrationWarning>
      <body className={`${noto_sans.variable} ${mulish.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Provider>{children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
