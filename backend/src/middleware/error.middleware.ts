import { Request, Response, NextFunction } from 'express';

interface ApiError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error('[Error]', {
    statusCode,
    message,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  res.status(statusCode).json({
    error: message,
    statusCode,
    timestamp: new Date().toISOString(),
  });
};