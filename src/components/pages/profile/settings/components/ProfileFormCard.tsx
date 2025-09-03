'use client';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
  description?: string;
};

export default function ProfileFormCard({ title, description, children }: Props) {
  const t = useTranslations(MESSAGE_FILES.PROFILE);
  return (
    <ul className="rounded-2xl border bg-card text-card-foreground shadow-xs p-4 tablet:p-6 border-slate-200 dark:border-transparent">
      <li>
        <ul>
          <li>
            <p className="text-base font-bold leading-6 tracking-normal mb-2">{t(title)}</p>
          </li>
          {description && <li>{t(description)}</li>}
        </ul>
      </li>
      <li>{children}</li>
    </ul>
  );
}
