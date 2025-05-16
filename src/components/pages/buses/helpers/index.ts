import { addDays } from 'date-fns';

export const createDateArr = (centerDate: Date, length: number, lastNum: number): Date[] => {
  return Array.from({ length }, (_, index) => addDays(centerDate, index - lastNum));
};
