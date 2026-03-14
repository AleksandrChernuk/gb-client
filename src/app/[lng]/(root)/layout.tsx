import { ReactNode } from 'react';
import MainHeader from '@/widgets/header/MainHeader';

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen supports-[min-height:100dvh]:min-h-dvh">
      <MainHeader />
      {children}
    </div>
  );
}
