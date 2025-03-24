import { Container } from '@/components/shared/Container';
import Image from 'next/image';
import irectionWith from '@/public/images/direction-with-a-road-in-the-city.avif';
import world from '@/public/images/world.avif';
import business from '@/public/images/business.avif';
import group from '@/public/images/group.avif';
import { aboutUsStatistics } from '@/constans/about.us.statistics';
import { CustomCard } from '@/components/shared/CustomCard';
import RequestPartnershipForm from '@/components/modules/request-partnership';
import BackRouteButton from '@/components/shared/BackRouteButton';

export default function AboutPage() {
  return (
    <main className="bg-grayy dark:bg-dark_bg">
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
                className="overflow-hidden rounded-3xl mx-auto"
              />
            </li>
            <li className="tablet:w-1/2">
              <h1 className="mb-4 h3 laptop:h1 laptop:mb-8 text-text_prymery">GreenBus in Ukraine</h1>
              <p className="mb-4 body_text text-text_secondary">
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
              <h2 className="mb-4 h3 laptop:h1 laptop:mb-8 text-text_prymery">
                Professional solutions for your business growth
              </h2>
              <p className="mb-4 body_text text-text_secondary">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
                exerci tation ullamcorper
              </p>
            </li>
            <li className="mx-auto">
              <Image alt="group" src={group} width={540} height={466} className="overflow-hidden rounded-3xl mx-auto" />
            </li>
          </ul>
        </Container>
      </section>

      <section className="pb-16 ">
        <Container size="l">
          <ul className="flex items-start justify-between gap-1 tablet:gap-8">
            {aboutUsStatistics.map(({ id, title, text }) => (
              <li key={id} className="space-y-2 laptop:space-y-4">
                <h3 className="h5 laptop:h1 text-primary_1">{title}</h3>
                <p className="small_text tablet:addional text-text_secondary">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-background_card">
        <Container size="l" className="py-6 tablet:py-12 ">
          <h2 className="h3 laptop:h1 text-grayy mb-4 tablet:mb-8">About Us</h2>

          <p className="small_text tablet:main_text_body text-gray_1">
            In 2019, we launched bus ticket sales on our platforms, and in 2020, we united the strongest market players
            - solution providers for bus stations and bus carriers - under the GreenBus to support and strengthen each
            of them By joining forces, we have assembled a unique product suite of online ticketing services that can be
            deservedly called the industry standard in the field of passenger transportation automation. Passenger
            transportation automation is a new business for GreenBus in Ukraine based on market-proven solutions. We
            believe that the principles of our work, based on the ideas of transparency and equal access, along with the
            development of a high-quality software product, will be the key to strong partnerships.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container size="l">
          <ul className="items-start justify-between space-y-8 tablet:flex tablet:gap-5 laptop:gap-40">
            <li className="tablet:w-1/2">
              <h2 className="mb-4 h3 laptop:h1 laptop:mb-8 text-text_prymery">GreenBus in Ukraine</h2>
              <p className="mb-4 body_text text-text_secondary">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
                exerci tation ullamcorper
              </p>
            </li>
            <li className="mx-auto">
              <Image alt="world" src={world} width={540} height={466} className="overflow-hidden rounded-3xl mx-auto" />
            </li>
          </ul>
        </Container>
      </section>

      <section className="bg-background_card">
        <Container size="l" className="py-6 tablet:py-12 ">
          <ul className="items-start justify-between space-y-8 tablet:flex tablet:gap-5 laptop:gap-40">
            <li className="mx-auto">
              <Image
                alt="group"
                src={business}
                width={540}
                height={466}
                className="overflow-hidden rounded-3xl mx-auto"
              />
            </li>
            <li className="tablet:w-1/2">
              <h2 className="h3 laptop:h1 text-grayy mb-4 tablet:mb-8">GreenBus in the Ukrainian bus market</h2>

              <p className="small_text tablet:main_text_body text-gray_1">
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
          <CustomCard className="bg-card shadow">
            <h3 className="h3 laptop:h1 text-text_prymery text-center mb-6">Залишити запит</h3>
            <RequestPartnershipForm />
          </CustomCard>
        </Container>
      </section>
    </main>
  );
}
