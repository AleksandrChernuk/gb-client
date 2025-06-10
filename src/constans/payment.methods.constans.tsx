import IconMoney from '@/assets/icons/IconMoney';
import IconBankCard from '@/assets/icons/IconBankCard';

export const PAYMENT_TYPES = [
  {
    ID: '1',
    VALUE: 'BOOK',
    ICON: <IconBankCard />,
    INTL_KEY: 'booking',
  },
  {
    ID: '2',
    VALUE: 'PURCHASE',
    ICON: <IconBankCard />,
    INTL_KEY: 'bank_card',
  },
  {
    ID: '3',
    VALUE: 'PAYMENT_AT_BOARDING',
    ICON: <IconMoney />,
    INTL_KEY: 'payment_upon_boarding',
  },
];
