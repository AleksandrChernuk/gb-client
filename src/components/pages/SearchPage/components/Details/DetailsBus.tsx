'use client';
import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import { useTranslations } from "next-intl";
import React from "react";
 
export default function DetailsBus({ hasCardWrapp }: { hasCardWrapp?: boolean }) {
  const сurrentRoute = useCurrentRouteStore((state) => state.сurrentRoute);
  const t = useTranslations("search");

  if (!сurrentRoute?.details?.bus_name) {
    return null;
  }

  return (
    <div
      className={`space-y-1 ${
        hasCardWrapp && "p-4 tablet:p-6 bg-card_bg_primery shadow-(--shadow-custom) rounded-2xl"
      }`}
    >
      <h5 className="h6 text-text_prymery">{t("bus")}:</h5>
      <div className="flex flex-row flex-wrap gap-0.5">
        <p className="text-wrap text-text_secondary text-[10px] mobile:small_text">{сurrentRoute?.details?.bus_name}</p>
      </div>
    </div>
  );
}
