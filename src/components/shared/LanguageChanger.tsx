"use client";

 import useToggleOpen from '@/hooks/useToggleOpen';
 import { ChevronDown } from 'lucide-react';
 import { Button } from '../ui/button';
 import { supportLocalesList } from '@/constans/constans.support.locales';
  import { IconFlagEnglish } from "../icons/IconFlagEnglish";
  import { IconFlagRus } from "../icons/IconFlagRus";
  import { IconFlagUA } from "../icons/IconFlagUA";
  import { useLocale } from "next-intl";
  import { Link, routing, usePathname } from "@/i18n/routing";
  import { useSearchParams } from "next/navigation";
  import { Locale } from "@/i18n/locales";

  export default function SelectLocale() {
    const locale = useLocale() as Locale;
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const { open, handleToggleOpen, handleSetOpen } = useToggleOpen();

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

    const getPathWithoutLocale = () => {
      const regex = new RegExp(`^/(${routing.locales.join("|")})`);
      // Remove the locale part from the current pathname
      return pathname.replace(regex, "");
    };
    const searchParamsString = searchParams.toString();

    return (
      <div
        className="relative flex items-center justify-center"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            handleSetOpen(false);
          }
        }}
      >
        <Button className={`text-text_prymery gap-0.5`} variant={"link"} onClick={handleToggleOpen}>
          <div className="w-7 h-7">{dispalyIcon(locale)?.icon}</div>
          <ChevronDown
            size={24}
            className={`stroke-text_prymery ${open && "rotate-180"} transition-all duration-300 ease-in-out`}
          />
        </Button>
        {open && (
          <div
            className={`absolute top-10  z-50 p-4 border border-black dark:border-dark_main dark:bg-black_2_for_text  rounded-2xl   bg-white  overflow-hidden max-h-fit min-w-fit space-y-2 `}
          >
            {supportLocalesList.map((el) => {
              return (
                <Button
                  key={el.value}
                  asChild
                  variant={"link"}
                  className="justify-start text-text_prymery body_medium"
                  onClick={() => {
                    handleSetOpen(false);
                  }}
                >
                  <Link replace href={`${getPathWithoutLocale()}?${searchParamsString}`} locale={el.value}>
                    <div className="w-6 h-6"> {el.icon} </div>
                    {el.shortName}
                  </Link>
                </Button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

