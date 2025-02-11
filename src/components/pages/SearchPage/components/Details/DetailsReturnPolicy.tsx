import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import { useTranslations } from "next-intl";

export default function DetailsReturnPolicy({ hasCardWrapp }: { hasCardWrapp?: boolean }) {
  const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute);
  const t = useTranslations("search");

  if (!сurrentRoute?.details?.return_rules_description || сurrentRoute.details.return_rules_description.length === 0) {
    return null;
  }

  return (
    <div
      className={`space-y-1 ${
        hasCardWrapp && "p-4 tablet:p-6 bg-card_bg_primery shadow-(--shadow-custom) rounded-2xl dark:bg-dark_main"
      }`}
    >
      <h5 className="h6 text-text_prymery">{t("return_policy")}:</h5>
      <ul>
        {сurrentRoute?.details?.return_rules_description.map((el) => (
          <li className="text-wrap text-text_secondary  text-[10px] mobile:small_text" key={el}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
