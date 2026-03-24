export const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
