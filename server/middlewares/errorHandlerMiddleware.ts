import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

import { ErrorHandler } from '../utils/interfaces';

// Error handler middleware
const errorHandler: ErrorRequestHandler = (
  error: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status).json({ msg: `${error.msg}` });
};

export default errorHandler;
