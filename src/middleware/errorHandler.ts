import { Request, Response, NextFunction } from 'express';
import { CelebrateError, isCelebrateError } from 'celebrate';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', err);

  if (isCelebrateError(err) || err instanceof CelebrateError) {
    const details: { field: string; message: string }[] = [];

    (err as CelebrateError).details.forEach((validationError, segment) => {
      validationError.details.forEach((detail) => {
        details.push({
          field: detail.path.join('.') || detail.context?.key || String(segment) || 'unknown',
          message: detail.message || 'Validation error'
        });
      });
    });

    res.status(400).json({ error: 'Validation error', details });
    return;
  }

  res.status(500).json({ error: 'Internal server error' });
};
