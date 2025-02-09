import { useState } from 'react';

// Интерфейс для параметров cookie
interface CookieOptions {
  path?: string;
  maxAge?: number;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
}

export const useCookie = () => {
  const [cookieName, setCookieName] = useState<string>('exampleCookie');
  const [cookieValue, setCookieValue] = useState<string>('Hello World');

  // Установка cookie с помощью стандартного document.cookie
  const setBasicCookie = () => {
    document.cookie = `${cookieName}=${cookieValue}; path=/; max-age=3600`;
  };

  // Установка cookie с дополнительными опциями
  const setAdvancedCookie = () => {
    const cookieOptions: CookieOptions = {
      path: '/',
      maxAge: 3600, // 1 hour
      secure: process.env.NODE_ENV === 'production', // Отправлять только по HTTPS в production
      sameSite: 'strict',
    };

    const cookieString = Object.entries(cookieOptions)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => {
        if (key === 'path' || key === 'maxAge') return `${key}=${value}`;
        if (key === 'sameSite') return `SameSite=${value}`;
        return '';
      })
      .filter(Boolean)
      .join('; ');

    document.cookie = `${cookieName}=${cookieValue}; ${cookieString}`;
  };

  // Использование более современного API для cookie
  const setModernCookie = () => {
    try {
      const cookieOptions: CookieOptions = {
        path: '/',
        maxAge: 3600,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      };

      const optionsString = Object.entries(cookieOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

      document.cookie = `${cookieName}=${cookieValue}; ${optionsString}`;
    } catch (error) {
      console.error('Failed to set cookie:', error);
    }
  };

  return {
    cookieName,
    setCookieName,
    cookieValue,
    setCookieValue,
    setBasicCookie,
    setAdvancedCookie,
    setModernCookie,
  };
};
