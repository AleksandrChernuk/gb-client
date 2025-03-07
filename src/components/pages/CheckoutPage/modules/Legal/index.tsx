'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

export default function Legal() {
  const { control } = useFormContext();
  const t = useTranslations('common');

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="accept_rules"
        render={({ field }) => {
          return (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="font-normal">{t('accept_rules')}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={control}
        name="processing_data"
        render={({ field }) => {
          return (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="font-normal">{t('processing_data')}</FormLabel>
              </div>

              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
