import MainFooter from '@/components/modules/footer/MainFooter';
import FaqSeach from '@/components/pages/FaqPage/modules/FaqSeach';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';

export default function FaqLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main role="main" className="pt-16 pb-20 grow bg-grayy dark:bg-dark_bg ">
        <Container size="l">
          <div className="mb-4">
            <BackRouteButton />
          </div>
          <h1 className="text-center h5 tablet:h3 laptop:h1 text-text_prymery">Questions and answers</h1>
          <FaqSeach />
        </Container>

        {children}
      </main>
      <MainFooter className="bg-white dark:bg-dark_main" />
    </>
  );
}
