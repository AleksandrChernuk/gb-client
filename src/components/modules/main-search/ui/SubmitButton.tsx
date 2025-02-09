"use client";

import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from "next-intl";

type Props = {
  handleSubmit: () => void;
  disabled?: boolean;
};

export const SubmitButton = ({ handleSubmit, disabled }: Props) => {
  const t = useTranslations("common");

  return (
    <Button variant={"main"} size={"mainSearch"} disabled={disabled} onClick={handleSubmit}>
      {disabled ? <LoaderCircle className="animate-spin" /> : t("searchBtn")}
    </Button>
  );
};
