import { BorderBeam } from '@/shared/ui/border-beam';
import { Button } from '@/shared/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ComponentProps } from 'react';

type Props = {
  buttonText: string;
  loading: boolean;
  price?: number;
  variant: 'mobile' | 'desktop' | 'details';
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
          size={'primary'}
          className="relative w-full text-amber-50 py-3 px-4 rounded-none rounded-b-2xl slashed-zero"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" stroke="white" />
          ) : (
            <>
              {price}
              <span className="text-xs ml-[2px]">UAH</span>
            </>
          )}{' '}
          {!props.disabled && (
            <BorderBeam duration={8} size={50} className="from-transparent via-green-100 to-transparent" />
          )}
        </Button>
      );

    case 'desktop':
      return (
        <Button
          {...props}
          size={'primary'}
          className="relative w-full py-3 px-4 laptop:py-[14px] laptop:px-[24px]  tablet:min-w-[205px] text-[12px] font-bold tracking-normal leading-[18px] tablet:text-base tablet:leading-6 tablet:max-h-[44px] laptop:max-h-[48px] rounded-full [&_svg]:shrink-0"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : buttonText}{' '}
          {!props.disabled && (
            <BorderBeam duration={8} size={50} className="from-transparent via-green-100 to-transparent" />
          )}{' '}
        </Button>
      );

    case 'details':
      return (
        <Button {...props} variant={'default'} size={'primary'} className="relative">
          {loading ? <LoaderCircle className="animate-spin" /> : buttonText}{' '}
          {!props.disabled && (
            <BorderBeam duration={8} size={50} className="from-transparent via-green-100 to-transparent" />
          )}{' '}
        </Button>
      );

    default:
      return null;
  }
}
