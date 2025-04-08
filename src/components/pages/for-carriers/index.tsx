import { Container } from '@/components/shared/Container';
import Image from 'next/image';
import { CustomCard } from '@/components/shared/CustomCard';
import RequestPartnershipForm from '@/components/modules/request-partnership';
import { improveYourSalesList } from '@/constans/improve.your.sales.constans';
import BackRouteButton from '@/components/shared/BackRouteButton';
import peopleWithSuitcases from '@/public/images/people-with-suitcases-looking-straight-ahead-goin.avif';
import busDirectly from '@/public/images/bus-directly-to-the-bus-stop.avif';
import directionWith from '@/public/images/direction-with-a-road-in-the-city.avif';

export default function ForСarriersPage() {
  return (
    <main className="bg-bg_main">
      <section className="pt-8 pb-16">
        <Container size="l">
          <div className="mb-8">
            <BackRouteButton />
          </div>
          <ul className="flex flex-col gap-12 tablet:flex-row tablet:gap-24 tablet:items-center">
            <li className="w-1/2">
              <h1 className="mb-4 text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                Чому варто приєднатися до GreenBus?
              </h1>
              <p className="text-sm font-normal tracking-normal leading-[21px] laptop:text-base laptop:leading-6 text-text_muted">
                GreenBus — це інноваційна онлайн-платформа для ефективного керування пасажирськими перевезеннями, що
                дозволяє автоматизувати процеси обслуговування пасажирів і продажу автобусних квитків. З нашими
                інструментами ви зможете значно підвищити ефективність вашої роботи.
              </p>
            </li>
            <li>
              <Image
                src={busDirectly}
                width={766}
                height={318}
                alt="people-with-suitcases-looking-straight-ahead-goin"
              />
            </li>
          </ul>
        </Container>
      </section>

      <section className="bg-bg_green">
        <Container size="l" className="py-8">
          <h2 className="mb-4 text-2xl font-medium tracking-normal leading-[28.8px] laptop:text-2xl laptop:font-bold laptop:leading-[28.8px] text-slate-50 laptop:mb-8">
            4 потужні інструменти для оптимізації ваших продажів
          </h2>
          <ul className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-4 laptop:gap-14">
            {improveYourSalesList.map(({ id, title, text, icon }) => (
              <li key={id} className="flex flex-col items-start gap-2">
                <Image
                  src={icon.src}
                  width={icon.w}
                  height={icon.h}
                  alt={icon.alt}
                  className="size-14 tablet:size-16 laptop:size-[72px]"
                />
                <h3 className="text-base font-bold leading-6 tracking-normal text-green-100">{title}</h3>
                <p className="text-sm font-normal tracking-normal leading-[21px] text-slate-200">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16">
        <Container size="l">
          <ul className="flex flex-col gap-12 tablet:flex-row tablet:gap-24 tablet:items-center ">
            <li className="flex flex-col tablet:w-1/2">
              <h2 className="mb-4 text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                Чому варто обрати саме нас?
              </h2>
              <p className="text-sm font-normal tracking-normal leading-[21px] laptop:text-base laptop:leading-6 text-text_muted">
                Ми пропонуємо найсучаснішу онлайн-систему для управління пасажирськими перевезеннями. Наші потужні
                інструменти дозволяють автоматизувати продаж квитків, управляти рейсами та тарифами, а також забезпечити
                безпеку даних. Всі ці переваги надають вам можливість зосередитись на розвитку вашого бізнесу, ми
                подбаємо про інші аспекти вашої роботи.
              </p>
            </li>
            <li>
              <Image
                src={peopleWithSuitcases}
                width={766}
                height={318}
                alt="people-with-suitcases-looking-straight-ahead-goin"
              />
            </li>
          </ul>
        </Container>
      </section>

      <section>
        <Container size="l">
          <ul className="flex flex-col gap-12 tablet:flex-row tablet:gap-24 tablet:items-start">
            <li className="flex items-center justify-center order-1 text-center tablet:order-1 tablet:w-1/2">
              <Image
                alt="direction-with-a-road-in-the-city"
                src={directionWith}
                width={540}
                height={466}
                className="mx-auto overflow-hidden rounded-3xl"
              />{' '}
            </li>
            <li className="flex flex-col w-full tablet:order-2 tablet:w-1/2">
              <h2 className="mb-4 text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                Ми гарантуємо безпеку ваших даних
              </h2>
              <p className="text-sm font-normal tracking-normal leading-[21px] laptop:text-base laptop:leading-6 text-text_muted">
                Використовуємо сучасну систему подвійного шифрування даних (end-to-end), що забезпечує найвищий рівень
                безпеки. Вся ваша конфіденційна інформація — від даних клієнтів до фінансових звітів — буде повністю
                захищена. Наші сервери відповідають усім стандартам безпеки, що дозволяє уникнути витоків і зовнішніх
                загроз.
              </p>
            </li>
          </ul>
        </Container>
      </section>

      <section className="py-16">
        <Container size="xs" className="my-auto">
          <CustomCard className="shadow bg-card">
            <h2 className="mb-6 text-center text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
              Залишити запит
            </h2>
            <RequestPartnershipForm />
          </CustomCard>
        </Container>
      </section>
    </main>
  );
}
