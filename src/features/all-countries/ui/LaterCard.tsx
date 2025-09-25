import { ILocation } from '@/shared/types/location.types';
import CardWrapper from '@/shared/ui/CardWrapper';
import React from 'react';

type Props = {
  firstLater: string;
  list: ILocation[];
};

export default function LaterCard({ firstLater, list }: Props) {
  return (
    <CardWrapper>
      <h4>{firstLater}</h4>
      <ul>
        {list.map((el) => (
          <li key={el.country.id}>{el.country.id}</li>
        ))}
      </ul>
    </CardWrapper>
  );
}
