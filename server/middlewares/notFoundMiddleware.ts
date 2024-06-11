import { Request, Response, NextFunction } from 'express';

// Not found middleware
export default function notFound(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404).send('Route does not exist.');
}
