import { IncomingMessage, ServerResponse } from 'http';
import { validate as isValidUUID } from 'uuid';
import { createUser, getUserById, getUsers, updateUser } from '../models/users.model.js';
import { User } from '../interfaces/user.interface.js';
import { isUserValid } from '../helpers/users.functions.js';

export async function GET(req: IncomingMessage, res: ServerResponse) {
  if (req.url === '/api/users') {
    const users = await getUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(users));
    res.end();
  } else if (req.url?.includes('/api/users/')) {
    const id = req.url.split('/')[3];
    if (id && isValidUUID(id)) {
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
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'No endpoint found' }));
  }
}

export function POST(req: IncomingMessage, res: ServerResponse) {
  let data = '';
  if (req.url === '/api/users') {
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', async () => {
      try {
        const newUser: User = JSON.parse(data);
        if (isUserValid(newUser)) {
          const createdUser = await createUser(newUser);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(createdUser));
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid user data' }));
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid user data' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'No endpoint found' }));
  }
}

export function PUT(req: IncomingMessage, res: ServerResponse) {
  const id = req.url?.split('/')[3];
  let data = '';
  if (req.url?.includes('/api/users/')) {
    if (id && isValidUUID(id)) {
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', async () => {
        try {
          const newUser: User = JSON.parse(data);
          if (isUserValid(newUser)) {
            const updatedUser = await updateUser(newUser);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedUser));
          } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid user data' }));
          }
        } catch (error) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error }));
        }
      });
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid ID' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'No endpoint found' }));
  }
}
