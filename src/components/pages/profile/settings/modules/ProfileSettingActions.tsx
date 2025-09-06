'use client';

import { useState } from 'react';
import DeleteProfileAlert from '../components/DeleteProfileAlert';
import TwooFaAction from '../components/TwooFaAction';
import ChangePasswordAction from '../components/ChangePasswordAction';
import DeleteProfileAction from '../components/DeleteProfileAction';

type UpdateFormType = 'delete' | null;

const ProfileSettingActions = () => {
  const [activeForm, setActiveForm] = useState<UpdateFormType>(null);

  if (activeForm === 'delete') {
    return <DeleteProfileAlert setActiveForm={() => setActiveForm(null)} />;
  }

  return (
    <ul className="flex flex-col gap-4">
      <li>
        <TwooFaAction />
      </li>
      <li>
        <ChangePasswordAction />
      </li>
      <li>
        <DeleteProfileAction setActiveForm={() => setActiveForm('delete')} />
      </li>
    </ul>
  );
};

export default ProfileSettingActions;
