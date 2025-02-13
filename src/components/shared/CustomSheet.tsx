import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  open: boolean;
  toggleOpen: (value: boolean) => void;
  trigger: ReactNode;
  children: ReactNode;
  title?: string;
  description?: string;
};

export default function CustomSheet({ open, toggleOpen, trigger, children }: Props) {
  return (
    <Sheet open={open} onOpenChange={toggleOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="sr-only">Edit profile</SheetTitle>
          <SheetDescription className="sr-only">
            Make changes to your profile here. Click save when youre done.
          </SheetDescription>
          <SheetClose asChild>
            <Button type="button" variant={"link"} className="gap-0.2 text-text_prymery h5">
              <ChevronLeft size={24} />
              Back
            </Button>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="relative px-5 overflow-y-scroll grow bg-grayy dark:bg-dark_bg">
          <div className="sticky top-0 left-0 right-0 h-12 ">{children}</div>
        </ScrollArea>

        <SheetFooter>
          <div>seats</div>
          <SheetClose asChild>
            <Button type="button" variant={"default"}>
              Confirm
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
