import CleatLocal from '@/components/shared/CleatLocal';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export async function generateMetadata() {
  return {
    robots: {
      index: false,
      follow: false,
      nocache: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function CheckoutSuccess() {
  return (
    <main role="main" className="bg-slate-50 dark:bg-slate-900 flex-1">
      <section>
        <Container size="l">
          <div className="py-20 text-center">
            <h1 className="text-2xl mb-2">Дякуемо за купівлю</h1>
            <Button variant={'secondary'} size={'secondary'}>
              <Link href={'/'} prefetch={false}>
                Home
              </Link>
            </Button>
          </div>
        </Container>
      </section>
      <CleatLocal />
    </main>
  );
}
