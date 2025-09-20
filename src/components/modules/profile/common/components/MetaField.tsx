'use client';

import { useTranslations } from 'next-intl';
import { S } from '../styles/style';
import { cn } from '@/lib/utils';

type Props = {
  label?: string;
  value?: React.ReactNode;
  classNamesLabel?: string;
  classNamesValue?: string;
  classNamesBlock?: string;
};

export const MetaField = ({ label, value, classNamesLabel, classNamesValue, classNamesBlock }: Props) => {
  const t = useTranslations();

  return (
    <div className={cn('', classNamesBlock)}>
      {!!label && <p className={cn(S.label, classNamesLabel)}>{t(label)}</p>}
      <p className={cn(S.value, classNamesValue)}>{value ?? '—'}</p>
    </div>
  );
};
