import { v4 as uuidv4 } from 'uuid';
import { readDb, writeDb } from './db.js';

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export async function register(req, res) {
  const { name, email, password } = req.body ?? {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email e password são obrigatórios.' });
  }

  const db = await readDb();
  const normalizedEmail = String(email).trim().toLowerCase();
  const existingUser = db.users.find((user) => user.email === normalizedEmail);

  if (existingUser) {
    return res.status(409).json({ message: 'Já existe uma conta com esse e-mail.' });
  }

  const newUser = {
    id: uuidv4(),
    name: String(name).trim(),
    email: normalizedEmail,
    password: String(password),
  };

  const token = uuidv4();
  db.users.push(newUser);
  db.sessions.push({ token, userId: newUser.id, createdAt: new Date().toISOString() });
  await writeDb(db);

  return res.status(201).json({ token, user: sanitizeUser(newUser) });
}

export async function login(req, res) {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: 'email e password são obrigatórios.' });
  }

  const db = await readDb();
  const normalizedEmail = String(email).trim().toLowerCase();
  const user = db.users.find((item) => item.email === normalizedEmail && item.password === String(password));

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const token = uuidv4();
  db.sessions.push({ token, userId: user.id, createdAt: new Date().toISOString() });
  await writeDb(db);

  return res.json({ token, user: sanitizeUser(user) });
}

export async function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não informado.' });
  }

  const token = authorization.replace('Bearer ', '').trim();
  const db = await readDb();
  const session = db.sessions.find((item) => item.token === token);

  if (!session) {
    return res.status(401).json({ message: 'Token inválido.' });
  }

  const user = db.users.find((item) => item.id === session.userId);
  if (!user) {
    return res.status(401).json({ message: 'Usuário da sessão não encontrado.' });
  }

  req.user = sanitizeUser(user);
  req.db = db;
  next();
}
