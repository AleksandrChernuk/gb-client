import { FieldConfig } from '../helpers/providerFieldsConfig';
import BirthdayInput from './BdayInput';
import DiscountSelect from './DiscountSelect';
import { DocumentInput } from './DocumentTypeSelect';
import TextInput from './TextInput';

type Props = {
  name: string;
  config: FieldConfig;
};

export function UniversalField({ name, config }: Props) {
  if (!config) return null;
  switch (config.type) {
    case 'text':
      return <TextInput name={name} config={config} />;

    case 'select':
      return <DiscountSelect name={name} config={config} />;

    case 'dob':
      return <BirthdayInput name={name} config={config} />;

    case 'group':
      return <DocumentInput name={{ type: `type_${name}`, number: name }} config={config} />;

    default:
      return null;
  }
}
