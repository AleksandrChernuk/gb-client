import Link from "next/link";
import { QuestionsMobileList } from "./QuestionsMobileList";
import { QuestionsLaptopList } from "./QuestionsLaptopList";
import { QuestionsTabletList } from "./QuestionsTabletList";
 import { Container } from '@/components/shared/Container';
 import { Button } from '@/components/ui/button';
import { useTranslations } from "next-intl";

export default function Questions() {
  const t = useTranslations("home");

  return (
    <section className="py-6 bg-background_card laptop:py-8 dark:bg-dark_mode_main1">
      <Container size="m">
        <h3 className="mb-4 text-white h3 laptop:h1 laptop:mb-8 dark:text-garyy">{t("questions_title")}</h3>

        <QuestionsMobileList />
        <QuestionsTabletList />
        <QuestionsLaptopList />

        <div className="text-left">
          <Link href={"/faq"}>
            <Button variant={"secondary"} size={"secondary"}>
              {t("questions_button")}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
