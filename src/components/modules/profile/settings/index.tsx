import ProfileSettingsCard from './ui/ProfileSettingsCard';
import ProfileSettingActions from './widgets/ProfileSettingActions';
import UpdateProfileEmailForm from './widgets/UpdateProfileEmailForm';
import UpdateProfileNameForm from './widgets/UpdateProfileNameForm';

const ProfileSettingsPage = () => {
  return (
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
  );
};

export default ProfileSettingsPage;
