'use client';

import { useState } from 'react';
import ChangePasswordAction from './ChangePasswordAction';
import DeleteProfileAlert from './DeleteProfileAlert';
import DeleteProfileAction from './DeleteProfileAction';
import TwooFaAction from './TwooFaAction';

type UpdateFormType = 'delete' | null;

const UserActions = () => {
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

export default UserActions;
