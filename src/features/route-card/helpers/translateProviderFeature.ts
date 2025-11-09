import { toArray } from '@/shared/utils/toArray';

const PROVIDERS_TO_TRANSLATE = ['INFOBUS', 'OCTOBUS'];

export function translateAmenityKey(key: string, providerName: string, t: (key: string) => string) {
  if (!PROVIDERS_TO_TRANSLATE.includes(providerName.toUpperCase())) {
    return key;
  }

  return t(key);
}

export function translateAmenitiesList(amenities: string[] | string, provider: string, t: (k: string) => string) {
  return toArray(amenities).map((key) => translateAmenityKey(key, provider, t));
}
