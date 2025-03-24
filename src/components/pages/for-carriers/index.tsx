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
          <ul className="flex flex-col tablet:flex-row gap-12 tablet:gap-24   tablet:items-center">
            <li className="w-1/2">
              <h1 className="mb-4 h3 laptop:h1 text-text_prymery">Чому варто приєднатися до GreenBus?</h1>
              <p className="secondary_text laptop:main_text_body text-text_muted">
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
          <h2 className="h4 laptop:h3 text-grayy mb-4 laptop:mb-8">
            4 потужні інструменти для оптимізації ваших продажів
          </h2>
          <ul className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-4 laptop:gap-14">
            {improveYourSalesList.map(({ id, title, text, icon }) => (
              <li key={id} className="flex flex-col items-start gap-2">
                <Image
                  src={icon.src}
                  width={icon.w}
                  height={icon.h}
                  alt={icon.alt}
                  className="size-14 tablet:size-16 laptop:size-[72px]"
                />
                <h3 className="h5 text-primary_2">{title}</h3>
                <p className="secondary_text text-gray_1">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16">
        <Container size="l">
          <ul className="flex flex-col tablet:flex-row gap-12 tablet:gap-24   tablet:items-center ">
            <li className="flex flex-col tablet:w-1/2">
              <h2 className="mb-4 h3 laptop:h1 text-text_prymery">Чому варто обрати саме нас?</h2>
              <p className="secondary_text laptop:main_text_body text-text_muted">
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
          <ul className="flex flex-col tablet:flex-row gap-12 tablet:gap-24 tablet:items-start">
            <li className="flex items-center justify-center order-1 text-center tablet:order-1 tablet:w-1/2">
              <Image
                alt="direction-with-a-road-in-the-city"
                src={directionWith}
                width={540}
                height={466}
                className="overflow-hidden rounded-3xl mx-auto"
              />{' '}
            </li>
            <li className="flex flex-col w-full  tablet:order-2 tablet:w-1/2">
              <h2 className="mb-4 h3 laptop:h1 text-text_prymery">Ми гарантуємо безпеку ваших даних</h2>
              <p className="secondary_text laptop:main_text_body text-text_muted">
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
          <CustomCard className="bg-card shadow">
            <h2 className="h3 laptop:h1 text-text_prymery text-center mb-6">Залишити запит</h2>
            <RequestPartnershipForm />
          </CustomCard>
        </Container>
      </section>
    </main>
  );
}
