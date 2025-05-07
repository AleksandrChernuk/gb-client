'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { FormErrorMassege } from '@/components/ui/form-error';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
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
                <FormLabel className="font-normal">{t('accept_rules')}</FormLabel>
              </div>
              {Boolean(fieldState?.error) && <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>}
            </FormItem>
          );
        }}
      />
      <FormField
        control={control}
        name="processing_data"
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
                <FormLabel className="font-normal">{t('processing_data')}</FormLabel>
              </div>

              {Boolean(fieldState?.error) && <FormErrorMassege>{t(`${fieldState.error?.message}`)}</FormErrorMassege>}
            </FormItem>
          );
        }}
      />
    </div>
  );
}
