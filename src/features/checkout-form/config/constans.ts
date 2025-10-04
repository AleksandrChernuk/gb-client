export const OCTOBUS_DOC_TYPES = ['PASSPORT', 'TRAVEL_PASSPORT', 'BIRTH_CERTIFICATE'] as const;

export const INFOBUS_DOC_TYPES = ['ID_CARD', 'FOREIGN_PASSPORT'] as const;

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

export type OctobusDocType = (typeof OCTOBUS_DOC_TYPES)[number];
export type InfobusDocType = (typeof INFOBUS_DOC_TYPES)[number];
export type InfobusGender = (typeof INFOBUS_GENDER)[number];
export type FieldKey = keyof typeof FIELDS;
