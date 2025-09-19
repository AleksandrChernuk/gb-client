'use client';

import { useTranslations } from 'next-intl';
import { S } from '../styles/style';

export const MetaField = ({ label, value }: { label: string; value?: React.ReactNode }) => {
  const t = useTranslations();

  return (
    <div>
      <p className={S.label}>{t(label)}</p>
      <p className={S.value}>{value ?? '—'}</p>
    </div>
  );
};
