import Image from 'next/image';
import getstarted from '../../images/getstarted.png';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { useTranslations } from "next-intl";

export default function GetStarted() {
  const t = useTranslations("home");
  return (
    <section className="my-12">
      <Container size="m">
        <ul className="items-start justify-between space-y-8 tablet:flex tablet:gap-5 laptop:gap-40">
          <li className="shrink-0">
            <Image
              src={getstarted}
              placeholder="blur"
              alt="people and bus"
              className="overflow-hidden rounded-3xl mx-auto w-auto h-auto tablet:w-[330px] tablet:h-[325px] laptop:w-[350px] laptop:h-[345px]"
            />
          </li>
          <li className="tablet:order-2 tablet:w-1/2">
            <h3 className="mb-4 h3 laptop:h1 laptop:mb-8 text-text_prymery_color">{t("get_started_title")}</h3>
            <p className="mb-4 tablet:mb-[72px] laptop:mb-[96px] body_text text-text_secondary_color max-w-[425px]">
              {t("get_started_description")}
            </p>
            <div className="">
              <Button variant={"default"} size={"secondary"}>
                {t("get_started_button")}
              </Button>
            </div>
          </li>
        </ul>
      </Container>
    </section>
  );
}
