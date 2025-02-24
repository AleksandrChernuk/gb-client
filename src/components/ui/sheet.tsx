"use client";

 import * as SheetPrimitive from "@radix-ui/react-dialog";

 import { cn } from "@/lib/utils";
 import { ComponentProps } from "react";

 function Sheet({ ...props }: ComponentProps<typeof SheetPrimitive.Root>) {
   return <SheetPrimitive.Root data-slot="sheet" {...props} />;
 }

 function SheetTrigger({ ...props }: ComponentProps<typeof SheetPrimitive.Trigger>) {
   return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
 }

 function SheetClose({ ...props }: ComponentProps<typeof SheetPrimitive.Close>) {
   return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
 }

 function SheetPortal({ ...props }: ComponentProps<typeof SheetPrimitive.Portal>) {
   return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
 }

 function SheetOverlay({ className, ...props }: ComponentProps<typeof SheetPrimitive.Overlay>) {
   return (
     <SheetPrimitive.Overlay
       data-slot='sheet-overlay'
       className={cn(
         ' data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
         className
       )}
       {...props}
     />
   )
 }

 function SheetContent({
   className,
   children,
   side = 'right',
   ...props
 }: ComponentProps<typeof SheetPrimitive.Content> & {
   side?: 'top' | 'right' | 'bottom' | 'left'
 }) {
   return (
     <SheetPortal>
       <SheetOverlay />
       <SheetPrimitive.Content
         data-slot='sheet-content'
         className={cn(
           'bg-grayy dark:bg-dark_bg data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
           side === 'right' &&
             'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-full md:max-w-[425px] ',
           side === 'left' &&
             'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
           side === 'top' &&
             'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
           side === 'bottom' &&
             'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
           className
         )}
         {...props}
       >
         {children}
       </SheetPrimitive.Content>
     </SheetPortal>
   )
 }

 function SheetHeader({ className, ...props }: ComponentProps<"div">) {
   return (
     <div
       data-slot="sheet-header"
       className={cn(
         " flex items-center justify-start gap-1.5 px-5 py-6 border-b-[1px] bg-white  border-b-gray_1 dark:border-b-black_2_for_text dark:bg-dark_main",
         className,
       )}
       {...props}
     />
   );
 }

 function SheetFooter({ className, ...props }: ComponentProps<"div">) {
   return <div data-slot="sheet-footer" className={cn("mt-auto px-5 py-6", className)} {...props} />;
 }

 function SheetTitle({ className, ...props }: ComponentProps<typeof SheetPrimitive.Title>) {
   return (
     <SheetPrimitive.Title
       data-slot="sheet-title"
       className={cn("text-foreground font-semibold tracking-tight", className)}
       {...props}
     />
   );
 }

 function SheetDescription({ className, ...props }: ComponentProps<typeof SheetPrimitive.Description>) {
   return (
     <SheetPrimitive.Description
       data-slot="sheet-description"
       className={cn("text-muted-foreground text-sm", className)}
       {...props}
     />
   );
 }

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription };
