function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

export function validateSignupPayload(payload: unknown): payload is Record<
  string,
  unknown
> & {
  email: string;
  password: string;
} {
  return (
    isObject(payload) &&
    typeof payload.email === 'string' &&
    typeof payload.password === 'string' &&
    payload.email.length > 0 &&
    payload.password.length > 0
  );
}
