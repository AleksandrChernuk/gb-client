import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import PassengersMobile from './PassengersMobile';
import PassengersDesktop from './PassengersDesktop';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';

type Props = {
  variant: 'mobile' | 'desktop';
};

export default function PassengersCount({ variant }: Props) {
  const [params, actions] = useRouterSearch();

  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleIncrement = () => {
    actions.setPassenger(params.voyagers + 1);
  };

  const handleDecrement = () => {
    actions.setPassenger(params.voyagers - 1);
  };

  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  }, []);

  const t = useTranslations(MESSAGE_FILES.COMMON);

  const passCount = params.voyagers;
  const value =
    passCount === 1
      ? `${passCount} ${t('placeholderPassenger')}`
      : passCount > 4
        ? `${passCount} ${t('placeholderPassengersGenitive')}`
        : `${passCount} ${t('placeholderPassengers')}`;

  const sharedProps = {
    v: params.voyagers,
    open,
    value,
    setOpen,
    handleOpenChange,
    handleIncrement,
    handleDecrement,
    handleBlur,
    t,
    passCount,
  };

  return variant === 'mobile' ? <PassengersMobile {...sharedProps} /> : <PassengersDesktop {...sharedProps} />;
}
