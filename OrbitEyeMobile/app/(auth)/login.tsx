import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput } from 'react-native';
import { Link, router } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { PrimaryButton } from '@/components/PrimaryButton';
import { theme } from '@/constants/theme';
import { useAuth } from '@/services/auth/AuthContext';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('aluno@orbiteye.app');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) return Alert.alert('Atenção', 'Informe e-mail e senha.');
    try {
      setLoading(true);
      await signIn(email, password);
      router.replace('/(tabs)/home');
    } catch {
      Alert.alert('Erro', 'Não foi possível fazer login. Verifique a API.');
    } finally { setLoading(false); }
  }

  return (
    <Screen>
      <Text style={styles.title}>OrbitEye 🛰️</Text>
      <Text style={styles.subtitle}>Monitoramento climático inteligente com dados de satélite e IA.</Text>
      <Card>
        <Text style={styles.label}>E-mail</Text>
        <TextInput value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" placeholderTextColor={theme.colors.muted} />
        <Text style={styles.label}>Senha</Text>
        <TextInput value={password} onChangeText={setPassword} style={styles.input} secureTextEntry placeholderTextColor={theme.colors.muted} />
        <PrimaryButton label="Entrar" onPress={handleLogin} loading={loading} />
        <Link href="/(auth)/register" style={styles.link}>Criar conta</Link>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 32, fontWeight: '900', color: theme.colors.text, marginTop: 40 },
  subtitle: { color: theme.colors.muted, fontSize: 16, lineHeight: 22 },
  label: { fontWeight: '700', color: theme.colors.text },
  input: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, padding: 12, color: theme.colors.text, backgroundColor: '#0B1628' },
  link: { textAlign: 'center', color: theme.colors.primary, fontWeight: '700' }
});
