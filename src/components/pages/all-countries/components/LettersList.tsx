import { Button } from '@/components/ui/button';
import { ALPHABET } from '@/constans/letters.constans';
import React from 'react';

export default function LettersList({ locale }: { locale: string }) {
  const letters = ALPHABET.find((el) => el.locale === locale)?.letters ?? [];

  return (
    <ul className="flex flex-row flex-wrap gap-2">
      {letters.map((letter) => (
        <li key={letter}>
          <Button variant={'outline'} className="px-4">
            {letter}
          </Button>
        </li>
      ))}
    </ul>
  );
}
