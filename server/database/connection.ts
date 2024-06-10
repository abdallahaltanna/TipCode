import mysql from 'mysql';
import config from '../config';

const {
  nodeEnv,
  db: { devDB, proDB }
} = config;

let connectionString: string | undefined = '';

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

const connection = mysql.createConnection(connectionString);

connection.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

export default connection;
