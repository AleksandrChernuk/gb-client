import { ZodType } from 'zod';

export type providerConfig = {
  required: string[];
  fields: Record<string, FieldConfig>;
};
export type SelectOption = { value: string; label: string };

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
    }
  | {
      label: string;
      type: 'bday';
      placeholder: string;
      schema?: ZodType;
    }
  | {
      label: string;
      type: 'citizenship';
      placeholder: string;
      schema?: ZodType;
    };

export type ProviderConfig = {
  required: string[];
  fields: Record<string, FieldConfig>;
};
