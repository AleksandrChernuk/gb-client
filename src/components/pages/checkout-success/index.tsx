import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

function CheckoutSuccess() {
  return (
    <section>
      <Container size="xs">
        <div>
          <Button variant={'link'}>
            <Link passHref={false} href={'/'}>
              Go Home
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default CheckoutSuccess;
