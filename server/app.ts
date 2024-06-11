import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import config from './config';
import router from './routes';
import { errorHandler, notFound } from './middlewares';

class App {
  // Define the properties of the App class
  public app: express.Application;
  public nodeEnv: string;
  public port: number | string;

  // Define the constructor method
  constructor() {
    // Initialize the properties of the App class
    this.app = express();
    this.nodeEnv = config.nodeEnv;
    this.port = config.port;

    // Call the private methods
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  // Define the private methods
  private initializeMiddlewares() {
    if (this.nodeEnv === 'development') {
      this.app.use(morgan('dev'));
    }

    // Enable CORS
    this.app.use(cors({ origin: config.origin, credentials: true }));
    // Parse incoming requests with JSON payloads
    this.app.use(express.json());
    // Parse incoming requests with urlencoded payloads
    this.app.use(express.urlencoded({ extended: false }));
    // Disable the x-powered-by header
    this.app.disable('x-powered-by');

    // Set the port
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
