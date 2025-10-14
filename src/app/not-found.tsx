'use client';

import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/Container';
import CustomCard from '@/shared/ui/CustomCard';
import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="bg-slate-50 dark:bg-slate-900 flex flex-col h-screen supports-[min-height:100dvh]:min-h-dvh">
          <main className="flex-1 flex items-center justify-center">
            <section>
              <Container size="s">
                <CustomCard className="space-y-4">
                  <h1 style={{ fontSize: '64px', margin: 0, color: '#111827' }}>404</h1>
                  <p style={{ fontSize: '18px', color: '#6b7280', marginTop: '10px' }}>Page not found</p>
                  <Button asChild variant={'default'} className="w-full">
                    <Link href={'/'}>Home</Link>
                  </Button>
                </CustomCard>
              </Container>
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}
