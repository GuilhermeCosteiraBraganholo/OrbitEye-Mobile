import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Card } from '@/components/Card';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { theme } from '@/constants/theme';
import { env } from '@/config/env';
import { useAuth } from '@/services/auth/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  async function handleLogout() {
    await signOut();
    router.replace('/(auth)/login');
  }

  return (
    <Screen>
      <Text style={styles.title}>Perfil</Text>
      <Card>
        <Text style={styles.cardTitle}>{user?.name}</Text>
        <Text style={styles.text}>{user?.email}</Text>
      </Card>
      <Card>
        <Text style={styles.cardTitle}>Configurações de notificação</Text>
        <Text style={styles.text}>Alertas críticos: ativados</Text>
        <Text style={styles.text}>Alertas por região: ativados</Text>
        <Text style={styles.text}>Resumo diário: ativado</Text>
      </Card>
      <Card>
        <Text style={styles.cardTitle}>Sobre o App</Text>
        <Text style={styles.text}>OrbitEye Mobile — Global Solution 2026/1</Text>
        <Text style={styles.text}>Tema: economia espacial aplicada à prevenção de desastres.</Text>
        <Text style={styles.hash}>Commit: {env.commitHash}</Text>
      </Card>
      <View style={{ height: 8 }} />
      <PrimaryButton label="Sair" onPress={handleLogout} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '900', color: theme.colors.text },
  cardTitle: { color: theme.colors.text, fontWeight: '800', fontSize: 18 },
  text: { color: theme.colors.muted, lineHeight: 22 },
  hash: { color: theme.colors.primary, lineHeight: 22, fontWeight: '800' }
});
