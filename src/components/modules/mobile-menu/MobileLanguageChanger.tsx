'use client';

import { IconFlagEnglish } from '@/components/icons/IconFlagEnglish';
import { IconFlagRus } from '@/components/icons/IconFlagRus';
import { IconFlagUA } from '@/components/icons/IconFlagUA';
import { Button } from '@/components/ui/button';
import { supportLocalesList } from '@/constans/constans.support.locales';
import useToggleOpen from '@/hooks/useToggleOpen';
import { ChevronDown } from "lucide-react";
 import { useLocale } from "next-intl";
 import { Locale } from "@/i18n/locales";
 import { Link, routing, usePathname } from "@/i18n/routing";

export default function MobileLanguageChanger() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const dispalyIcon = (key: string) => {
    switch (key) {
      case "uk":
        return { icon: <IconFlagUA />, name: "Українська мова (UK)", shortName: "Українська" };

      case "en":
        return {
          icon: <IconFlagEnglish />,
          name: "English language (EN)",
          shortName: "English",
        };

      case "ru":
        return { icon: <IconFlagRus />, name: "Русский язык (RU)", shortName: "Русский" };

      default:
        break;
    }
  };
  const { open, handleToggleOpen } = useToggleOpen();

  const getPathWithoutLocale = () => {
    const regex = new RegExp(`^/(${routing.locales.join("|")})`);
    return pathname.replace(regex, "");
  };


  if (pathname === "/checkout") {
    return null;
  }


  return (
    <div>
      text_prymery
      <Button className={`  w-full text-text_prymery justify-between`} variant={"link"} onClick={handleToggleOpen}>
        <div className="flex items-center gap-2 body_medium">
          <div className="w-6 h-6">{dispalyIcon(locale)?.icon}</div>
          {dispalyIcon(locale)?.name}
        </div>
        <ChevronDown className={`stroke-primary ${open && "rotate-180"} transition-all duration-300 ease-in-out`} />
      </Button>
      <ul
        className={`transition-all duration-300 ease-in-out overflow-hidden ml-2 space-y-2 ${
          open ? "max-h-96  pt-2 opacity-100" : "max-h-0 pt-0 opacity-100"
        } flex flex-col gap-2 `}
      >
        {supportLocalesList.map((el) => (
          <Button asChild key={el.name} variant={"link"} className="justify-start text-text_prymery body_medium">
            <Link href={`/${locale}${getPathWithoutLocale()}`} locale={locale}>
              <div className="w-6 h-6"> {el.icon} </div>
              {el.shortName}
            </Link>
          </Button>
        ))}
      </ul>
    </div>
  );
}
