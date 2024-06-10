import app from './app';
import http from 'http';
import db from './database/connection';

const port = app.get('port');

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
