export const dynamic = 'force-dynamic';
export const revalidate = 0;

import ProfileSettingsPage from '@/components/pages/profile/settings';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';

const UserProfile = async () => {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <>
      <h1 className="mb-4">{t('settings')}</h1>
      <ProfileSettingsPage />
    </>
  );
};

export default UserProfile;
