import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

function CheckoutSuccess() {
  return (
    <main role="main" className="bg-slate-50 dark:bg-slate-900">
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
    </main>
  );
}

export default CheckoutSuccess;
