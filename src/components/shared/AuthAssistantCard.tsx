import { ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

interface Props {
  children: ReactNode;
  headerLabel: string;
  buttonHref?: string;
  buttonLabel?: string;
}

export default async function AuthAssistantCard({ children, headerLabel, buttonHref, buttonLabel }: Props) {
  const t = await getTranslations('common');

  return (
    <Card>
      <CardHeader>
        <CardTitle className='className="p-0 space-y-0 text-base font-bold leading-6 tracking-normal text-left tablet:text-2xl tablet:leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px]laptop:mb-8 text-slate-700 dark:text-slate-50'>
          {headerLabel}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {buttonHref && buttonLabel && (
        <CardFooter>
          <Button asChild variant={'link'}>
            <Link href={buttonHref}>{t(buttonLabel)}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
