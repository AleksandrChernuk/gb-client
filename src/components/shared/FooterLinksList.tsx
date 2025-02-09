import { cn } from "@/lib/utils";
import Link from "next/link";
import { JSX } from "react";

 type Props = {
   className?: string;
   navLinks: {
     title: string;
     href: string;
     icon?: JSX.Element;
   }[];
 };

 export default function FooterLinksList({ navLinks, className }: Props) {
   return (
     <ul className={cn('flex flex-col gap-1 tablet:gap-2', className)}>
       {navLinks.map(({ title, href, icon }) =>
         icon ? (
           <li key={href}>
             <Link href={href} className='block p-1 rounded-full bg-primary_2'>
               {icon}
             </Link>
           </li>
         ) : (
           <li key={href}>
             <Link
               href={href}
               className='block secondary_text tablet:main_text_body text-text_secondary_color'
             >
               {title}
             </Link>
           </li>
         )
       )}
     </ul>
   );
 }
