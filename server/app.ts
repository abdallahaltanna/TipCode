import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

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
    // Parse cookies
    this.app.use(cookieParser());
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

    if (this.nodeEnv === 'production') {
      // Serve any static files
      this.app.use(
        express.static(path.resolve(__dirname, '../../client/dist'))
      );

      // Handle React routing, return all requests to React app
      this.app.get('*', function (req: Request, res: Response) {
        res.sendFile(
          path.resolve(__dirname, '../../client/dist', 'index.html')
        );
      });
    }
  }

  private initializeErrorHandling() {
    this.app.use(notFound);
    this.app.use(errorHandler);
  }
}

const { app } = new App();

export default app;
