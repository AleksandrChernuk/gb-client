import { AccountActionsList } from '@/constans/constans.account-actions-list';
import { CircleAlert, CircleCheck } from 'lucide-react';
import { useTranslations } from "next-intl";
import Link from "next/link";
  
export default function AccountActions() {
    const t = useTranslations("common");
    return (
      <div>
        <h5 className="mb-4 h5 text-gray_2_for_body dark:text-gray_0">{t("authYouCan")}</h5>

        <ul className="flex flex-col gap-2 mb-6 tablet:gap-4 text-black_2_for_text dark:text-gray_1 secondary_text tablet:main_text_body">
          {AccountActionsList.map((el) => (
            <li key={el.id} className="flex flex-row items-center gap-2 ">
              <CircleCheck className="w-4 h-4 tablet:w-6 tablet:h-6 stroke-primary" />
              <p>{t(el.text)}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-row items-center gap-2">
          <CircleAlert className="w-4 h-4 stroke-gray_2_for_body" />

          <p className="small_text text-text_secondary">
            {t("auth_terms_of_the")}{" "}
            <Link href={"/"} replace aria-label="go home page" className="text-primary">
              {t("auth_public_offer")}
            </Link>
            , {t("auth_and")}{" "}
            <Link href={"/"} className="text-primary">
              {t("auth_returns_policy")}
            </Link>
          </p>
        </div>
      </div>
    );
}
