import mysql from 'mysql2';
import config from '../config';

// Destructure the config object to get the nodeEnv and db object
const {
  nodeEnv,
  db: { devDB, proDB }
} = config;

// Define the connection string
let connectionString: string | undefined = '';

// Check the nodeEnv and set the connection string accordingly
if (nodeEnv === 'development') {
  connectionString = devDB;
} else if (nodeEnv === 'production') {
  connectionString = proDB;
} else {
  throw new Error('Invalid NODE_ENV variable or not given at all.');
}

if (!connectionString) {
  throw new Error('Database url is not a valid mysql connection url.');
}

// Create a connection pool
const connection = mysql.createPool(connectionString);

export default connection.promise();
