'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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
    <div className='flex items-center w-full gap-4'>
      <Checkbox id={name} checked={checked} onCheckedChange={handleChange} />
      <Label
        htmlFor={name}
        className='flex items-center justify-between w-full main_text_body text-text_secondary_color'
      >
        <div>{name}</div>
        <div>{count}</div>
      </Label>
    </div>
  );
}
