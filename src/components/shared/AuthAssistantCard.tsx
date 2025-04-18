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
        <CardTitle>{headerLabel}</CardTitle>
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
