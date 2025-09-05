import ProfileFormCurd from './components/ProfileFormCard';
import ChangeUserNameForm from './components/ChangeUserNameForm';
import ChangeUserEmailForm from './components/ChangeUserEmailForm';
import UserActions from './components/UserActions';

export default async function ProfilePage() {
  return (
    <div className="flex flex-col tablet:flex-row gap-4">
      <div className="flex flex-col gap-4 tablet:w-1/2">
        <ProfileFormCurd title="personal_data">
          <ChangeUserNameForm />
        </ProfileFormCurd>

        <ProfileFormCurd title="email_update">
          <ChangeUserEmailForm />
        </ProfileFormCurd>
      </div>
      <div className="tablet:w-1/2">
        <ProfileFormCurd>
          <UserActions />
        </ProfileFormCurd>
      </div>
    </div>
  );
}
