import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { clearToken, getToken, saveToken } from '@/services/auth/authStorage';
import { login as loginRequest, register as registerRequest } from '@/services/auth/authApi';
import { setAuthToken } from '@/services/api/client';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function bootstrap() {
      const storedToken = await getToken();
      if (storedToken) {
        setToken(storedToken);
        setAuthToken(storedToken);
        setUser({ id: 'local-user', name: 'Aluno OrbitEye', email: 'aluno@orbiteye.app' });
      }
      setIsLoading(false);
    }

    bootstrap();
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    isLoading,
    isAuthenticated: !!token,
    user,
    async signIn(email: string, password: string) {
      const response = await loginRequest({ email, password });
      setToken(response.token);
      setUser(response.user);
      setAuthToken(response.token);
      await saveToken(response.token);
    },
    async signUp(name: string, email: string, password: string) {
      const response = await registerRequest({ name, email, password });
      setToken(response.token);
      setUser(response.user);
      setAuthToken(response.token);
      await saveToken(response.token);
    },
    async signOut() {
      setToken(null);
      setUser(null);
      setAuthToken(null);
      await clearToken();
    }
  }), [isLoading, token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
