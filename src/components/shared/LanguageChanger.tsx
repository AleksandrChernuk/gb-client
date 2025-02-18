"use client";

 import useToggleOpen from '@/hooks/useToggleOpen';
 import { ChevronDown } from 'lucide-react';
 import { Button } from '../ui/button';
 import { supportLocalesList } from '@/constans/constans.support.locales';
  import { IconFlagEnglish } from "../icons/IconFlagEnglish";
  import { IconFlagRus } from "../icons/IconFlagRus";
  import { IconFlagUA } from "../icons/IconFlagUA";
  import { useLocale } from "next-intl";
   import { usePathname, useRouter } from "@/i18n/routing";
   import { useSearchParams } from "next/navigation";
   import { Locale } from "@/i18n/locales";

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

   export default function SelectLocale() {
     const locale = useLocale() as Locale;

     const pathname = usePathname();
     const router = useRouter();
     const params = useSearchParams();

     const { open, handleToggleOpen, handleSetOpen } = useToggleOpen();

     // const getPathWithoutLocale = () => {
     //   const regex = new RegExp(`^/(${routing.locales.join("|")})`);
     //   // Remove the locale part from the current pathname
     //   return pathname.replace(regex, "");
     // };

     if (pathname === "/checkout") {
       return null;
     }

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
                   variant={"link"}
                   className="justify-start text-text_prymery body_medium"
                   onClick={() => {
                     handleSetOpen(false);
                     router.replace(
                       // @ts-expect-error -- TypeScript will validate that only known `params`
                       // are used in combination with a given `pathname`. Since the two will
                       // always match for the current route, we can skip runtime checks.
                       { pathname, params },
                       { locale: el.value },
                     );
                   }}
                 >
                   {/* <Link
                    href={
                      searchParamsString.length > 1
                        ? getPathWithoutLocale()
                        : `${getPathWithoutLocale()}?${searchParamsString}`
                    }
                    locale={el.value}
                  >
                    
                  </Link> */}
                   <div className="w-6 h-6"> {el.icon} </div>
                   {el.shortName}
                 </Button>
               );
             })}
           </div>
         )}
       </div>
     );
   };

