export const SignUpInputs = [
  {
    id: 'userName',
    name: 'userName',
    label: 'label_name',
		type: 'text',
    placeholder: 'placeholder_name',
  },
  {
    id: 'email',
    name: 'email',
    label: 'label_email',
		type: 'email',
    placeholder: 'placeholder_email',
  },
  {
    id: 'password',
    name: 'password',
    label: 'label_password',
    type: 'password',
    placeholder: '********',
  },
] as const;

export const SignInInputs = [
  {
    id: 'email',
    name: 'email',
    label: 'label_email',
    type: 'email',
    placeholder: 'placeholder_email',
  },
  {
    id: 'password',
    name: 'password',
    label: 'label_password',
    type: 'password',
    placeholder: '********',
  },
] as const;

export const ChangeEmailInputs = [
  {
    id: 'new_email',
    name: 'new_email',
    label: 'label_new_email',
    type: 'email',
    placeholder: 'placeholder_new_email',
  },
  {
    id: 'password',
    name: 'password',
    label: 'label_password',
    type: 'password',
    placeholder: '********',
  },
] as const;

export const ChangePasswordInputs = [
  {
    id: 'current_password',
    name: 'current_password',
    label: 'label_current_password',
    type: 'password',
    placeholder: '********',
  },
  {
    id: 'new_password',
    name: 'new_password',
    label: 'label_new_password',
    type: 'password',
    placeholder: '********',
  },
  {
    id: 'repeat_new_password',
    name: 'repeat_new_password',
    label: 'label_repeat_new_password',
    type: 'password',
    placeholder: '********',
  },
] as const;

export const ResetPasswordInputs = [
  {
    id: 'new_password',
    name: 'new_password',
    label: 'label_new_password',
    type: 'password',
    placeholder: '********',
  },
  {
    id: 'repeat_new_password',
    name: 'repeat_new_password',
    label: 'label_repeat_new_password',
    type: 'password',
    placeholder: '********',
  },
] as const;
