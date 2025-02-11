import { Container } from '@/components/shared/Container';
import { CarriersList } from './CarriersList';
import { Button } from '@/components/ui/button';
import { useTranslations } from "next-intl";

export default function Carriers() {
  const t = useTranslations("home");
  return (
    <section className="my-12">
      <Container size="m">
        <article>
          <ul className="items-start justify-between space-y-8 tablet:flex tablet:gap-5 laptop:gap-40">
            <li className="self-center tablet:order-2 shrink-0 tablet:w-1/2">
              <CarriersList />
            </li>
            <li className="tablet:w-1/2">
              <h3 className="mb-4 h3 laptop:h1 laptop:mb-8 text-text_prymery">{t("сarriers_title")}</h3>

              <p className="mb-4 tablet:mb-[72px] laptop:mb-[96px] body_text text-text_secondary max-w-[425px]">
                {t("сarriers_description")}
              </p>

              <div className="mt-auto">
                <Button variant={"default"} size={"secondary"} className="h6 min-w-[159px] px-6 tablet:py-[14px]">
                  {t("сarriers_button")}
                </Button>
              </div>
            </li>
          </ul>
        </article>
      </Container>
    </section>
  );
}
