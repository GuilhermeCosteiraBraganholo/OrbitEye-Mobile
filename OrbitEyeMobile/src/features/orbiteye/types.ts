export type RiskLevel = 'BAIXO' | 'MEDIO' | 'ALTO' | 'CRITICO';

export type Region = {
  id: string;
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  population: number;
  riskLevel: RiskLevel;
  riverLevel: number;
  rainfall: number;
  temperature: number;
  humidity: number;
  updatedAt: string;
};

export type Alert = {
  id: string;
  regionId: string;
  title: string;
  description: string;
  level: RiskLevel;
  status: 'ATIVO' | 'RESOLVIDO';
  createdAt: string;
};

export type ClimateEvent = {
  id: string;
  regionId: string;
  type: string;
  description: string;
  intensity: number;
  occurredAt: string;
};

export type Prediction = {
  id: string;
  regionId: string;
  riskLevel: RiskLevel;
  confidence: number;
  summary: string;
  recommendation: string;
  createdAt: string;
};
