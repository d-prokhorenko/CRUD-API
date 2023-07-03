import { createServer, IncomingMessage, ServerResponse } from 'http';
import 'dotenv/config';
import { DELETE, GET, POST, PUT } from './routes/users.routes.js';

const PORT = process.env.PORT || 3000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  console.log(req.url);
  try {
    switch (req.method) {
      case 'GET':
        GET(req, res);
        break;
      case 'POST':
        POST(req, res);
        break;
      case 'PUT':
        PUT(req, res);
        break;
      case 'DELETE':
        DELETE(req, res);
        break;
      default:
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ error: 'Not found' }));
        res.end();
    }
  } catch (error) {
    console.error('Internal server error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
