import IconMoney from '@/assets/icons/IconMoney';
import IconBankCard from '@/assets/icons/IconBankCard';

export const PAYMENT_TYPES = [
  {
    ID: '1',
    VALUE: 'card',
    ICON: <IconBankCard />,
    INTL_KEY: 'bank_card',
  },
  {
    ID: '2',
    VALUE: 'on_boarding',
    ICON: <IconMoney />,
    INTL_KEY: 'payment_upon_boarding',
  },
];
