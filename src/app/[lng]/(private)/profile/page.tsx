import ProfileSettingsPage from '@/components/pages/profile/settings';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';

const UserProfile = async () => {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <div>
      <h1 className="mb-4">{t('settings')}</h1>
      <ProfileSettingsPage />
    </div>
  );
};

export default UserProfile;
