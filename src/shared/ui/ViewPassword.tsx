'use client';

import { Eye, EyeOff } from 'lucide-react';

interface ViewPasswordProps {
  isViewPassword: boolean;
  setIsViewPassword: () => void;
  error?: boolean;
  disabled?: boolean;
}

const ViewPassword = ({ isViewPassword, setIsViewPassword, error, disabled }: ViewPasswordProps) => {
  return (
    <div
      className={`absolute inset-y-0 flex items-center right-4 
        ${disabled ? 'cursor-default opacity-50' : 'cursor-pointer'}`}
      onClick={setIsViewPassword}
    >
      {isViewPassword ? (
        <Eye size={24} className={`${error && 'stroke-[#de2a1a]'}`} />
      ) : (
        <EyeOff size={24} className={`${error && 'stroke-[#de2a1a]'}`} />
      )}
    </div>
  );
};

export default ViewPassword;
