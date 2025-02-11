import { toDate } from "date-fns";
import { z } from "zod";
import { differenceInYears } from "date-fns";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const CheckoutSchema = z.object({
  passengers: z.array(
    z.object({
      id: z.string(),
      isChildren: z.boolean(),
      name: z.string().min(1, "Name is required"),
      surname: z.string().min(1, "Surname is required"),
      notes: z.string().optional(),
      dob: z
        .string()
        .min(8, "Dob is required")
        .refine(
          (val) => {
            const date = toDate(val);
            const today = new Date();
            const yearsDiff = differenceInYears(today, date);
            return yearsDiff >= 0 && yearsDiff <= 90;
          },
          { message: `Invalid date ` },
        ),
    }),
  ),
  payment: z.enum(["card", "paypal", "cash"]),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .min(8, "Phone number is required")
    .refine(
      (value) => {
        const phoneNumber = parsePhoneNumberFromString(value);
        return phoneNumber ? phoneNumber.isValid() : false;
      },
      { message: "Не верний формат" },
    ),
  accept_rules: z.boolean().refine((val) => val === true, {
    message: "You must accept the rules",
  }),
  processing_data: z.boolean().refine((val) => val === true, {
    message: "You must agree to data processing",
  }),
});
