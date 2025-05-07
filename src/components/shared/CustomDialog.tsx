import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  footer: ReactNode;
};

export default function CustomDialog({ isOpen, title, description, footer }: Props) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-wrap gap-2">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
