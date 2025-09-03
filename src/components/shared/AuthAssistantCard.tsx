'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  headerLabel: string;
  descriptiontext?: string;
  descriptionClassName?: string;
  headerLabelClassName?: string;
}

export default function AuthAssistantCard({
  children,
  headerLabel,
  descriptiontext,
  descriptionClassName,
  headerLabelClassName,
}: Props) {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={cn(
            'text-center p-0 space-y-0 text-lg font-bold leading-6 tracking-normal tablet:text-2xl tablet:leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px]laptop:mb-8 text-slate-700 dark:text-slate-50',
            headerLabelClassName,
          )}
        >
          {t(headerLabel)}
        </CardTitle>
        {descriptiontext && (
          <CardDescription
            className={cn(
              'mt-2 text-xs font-normal tracking-normal leading-[18px] text-[#6f8b90] tablet:text-base tablet:leading-6',
              descriptionClassName,
            )}
          >
            {t(descriptiontext)}
          </CardDescription>
        )}{' '}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
