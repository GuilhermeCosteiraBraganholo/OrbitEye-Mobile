import { v4 as uuidv4 } from 'uuid';
import { writeDb } from './db.js';

const now = () => new Date().toISOString();

export async function dashboard(req, res) {
  const db = req.db;
  const activeAlerts = db.alerts.filter((alert) => alert.status === 'ATIVO').length;
  const criticalRegions = db.regions.filter((region) => region.riskLevel === 'CRITICO').length;
  const averageConfidence = Math.round(db.predictions.reduce((sum, item) => sum + item.confidence, 0) / Math.max(db.predictions.length, 1));
  res.json({ monitoredRegions: db.regions.length, activeAlerts, criticalRegions, averageConfidence });
}

export async function listRegions(req, res) { res.json(req.db.regions); }
export async function createRegion(req, res) {
  const region = { id: uuidv4(), ...req.body, updatedAt: now() };
  req.db.regions.unshift(region); await writeDb(req.db); res.status(201).json(region);
}
export async function updateRegion(req, res) {
  const index = req.db.regions.findIndex((item) => item.id === req.params.id);
  if (index < 0) return res.status(404).json({ message: 'Região não encontrada.' });
  req.db.regions[index] = { ...req.db.regions[index], ...req.body, updatedAt: now() };
  await writeDb(req.db); res.json(req.db.regions[index]);
}
export async function deleteRegion(req, res) {
  req.db.regions = req.db.regions.filter((item) => item.id !== req.params.id);
  await writeDb(req.db); res.status(204).send();
}

export async function listAlerts(req, res) { res.json(req.db.alerts); }
export async function createAlert(req, res) {
  const alert = { id: uuidv4(), ...req.body, createdAt: now() };
  req.db.alerts.unshift(alert); await writeDb(req.db); res.status(201).json(alert);
}
export async function updateAlert(req, res) {
  const index = req.db.alerts.findIndex((item) => item.id === req.params.id);
  if (index < 0) return res.status(404).json({ message: 'Alerta não encontrado.' });
  req.db.alerts[index] = { ...req.db.alerts[index], ...req.body };
  await writeDb(req.db); res.json(req.db.alerts[index]);
}
export async function deleteAlert(req, res) {
  req.db.alerts = req.db.alerts.filter((item) => item.id !== req.params.id);
  await writeDb(req.db); res.status(204).send();
}

export async function listEvents(req, res) { res.json(req.db.climateEvents); }
export async function listPredictions(req, res) { res.json(req.db.predictions); }
