import { ReactElement, ReactNode } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  toggleOpen: (value: boolean) => void;
  trigger: ReactElement;
  children: ReactNode;
  onClose?: () => void;
  title?: string;
  description?: string;
};

export const CustomDarwer = ({ open, toggleOpen, title, description, trigger, children, onClose }: Props) => {
  return (
    <Drawer direction="right" open={open} onOpenChange={toggleOpen} onClose={onClose} shouldScaleBackground={true}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="flex flex-col m-0 rounded-none">
        <DialogTitle className="hidden">{title}</DialogTitle>
        <DialogDescription className="hidden">{description}</DialogDescription>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

 