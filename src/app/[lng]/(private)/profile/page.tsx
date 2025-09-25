export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getTranslations } from 'next-intl/server';
import ProfileSettingsCard from '@/entities/profile/ProfileSettingsCard';
import ProfileSettingActions from '@/entities/profile/ProfileSettingActions';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import UpdateProfileEmailForm from '@/features/profile-email-form/UpdateProfileEmailForm';
import UpdateProfileNameForm from '@/features/profile-name-form/UpdateProfileNameForm';

const UserProfile = async () => {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <>
      <h1 className="mb-4">{t('settings')}</h1>
      <div className="flex flex-col tablet:flex-row gap-4">
        <div className="flex flex-col gap-4 tablet:w-1/2">
          <ProfileSettingsCard title="personal_data">
            <UpdateProfileNameForm />
          </ProfileSettingsCard>

          <ProfileSettingsCard title="email_update">
            <UpdateProfileEmailForm />
          </ProfileSettingsCard>
        </div>
        <div className="tablet:w-1/2">
          <ProfileSettingsCard>
            <ProfileSettingActions />
          </ProfileSettingsCard>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
