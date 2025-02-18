'use client';

import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import { useTranslations } from "next-intl";
import React from "react";
 
export default function DetailsLuggage({ hasCardWrapp }: { hasCardWrapp?: boolean }) {
  const t = useTranslations("search");
  const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute);

  if (!сurrentRoute?.details?.luggage_rules || сurrentRoute?.details?.luggage_rules.length === 0) {
    return null;
  }

  return (
    <div
      className={`space-y-1 ${
        hasCardWrapp && "p-4 tablet:p-6 bg-card_bg_primery shadow-(--shadow-custom) rounded-2xl dark:bg-dark_main"
      }`}
    >
      <h5 className="h6 text-text_prymery">{t("luggage")}:</h5>
      <ul className="flex flex-col gap-1">
        {сurrentRoute?.details?.luggage_rules.map((el) => (
          <li key={el} className="text-wrap text-text_secondary  text-[10px] mobile:small_text">
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
