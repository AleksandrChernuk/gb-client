'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconLoader } from '@/components/icons/IconLoader';
// import RoteDetails from '../Details/DetailsStops';
// import DetailsInfo from '../Details/DetailsInfo';
import DetailsLuggage from '../Details/DetailsLuggage';
import DetailsReturnPolicy from '../Details/DetailsReturnPolicy';
import DetailsDiscounts from '../Details/DetailsDiscounts';
// import DetailsAmenities from '../Details/DetailsAmenities';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
// import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { useSearchStore } from '@/store/useSearch';
import { setCookie } from '@/actions/cookie-actions';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type Props = {
  onClick: () => void;
};

export default function MobileDetails({ onClick }: Props) {
  const t = useTranslations('common');
  const currentLanguage = useLocale();
  // const loadingDetails = useCurrentTicketStore((state) => state.loadingDetails);
  // const selectedTicket = useCurrentTicketStore((state) => state.selectedTicket);
  const adult = useSearchStore((state) => state.adult);
  const children = useSearchStore((state) => state.children);

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={'link'}
          className="items-center justify-center p-2 text-xs font-bold underline"
          onClick={onClick}
        >
          {t('details')}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="justify-between">
          <SheetTitle className="sr-only">Edit profile</SheetTitle>
          <SheetDescription className="sr-only">
            Make changes to your profile here. Click save when youre done.
          </SheetDescription>
          <h3 className="font-medium h5 text-primary_1"> {t('details')}</h3>

          <SheetClose asChild>
            <Button variant={'default'} className="flex items-center gap-1 p-1 rounded-md h5 bg-primary_1">
              <X color="#ffffff" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="relative w-full px-5 mx-auto overflow-y-scroll grow bg-grayy dark:bg-dark_bg shadow-2xs">
          {false ? (
            <div className="flex items-center justify-center gap-1 body_medium text-text_prymery tablet:min-w-[397px] py-28">
              <IconLoader />
            </div>
          ) : (
            <div className="my-6 space-y-6">
              <div className="space-y-4 ">
                {/* <DetailsInfo />
                <RoteDetails /> */}
              </div>

              <DetailsLuggage />
              <DetailsReturnPolicy />
              {/* <DetailsAmenities /> */}
              <DetailsDiscounts />
            </div>
          )}
        </ScrollArea>

        <SheetFooter className="flex flex-row justify-between gap-2 bg-white dark:bg-dark_main ">
          <div className="mx-auto text-center">
            <div className="small_text text-gray_2_for_body dark:text-grayy">1 {t('placeholderPassenger')}</div>
            <div className="main_text_body text-black.2.for.text dark:text-gray_1">
              {/* {Math.floor(currentTicket?.ticket_pricing.base_price || 0)} <span className="text-xs ml-[2px]">UAH</span> */}
            </div>
          </div>

          <Button
            variant={'default'}
            className="w-1/2 px-5 py-3 rounded-full button_mobile"
            onClick={async () => {
              setLoading(true);
              await setCookie({
                name: '_p',
                value: JSON.stringify({ adult, children }),
              });
              router.push(`/${currentLanguage}/checkout`);
            }}
            // disabled={loadingDetails}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : t('selectButton')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
