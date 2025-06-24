import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function ResultPage() {
  return (
    <main role="main" className="bg-slate-50 dark:bg-slate-900 flex-1">
      <section>
        <Container size="l">
          <div className="py-20 text-center">
            <h1 className="text-2xl mb-2">Дякуемо за купівлю</h1>
            <Button asChild variant={'secondary'} size={'secondary'}>
              <Link href={'/'} prefetch={false}>
                Home
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
