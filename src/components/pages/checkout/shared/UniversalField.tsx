import { memo } from 'react';
import TextInput from './TextInput';
import UniversalSelect from './UniversalSelect';
import { FieldConfig } from '../helpers/providerConfig/types';
import CitizenshipSelect from './CitizenshipSelect';
import DiscountSelect from './DiscountSelect';
import { DateBirthPicker } from './DateBirthPicker';

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
