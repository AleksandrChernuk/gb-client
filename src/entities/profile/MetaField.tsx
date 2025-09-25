'use client';

import { cn } from '@/shared/lib/utils';
import { S } from '@/styles/style';
import { useTranslations } from 'next-intl';

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
