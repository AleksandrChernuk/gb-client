'use client';

import { useState } from 'react';
import TwooFaAction from '../ui/TwooFaAction';
import ChangePasswordAction from '../ui/ChangePasswordAction';
import DeleteProfileAction from '../ui/DeleteProfileAction';
import DeleteProfileAlert from '../ui/DeleteProfileAlert';

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
