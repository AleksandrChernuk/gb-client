import ProfileFormCurd from './components/ProfileFormCard';
import PhoneForm from './components/PhoneForm';
import PasswordUpdateForm from './components/PasswordUpdateForm';
import LogOutBtn from './components/LogOutBtn';
import PersonalDataForm from './components/PersonalDataForm';
import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

export default async function ProfilePage() {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1>{t('contact_information')}</h1> <LogOutBtn />
      </div>
      <div className="flex flex-col tablet:flex-row gap-4">
        <div className="flex flex-col gap-4 tablet:w-1/2">
          <ProfileFormCurd title="contact_information">
            <PersonalDataForm />
          </ProfileFormCurd>

          <ProfileFormCurd title="phone">
            <PhoneForm />
          </ProfileFormCurd>
        </div>
        <div className="tablet:w-1/2">
          <ProfileFormCurd title="password_update">
            <PasswordUpdateForm />
          </ProfileFormCurd>
        </div>
      </div>
    </div>
  );
}
