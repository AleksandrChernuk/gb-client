import { ZodType } from 'zod';

export type SelectOption = {
  value: string;
  label: string;
};

export type DiscountOption = {
  value: string;
  label: string;
  discountDescription?: string;
  discountPercent?: string;
};

type BaseField = {
  label: string;
  placeholder?: string;
  schema?: ZodType;
  alphabet?: string;
};

export type FieldConfig =
  | (BaseField & {
      type: 'text';
      schema: ZodType;
    })
  | (BaseField & {
      type: 'select';
      options: SelectOption[];
      schema: ZodType;
      translateOptions?: boolean;
    })
  | (BaseField & {
      type: 'date';
      placeholder: string;
    })
  | (BaseField & {
      type: 'citizenship';
      placeholder: string;
    })
  | (BaseField & {
      type: 'discount';
      options: DiscountOption[];
      placeholder: string;
    });

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
