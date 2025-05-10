'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { FormErrorMassege } from '@/components/ui/form-error';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

export default function Legal() {
  const { control } = useFormContext();
  const t = useTranslations(MESSAGE_FILES.FORM);

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="accept_rules"
        render={({ field, fieldState }) => {
          return (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={Boolean(fieldState?.invalid)}
                  />
                </FormControl>
                <FormLabel className="text-md">
                  {t.rich('consent_text', {
                    pp: (chunks) => (
                      <Link href="/privacy-policy" className="underline text-green-300 hover:text-green-100">
                        {chunks}
                      </Link>
                    ),
                    bt: (chunks) => (
                      <Link href="/booking-terms" className="underline text-green-300 hover:text-green-100">
                        {chunks}
                      </Link>
                    ),
                    tt: (chunks) => (
                      <Link href="/transport-terms" className="underline text-green-300 hover:text-green-100">
                        {chunks}
                      </Link>
                    ),
                  })}
                </FormLabel>
                {Boolean(fieldState?.error) && <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>}
              </div>
            </FormItem>
          );
        }}
      />
    </div>
  );
}
