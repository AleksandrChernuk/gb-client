import { useTranslations } from 'next-intl';

import { Eye, EyeOff } from 'lucide-react';

interface IShowPassBtnProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowPasswordBtn = ({ isShow, setIsShow }: IShowPassBtnProps) => {
  const t = useTranslations('FormInputs');
  return (
    <button
      type="button"
      className="cursor-pointer pt-1"
      onClick={() => setIsShow(!isShow)}
      aria-label={t('show_password_aria_label')}
    >
      {isShow ? <Eye /> : <EyeOff />}
    </button>
  );
};

export default ShowPasswordBtn;
