import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, PORT, ORIGIN } = process.env;

const config = {
  nodeEnv: NODE_ENV || 'development',
  port: PORT || 8080,
  origin: ORIGIN || 'http://localhost:3000'
};

export default config;
