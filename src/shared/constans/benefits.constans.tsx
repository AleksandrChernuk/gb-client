import { IconDestinations } from '@/assets/icons/IconDestinations';
import { IconSecure } from '@/assets/icons/IconSecure';
import { IconTicketFefunds } from '@/assets/icons/IconTicketFefunds';
import { IconWithoutCash } from '@/assets/icons/IconWithoutCash';

export const benefits = [
  {
    id: '1',
    icon: <IconWithoutCash />,
    title: 'payment_title',
    text: 'payment_description',
  },
  {
    id: '2',
    icon: <IconDestinations />,
    title: 'destinations_title',
    text: 'destinations_description',
  },
  {
    id: '3',
    icon: <IconSecure />,
    title: 'secure_title',
    text: 'secure_description',
  },
  {
    id: '4',
    icon: <IconTicketFefunds />,
    title: 'refunds_title',
    text: 'refunds_description',
  },
];
