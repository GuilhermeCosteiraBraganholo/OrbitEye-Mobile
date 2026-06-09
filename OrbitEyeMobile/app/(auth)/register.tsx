import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput } from 'react-native';
import { Link, router } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { PrimaryButton } from '@/components/PrimaryButton';
import { theme } from '@/constants/theme';
import { useAuth } from '@/services/auth/AuthContext';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [name, setName] = useState('Aluno OrbitEye');
  const [email, setEmail] = useState('novo@orbiteye.app');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password) return Alert.alert('Atenção', 'Preencha todos os campos.');
    try {
      setLoading(true);
      await signUp(name, email, password);
      router.replace('/(tabs)/home');
    } catch {
      Alert.alert('Erro', 'Não foi possível criar a conta.');
    } finally { setLoading(false); }
  }

  return (
    <Screen>
      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>Cadastre-se para acompanhar regiões de risco e receber alertas.</Text>
      <Card>
        <Text style={styles.label}>Nome</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholderTextColor={theme.colors.muted} />
        <Text style={styles.label}>E-mail</Text>
        <TextInput value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" placeholderTextColor={theme.colors.muted} />
        <Text style={styles.label}>Senha</Text>
        <TextInput value={password} onChangeText={setPassword} style={styles.input} secureTextEntry placeholderTextColor={theme.colors.muted} />
        <PrimaryButton label="Cadastrar" onPress={handleRegister} loading={loading} />
        <Link href="/(auth)/login" style={styles.link}>Já tenho conta</Link>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 30, fontWeight: '900', color: theme.colors.text, marginTop: 40 },
  subtitle: { color: theme.colors.muted, fontSize: 16, lineHeight: 22 },
  label: { fontWeight: '700', color: theme.colors.text },
  input: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, padding: 12, color: theme.colors.text, backgroundColor: '#0B1628' },
  link: { textAlign: 'center', color: theme.colors.primary, fontWeight: '700' }
});
