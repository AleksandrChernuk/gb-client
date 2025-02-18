import { Container } from "@/components/shared/Container";
import { benefits } from "@/constans/constans.benefits";
import BenefitsItem from "./BenefitsItem";
import { getTranslations } from "next-intl/server";
 
export default async function Benefits() {
  const t = await getTranslations("benefits");

  return (
    <section className="mt-7">
      <Container size="l">
        <div className="m-8"></div>
        <h2 className="hidden"></h2>
        <ul className="grid grid-cols-1 grid-rows-4 tablet:grid-cols-[repeat(2,minmax(auto,1fr))] tablet:grid-rows-2 laptop:grid-cols-[repeat(4,minmax(auto,auto))] laptop:grid-rows-1 gap-2 tablet:gap-8 laptop:gap-[117px]">
          {benefits &&
            benefits.map((el) => <BenefitsItem key={el.id} icon={el.icon} title={t(el.title)} text={t(el.text)} />)}
        </ul>
      </Container>
    </section>
  );
}
