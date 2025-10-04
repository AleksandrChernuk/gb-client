import { MainSearchShema } from '@/shared/validation/main.search.schema';
import { useTranslations } from 'next-intl';

export function validateField(
  name: 'from' | 'to',
  value: string | null,
  t: ReturnType<typeof useTranslations>,
  setErrors: React.Dispatch<React.SetStateAction<{ from?: string | null; to?: string | null }>>,
) {
  const result = MainSearchShema.shape[name].safeParse(value);

  if (!result.success) {
    const message = t(result.error.format()._errors?.[0] || '');
    setErrors((prev) => ({ ...prev, [name]: message }));
  } else {
    setErrors((prev) => ({ ...prev, [name]: null }));
  }
}
