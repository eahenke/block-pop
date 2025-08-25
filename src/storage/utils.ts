export const isQuotaExceededError = (e: unknown): e is DOMException => {
  return e instanceof DOMException && e.name === 'QuotaExceededError';
};
