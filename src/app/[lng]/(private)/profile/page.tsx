'use client';

import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Link, useRouter } from '@/i18n/routing';
import { logout } from '@/services/authService';
import { useUserStore } from '@/store/useStore';
import Image from 'next/image';

const UserProfile = () => {
  const router = useRouter();
  const userStore = useUserStore();
  const currentUser = useUserStore((state) => state.currentUser);

  if (!currentUser) {
    return (
      <Container size="m" className="w-full py-10">
        No user data found. Please login again.
      </Container>
    );
  }

  const handleLogout = async () => {
    const result = logout();

    if (!result) {
      throw new Error('Logout failed');
    }

    userStore.clearUserStore();
    router.replace('/');
  };

  return (
    <Container size="m" className="w-full">
      <div className="py-10 space-y-8">
        <ul className="flex flex-col tablet:flex-row items-center justify-between">
          <li>
            <p>userID: {currentUser.id}</p>
          </li>
          <li>
            <p>userName: {currentUser.userName}</p>
          </li>
          <li>
            <p>Email: {currentUser.email}</p>
          </li>
        </ul>

        <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden">
          {currentUser.picture ? (
            <Image src={currentUser.picture} alt="avatar" width={32} height={32} />
          ) : (
            <span className="w-8 h-8 flex items-center justify-center text-md text-white bg-gray-500">
              {currentUser.userName?.split('')[0].toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Button asChild size={'primery'} variant={'default'}>
            <Link href={'/'}>Home Page</Link>
          </Button>
          <Button onClick={() => handleLogout()} size={'primery'} variant={'default'}>
            Logout
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;
