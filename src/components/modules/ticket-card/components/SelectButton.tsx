import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ComponentProps } from 'react';

type Props = {
  buttonText: string;
  loading: boolean;
  price?: number;
  variant: 'mobile' | 'desctop';
};

export default function SelectButton({
  loading,
  buttonText,
  variant,
  price,
  ...props
}: ComponentProps<'button'> & Props) {
  switch (variant) {
    case 'mobile':
      return (
        <Button
          {...props}
          variant={'default'}
          className="w-full text-amber-50  py-3 px-4 laptop:py-[14px] rounded-none rounded-b-2xl "
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={16} />
          ) : (
            <>
              {`${Math.floor(price || 0)}`}
              <span className="text-xs ml-[2px]">UAH</span>
            </>
          )}
        </Button>
      );

    case 'desctop':
      return (
        <Button
          variant={'default'}
          {...props}
          className="w-full py-3 px-4 laptop:py-[14px] laptop:px-[24px]  tablet:min-w-[205px] samll_button tablet:h5 tablet:max-h-[44px] laptop:max-h-[48px] rounded-full"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : buttonText}
        </Button>
      );

    default:
      return null;
  }
}
