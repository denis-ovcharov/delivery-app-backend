import { Request, Response, NextFunction } from 'express';
import { CelebrateError } from 'celebrate';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', err);

  if (err instanceof CelebrateError) {
    const details: { field: string; message: string }[] = [];
    err.details.forEach((value: any) => {
      details.push({
        field: value.path?.join('.') || 'unknown',
        message: value.message || 'Validation error'
      });
    });
    res.status(400).json({ error: 'Validation error', details });
    return;
  }

  res.status(500).json({ error: 'Internal server error' });
};
