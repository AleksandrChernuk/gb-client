// Типы для входящих серверных ошибок
type ServerErrorMessage =
  | 'User not found'
  | 'Verification token expired'
  | 'Invalid credentials'
  | 'Account deactivated'
  | 'OAuth password not settable';

// Типы для ключей переводов
type ErrorTranslationKey =
  | 'user_not_found'
  | 'verification_token_expired'
  | 'invalid_email_or_password'
  | 'account_deactivated'
  | 'oauth_password_not_settable'
  | 'default_error';

// Карта соответствия серверных ошибок ключам переводов
const ERROR_MESSAGE_MAP: Record<ServerErrorMessage, ErrorTranslationKey> = {
  'User not found': 'user_not_found',
  'Verification token expired': 'verification_token_expired',
  'Invalid credentials': 'invalid_email_or_password',
  'Account deactivated': 'account_deactivated',
  'OAuth password not settable': 'oauth_password_not_settable',
} as const;

/**
 * Преобразует серверные сообщения об ошибках в ключи для системы переводов
 * @param msg - Сообщение об ошибке с сервера
 * @returns Ключ для перевода или 'default_error' если сообщение неизвестно
 */
export const mapServerError = (msg: string): ErrorTranslationKey => {
  // Приводим к типу ServerErrorMessage для проверки
  const serverMessage = msg as ServerErrorMessage;

  // Получаем соответствующий ключ перевода
  const translationKey = ERROR_MESSAGE_MAP[serverMessage];

  // Логируем неизвестные ошибки в development режиме
  if (!translationKey && process.env.NODE_ENV === 'development') {
    console.warn(`[mapServerError] Unknown server error message: "${msg}"`);
  }

  return translationKey || 'default_error';
};

// Дополнительная утилита для проверки, является ли ошибка известной
export const isKnownServerError = (msg: string): msg is ServerErrorMessage => {
  return msg in ERROR_MESSAGE_MAP;
};

// Утилита для получения всех известных серверных ошибок (для тестов/документации)
export const getKnownServerErrors = (): ServerErrorMessage[] => {
  return Object.keys(ERROR_MESSAGE_MAP) as ServerErrorMessage[];
};
