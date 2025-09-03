'use client';

import { logout } from '@/actions/auth.service';
import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useUserStore } from '@/store/useUser';
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function LogOutBtn() {
  const t = useTranslations(MESSAGE_FILES.PROFILE);
  const router = useRouter();
  const userStore = useUserStore();

  const handleLogout = async () => {
    const result = logout();

    if (!result) {
      throw new Error('Logout failed');
    }
    userStore.clearUserStore();
    router.replace('/');
  };

  return (
    <div>
      <Button onClick={handleLogout} variant={'link'}>
        <LogOut />
        {t('logout')}
      </Button>
    </div>
  );
}
