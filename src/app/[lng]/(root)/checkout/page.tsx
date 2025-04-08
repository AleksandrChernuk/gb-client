import CheckoutPage from '@/components/pages/checkout';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    <>
      <main role="main" className="pb-16 grow bg-slate-50 dark:bg-slate-900">
        <h1 className="sr-only">CheckoutPage</h1>
        <CheckoutPage adult={adult} child={children} />
      </main>
    </>
  );
}
