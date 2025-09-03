import SettingForm from '@/components/modules/profile/SettingForm';
import LogOutBtn from '@/components/pages/profile/settings/components/LogOutBtn';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  return {
    robots: {
      index: false,
      follow: false,
      nocache: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const UserProfile = async () => {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="mb-4">{t('trips_hystori')}</h1> <LogOutBtn />
      </div>
      <SettingForm />
    </div>
  );
};

export default UserProfile;
