'use client';

import { Eye, EyeOff } from 'lucide-react';

interface ViewPasswordProps {
  isViewPassword: boolean;
  setIsViewPassword: () => void;
  error?: boolean;
}

const ViewPassword = ({ isViewPassword, setIsViewPassword, error }: ViewPasswordProps) => {
  return (
    <div
      className='absolute inset-y-0 flex items-center cursor-pointer right-4'
      onClick={setIsViewPassword}
    >
      {isViewPassword ? (
        <Eye size={24} className={`${error && 'stroke-red'}`} />
      ) : (
        <EyeOff size={24} className={`${error && 'stroke-red'}`} />
      )}
    </div>
  );
};

export default ViewPassword;
