import dotenv from 'dotenv';

import { Config } from '../utils/interfaces';

dotenv.config();

const { NODE_ENV, PORT, ORIGIN, DEV_DB_URL, PRO_DB_URL } = process.env;

const config: Config = {
  nodeEnv: NODE_ENV || 'development',
  port: PORT || 8080,
  origin: ORIGIN || 'http://localhost:3000',
  db: {
    devDB: DEV_DB_URL || '',
    proDB: PRO_DB_URL || ''
  }
};

export default config;
