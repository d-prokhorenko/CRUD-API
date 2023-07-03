import { IncomingMessage, ServerResponse } from 'http';
import { getUserById, getUsers } from '../models/users.model.js';

export async function GET(req: IncomingMessage, res: ServerResponse) {
  if (req.url === '/api/users') {
    const users = await getUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(users));
    res.end();
  } else if (req.url?.includes('/api/users/')) {
    const id = req.url.split('/')[3];
    if (id) {
      try {
        const user = await getUserById(id);
        if (user) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(user));
          res.end();
        }
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ error }));
        res.end();
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid ID' }));
    }
  }
}
