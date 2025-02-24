'use client'

import { IconSearchX } from "@/components/icons/IconSearchX";
import { useTranslations } from "next-intl";

export const NotFoundCity = () => {
  const t = useTranslations("common");

  return (
    <div className="flex flex-col items-center justify-center gap-1 tablet:min-w-[397px] py-4">
      <IconSearchX />
      <div className="h5 text-text_prymery">{t("notFound")}</div>
      <div className="text-center addional_regular_text text-text_secondary">{t("checkName")}</div>
    </div>
  );
};
