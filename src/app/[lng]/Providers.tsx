'use client';

import { ThemeProvider } from '@/shared/providers/ThemeProvider';
import ReactQueryContext from '@/shared/providers/ReactQueryProvider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ReactNode } from 'react';
import ClientOnlyProviders from '@/shared/ClientOnlyProviders';

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <NuqsAdapter>
      <ReactQueryContext>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <ClientOnlyProviders />
        </ThemeProvider>
      </ReactQueryContext>
    </NuqsAdapter>
  );
}
