import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ReactNode } from 'react';
import { ScrollArea } from '../ui/scroll-area';

type Props = {
  open: boolean;
  toggleOpen: (value: boolean) => void;
  trigger: ReactNode;
  footer: ReactNode;
  header: ReactNode;
  children: ReactNode;
  title?: string;
  description?: string;
};

export default function CustomSheet({ open, toggleOpen, trigger, children, header, footer }: Props) {
  return (
    <Sheet open={open} onOpenChange={toggleOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        {header}
        <ScrollArea className="relative px-5 mx-auto overflow-y-scroll grow bg-slate-50 dark:bg-slate-900 shadow-2xs ">
          <div className=" sticky top-0 left-0 right-0 h-12">{children}</div>
        </ScrollArea>

        {footer}
      </SheetContent>
    </Sheet>
  );
}
