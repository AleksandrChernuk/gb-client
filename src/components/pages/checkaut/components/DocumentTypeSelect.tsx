/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormErrorMassege } from '@/components/ui/form-error';
import { FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SelectGroup } from '@radix-ui/react-select';

const docType = [
  'UNKNOWN',
  'PASSPORT',
  'MILITARY_ID',
  'FOREIGN_DOCUMENT',
  'TRAVEL_PASSPORT',
  'SAILORS_PASSPORT',
  'BIRTH_CERTIFICATE',
  'DIPLOMATIC_PASSPORT',
];

type Props = {
  name: {
    type: string;
    number: string;
  };
  control: Control<FieldValues, any, FieldValues>;
};

export const DocumentInput = ({ name, control }: Props) => {
  const { field: typeField } = useController({
    name: name.type,
    control,
    rules: { required: true },
  });

  const {
    field: numberField,
    fieldState: { error: numberError },
  } = useController({
    name: name.number,
    control,
    rules: { required: true },
  });

  return (
    <div className="space-y-2">
      <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">dob</FormLabel>
      <div className="flex items-center">
        <Select onValueChange={(value) => typeField.onChange(value)}>
          <SelectTrigger className="rounded-none rounded-s-md" size="full" />
          <SelectContent>
            <SelectGroup>
              {docType.map((element) => (
                <SelectItem key={element} value={element}>
                  {element}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          {...numberField}
          aria-invalid={!!numberError}
          className={cn('rounded-none rounded-r-md rounded-l-0', numberError && 'border-red-400')}
        />
      </div>
      {!!numberError && <FormErrorMassege>{numberError.message}</FormErrorMassege>}
    </div>
  );
};
