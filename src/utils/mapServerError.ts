export const mapServerError = (msg: string): string => {
  switch (msg) {
    case 'User not found':
      return 'user_not_found';
    case 'Account deactivated':
      return 'account_deactivated';
    case 'OAuth password not settable':
      return 'oauth_password_not_settable';
    default:
      return 'default_error';
  }
};
