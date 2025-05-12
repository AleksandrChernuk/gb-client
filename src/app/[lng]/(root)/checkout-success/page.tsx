import { Container } from '@/components/shared/Container';

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
      <Container size="l">Blog page</Container>
    </section>
  );
}
