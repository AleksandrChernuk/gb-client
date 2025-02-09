import { Container } from "@/components/shared/Container";
import { RoutersList } from "./RoutersList";
import { useTranslation } from 'react-i18next';

export default function PopularRouters() {
  const { t } = useTranslation();
  return (
    <section className='py-6 bg-background_card laptop:py-8 dark:bg-dark_mode_main1'>
      <Container size='m' className='tablet:px-8'>
        <h3 className='mb-4 text-white button_large_text tablet:h3 laptop:mb-8 laptop:h1'>
          {t('popular_title')}
        </h3>
        <RoutersList buttonText={t('popular_button')} />
      </Container>
    </section>
  );
};
