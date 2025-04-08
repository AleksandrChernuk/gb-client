import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CheckoutForm from './_modules/CheckoutForm';

export default async function Checkout({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  const cookieStore = await cookies();
  const _p = cookieStore.get('_p');

  if (!_p) {
    redirect('/');
  }

  const { adult, children } = JSON.parse(_p.value);

  return (
    <main role="main" className="pb-16 grow bg-slate-50 dark:bg-slate-900">
      <section>
        <h1 className="sr-only">CheckoutPage</h1>
        <Container size="l" className="tablet:max-w-[960px] laptop:max-w-[1368px]">
          <div className="my-4 laptop:my-8">
            <BackRouteButton />
          </div>
          <CheckoutForm adult={adult} child={children} />
        </Container>
      </section>
    </main>
  );
}
