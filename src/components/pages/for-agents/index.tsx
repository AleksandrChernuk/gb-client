import RequestPartnershipForm from '@/components/modules/request-partnership';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { CustomCard } from '@/components/shared/CustomCard';
import { joinUsAgents } from '@/constans/join.us.agents.constans';
import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import busDirectly from '@/public/images/bus-directly-to-the-bus-stop.avif';
import directionWith from '@/public/images/direction-with-a-road-in-the-city.avif';

export default function ForAgentsPage() {
  return (
    <main className="bg-bg_main">
      <section className="pt-8 pb-16">
        <Container size="l">
          <div className="mb-8">
            <BackRouteButton />
          </div>

          <ul className="flex flex-col tablet:flex-row gap-12 tablet:gap-24   tablet:items-center">
            <li>
              <Image
                src={busDirectly}
                width={766}
                height={318}
                alt="people-with-suitcases-looking-straight-ahead-goin"
              />
            </li>
            <li className="tablet:w-1/2">
              <h1 className="mb-4 h3 laptop:h1 text-text_prymery">
                GreenBus – автоматизуй продаж квитків та керуй перевезеннями!
              </h1>
              <p className="secondary_text laptop:main_text_body text-text_muted">
                На этой странице вы найдете всю необходимую информацию, инструменты и ресурсы для успешной работы. Мы
                приглашаем к сотрудничеству агентства, занимающиеся продажей билетов на международные пассажирские
                перевозки, а также компании, работающие в сфере трудоустройства в Европе.
              </p>
            </li>
          </ul>
        </Container>
      </section>

      <section className="bg-bg_green">
        <Container size="l" className="py-8">
          <h2 className="h4 laptop:h3 text-grayy mb-4 laptop:mb-8">Чому варто приєднатися до нас?</h2>
          <ul className="grid justify-between grid-cols-1 gap-4 tablet:gap-6 laptop:grid-cols-3 laptop:gap-20">
            {joinUsAgents.map(({ title, text, icon }) => (
              <li key={title} className="flex flex-col items-start gap-2">
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

      <section className="bg-bg_main pt-16">
        <Container size="l">
          <ul className="flex flex-col tablet:flex-row gap-12 tablet:gap-24 tablet:items-start">
            <li className="tablet:w-1/2">
              <h2 className="mb-4 h3 laptop:h1 text-text_prymery">Можливості GreenBus</h2>
              <p className="secondary_text laptop:main_text_body text-text_muted">
                GreenBus пропонує широкі можливості для партнерів: ефективна система продажу квитків, доступ до мережі
                перевізників та стабільний дохід. Ми підтримуємо наших партнерів на кожному етапі, надаючи всі необхідні
                інструменти для успіху в бізнесі.
              </p>
            </li>
            <li>
              <Image
                alt="direction-with-a-road-in-the-city"
                src={directionWith}
                width={766}
                height={318}
                className="overflow-hidden rounded-3xl mx-auto"
              />
            </li>
          </ul>
        </Container>
      </section>

      <section className="py-16">
        <Container size="xs" className="my-auto">
          <CustomCard className="bg-card shadow">
            <h3 className="h3 laptop:h1 text-text_prymery text-center mb-6">Залишити запит</h3>
            <RequestPartnershipForm />
          </CustomCard>
        </Container>
      </section>
    </main>
  );
}
