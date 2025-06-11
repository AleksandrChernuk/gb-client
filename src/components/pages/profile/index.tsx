'use client';

import { logout } from '@/actions/auth.service';
import { Button } from '@/components/ui/button';
import { Link, useRouter } from '@/i18n/routing';
import { useUserStore } from '@/store/useStore';
import Image from 'next/image';

export default function ProfilePage() {
  const router = useRouter();
  const userStore = useUserStore();
  const currentUser = useUserStore((state) => state.currentUser);

  if (!currentUser) {
    return <div>No user data found. Please login again.</div>;
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
    <div>
      <div className="py-10 space-y-8">
        <ul className=" ">
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
    </div>
  );
}
