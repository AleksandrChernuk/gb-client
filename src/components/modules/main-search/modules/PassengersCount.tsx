import { useShallow } from 'zustand/react/shallow';
import { useSearchStore } from '@/store/useSearch';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useCallback, useState } from 'react';
import PassengersMobile from '../components/PassengersMobile';
import PassengersDesktop from '../components/PassengersDesktop';

type Props = {
  variant: 'mobile' | 'desktop';
};

export default function PassengersCount({ variant }: Props) {
  const adult = useSearchStore(useShallow((state) => state.adult));
  const children = useSearchStore(useShallow((state) => state.children));
  const setPassenger = useSearchStore((state) => state.setPassenger);

  const [a, setA] = useState(() => adult);
  const [c, setC] = useState(() => children);

  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setPassenger('adult', a);
      setPassenger('children', c);
    }
  };

  const handleIncrement = ({ type }: { type: 'adult' | 'children' }) => {
    switch (type) {
      case 'adult':
        return setA((p) => p + 1);

      case 'children':
        return setC((p) => p + 1);

      default:
        return;
    }
  };

  const handleDecrement = ({ type }: { type: 'adult' | 'children' }) => {
    switch (type) {
      case 'adult':
        return setA((p) => p - 1);

      case 'children':
        return setC((p) => p - 1);

      default:
        return;
    }
  };

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setOpen(false);
        setPassenger('adult', a);
        setPassenger('children', c);
      }
    },
    [a, c, setPassenger],
  );

  const t = useTranslations(MESSAGE_FILES.COMMON);

  const passCount = a + c;
  const value =
    passCount === 1
      ? `${passCount} ${t('placeholderPassenger')}`
      : passCount > 4
        ? `${passCount} ${t('placeholderPassengersGenitive')}`
        : `${passCount} ${t('placeholderPassengers')}`;

  const sharedProps = {
    a,
    c,
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
