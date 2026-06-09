import { api } from '@/services/api/client';
import { Alert, ClimateEvent, Prediction, Region, RiskLevel } from './types';

type JavaRegiao = {
  idRegiao: number;
  nmRegiao: string;
  dsEstado: string;
  nrPopulacao: number;
};

type JavaEvento = {
  idEvento: number;
  tpEvento: string;
  dtEvento: string;
  nivelRisco: RiskLevel;
  regiao?: JavaRegiao;
};

type JavaAlerta = {
  idAlerta: number;
  dsAlerta: string;
  dtAlerta: string;
  stAlerta: 'ATIVO' | 'RESOLVIDO';
  eventoClimatico?: JavaEvento;
};

type JavaPrevisao = {
  idPrevisao: number;
  dtPrevisao: string;
  nivelPrevisto: RiskLevel;
  probabilidade: number;
  regiao?: JavaRegiao;
};

type JavaAnalise = {
  regiao: string;
  temperatura: number;
  chuva: number;
  umidade: number;
  nivelRisco: RiskLevel;
  recomendacao: string;
};

const today = () => new Date().toISOString().slice(0, 10);
const toId = (value: string | number) => Number(value);
const fallbackRisk = (index: number): RiskLevel => (index === 0 ? 'CRITICO' : index === 1 ? 'ALTO' : 'MEDIO');

function mapRegiao(item: JavaRegiao, index = 0): Region {
  return {
    id: String(item.idRegiao),
    name: item.nmRegiao,
    city: item.nmRegiao,
    state: item.dsEstado,
    latitude: -23.55 - index * 0.03,
    longitude: -46.63 - index * 0.03,
    population: item.nrPopulacao ?? 0,
    riskLevel: fallbackRisk(index),
    riverLevel: 2.1 + index,
    rainfall: 38 + index * 17,
    temperature: 24,
    humidity: 80,
    updatedAt: new Date().toISOString(),
  };
}

function mapAlerta(item: JavaAlerta): Alert {
  const evento = item.eventoClimatico;
  return {
    id: String(item.idAlerta),
    regionId: String(evento?.regiao?.idRegiao ?? '1'),
    title: item.dsAlerta,
    description: evento?.tpEvento ?? 'Alerta climático gerado pelo OrbitEye.',
    level: evento?.nivelRisco ?? 'ALTO',
    status: item.stAlerta,
    createdAt: item.dtAlerta ?? today(),
  };
}

function mapEvento(item: JavaEvento): ClimateEvent {
  return {
    id: String(item.idEvento),
    regionId: String(item.regiao?.idRegiao ?? '1'),
    type: item.tpEvento,
    description: `Evento climático classificado como ${item.nivelRisco}.`,
    intensity: item.nivelRisco === 'CRITICO' ? 9 : item.nivelRisco === 'ALTO' ? 7 : 5,
    occurredAt: item.dtEvento ?? today(),
  };
}

function mapPrevisao(item: JavaPrevisao): Prediction {
  return {
    id: String(item.idPrevisao),
    regionId: String(item.regiao?.idRegiao ?? '1'),
    riskLevel: item.nivelPrevisto,
    confidence: Math.round((item.probabilidade ?? 0.8) * 100),
    summary: `Previsão IA para ${item.regiao?.nmRegiao ?? 'região monitorada'}.`,
    recommendation: item.nivelPrevisto === 'CRITICO'
      ? 'Emitir alerta para Defesa Civil e orientar evacuação preventiva em áreas baixas.'
      : 'Monitorar sensores e preparar comunicação para moradores.',
    createdAt: item.dtPrevisao ?? today(),
  };
}

export async function listRegions() {
  const { data } = await api.get<JavaRegiao[]>('/regioes');
  return data.map(mapRegiao);
}

export async function createRegion(payload: Omit<Region, 'id' | 'updatedAt'>) {
  const { data } = await api.post<JavaRegiao>('/regioes', {
    idRegiao: Date.now(),
    nmRegiao: payload.name,
    dsEstado: payload.state,
    nrPopulacao: payload.population,
  });
  return mapRegiao(data);
}

export async function updateRegion(id: string, payload: Partial<Region>) {
  const atual = await api.get<JavaRegiao[]>(`/regioes`);
  const original = atual.data.find((item) => item.idRegiao === toId(id));
  const { data } = await api.put<JavaRegiao>(`/regioes/${id}`, {
    idRegiao: toId(id),
    nmRegiao: payload.name ?? original?.nmRegiao ?? 'Região monitorada',
    dsEstado: payload.state ?? original?.dsEstado ?? 'SP',
    nrPopulacao: payload.population ?? original?.nrPopulacao ?? 0,
  });
  return mapRegiao(data);
}

export async function deleteRegion(id: string) {
  await api.delete(`/regioes/${id}`);
}

export async function listAlerts() {
  const { data } = await api.get<JavaAlerta[]>('/alertas');
  return data.map(mapAlerta);
}

export async function createAlert(payload: Omit<Alert, 'id' | 'createdAt'>) {
  const { data: regioes } = await api.get<JavaRegiao[]>('/regioes');
  const regiao = regioes.find((item) => item.idRegiao === toId(payload.regionId)) ?? regioes[0];

  const { data: evento } = await api.post<JavaEvento>('/eventos', {
    idEvento: Date.now() + 1,
    tpEvento: payload.description,
    dtEvento: today(),
    nivelRisco: payload.level,
    regiao,
  });

  const { data } = await api.post<JavaAlerta>('/alertas', {
    idAlerta: Date.now(),
    dsAlerta: payload.title,
    dtAlerta: today(),
    stAlerta: payload.status,
    eventoClimatico: evento,
  });
  return mapAlerta(data);
}

export async function updateAlert(id: string, payload: Partial<Alert>) {
  const { data: alertas } = await api.get<JavaAlerta[]>('/alertas');
  const original = alertas.find((item) => item.idAlerta === toId(id));
  const { data } = await api.put<JavaAlerta>(`/alertas/${id}`, {
    idAlerta: toId(id),
    dsAlerta: payload.title ?? original?.dsAlerta ?? 'Alerta climático',
    dtAlerta: original?.dtAlerta ?? today(),
    stAlerta: payload.status ?? original?.stAlerta ?? 'ATIVO',
    eventoClimatico: original?.eventoClimatico,
  });
  return mapAlerta(data);
}

export async function deleteAlert(id: string) {
  await api.delete(`/alertas/${id}`);
}

export async function listEvents() {
  const { data } = await api.get<JavaEvento[]>('/eventos');
  return data.map(mapEvento);
}

export async function listPredictions() {
  const { data } = await api.get<JavaPrevisao[]>('/previsoes');
  return data.map(mapPrevisao);
}

export async function getDashboard() {
  const [regions, alerts] = await Promise.all([listRegions(), listAlerts()]);
  return {
    monitoredRegions: regions.length,
    activeAlerts: alerts.filter((item) => item.status === 'ATIVO').length,
    criticalRegions: regions.filter((item) => item.riskLevel === 'CRITICO').length,
    averageConfidence: 86,
  };
}

export async function getRiskAnalysis(regionId: string) {
  const { data } = await api.get<JavaAnalise>(`/analise-risco/${regionId}`);
  return data;
}
