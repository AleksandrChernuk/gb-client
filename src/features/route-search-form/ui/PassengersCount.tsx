import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import PassengersMobile from './PassengersMobile';
import PassengersDesktop from './PassengersDesktop';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { PassengerType, useRouterSearch } from '@/shared/hooks/useRouterSearch';

type Props = {
  variant: 'mobile' | 'desktop';
};

export default function PassengersCount({ variant }: Props) {
  const [params, actions] = useRouterSearch();

  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleIncrement = (type: PassengerType) => {
    actions.setPassenger(type, params[type] + 1);
  };

  const handleDecrement = (type: PassengerType) => {
    actions.setPassenger(type, params[type] - 1);
  };

  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  }, []);

  const t = useTranslations(MESSAGE_FILES.COMMON);

  const passCount = params.adult + params.children;
  const value =
    passCount === 1
      ? `${passCount} ${t('placeholderPassenger')}`
      : passCount > 4
        ? `${passCount} ${t('placeholderPassengersGenitive')}`
        : `${passCount} ${t('placeholderPassengers')}`;

  const sharedProps = {
    a: params.adult,
    c: params.children,
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
