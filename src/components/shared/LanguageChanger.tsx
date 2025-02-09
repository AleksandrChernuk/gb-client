"use client";

 import useToggleOpen from '@/hooks/useToggleOpen';
 import { ChevronDown } from 'lucide-react';
 import { Button } from '../ui/button';
 import { supportLocalesList } from '@/constans/constans.support.locales';
 import { usePathname, useSearchParams, useRouter } from 'next/navigation';
 import { useTranslation } from 'react-i18next';
 import { IconFlagEnglish } from '../icons/IconFlagEnglish';
 import { IconFlagRus } from '../icons/IconFlagRus';
 import { IconFlagUA } from '../icons/IconFlagUA';

 export default function SelectLocale() {
   const { i18n } = useTranslation();
   console.log(i18n.language);
   const currentLocale = i18n.language;
   const router = useRouter();
   const currentPathname = usePathname();
   const searchParams = useSearchParams();
   const { open, handleToggleOpen, handleSetOpen } = useToggleOpen();

   const dispalyIcon = (key: string) => {
     switch (key) {
       case 'uk':
         return { icon: <IconFlagUA />, name: 'Українська мова (UK)', shortName: 'Українська' };

       case 'en':
         return {
           icon: <IconFlagEnglish />,
           name: 'English language (EN)',
           shortName: 'English',
         };

       case 'ru':
         return { icon: <IconFlagRus />, name: 'Русский язык (RU)', shortName: 'Русский' };

       default:
         break;
     }
   };

   const handleChange = async (value: string) => {
     if (value === currentLocale) return;

     //  await i18n.changeLanguage(value);

     const queryString = searchParams?.toString();
     const query = queryString ? `?${queryString}` : '';

     if (currentLocale === 'uk') {
       router.push('/' + value + currentPathname + query);
     } else if (currentPathname) {
       const newPath = currentPathname.replace(`/${currentLocale}`, `/${value}`);
       router.push(newPath + query);
     }
   };

   return (
     <div
       className='relative flex items-center justify-center'
       onBlur={(e) => {
         if (!e.currentTarget.contains(e.relatedTarget)) {
           handleSetOpen(false);
         }
       }}
     >
       <Button
         className={`text-text_prymery_color gap-0.5`}
         variant={'link'}
         onClick={handleToggleOpen}
       >
         <div className='w-7 h-7'>{dispalyIcon(currentLocale)?.icon}</div>
         <ChevronDown
           size={24}
           className={`stroke-text_prymery_color ${open && 'rotate-180'} transition-all duration-300 ease-in-out`}
         />
       </Button>
       {open && (
         <ul
           className={`absolute top-10  z-50 p-4 border border-black dark:border-dark_mode_main1 dark:bg-black_2_for_text  rounded-2xl   bg-white  overflow-hidden max-h-fit min-w-fit space-y-2 `}
         >
           {supportLocalesList.map((el) => (
             <li key={el.name}>
               <Button
                 key={el.name}
                 variant={'link'}
                 className='justify-start text-text_prymery_color body_medium'
                 onClick={() => {
                   handleChange(el.value);
                   handleSetOpen(false);
                 }}
               >
                 <div className='w-6 h-6'> {el.icon} </div>
                 {el.shortName}
               </Button>
             </li>
           ))}
         </ul>
       )}
     </div>
   );
 };

