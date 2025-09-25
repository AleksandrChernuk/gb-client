'use client';

import { cn } from '@/shared/lib/utils';
import { useUserStore } from '@/shared/store/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

type Props = {
  className?: string;
};

const ProfileAvatar = ({ className }: Props) => {
  const { currentUser } = useUserStore();

  return (
    <div className={cn('flex items-center justify-baseline gap-2', className)}>
      <Avatar>
        <AvatarImage src={currentUser?.picture} alt="avatar" />
        <AvatarFallback className="bg-green-200">{currentUser?.userName[0].toLocaleUpperCase()}</AvatarFallback>
      </Avatar>
      <p className="text-base text-slate-600 dark:text-slate-300">{currentUser?.userName}</p>
    </div>
  );
};

export default ProfileAvatar;
