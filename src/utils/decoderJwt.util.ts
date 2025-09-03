// Декодер вытаскивает из JWT срок жизни токена
export function getJwtExpMs(token: string): number | null {
  try {
    const [, payloadB64] = token.split('.');
    const json = Buffer.from(payloadB64, 'base64').toString('utf8');
    const payload = JSON.parse(json);
    return payload?.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}
