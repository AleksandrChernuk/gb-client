'use client';

import { Button } from '@/shared/ui/button';
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useState } from 'react';
import ProfileAvatar from '@/entities/profile/ProfileAvatar';
import { Link } from '@/shared/i18n/routing';

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
          <Button variant="secondary" size={'primary'} aria-label={t('my_account')} className="text-slate-700 ">
            {t('my_account')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="bg-white dark:bg-slate-700">
          <DropdownMenuLabel asChild>
            <ProfileAvatar />
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-green-300" />
          {items.map((item) => (
            <DropdownMenuItem key={item.slug}>
              <Link href={item.slug} onClick={() => setIsOpenMenu(false)} className="text-base">
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
