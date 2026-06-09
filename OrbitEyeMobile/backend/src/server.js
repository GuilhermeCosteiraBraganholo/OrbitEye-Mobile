import cors from 'cors';
import express from 'express';
import { authMiddleware, login, register } from './auth.js';
import { createAlert, createRegion, dashboard, deleteAlert, deleteRegion, listAlerts, listEvents, listPredictions, listRegions, updateAlert, updateRegion } from './orbiteye.js';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok', project: 'OrbitEye', uptime: process.uptime() }));
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

app.get('/api/dashboard', authMiddleware, dashboard);
app.get('/api/regions', authMiddleware, listRegions);
app.post('/api/regions', authMiddleware, createRegion);
app.put('/api/regions/:id', authMiddleware, updateRegion);
app.delete('/api/regions/:id', authMiddleware, deleteRegion);
app.get('/api/alerts', authMiddleware, listAlerts);
app.post('/api/alerts', authMiddleware, createAlert);
app.put('/api/alerts/:id', authMiddleware, updateAlert);
app.delete('/api/alerts/:id', authMiddleware, deleteAlert);
app.get('/api/climate-events', authMiddleware, listEvents);
app.get('/api/predictions', authMiddleware, listPredictions);

app.use((_req, res) => res.status(404).json({ message: 'Rota não encontrada.' }));
app.listen(PORT, () => console.log(`OrbitEye API rodando em http://localhost:${PORT}/api`));
