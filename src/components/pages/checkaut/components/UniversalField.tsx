import { memo } from 'react';
import { FieldConfig } from '../helpers/providerFieldsConfig';
import BirthdayInput from './BdayInput';
import TextInput from './TextInput';
import UniversalSelect from './UniversalSelect';

type Props = {
  name: string;
  config: FieldConfig;
};

const UniversalField = memo(function UniversalField({ name, config }: Props) {
  if (!config) return null;
  switch (config.type) {
    case 'text':
      return <TextInput name={name} config={config} />;

    case 'select':
      return <UniversalSelect name={name} config={config} />;

    case 'bday':
      return <BirthdayInput name={name} config={config} />;

    default:
      return null;
  }
});
export default UniversalField;
