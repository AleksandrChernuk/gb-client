import { memo } from 'react';
import BirthdayInput from './DateInput';
import TextInput from './TextInput';
import UniversalSelect from './UniversalSelect';
import { FieldConfig } from '../helpers/providerConfig/types';
import CountrySelector from './CountrySelector';
import DiscountSelect from './DiscountSelect';

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
      return <BirthdayInput name={name} config={config} />;

    case 'citizenship':
      return <CountrySelector name={name} config={config} />;

    case 'discount':
      return <DiscountSelect i={i} name={name} config={config} />;

    default:
      return null;
  }
});
export default UniversalField;
