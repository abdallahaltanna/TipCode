import app from './app';
import http from 'http';

// Get the port from the app
const port = app.get('port');

// Create a server
const server = http.createServer(app);

// Listen to the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
