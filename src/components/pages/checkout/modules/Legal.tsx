'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useController, useFormContext } from 'react-hook-form';

export default function Legal() {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: 'accept_rules',
    control,
    rules: { required: true },
  });
  const t = useTranslations(MESSAGE_FILES.FORM);
  return (
    <FormItem>
      <div className="flex items-center gap-2">
        <FormControl>
          <Checkbox
            checked={value}
            onCheckedChange={onChange}
            aria-invalid={!!error}
            className="aria-invalid:border-red-300"
          />
        </FormControl>
        <FormLabel className="text-sm">
          {t.rich('consent_text', {
            pp: (chunks) => (
              <Link href="/privacy-policy" prefetch={false} className="underline text-green-300 hover:text-green-100">
                {chunks}
              </Link>
            ),
          })}
        </FormLabel>
      </div>
    </FormItem>
  );
}
