import { BorderBeam } from '@/shared/ui/border-beam';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { ComponentProps } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/shared/ui/button';

type ButtonVariants = VariantProps<typeof buttonVariants>;

type Props = {
  buttonText: string;
  loading: boolean;
  price?: number;
  currency?: string;
  variant: 'mobile' | 'desktop' | 'details';
};

const variantMap: Record<Props['variant'], { variant: ButtonVariants['variant']; size: ButtonVariants['size'] }> = {
  mobile: { variant: 'select', size: 'select_mobile' },
  desktop: { variant: 'select', size: 'select_desktop' },
  details: { variant: 'select', size: 'primary' },
};

export default function SelectButton({
  loading,
  buttonText,
  variant,
  price,
  currency,
  className,
  disabled,
  ...props
}: ComponentProps<'button'> & Props) {
  const { variant: btnVariant, size } = variantMap[variant];

  return (
    <Button {...props} disabled={disabled} variant={btnVariant} size={size} className={cn('relative', className)}>
      {loading ? (
        <LoaderCircle className="animate-spin" />
      ) : variant === 'mobile' ? (
        <>
          {buttonText}
          <span className="font-bold">
            {price}
            <span className="text-xs ml-0.5">{currency}</span>
          </span>
        </>
      ) : (
        buttonText
      )}
      {!disabled && <BorderBeam duration={8} size={50} className="from-transparent via-green-100 to-transparent" />}
    </Button>
  );
}
