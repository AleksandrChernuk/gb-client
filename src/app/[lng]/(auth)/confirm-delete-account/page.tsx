import { Container } from '@/components/shared/Container';
import BackRouteButton from '@/components/shared/BackRouteButton';
import ConfirmDelete from '@/components/modules/auth/ConfirmDelete';

const ConfirmDeleteAccountPage = async () => {
  return (
    <section className="w-full">
      <Container size="xs" className="py-4 laptop:py-8">
        <div className="mb-4 laptop:mb-8">
          <BackRouteButton />
        </div>
        <ConfirmDelete />
      </Container>
    </section>
  );
};

export default ConfirmDeleteAccountPage;
