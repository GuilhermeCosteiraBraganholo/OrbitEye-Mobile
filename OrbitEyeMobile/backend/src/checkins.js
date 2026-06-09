import { v4 as uuidv4 } from 'uuid';
import { writeDb } from './db.js';

function validateScore(value, fieldName) {
  if (typeof value !== 'number' || Number.isNaN(value) || value < 1 || value > 5) {
    throw new Error(`${fieldName} deve ser um número entre 1 e 5.`);
  }
}

export async function listCheckins(req, res) {
  const checkins = req.db.checkins
    .filter((item) => item.userId === req.user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return res.json(checkins);
}

export async function createCheckin(req, res) {
  try {
    const { mood, energy, focus, note } = req.body ?? {};
    validateScore(mood, 'mood');
    validateScore(energy, 'energy');
    validateScore(focus, 'focus');

    const newCheckin = {
      id: uuidv4(),
      userId: req.user.id,
      mood,
      energy,
      focus,
      note: String(note ?? '').trim(),
      createdAt: new Date().toISOString(),
    };

    req.db.checkins.push(newCheckin);
    await writeDb(req.db);
    return res.status(201).json(newCheckin);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function updateCheckin(req, res) {
  try {
    const checkin = req.db.checkins.find((item) => item.id === req.params.id && item.userId === req.user.id);

    if (!checkin) {
      return res.status(404).json({ message: 'Check-in não encontrado.' });
    }

    const { mood, energy, focus, note } = req.body ?? {};

    if (mood !== undefined) validateScore(mood, 'mood');
    if (energy !== undefined) validateScore(energy, 'energy');
    if (focus !== undefined) validateScore(focus, 'focus');

    checkin.mood = mood ?? checkin.mood;
    checkin.energy = energy ?? checkin.energy;
    checkin.focus = focus ?? checkin.focus;
    checkin.note = note !== undefined ? String(note).trim() : checkin.note;

    await writeDb(req.db);
    return res.json(checkin);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function deleteCheckin(req, res) {
  const index = req.db.checkins.findIndex((item) => item.id === req.params.id && item.userId === req.user.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Check-in não encontrado.' });
  }

  req.db.checkins.splice(index, 1);
  await writeDb(req.db);
  return res.status(204).send();
}
