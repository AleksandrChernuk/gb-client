'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useState } from 'react';
import ProfileAvatar from './ProfileAvatar';

type TabItem = { slug: string; title: string };

type Props = {
  items: TabItem[];
  namespace: string;
};

const ProfileMobileNav = ({ namespace, items }: Props) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const t = useTranslations(namespace);

  return (
    <div className="tablet:hidden">
      <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={'primary'} aria-label={t('my_account')}>
            {t('my_account')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start">
          <DropdownMenuLabel asChild>
            <ProfileAvatar />
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-green-300" />
          {items.map((item) => (
            <DropdownMenuItem key={item.slug}>
              <Link prefetch={false} href={item.slug} onClick={() => setIsOpenMenu(false)}>
                {t(item.title)}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileMobileNav;
