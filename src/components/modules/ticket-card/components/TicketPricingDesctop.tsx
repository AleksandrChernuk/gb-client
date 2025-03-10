'use client';

import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  price: string;
  loading?: boolean;
  handleSelect: () => void;
  disabled?: boolean;
};

export default function TicketPricingDesctop({ price, handleSelect, loading, disabled }: Props) {
  const t = useTranslations('search');
  return (
    <div className="flex-col items-center hidden gap-2 tablet:flex tablet:gap-4">
      <div className="h4 laptop:h2 text-text_prymery">
        {price}
        <span className="text-xs ml-[2px]">UAH</span>
      </div>

      <Button
        variant={'default'}
        disabled={disabled}
        onClick={() => {
          handleSelect();
        }}
        className="py-3 px-4 laptop:py-[14px] laptop:px-[24px]  tablet:min-w-[205px] samll_button tablet:h5 tablet:max-h-[44px] laptop:max-h-[48px] rounded-full"
      >
        {loading ? <LoaderCircle className="animate-spin" /> : t('selectButton')}
      </Button>
    </div>
  );
}
