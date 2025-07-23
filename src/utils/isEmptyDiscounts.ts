import { IDiscount } from '@/types/discount-interface';

export const isEmptyDiscounts = (discounts: IDiscount[] | null | undefined): boolean => {
  if (!discounts || !Array.isArray(discounts) || discounts.length === 0) return true;

  if (discounts.length === 1 && Object.values(discounts[0]).every((v) => v === null)) {
    return true;
  }
  if (discounts.some((e) => e.id === '1210' || e.id === '1211')) return true;

  return discounts.every(
    (d) => d.id == null && d.name == null && d.description == null && d.percent == null && d.category == null,
  );
};
