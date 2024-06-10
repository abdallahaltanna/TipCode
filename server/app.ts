import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import config from './config';
import router from './routes';
import { errorHandler, notFound } from './middlewares';

class App {
  public app: express.Application;
  public nodeEnv: string;
  public port: number | string;

  constructor() {
    this.app = express();
    this.nodeEnv = config.nodeEnv;
    this.port = config.port;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    if (this.nodeEnv === 'development') {
      this.app.use(morgan('dev'));
    }

    this.app.use(cors({ origin: config.origin, credentials: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.disable('x-powered-by');
    this.app.set('port', this.port);
  }

  private initializeRoutes() {
    this.app.use('/api/v1', router);
  }

  private initializeErrorHandling() {
    this.app.use(notFound);
    this.app.use(errorHandler);
  }
}

const { app } = new App();

export default app;
