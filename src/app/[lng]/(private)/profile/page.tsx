'use client';

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
    <div className="flex flex-col gap-y-2">
      <p>userID: {currentUser.id}</p>
      <p>userName: {currentUser.userName}</p>
      <p>Email: {currentUser.email}</p>
      <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden">
        {currentUser.picture ? (
          <Image src={currentUser.picture} alt="avatar" width={32} height={32} />
        ) : (
          <span className="w-8 h-8 flex items-center justify-center text-md text-white bg-gray-500">
            {currentUser.userName?.split('')[0].toUpperCase()}
          </span>
        )}
      </div>
      <Link href={'/'} className="max-w-50 mt-5 border-2 bg-gray-600 rounded-md py-2 px-8 text-center">
        Home Page
      </Link>

      <Button onClick={() => handleLogout()} className="max-w-50 mt-5">
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;
