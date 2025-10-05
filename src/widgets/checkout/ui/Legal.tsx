'use client';
import { Checkbox } from '@/shared/ui/checkbox';
import { FormControl, FormItem, FormLabel } from '@/shared/ui/form';
import { Link } from '@/shared/i18n/routing';
import { useTranslations } from 'next-intl';
import { useController, useFormContext } from 'react-hook-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

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
            className="aria-invalid:border-[#de2a1a]"
          />
        </FormControl>
        <FormLabel className={`text-xs ${!!error && 'text-[#de2a1a]'}`}>
          {t.rich('consent_text', {
            pp: (chunks) => (
              <Link
                href="/privacy-policy"
                prefetch={false}
                target="_blanck"
                className={`underline  hover:text-green-100 ${!!error && 'text-[#de2a1a]'}`}
              >
                {chunks}
              </Link>
            ),
          })}
        </FormLabel>
      </div>
    </FormItem>
  );
}
