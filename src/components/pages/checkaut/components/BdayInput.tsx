'use client';

import { Input } from '@/components/ui/input';
import { useLocale } from 'next-intl';
import { ChangeEvent, KeyboardEvent, useCallback, useRef, useState } from 'react';

type Props = {
  handleSet: (data: string) => void;
  error?: boolean;
};

const plasholderList = [
  { en: 'DD', ru: 'ДД', uk: 'ДД' },
  { en: 'MM', ru: 'ММ', uk: 'ММ' },
  { en: 'YYYY', ru: 'ГГГГ', uk: 'РРРР' },
];

const BirthdayInput = ({ handleSet, error }: Props) => {
  const [bd, setBDay] = useState(['', '', '']);
  const locale = useLocale();

  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(3).fill(null));

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const { value, maxLength } = e.target;

    if (value && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    } else if (!value && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }

    setBDay((prev) => ({ ...prev, [idx]: value }));

    if (value.length === maxLength && idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && e.currentTarget.value === '' && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  }, []);

  const handleBlur = () => {
    if (bd[0].length === 2 && bd[1].length === 2 && bd[2].length === 4) {
      handleSet(`${bd[0]}-${bd[1]}-${bd[2]}`);
      console.log(`${bd[0]}-${bd[1]}-${bd[2]}`);
    }
  };

  return (
    <div className="w-fit flex items-center justify-between">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="flex items-center">
          <Input
            type="text"
            id={`otp-${idx}`}
            value={bd[idx]}
            aria-invalid={error}
            placeholder={plasholderList[idx][locale]}
            onChange={(e) => handleInputChange(e, idx)}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            maxLength={idx !== 2 ? 2 : 4}
            className={`text-center px-2 ${idx !== 2 && 'w-18'}`}
            aria-label={`birthday input digit ${idx + 1}`}
            onBlur={handleBlur}
            onKeyUp={(e) => handleKeyUp(e, idx)}
          />
          {idx !== 2 && <span className="mx-2 text-2xl text-slate-400 dark:text-slate-200">/</span>}
        </div>
      ))}
    </div>
  );
};

export default BirthdayInput;
