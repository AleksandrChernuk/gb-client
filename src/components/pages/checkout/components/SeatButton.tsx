import React from 'react'
 
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
 import IconSeat from "../icons/IconSeat";

 type Props = {
   seat_number: string | null;
   className?: string;
   isFree?: boolean;
   available?: boolean;
   isSelected?: boolean;
   onClick: () => void;
 };

 export default function SeatButton({ seat_number, className, isSelected, isFree, available, onClick }: Props) {
   return (
     <div
       onClick={() => {
         if (available) {
           onClick();
         }
       }}
       className={cn(
         `relative cursor-pointer flex flex-col items-center dap-0.5 [&_svg]:fill-gray_2_for_body dark:[&_svg]:fill-grayy  w-[46px] h-[58px] tablet:w-[56px] tablet:h-[68px]
        ${!isFree && "[&_svg]:fill-gray_1 dark:[&_svg]:fill-black_2_for_text"}
        ${isSelected && "[&_svg]:fill-primary_2 dark:[&_svg]:fill-primary_2"}
        ${!available && "cursor-default"}`,
         className,
       )}
     >
       <IconSeat />
       <div
         className={`${
           isSelected && "text-primary_2 dark:text-primary_2"
         } -mt-10 addional_medium_text text-gray_2_for_body dark:text-grayy`}
       >
         {isFree ? seat_number : <X className={`stroke-gray_1 dark:stroke-black_2_for_text`} />}
       </div>
     </div>
   );
 }
