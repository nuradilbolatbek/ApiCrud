//import { createServer } from 'node:http';
const http = require('http');
const handler = require('../routes/routes');

const server = http.createServer(handler);
const port = 3000;
server.listen(port, () => {
  console.log(`server is runnig on port ${port}`);
});