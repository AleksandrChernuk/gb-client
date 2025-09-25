export interface CurrentUser {
  id: string;
  userName: string;
  email: string;
  picture: string;
  twoFA: boolean;
  method: string;
}

export type SigninSuccess = {
  message: 'Successfully signin';
  currentUser: CurrentUser;
  accessToken: string;
  refreshToken: string;
  deviceId: string;
};

export type SigninPending =
  | { message: 'Verification code sent'; userId: string; email: string }
  | { message: '2FA code sent'; email: string };

export type RefreshResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
  deviceId?: string | null;
};

export type Verify2FAResponse = {
  message: string;
  accessToken?: string;
  refreshToken?: string;
  deviceId?: string | null;
  currentUser?: CurrentUser;
};

export type ExchangeResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
  deviceId?: string | null;
  currentUser?: unknown;
  user?: unknown;
};

export type ChangePasswordConfirm = {
  code: string;
  currentPassword: string;
  newPassword: string;
};

export type TypeSignup = {
  userName: string;
  email: string;
  password: string;
};

export type TypeSignin = {
  email: string;
  password: string;
};

export type TypeVerifyCode = {
  email: string;
  code: string;
};

export type TypeForgotPassword = {
  email: string;
};

export type TypeResetPassword = {
  code: string;
  newPassword: string;
};

export type TypeResendCode = {
  email: string;
  type: 'VERIFICATION' | 'TWO_FACTOR' | 'CHANGE_EMAIL' | 'RESET_PASSWORD' | 'DELETE_ACCOUNT' | 'NEW_DEVICE_LOGIN';
};
