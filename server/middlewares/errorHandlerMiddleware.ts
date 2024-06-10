import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

import { ErrorHandler } from '../utils/interfaces';

const errorHandler: ErrorRequestHandler = (
  error: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status).json({ msg: `${error.name}: ${error.msg}` });
};

export default errorHandler;
