import ProfileSettingsCard from './components/ProfileSettingsCard';
import ProfileSettingActions from './modules/ProfileSettingActions';
import UpdateProfileEmailForm from './modules/UpdateProfileEmailForm';
import UpdateProfileNameForm from './modules/UpdateProfileNameForm';

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
