'use client';

import { useUserStore } from '@/store/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

const ProfileAvatar = ({ className }: Props) => {
  const { currentUser } = useUserStore();

  return (
    <div className={cn('flex items-center justify-baseline gap-2', className)}>
      <Avatar>
        <AvatarImage src={currentUser?.picture} alt="avatar" />
        <AvatarFallback>{currentUser?.userName[0].toLocaleUpperCase()}</AvatarFallback>
      </Avatar>
      <p className="text-base text-slate-600 dark:text-slate-300">{currentUser?.userName}</p>
    </div>
  );
};

export default ProfileAvatar;
