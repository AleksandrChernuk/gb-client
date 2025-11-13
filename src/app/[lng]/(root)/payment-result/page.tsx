import { getOrderStatusAndPdf } from '@/shared/api/orders.actions';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Link } from '@/shared/i18n/routing';
import { generatePrivatePageMetadata } from '@/shared/lib/metadata';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/Container';
import ThirdFooter from '@/widgets/footer/ThirdFooter';
import { CleanOrderData } from '@/widgets/payment-result/CleanStor';
import { ErrorPayment } from '@/widgets/payment-result/ErrorPayment';
import { SuccessPayment } from '@/widgets/payment-result/SuccessPayment';
import { GoogleTagManager } from '@next/third-parties/google';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ lng: string }>;
  searchParams: Promise<{ payment_id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'success',
    path: 'payment-result',
  });
}

export default async function Success({ params, searchParams }: Props) {
  const { lng } = await params;
  const { payment_id } = await searchParams;

  setRequestLocale(lng as Locale);

  const resOrder = await getOrderStatusAndPdf(payment_id);

  if (!resOrder) {
    notFound();
  }

  const t = await getTranslations(MESSAGE_FILES.PAYMENT_RESULT_PAGE);

  const { pdf, orderLink, ticketLinks, status, message, orderNumber } = resOrder;

  const isSuccess = status !== 'error';

  return (
    <>
      <GoogleTagManager gtmId="GTM-MXK3BV2C" />
      <CleanOrderData />
      <main role="main" className="flex items-center justify-center flex-1 bg-slate-50 dark:bg-slate-900">
        <section>
          <Container size="xs" className="w-full">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xs space-y-8">
              {isSuccess && (
                <SuccessPayment
                  pdf={pdf}
                  orderLink={orderLink}
                  ticketLinks={ticketLinks}
                  orderNumber={orderNumber.padStart(9, '0')}
                />
              )}

              {!isSuccess && <ErrorPayment message={message} errorHeading="order_error" />}

              <div className="text-left">
                <Button asChild variant="link">
                  <Link href="/" prefetch={false}>
                    {t('go_home')}
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <ThirdFooter />
    </>
  );
}
