import MainHeader from '@/components/modules/header/MainHeader';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col h-svh">
      <MainHeader />
      <main className="grow flex flex-col items-center justify-center">
        <section className="py-5">
          <Container size="l" className="w-full">
            <h1 className="text-[32px] font-bold tracking-normal leading-[38.4px] mb-4">NotFoundPage</h1>
            <Button asChild size={'primery'}>
              <Link href={'/'}>Go Home</Link>
            </Button>
          </Container>
        </section>
      </main>
    </div>
  );
}
