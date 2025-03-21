import SecondFooter from '@/components/modules/footer/SecondFooter';
import CheckoutPage from '@/components/pages/checkout';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Checkout() {
  const cookieStore = await cookies();
  const _p = cookieStore.get('_p');

  if (!_p) {
    redirect('/');
  }

  const { adult, children } = JSON.parse(_p.value);

  return (
    <>
      <main role="main" className="pb-16 grow bg-grayy dark:bg-dark_bg">
        <h1 className="sr-only">CheckoutPage</h1>
        <CheckoutPage adult={adult} child={children} />
      </main>
      <SecondFooter className="bg-grayy dark:bg-dark_bg" />
    </>
  );
}
