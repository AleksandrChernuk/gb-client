export function isErrorResponse<T>(res: T | { error: string }): res is { error: string } {
  return typeof res === 'object' && res !== null && 'error' in res;
}
