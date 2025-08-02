import { ZodType } from 'zod';

export type SelectOption = { value: string; label: string };
export type DiscountOption = { value: string; label: string; discountDescription?: string; discountPercent?: string };

export type FieldConfig =
  | {
      label: string;
      type: 'text';
      placeholder?: string;
      schema: ZodType;
    }
  | {
      label: string;
      type: 'select';
      options: SelectOption[];
      placeholder?: string;
      schema: ZodType;
      translateOptions?: boolean;
    }
  | {
      label: string;
      type: 'date';
      placeholder: string;
      schema?: ZodType;
    }
  | {
      label: string;
      type: 'citizenship';
      placeholder: string;
      schema?: ZodType;
    }
  | {
      label: string;
      type: 'discount';
      options: DiscountOption[];
      placeholder: string;
      schema?: ZodType;
    };

export type ProviderConfig = {
  required: string[];
  fields: Record<string, FieldConfig>;
  needBirth?: boolean | string;
  needDoc?: boolean | string;
  needDocExpireDate?: boolean | string;
  needCitizenship?: boolean | string;
  needGender?: boolean | string;
  needMiddlename?: boolean | string;
};
