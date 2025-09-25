'use client';

import { useState } from 'react';
import TwooFaAction from './TwooFaAction';
import ChangePasswordAction from './ChangePasswordAction';
import DeleteProfileAction from './DeleteProfileAction';
import DeleteProfileAlert from './DeleteProfileAlert';

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
