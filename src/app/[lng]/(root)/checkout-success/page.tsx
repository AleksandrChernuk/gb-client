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

export default function CheckoutSuccessPage() {
  return (
    <section>
      <Container size="l" className="py-20">
        <Button asChild variant={'default'} size={'default'}>
          <Link href={'/'} prefetch={false}>
            Home
          </Link>
        </Button>
      </Container>
    </section>
  );
}
