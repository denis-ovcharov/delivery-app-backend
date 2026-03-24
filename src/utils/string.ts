export const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const normalizeOrigin = (origin: string): string => origin.trim().replace(/\/+$/, '');

export const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
