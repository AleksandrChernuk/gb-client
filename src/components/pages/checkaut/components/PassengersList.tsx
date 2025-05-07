import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { PassengetItem } from './PassengetItem';

export const PassengersList = () => {
  const { control } = useFormContext();
  const { fields } = useFieldArray({ control, name: 'passengers' });
  return (
    <ul className="space-y-6">
      {fields.map((field, i) => (
        <PassengetItem key={i} i={i} />
      ))}
    </ul>
  );
};
