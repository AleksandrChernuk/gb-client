/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRANSLATION_KEYS } from '@/shared/i18n/translationKeys';
import { format } from 'date-fns';

export const formatMoney = (value: string | undefined | null, currency?: string) => {
  const amount = Math.max(0, Number(value ?? 0));

  const curr = currency?.toUpperCase() || 'UAH';
  try {
    return new Intl.NumberFormat('uk-UA', { style: 'currency', currency: curr, maximumFractionDigits: 0 }).format(
      amount,
    );
  } catch {
    return `${Math.floor(amount)} ${curr}`;
  }
};

export const formatDatePayment = (date: string) => {
  const updatedAt = date ? new Date(date as unknown as string) : null;
  return updatedAt ? format(updatedAt, 'dd.MM.yyyy HH:mm') : '—';
};

export const formatDate = (date: string) => {
  const updatedAt = date ? new Date(date as unknown as string) : null;
  return updatedAt ? format(updatedAt, 'dd.MM.yyyy') : '—';
};
export const formatTime = (date: string) => {
  const updatedAt = date ? new Date(date as unknown as string) : null;
  return updatedAt ? format(updatedAt, 'HH:mm') : '—';
};

export const transformFullName = (
  lastName?: string | null,
  firstName?: string | null,
  middleName?: string | null,
): string => {
  return (
    [lastName, firstName, middleName]
      .filter((s): s is string => Boolean(s && s.trim()))
      .map((s) => s.trim())
      .join(' ') || '—'
  );
};

export const getRoute = (fromCityName?: string | null, toCityName?: string | null): string => {
  return (
    [fromCityName, toCityName]
      .filter((s): s is string => Boolean(s && s.trim()))
      .map((s) => s.trim())
      .join(' — ') || '—'
  );
};

export const formatOrderNumber = (orderNumber?: string | number | null): string => {
  const raw = orderNumber != null ? orderNumber.toString().trim() : '';
  return raw ? `№${raw.padStart(9, '0')}` : '—';
};

export const formatProviderLabel = (provider?: string | null): string => {
  if (!provider) return '—';
  if (provider === 'LiqPay') return 'ПриватБанк';
  return provider;
};

export const isNoTripsError = (err: unknown) => {
  const msg =
    (err as any)?.message ||
    (err as any)?.response?.data?.message ||
    (err as any)?.data?.message ||
    (err as any)?.cause?.message ||
    '';
  return /Customer data not found/i.test(msg);
};

export const parseErrorKey = (err: unknown): string => {
  const msg =
    typeof err === 'string'
      ? err
      : err instanceof Error
        ? err.message
        : typeof (err as any)?.message === 'string'
          ? (err as any).message
          : '';

  if (/customer data not found/i.test(msg) || /customer_not_found/i.test(msg)) {
    return TRANSLATION_KEYS.common.customer_not_found;
  }

  if (/not found/i.test(msg)) {
    return TRANSLATION_KEYS.common.not_found;
  }

  return TRANSLATION_KEYS.common.unknown_error;
};

export const hasMessage = (e: unknown): e is { message: string } => {
  return typeof e === 'object' && e !== null && 'message' in e && typeof (e as any).message === 'string';
};
