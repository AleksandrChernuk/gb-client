import { Container } from '@/components/shared/Container';

export default function MainPage() {
  return (
    <section>
      <h1 className='sr-only'>CheckoutPage</h1>
      <Container size='l'>
        <div className='items-start justify-between py-6 laptop:py-14 tablet:flex gap-9 laptop:gap-12'>
          <div></div>
        </div>
      </Container>
    </section>
  );
}
