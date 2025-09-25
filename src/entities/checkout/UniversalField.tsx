import CitizenshipSelect from '@/entities/checkout/CitizenshipSelect';
import { DateBirthPicker } from '@/entities/checkout/DateBirthPicker';
import DiscountSelect from '@/entities/checkout/DiscountSelect';
import TextInput from '@/entities/checkout/TextInput';
import UniversalSelect from '@/entities/checkout/UniversalSelect';
import { FieldConfig } from '@/shared/types/checkot.types';
import { memo } from 'react';

type Props = {
  name: string;
  config: FieldConfig;
  i: number;
};

const UniversalField = memo(function UniversalField({ name, config, i }: Props) {
  if (!config) return null;
  switch (config.type) {
    case 'text':
      return <TextInput name={name} config={config} />;

    case 'select':
      return <UniversalSelect name={name} config={config} />;

    case 'date':
      return <DateBirthPicker name={name} config={config} />;

    case 'citizenship':
      return <CitizenshipSelect name={name} config={config} />;

    case 'discount':
      return <DiscountSelect i={i} name={name} config={config} />;

    default:
      return null;
  }
});
export default UniversalField;
