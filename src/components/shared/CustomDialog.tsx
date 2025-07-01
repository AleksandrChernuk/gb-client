import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ReactElement, ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  title: string;
  description: ReactElement;
  footer: ReactNode;
};

export default function CustomDialog({ isOpen, title, description, footer }: Props) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[512px] mx-auto px-5 rounded-2xl">
        <DialogHeader className="">
          <DialogTitle className="text-xl lg:text-2xl font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
            {title}
          </DialogTitle>
          <DialogDescription asChild className="text-sm lg:text-lg text-slate-700 dark:text-slate-400">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-wrap gap-2">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
