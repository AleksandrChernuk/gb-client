export const INFOBUS_GENDER = ['MALE', 'FEMALE'] as const;

export const FIELDS = {
  firstName: 'firstName',
  lastName: 'lastName',
  discount: 'discount',
  bday: 'bday',
  documentType: 'documentType',
  documentNumber: 'documentNumber',
  citizenship: 'citizenship',
  middlename: 'middlename',
  expiryDate: 'expiryDate',
  gender: 'gender',
} as const;

export type InfobusGender = (typeof INFOBUS_GENDER)[number];
export type FieldKey = keyof typeof FIELDS;
