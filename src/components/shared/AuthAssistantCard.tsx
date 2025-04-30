import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { getTranslations } from 'next-intl/server';

interface Props {
  children: ReactNode;
  headerLabel: string;
}

export default async function AuthAssistantCard({ children, headerLabel }: Props) {
  const t = await getTranslations('common');

  return (
    <Card>
      <CardHeader>
        <CardTitle className='className=" text-center p-0 space-y-0 text-base font-bold leading-6 tracking-normal  tablet:text-2xl tablet:leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px]laptop:mb-8 text-slate-700 dark:text-slate-50'>
          {t(headerLabel)}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
