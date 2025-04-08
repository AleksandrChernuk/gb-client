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
    <main className="bg-">
      <section className="pt-8 pb-16">
        <Container size="l">
          <div className="mb-8">
            <BackRouteButton />
          </div>

          <ul className="flex flex-col gap-12 tablet:flex-row tablet:gap-24 tablet:items-center">
            <li>
              <Image
                src={busDirectly}
                width={766}
                height={318}
                alt="people-with-suitcases-looking-straight-ahead-goin"
              />
            </li>
            <li className="tablet:w-1/2">
              <h1 className="mb-4 text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                GreenBus – автоматизуй продаж квитків та керуй перевезеннями!
              </h1>
              <p className="text-sm leading-[21px] laptop:text-base font-normal laptop:leading-6 tracking-normal text-slate-400 dark:text-slate-200">
                На этой странице вы найдете всю необходимую информацию, инструменты и ресурсы для успешной работы. Мы
                приглашаем к сотрудничеству агентства, занимающиеся продажей билетов на международные пассажирские
                перевозки, а также компании, работающие в сфере трудоустройства в Европе.
              </p>
            </li>
          </ul>
        </Container>
      </section>

      <section className="bg-green-500">
        <Container size="l" className="py-8">
          <h2 className="mb-4 text-2xl font-medium tracking-normal leading-[28.8px] laptop:text-2xl laptop:font-bold laptop:leading-[28.8px] text-slate-50 laptop:mb-8">
            Чому варто приєднатися до нас?
          </h2>
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
                <h3 className="text-base font-bold leading-6 tracking-normal text-green-100">{title}</h3>
                <p className="text-sm font-normal tracking-normal leading-[21px] text-slate-200">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pt-16 bg-slate-50 dark:bg-slate-900">
        <Container size="l">
          <ul className="flex flex-col gap-12 tablet:flex-row tablet:gap-24 tablet:items-start">
            <li className="tablet:w-1/2">
              <h2 className="mb-4 text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                Можливості GreenBus
              </h2>
              <p className="text-sm font-normal tracking-normal leading-[21px] laptop:text-base laptop:leading-6 text-slate-400 dark:text-slate-200">
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
                className="mx-auto overflow-hidden rounded-3xl"
              />
            </li>
          </ul>
        </Container>
      </section>

      <section className="py-16">
        <Container size="xs" className="my-auto">
          <CustomCard className="shadow-xs">
            <h3 className="mb-6 text-center text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
              Залишити запит
            </h3>
            <RequestPartnershipForm />
          </CustomCard>
        </Container>
      </section>
    </main>
  );
}
