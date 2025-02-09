import Image from 'next/image';
import buses from '../../images/buses.png';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
 
export default function Buses() {
  const { t } = useTranslation();

  return (
    <section className='my-12'>
      <Container size='m'>
        <ul className='items-start justify-between space-y-8 tablet:flex tablet:gap-5 laptop:gap-40'>
          <li className='tablet:order-2 shrink-0'>
            <Image
              src={buses}
              placeholder='blur'
              alt='peaple wait buses'
              className='overflow-hidden rounded-3xl mx-auto w-auto h-auto tablet:w-[330px] tablet:h-[325px] laptop:w-[350px] laptop:h-[345px]'
            />
          </li>
          <li className='tablet:w-1/2'>
            <h3 className='mb-4 h3 laptop:h1 laptop:mb-8 text-text_prymery_color'>
              {t('buses_title')}
            </h3>
            <p className='mb-4 tablet:mb-[72px] laptop:mb-[96px] body_text text-text_secondary_color max-w-[425px]'>
              {t('buses_description')}
            </p>

            <Button variant={'default'} size={'secondary'}>
              {t('buses_button')}
            </Button>
          </li>
        </ul>
      </Container>
    </section>
  );
}
