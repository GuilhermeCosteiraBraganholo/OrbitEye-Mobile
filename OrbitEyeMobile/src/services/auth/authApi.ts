import { api } from '@/services/api/client';

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

type JavaLoginResponse = {
  token: string;
  idUsuario?: number;
  nome?: string;
  email?: string;
};

export async function login(payload: LoginPayload) {
  const { data } = await api.post<JavaLoginResponse>('/auth/login', {
    username: payload.email,
    password: payload.password,
  });

  return {
    token: data.token,
    user: {
      id: String(data.idUsuario ?? '1'),
      name: data.nome ?? 'Aluno OrbitEye',
      email: data.email ?? payload.email,
    },
  } satisfies AuthResponse;
}

export async function register(payload: { name: string; email: string; password: string }) {
  await api.post('/usuarios', {
    idUsuario: Date.now(),
    nmUsuario: payload.name,
    dsEmail: payload.email,
    dsSenha: payload.password,
    tpUsuario: 'OPERADOR',
  });

  return login({ email: payload.email, password: payload.password });
}
