export type InitialValues = {
  from: number | null;
  to: number | null;
  date: string;
  adult: number;
  children: number;
};

export type TSearchForm = {
  initialValues?: InitialValues;
};
