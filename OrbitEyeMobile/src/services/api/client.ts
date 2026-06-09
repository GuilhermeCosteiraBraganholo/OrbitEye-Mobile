import axios from 'axios';
import { env } from '@/config/env';

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000,
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}