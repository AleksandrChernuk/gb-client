/* eslint-disable @typescript-eslint/no-explicit-any */
export const isNoPaymentsError = (err: unknown) => {
  const msg =
    (err as any)?.message ||
    (err as any)?.response?.data?.message ||
    (err as any)?.data?.message ||
    (err as any)?.cause?.message ||
    '';

  return /or customer data not found/i.test(msg);
};
