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

export default function CheckoutSuccess() {
  return (
    <section>
      <Container size="xs">
        <div>
          <Button variant={'link'}>
            <Link href={'/'}>Go Home</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
