import { getOrderStatusAndPdf } from '@/actions/orders.actions';
import ThirdFooter from '@/components/modules/footer/ThirdFooter';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { CleanOrderData } from './modules/CleanStor';
import { FileText } from 'lucide-react';
import { RefreshButton } from './modules/RefreshButton';
import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

export default async function PaymentResultPage({ payment_id }: { payment_id: string }) {
  const resOrder = await getOrderStatusAndPdf(payment_id);
  const t = await getTranslations(MESSAGE_FILES.PAYMENT_RESULT_PAGE);

  const pdfBase64 = resOrder?.pdf;

  return (
    <div className="flex flex-col h-svh">
      <CleanOrderData />

      <main role="main" className="grow flex flex-col items-center justify-center">
        <section className="py-5">
          <Container size="xs" className="w-full">
            <div className="space-y-6">
              <h1>
                {resOrder?.status === 'success'
                  ? t.rich('order_success', {
                      orderNumber: resOrder?.orderNumber,
                      number: (chunks) => <span className="text-green-300">{chunks}</span>,
                    })
                  : resOrder?.message === 'Payment is pending'
                    ? t('order_pending')
                    : t('order_error')}
              </h1>

              {resOrder?.status === 'success' && (
                <h3 className="text-center text-slate-700 dark:text-slate-50">
                  {resOrder?.message === 'Payment is pending' ? t('ticket_will_appear') : t('tickets_sent')}
                </h3>
              )}

              <div
                className={`grid grid-cols-1 gap-4 ${
                  resOrder?.status === 'success' || resOrder?.message === 'Payment is pending' ? 'md:grid-cols-2' : ''
                }`}
              >
                {resOrder?.status === 'success' && (
                  <div>
                    {pdfBase64 && (
                      <Button asChild variant={'outline'} size={'primery'}>
                        <a
                          href={`data:application/pdf;base64,${pdfBase64}`}
                          download={`${t('ticket_filename')}_${resOrder.orderNumber}.pdf`}
                          rel="noopener noreferrer"
                        >
                          {t('download_ticket')} <FileText />
                        </a>
                      </Button>
                    )}
                  </div>
                )}

                {resOrder?.message === 'Payment is pending' && (
                  <div>
                    <RefreshButton />
                  </div>
                )}
                <div>
                  <Button asChild variant={'secondary'} size={'primery'} className="text-black">
                    <Link href={'/'} prefetch={false}>
                      {t('go_home')}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <ThirdFooter />
    </div>
  );
}
