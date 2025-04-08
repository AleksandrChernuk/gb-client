import ThirdFooter from '@/components/modules/footer/ThirdFooter';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import irectionWith from '@/public/images/direction-with-a-road-in-the-city.avif';
import world from '@/public/images/world.avif';
import business from '@/public/images/business.avif';
import group from '@/public/images/group.avif';
import { aboutUsStatistics } from '@/constans/about.us.statistics';
import { CustomCard } from '@/components/shared/CustomCard';
import RequestPartnershipForm from '@/components/modules/request-partnership';

export default async function About({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);

  return (
    <>
      <main className="bg-slate-50 dark:bg-slate-900">
        <section className="pt-8">
          <Container size="l">
            <div className="mb-8">
              <BackRouteButton />
            </div>
            <ul className="items-start justify-between space-y-8 tablet:flex tablet:gap-5 laptop:gap-40">
              <li className="mx-auto">
                <Image
                  alt="direction-with-a-road-in-the-city"
                  src={irectionWith}
                  width={540}
                  height={466}
                  className="mx-auto overflow-hidden rounded-3xl"
                />
              </li>
              <li className="tablet:w-1/2">
                <h1 className="mb-4 text-2xl font-bold tracking-normal leading-[28.8px] laptop:h1 laptop:mb-8 text-slate-700 dark:text-slate-50">
                  GreenBus in Ukraine
                </h1>
                <p className="mb-4 body_text text-slate-400 dark:text-slate-200">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                  ullamcorper Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                  tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
                  exerci tation ullamcorper
                </p>
              </li>
            </ul>
          </Container>
        </section>

        <section className="py-16">
          <Container size="l">
            <ul className="items-start justify-between space-y-8 tablet:flex tablet:gap-5 laptop:gap-40">
              <li className="tablet:w-1/2">
                <h2 className="mb-4 text-2xl font-bold tracking-normal leading-[28.8px] laptop:h1 laptop:mb-8 text-slate-700 dark:text-slate-50">
                  Professional solutions for your business growth
                </h2>
                <p className="mb-4 body_text text-slate-400 dark:text-slate-200">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                  ullamcorper Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                  tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
                  exerci tation ullamcorper
                </p>
              </li>
              <li className="mx-auto">
                <Image
                  alt="group"
                  src={group}
                  width={540}
                  height={466}
                  className="mx-auto overflow-hidden rounded-3xl"
                />
              </li>
            </ul>
          </Container>
        </section>

        <section className="pb-16 ">
          <Container size="l">
            <ul className="flex items-start justify-between gap-1 tablet:gap-8">
              {aboutUsStatistics.map(({ id, title, text }) => (
                <li key={id} className="space-y-2 laptop:space-y-4">
                  <h3 className="text-base font-bold leading-6 tracking-normal text-green-300 laptop:h1">{title}</h3>
                  <p className="text-xs font-normal tracking-normal leading-[18px] tablet:text-lg tablet:leading-[27px] text-slate-400 dark:text-slate-200">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="bg-green-500">
          <Container size="l" className="py-6 tablet:py-12 ">
            <h2 className="mb-4 text-2xl font-bold tracking-normal leading-[28.8px] laptop:h1 text-slate-50 tablet:mb-8">
              About Us
            </h2>

            <p className="text-xs font-normal tracking-normal leading-[18px] tablet:text-base tablet:leading-6 text-slate-200">
              In 2019, we launched bus ticket sales on our platforms, and in 2020, we united the strongest market
              players - solution providers for bus stations and bus carriers - under the GreenBus to support and
              strengthen each of them By joining forces, we have assembled a unique product suite of online ticketing
              services that can be deservedly called the industry standard in the field of passenger transportation
              automation. Passenger transportation automation is a new business for GreenBus in Ukraine based on
              market-proven solutions. We believe that the principles of our work, based on the ideas of transparency
              and equal access, along with the development of a high-quality software product, will be the key to strong
              partnerships.
            </p>
          </Container>
        </section>

        <section className="py-16">
          <Container size="l">
            <ul className="items-start justify-between space-y-8 tablet:flex tablet:gap-5 laptop:gap-40">
              <li className="tablet:w-1/2">
                <h2 className="mb-4 text-2xl font-bold tracking-normal leading-[28.8px] laptop:h1 laptop:mb-8 text-slate-700 dark:text-slate-50">
                  GreenBus in Ukraine
                </h2>
                <p className="mb-4 body_text text-slate-400 dark:text-slate-200">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                  ullamcorper Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                  tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
                  exerci tation ullamcorper
                </p>
              </li>
              <li className="mx-auto">
                <Image
                  alt="world"
                  src={world}
                  width={540}
                  height={466}
                  className="mx-auto overflow-hidden rounded-3xl"
                />
              </li>
            </ul>
          </Container>
        </section>

        <section className="bg-green-500">
          <Container size="l" className="py-6 tablet:py-12 ">
            <ul className="items-start justify-between space-y-8 tablet:flex tablet:gap-5 laptop:gap-40">
              <li className="mx-auto">
                <Image
                  alt="group"
                  src={business}
                  width={540}
                  height={466}
                  className="mx-auto overflow-hidden rounded-3xl"
                />
              </li>
              <li className="tablet:w-1/2">
                <h2 className="mb-4 text-2xl font-bold tracking-normal leading-[28.8px] laptop:h1 text-slate-50 tablet:mb-8">
                  GreenBus in the Ukrainian bus market
                </h2>

                <p className="text-xs font-normal tracking-normal leading-[18px] tablet:text-base tablet:leading-6 text-slate-200">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                  ullamcorper Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                  tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
                  exerci tation ullamcorper
                </p>
              </li>
            </ul>
          </Container>
        </section>
        <section className="py-16">
          <Container size="xs" className="my-auto">
            <CustomCard className="shadow-xs bg-slate-900 dark:bg-white">
              <h3 className="mb-6 text-center text-2xl font-bold tracking-normal leading-[28.8px] laptop:h1 text-slate-700 dark:text-slate-50">
                Залишити запит
              </h3>
              <RequestPartnershipForm />
            </CustomCard>
          </Container>
        </section>
      </main>
      <ThirdFooter />
    </>
  );
}
