'use client';

import { Checkbox } from '@/shared/ui/checkbox';
import { Label } from '@/shared/ui/label';
import React from 'react';

interface Props {
  name: string;
  id?: number;
  count: number;
  handleChange: () => void;
  checked: boolean;
}

export default function FilterCheckBoxItem({ name, count, checked, handleChange }: Props) {
  return (
    <div className="flex items-center w-full gap-4">
      <Checkbox id={name} checked={checked} onCheckedChange={handleChange} />
      <Label
        htmlFor={name}
        className="flex items-center justify-between w-full text-base font-normal leading-6 tracking-normal text-slate-700 dark:text-slate-200"
      >
        <div>{name}</div>
        <div>{count}</div>
      </Label>
    </div>
  );
}
