export type InitialValues = {
  from: number | null;
  to: number | null;
  date: string;
  voyagers: number;
};

export type TSearchForm = {
  initialValues?: InitialValues;
};
