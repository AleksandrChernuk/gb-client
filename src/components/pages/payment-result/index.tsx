import { getOrderStatusAndPdf } from '@/actions/orders.actions';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default async function ResultPage({ payment_id }: { payment_id: string }) {
  const resOrder = await getOrderStatusAndPdf(payment_id);
  const pdfBase64 = resOrder?.pdf;

  return (
    <main role="main" className="bg-slate-50 dark:bg-slate-900 flex-1">
      <section>
        <Container size="xs">
          {resOrder?.status === 'success' ? (
            <div className="py-20 text-center text-sm text-slate-700 dark:text-slate-400 space-y-4">
              <h1 className="text-2xl mb-2">Дякуемо за купівлю</h1>
              <p>{resOrder.orderNumber}</p>
              <p>{resOrder.message}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {pdfBase64 && (
                  <a href={`data:application/pdf;base64,${pdfBase64}`} download={`ticket_${resOrder.orderNumber}.pdf`}>
                    <Button variant={'outline'}>Завантажити квиток</Button>
                  </a>
                )}
                <Button asChild variant={'default'}>
                  <Link href={'/'} prefetch={false}>
                    На головну
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center">
              <h1 className="text-2xl mb-2">Сталася помилка</h1>
              <Button asChild variant={'secondary'}>
                <Link href={'/'} prefetch={false}>
                  На головну
                </Link>
              </Button>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
