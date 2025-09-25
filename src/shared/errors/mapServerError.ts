export const mapServerError = (msg: string): string => {
  switch (msg) {
    case 'User not found':
      return 'user_not_found';
    case 'Verification token expired':
      return 'verification_token_expired';
    case 'Invalid credentials':
      return 'invalid_email_or_password';
    case 'Account deactivated':
      return 'account_deactivated';
    case 'OAuth password not settable':
      return 'oauth_password_not_settable';
    default:
      return 'default_error';
  }
};
