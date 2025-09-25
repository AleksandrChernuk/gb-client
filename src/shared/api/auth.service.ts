import {
  ChangePasswordConfirm,
  TypeForgotPassword,
  TypeResendCode,
  TypeResetPassword,
  TypeSignin,
  TypeSignup,
  TypeVerifyCode,
} from '@/shared/types/auth.types';

type Ok = { message: string };
type Err = { message?: string };

// ==================== Sign up =====================
export async function signup(data: TypeSignup, locale: string) {
  try {
    const response = await fetch(`/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': locale,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.log('Signup error:', error);
    throw error;
  }
}

// ================= Verify Email ===================
export async function verifyEmail(data: TypeVerifyCode, locale: string) {
  try {
    const response = await fetch(`/api/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': locale,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Verify failed');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Verify email error:', error);
    throw error;
  }
}

// =================== Signin ==================
export async function signin(data: TypeSignin, locale: string) {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': locale,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Signin failed' };
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Signin error:', error);
    throw error;
  }
}

// ================== Refresh ===================
export async function refresh() {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Refresh failed');
    }

    return result;
  } catch (error) {
    console.error('Error trying to refresh token:', error);
    return null;
  }
}

// ================ Logout ================
export async function logout() {
  try {
    await fetch(`/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return true;
  }
}

// ================== Google =================
export function googleSignin(locale: string) {
  window.location.href = `/api/auth/google?locale=${locale}`;
}

// =================== 2FA ===================
export async function verify2FA(data: TypeVerifyCode, locale: string) {
  const response = await fetch(`/api/auth/verify-2fa`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept-Language': locale },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Verify failed');
  }

  const result = await response.json(); // { message, currentUser }
  return result;
}

// ================ Forgot password ==================
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

export async function forgotPassword(data: TypeForgotPassword, locale: string): Promise<Ok> {
  const response = await fetch('/api/auth/forgot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
    },
    body: JSON.stringify(data),
  });

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    payload = undefined;
  }

  if (!response.ok) {
    const msg =
      isRecord(payload) && typeof (payload as Err).message === 'string' ? (payload as Err).message : 'Code sent failed';
    throw new Error(msg);
  }

  const message =
    isRecord(payload) && typeof (payload as Ok).message === 'string'
      ? (payload as Ok).message
      : 'Password reset code sent';

  return { message };
}

// ==================== Reset Password =====================
export async function resetPassword(data: TypeResetPassword, locale: string): Promise<Ok> {
  const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
    },
    body: JSON.stringify(data),
  });

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    payload = undefined;
  }

  if (!response.ok) {
    const msg =
      isRecord(payload) && typeof (payload as Err).message === 'string'
        ? (payload as Err).message
        : 'Reset password failed';
    throw new Error(msg);
  }

  const message =
    isRecord(payload) && typeof (payload as Ok).message === 'string'
      ? (payload as Ok).message
      : 'Password successfully reset';

  return { message };
}

// ============== Resend Code ===============
export async function resendCode(data: TypeResendCode, locale: string) {
  const response = await fetch('/api/auth/resend-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
    },
    body: JSON.stringify(data),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || 'Code send failed');
  }

  return payload.message || 'Code resent';
}

// ================ Change Password Request ================
export async function requestChangePassword(locale: string, email: string) {
  const response = await fetch(`/api/auth/change-password/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
    },
    body: JSON.stringify({ email }),
    credentials: 'include',
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || 'Failed to send password change code');
  }

  return {
    message: payload.message || 'Password change code sent',
    email: payload.email || email,
  };
}

// ================ Change Password Confirm ================
export async function confirmChangePassword(data: ChangePasswordConfirm, locale: string) {
  const response = await fetch(`/api/auth/change-password/confirm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || 'Password change failed');
  }

  return {
    message: payload.message || 'Password changed successfully',
    currentUser: payload.currentUser || null,
  };
}

// ================ Update User ================
export async function updateUser(
  data: {
    userName?: string;
    picture?: string;
    newEmail?: string;
    currentPassword?: string;
    twoFA?: boolean;
  },
  locale: string,
) {
  const response = await fetch('/api/user/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || 'Failed to update user');
  }

  return {
    message: payload.message || 'Profile updated successfully',
    user: payload.user || null,
  };
}

// ================ Request Delete Account ================
export async function requestDeleteAccount(email: string, locale: string) {
  const response = await fetch('/api/auth/delete-account/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
    },
    body: JSON.stringify({ email }),
    credentials: 'include',
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || 'Failed to request account deletion');
  }

  return {
    message: payload.message || 'Account deletion request sent',
    email: payload.email || email,
  };
}

// ================ Confirm Delete Account ================
export async function confirmDeleteAccount(data: { code: string; email: string }, locale: string) {
  const response = await fetch('/api/auth/delete-account/confirm', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || 'Failed to delete account');
  }

  return {
    message: payload.message || 'Account deactivated',
  };
}
